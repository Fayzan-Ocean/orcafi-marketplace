import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser({ username, email, wallet, ...otherFields }) {

  try {
     const user = await prisma.user.create({
    data: {
      wallet,
      ...otherFields,
    },
  });

  await prisma.$disconnect()

  return user;
  } catch (error) {
    console.log(error)
  }
 
}
export  async function upsertUser(userData) {
  const user = await prisma.user.update({
    where: {
      wallet: userData?.wallet
    },
    data: userData,
  });

  await prisma.$disconnect()

  return user;
}
export  async function getUser(_wallet) {
  const user = await prisma.user.findUnique({
    where: {
      wallet: _wallet
    }
  });

  await prisma.$disconnect()

  return user;
}
