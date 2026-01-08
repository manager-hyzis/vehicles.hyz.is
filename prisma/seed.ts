import { config } from 'dotenv'
import { resolve } from 'path'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import { hash } from 'bcryptjs'

config({ path: resolve('.env.local') })

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set in environment variables')
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    console.log('🌱 Seeding database...')

    // Create plans
    const plan3m = await prisma.plan.create({
      data: {
        id: 'plan-3m',
        name: '3 meses',
        duration: 3,
        price: 39.00,
        description: 'Pacote de 3 meses para anunciar veículos',
        userTypes: ['PRIVATE', 'RESELLER', 'GARAGE', 'DEALERSHIP'],
      },
    }).catch(() => null)

    const plan6m = await prisma.plan.create({
      data: {
        id: 'plan-6m',
        name: '6 meses',
        duration: 6,
        price: 69.00,
        description: 'Pacote de 6 meses para anunciar veículos',
        userTypes: ['PRIVATE', 'RESELLER', 'GARAGE', 'DEALERSHIP'],
      },
    }).catch(() => null)

    const plan9m = await prisma.plan.create({
      data: {
        id: 'plan-9m',
        name: '9 meses',
        duration: 9,
        price: 99.00,
        description: 'Pacote de 9 meses para anunciar veículos',
        userTypes: ['PRIVATE', 'RESELLER', 'GARAGE', 'DEALERSHIP'],
      },
    }).catch(() => null)

  // Create admin user
  const adminPassword = await hash('admin123456', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@vehicles.com' },
    update: {},
    create: {
      email: 'admin@vehicles.com',
      password: adminPassword,
      name: 'Administrador',
      phone: '(11) 99999-9999',
      type: 'PRIVATE',
      role: 'ADMIN',
      city: 'São Paulo',
      state: 'SP',
      country: 'BR',
      emailVerified: new Date(),
    },
  })

  // Create test users
  const userPassword = await hash('user123456', 10)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: userPassword,
      name: 'João Silva',
      phone: '(11) 98765-4321',
      type: 'PRIVATE',
      city: 'São Paulo',
      state: 'SP',
      country: 'BR',
      emailVerified: new Date(),
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'revendedor@example.com' },
    update: {},
    create: {
      email: 'revendedor@example.com',
      password: userPassword,
      name: 'Revenda XYZ',
      phone: '(11) 97654-3210',
      type: 'RESELLER',
      city: 'São Paulo',
      state: 'SP',
      country: 'BR',
      emailVerified: new Date(),
    },
  })

  // Create test vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      userId: user1.id,
      category: 'Carro',
      brand: 'Toyota',
      model: 'Corolla',
      version: '2.0 XEi',
      year: 2020,
      title: 'Toyota Corolla 2020 - Impecável',
      mileage: 45000,
      color: 'Prata',
      engineSize: 2.0,
      fuel: 'Gasolina',
      transmission: 'Automática',
      price: 85000.00,
      fipeValue: 82000.00,
      description: 'Veículo em perfeito estado, revisado, com todas as manutenções em dia.',
      features: {
        airbag: true,
        abs: true,
        directionPower: true,
        airConditioning: true,
        electricWindows: true,
        electricMirrors: true,
        centralLocking: true,
      },
      observations: ['Revisado', 'Sem multas', 'Sem débitos'],
      city: 'São Paulo',
      state: 'SP',
      status: 'ACTIVE',
    },
  })

  const vehicle2 = await prisma.vehicle.create({
    data: {
      userId: user2.id,
      category: 'Carro',
      brand: 'Volkswagen',
      model: 'Gol',
      version: '1.6 MSI',
      year: 2019,
      title: 'Volkswagen Gol 2019 - Excelente custo-benefício',
      mileage: 62000,
      color: 'Branco',
      engineSize: 1.6,
      fuel: 'Gasolina',
      transmission: 'Manual',
      price: 45000.00,
      fipeValue: 43000.00,
      description: 'Carro econômico, ideal para quem procura bom custo-benefício.',
      features: {
        airbag: true,
        abs: true,
        directionPower: true,
        airConditioning: true,
      },
      observations: ['Revisado', 'Pneus novos'],
      city: 'São Paulo',
      state: 'SP',
      status: 'ACTIVE',
    },
  })

  // Create vehicle images
  const image1 = await prisma.vehicleImage.create({
    data: {
      vehicleId: vehicle1.id,
      imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800',
      imageKey: 'vehicle1-image1',
      isCover: true,
      order: 1,
    },
  })

  const image2 = await prisma.vehicleImage.create({
    data: {
      vehicleId: vehicle2.id,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      imageKey: 'vehicle2-image1',
      isCover: true,
      order: 1,
    },
  })

  // Create highlights (Destaque, Super Destaque, Ofertão)
  const highlight1 = await prisma.highlight.create({
    data: {
      vehicleId: vehicle1.id,
      name: 'Destaque',
      type: 'DESTAQUE',
      price: 50.00,
      duration: 30,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  const highlight2 = await prisma.highlight.create({
    data: {
      vehicleId: vehicle2.id,
      name: 'Ofertão',
      type: 'OFERTAO',
      price: 1500.00,
      duration: 30,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  // Create coupons
  const coupon1 = await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10.00,
      maxUses: 100,
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      active: true,
    },
  })

  const coupon2 = await prisma.coupon.create({
    data: {
      code: 'DESCONTO50',
      type: 'FIXED',
      value: 50.00,
      maxUses: 50,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      active: true,
    },
  })

  // Create messages
  const message1 = await prisma.message.create({
    data: {
      senderId: user1.id,
      receiverId: user2.id,
      vehicleId: vehicle1.id,
      content: 'Olá, tenho interesse no seu veículo. Ainda está disponível?',
      isRead: false,
    },
  })

  const message2 = await prisma.message.create({
    data: {
      senderId: user2.id,
      receiverId: user1.id,
      vehicleId: vehicle1.id,
      content: 'Sim, ainda está disponível! Quer marcar uma visita?',
      isRead: false,
    },
  })

  // Create notifications
  const notification1 = await prisma.notification.create({
    data: {
      userId: user1.id,
      title: 'Novo interesse em seu anúncio',
      message: 'Alguém se interessou pelo seu Toyota Corolla',
      type: 'NEW_MESSAGE',
      vehicleId: vehicle1.id,
      isRead: false,
    },
  })

  const notification2 = await prisma.notification.create({
    data: {
      userId: user2.id,
      title: 'Pagamento recebido',
      message: 'Seu pagamento de destaque foi processado com sucesso',
      type: 'PAYMENT_RECEIVED',
      vehicleId: vehicle2.id,
      isRead: false,
    },
  })

  // Create moderation record
  const moderation1 = await prisma.moderation.create({
    data: {
      vehicleId: vehicle1.id,
      status: 'APPROVED',
      reviewedBy: adminUser.id,
    },
  })

  const moderation2 = await prisma.moderation.create({
    data: {
      vehicleId: vehicle2.id,
      status: 'PENDING',
    },
  })

    console.log('✅ Plans created:', { plan3m, plan6m, plan9m })
    console.log('✅ Admin user created:', adminUser)
    console.log('✅ Test users created:', { user1, user2 })
    console.log('✅ Test vehicles created:', { vehicle1, vehicle2 })
    console.log('✅ Vehicle images created:', { image1, image2 })
    console.log('✅ Highlights created:', { highlight1, highlight2 })
    console.log('✅ Coupons created:', { coupon1, coupon2 })
    console.log('✅ Messages created:', { message1, message2 })
    console.log('✅ Notifications created:', { notification1, notification2 })
    console.log('✅ Moderation records created:', { moderation1, moderation2 })
    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })