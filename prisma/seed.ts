import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Technology' },
      update: {},
      create: {
        name: 'Technology',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Programming' },
      update: {},
      create: {
        name: 'Programming',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Web Development' },
      update: {},
      create: {
        name: 'Web Development',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Database' },
      update: {},
      create: {
        name: 'Database',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Design' },
      update: {},
      create: {
        name: 'Design',
      },
    }),
  ])

  console.log('✅ Categories created:', categories.length)

  // Create users with profiles
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Doe',
        profile: {
          create: {
            bio: 'Full-stack developer with 5 years of experience in React and Node.js',
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        profile: {
          create: {
            bio: 'UI/UX designer passionate about creating beautiful and functional interfaces',
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike@example.com' },
      update: {},
      create: {
        email: 'mike@example.com',
        name: 'Mike Johnson',
        profile: {
          create: {
            bio: 'Database administrator and backend developer specializing in PostgreSQL',
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah@example.com' },
      update: {},
      create: {
        email: 'sarah@example.com',
        name: 'Sarah Wilson',
        profile: {
          create: {
            bio: 'Frontend developer with expertise in Vue.js and modern CSS frameworks',
          },
        },
      },
    }),
  ])

  console.log('✅ Users with profiles created:', users.length)

  // Create some posts and link them to categories
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: 'getting-started-with-prisma' },
      update: {},
      create: {
        slug: 'getting-started-with-prisma',
        title: 'Getting Started with Prisma',
        body: 'Prisma is a modern database toolkit that makes database access easy and type-safe...',
        authorId: users[0].id, // John Doe
        categories: {
          create: [
            { categoryId: categories[0].id }, // Technology
            { categoryId: categories[1].id }, // Programming
            { categoryId: categories[3].id }, // Database
          ],
        },
      },
    }),
    prisma.post.upsert({
      where: { slug: 'modern-web-development-trends' },
      update: {},
      create: {
        slug: 'modern-web-development-trends',
        title: 'Modern Web Development Trends',
        body: 'The web development landscape is constantly evolving with new frameworks and tools...',
        authorId: users[1].id, // Jane Smith
        categories: {
          create: [
            { categoryId: categories[0].id }, // Technology
            { categoryId: categories[2].id }, // Web Development
            { categoryId: categories[4].id }, // Design
          ],
        },
      },
    }),
    prisma.post.upsert({
      where: { slug: 'database-design-best-practices' },
      update: {},
      create: {
        slug: 'database-design-best-practices',
        title: 'Database Design Best Practices',
        body: 'Good database design is crucial for application performance and maintainability...',
        authorId: users[2].id, // Mike Johnson
        categories: {
          create: [
            { categoryId: categories[3].id }, // Database
            { categoryId: categories[1].id }, // Programming
          ],
        },
      },
    }),
  ])

  console.log('✅ Posts created:', posts.length)

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 