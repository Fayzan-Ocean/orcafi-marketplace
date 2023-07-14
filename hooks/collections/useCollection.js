
import { Alchemy, Network } from 'alchemy-sdk';
const settings = {
    apiKey: 'yARH1tpi16CXQDsn1-GXF-kt8DFnf6x6', // Replace with your Alchemy API key.
    network: Network.MATIC_MAINNET // Replace with your network.
  };
  
const alchemy = new Alchemy(settings);

const useCollection = () => {


const getCollection = async (contractAddress) => {


    let collectionData = {}
    let collectionOwners,collectionMetadata,collectionSpam


    try {
      collectionOwners = await alchemy.nft.getOwnersForContract(contractAddress)
    } catch (error) {
      console.log('Owners Error')
    }

    try {
       collectionMetadata = await alchemy.nft.getContractMetadata(contractAddress)
    } catch (error) {
      console.log('Metadata Error')
    }

    try {
       collectionSpam = await alchemy.nft.isSpamContract(contractAddress)
    } catch (error) {
      console.log('Spam Error')
    }

    
     
   

    //const collectionFloorPrice = await alchemy.nft.getFloorPrice(contractAddress)

    


    return collectionData = {
        owners: collectionOwners.owners.length,
        metadata: collectionMetadata,
        floorPrice: "collectionFloorPrice",
        isSpam:collectionSpam
    } 




  }

const refreshCollection = async (contractAddress) => {
    setLoading(true)

  try {
    const response = await alchemy.nft.refreshContract(contractAddress)

     setLoading(false)
    return response

  } catch (error) {
    
  }

   




  }

  
  

  return { getCollection, refreshCollection};
};

export default useCollection;



