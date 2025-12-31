import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  // Rotas protegidas que requerem autenticação
  const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/anunciar",
    "/meus-anuncios",
    "/alterar-cadastro",
  ]

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Verificar se há sessão (simplificado - será validado no servidor)
  const hasSession = request.cookies.has("next-auth.session-token") || 
                     request.cookies.has("__Secure-next-auth.session-token")

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/anunciar/:path*",
    "/meus-anuncios/:path*",
    "/alterar-cadastro/:path*",
  ],
}
