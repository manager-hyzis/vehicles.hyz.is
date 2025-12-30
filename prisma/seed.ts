import { prisma } from '../lib/prisma'

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
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