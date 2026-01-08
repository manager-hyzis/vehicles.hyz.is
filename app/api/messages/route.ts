import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ senderId: session.user.id }, { recipientId: session.user.id }],
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        sender: { select: { id: true, name: true } },
        recipient: { select: { id: true, name: true } },
      },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json(
      conversations.map((conv) => ({
        id: conv.id,
        participantId:
          conv.senderId === session.user.id ? conv.recipientId : conv.senderId,
        participantName:
          conv.senderId === session.user.id ? conv.recipient.name : conv.sender.name,
        lastMessage: conv.messages[0]?.content || "",
        lastMessageTime: conv.messages[0]?.createdAt || conv.updatedAt,
        unreadCount: conv.messages.filter(
          (m) => m.recipientId === session.user.id && !m.read
        ).length,
        messages: conv.messages
          .reverse()
          .map((m) => ({
            id: m.id,
            content: m.content,
            senderId: m.senderId,
            senderName: m.senderId === conv.senderId ? conv.sender.name : conv.recipient.name,
            timestamp: m.createdAt,
            read: m.read,
          })),
      }))
    )
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { conversationId, content } = body

    if (!conversationId || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      )
    }

    if (
      conversation.senderId !== session.user.id &&
      conversation.recipientId !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        recipientId:
          conversation.senderId === session.user.id
            ? conversation.recipientId
            : conversation.senderId,
        conversationId,
      },
    })

    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
