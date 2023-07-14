import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        collections: true,
        assets: true,
      },
    });
    await prisma.$disconnect()

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}