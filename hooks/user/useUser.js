
import { Alchemy, Network } from 'alchemy-sdk';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const settings = {
    apiKey: 'yARH1tpi16CXQDsn1-GXF-kt8DFnf6x6', // Replace with your Alchemy API key.
    network: Network.MATIC_MAINNET // Replace with your network.
  };
  
const alchemy = new Alchemy(settings);

const useUser = () => {



  const getUser = async (_address) => {


    if(_address)
{
  
  try {
    const userData = await prisma.user.findUnique({
      where: {
            wallet: _address
      }
    });

  
    if(!userData) {
      try {
        const userData2 = await prisma.user.findUnique({
        where: {
              username: _address
        }
      });

   

      if(!userData2) {
        return null
      }



      await prisma.$disconnect()
       
      return userData2
      } catch (error) {
        return null
      }
      
    }
    else{

  

    await prisma.$disconnect()
  
    return userData
    }
  
    


  } catch (error) {
    return "Internal Server Error"
  }

}
  
  };

  const getUserNfts = async (_address) =>{
    console.log(_address)
    
    try {
      let nfts = [];
      // Get the async iterable for the owner's NFTs.
      const nftsIterable = alchemy.nft.getNftsForOwnerIterator(_address);

      const ownerData = await getUser(_address)
  
      // Iterate over the NFTs and add them to the nfts array.
      for await (const nft of nftsIterable) {
       
        
        const creatorData = await getUser(nft?.contract?.contractDeployer)

          nfts.push({
            balance: nft?.balance,
            image: nft?.media[0]?.thumbnail,
            title: nft?.title,
            price: 3,
            bidLimit :3,
            bidCount :2,
            likes :4,
            creator: creatorData || nft?.contract?.contractDeployer,
            owner: ownerData || _address,
            link: `/asset/matic/`+  nft?.contract?.address +"/" + nft?.tokenId,
            nfts: nft
          });
      }

      // Log the NFTs.
      return nfts;
  } catch (error) {
      console.log(error);
  }
  }

  return {   getUser, getUserNfts };
};

export default useUser;