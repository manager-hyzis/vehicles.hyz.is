import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'

async function main() {
  console.log('🌱 Seeding database...')

  // Create plans
  const plan3m = await prisma.plan.upsert({
    where: { id: 'plan-3m' },
    update: {},
    create: {
      id: 'plan-3m',
      name: '3 meses',
      duration: 3,
      price: 39.00,
      description: 'Pacote de 3 meses para anunciar veículos',
      userTypes: ['PESSOA_FISICA', 'REVENDEDORA', 'GARAGE', 'CONCESSIONARIA'],
    },
  })

  const plan6m = await prisma.plan.upsert({
    where: { id: 'plan-6m' },
    update: {},
    create: {
      id: 'plan-6m',
      name: '6 meses',
      duration: 6,
      price: 69.00,
      description: 'Pacote de 6 meses para anunciar veículos',
      userTypes: ['PESSOA_FISICA', 'REVENDEDORA', 'GARAGE', 'CONCESSIONARIA'],
    },
  })

  const plan9m = await prisma.plan.upsert({
    where: { id: 'plan-9m' },
    update: {},
    create: {
      id: 'plan-9m',
      name: '9 meses',
      duration: 9,
      price: 99.00,
      description: 'Pacote de 9 meses para anunciar veículos',
      userTypes: ['PESSOA_FISICA', 'REVENDEDORA', 'GARAGE', 'CONCESSIONARIA'],
    },
  })

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
      type: 'ADMIN',
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
      type: 'PESSOA_FISICA',
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
      type: 'REVENDEDORA',
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

  console.log('✅ Plans created:', { plan3m, plan6m, plan9m })
  console.log('✅ Admin user created:', adminUser)
  console.log('✅ Test users created:', { user1, user2 })
  console.log('✅ Test vehicles created:', { vehicle1, vehicle2 })
  console.log('✅ Database seeded successfully!')
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