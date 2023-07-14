import createUser from "../../../models/User";
import { PrismaClient } from "@prisma/client";
import { now } from "moment/moment";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { wallet } = req.body;
  console.log(wallet)

  if ( !wallet) {
    return res.status(400).json({ message: "Username and wallet are required fields." });
  }

  try {
   // const user = await createUser({ wallet});

      const user = await prisma.user.create({
     data: {
       wallet,
   
     },
   });
 
   await prisma.$disconnect()
 
   return user;
  


    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}