import upsertUser from "../../../models/User";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const  userData  = req.body;

  console.log(userData)


  if ( !userData?.wallet) {
    return res.status(400).json({ message: "Username and wallet are required fields." });
  }

  try {
    const user = await prisma.user.update({
      where: {
        wallet: userData?.wallet
      },
      data: userData

    });
  

    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}