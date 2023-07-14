import getUser from "../../../models/User";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const collectionInDb = await prisma.collection.findMany({
        where:{
            tokenType: 'ERC721'
        },
        take: 50,
        orderBy: {
            createdAt: "desc"
        }
    });



    res.status(200).json(collectionInDb);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}