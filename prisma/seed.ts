// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securepassword',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'securepassword',
    },
  });

  // Create Reviews
  await prisma.review.create({
    data: {
      content: 'Great book!',
      rating: 5,
      reviewerId: user1.id,
    },
  });

  await prisma.review.create({
    data: {
      content: 'Not bad, could be better.',
      rating: 3,
      reviewerId: user2.id,
    },
  });

  // Create Books
  await prisma.book.create({
    data: {
      title: 'The Great Gatsby',
      published: new Date('1925-04-10T00:00:00.000Z'),
      year: 1925,
      genre: 'Fiction',
      author: 'F. Scott Fitzgerald',
    },
  });

  await prisma.book.create({
    data: {
      title: 'To Kill a Mockingbird',
      published: new Date('1960-07-11T00:00:00.000Z'),
      year: 1960,
      genre: 'Fiction',
      author: 'Harper Lee',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
