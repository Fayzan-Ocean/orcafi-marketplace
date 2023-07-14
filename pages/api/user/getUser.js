import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { walletAddress, username } = req.query;

  

  try {
    const userData = await prisma.user.findUnique({
      where: {
            wallet: walletAddress
      }
    });

  
    if(!userData) {
      try {
        const userData2 = await prisma.user.findUnique({
        where: {
              username: walletAddress
        }
      });

   

      if(!userData2) {
        return res.status(500).json(null);
      }



      await prisma.$disconnect()
       
      return res.status(200).json(userData2);
      } catch (error) {
        return res.status(500).json(null);
      }
      
    }
    else{

  
  

    await prisma.$disconnect()
  
    return res.status(200).json(userData);
    }
  
    


  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}