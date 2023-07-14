
import { Alchemy, Network } from 'alchemy-sdk';


const useNfts = () => {


  const getNfts = async (owner,contractAddress, network, nftId) => {


    const settings = {
        apiKey: 'yARH1tpi16CXQDsn1-GXF-kt8DFnf6x6', // Replace with your Alchemy API key.
        network: Network.MATIC_MAINNET // Replace with your network.
      };
      
    const alchemy = new Alchemy(settings);




    let nftData = {}


     
    const nftMetadata = alchemy.nft.getNftsForOwnerIterator(owner)
    //const nftOwner = await alchemy.nft.getOwnersForNft(contractAddress,nftId)
    //const rarity = await alchemy.nft.computeRarity(contractAddress, nftId)

    //const collectionFloorPrice = await alchemy.nft.getFloorPrice(contractAddress)

    //const collectionSpam = await alchemy.nft.isSpamContract(contractAddress)


    return nftData = {

        metadata: nftMetadata,
        owner:nftOwner.owners,
        rarity:rarity
    } 




  }

  const refreshNfts = async (contractAddress, network, nftId) => {


    const settings = {
        apiKey: 'yARH1tpi16CXQDsn1-GXF-kt8DFnf6x6', // Replace with your Alchemy API key.
        network: getNetwork(network) // Replace with your network.
      };
      
    const alchemy = new Alchemy(settings);

  try {
    const response =  await alchemy.nft.refreshNftMetadata(contractAddress, tokenId)

    return response

  } catch (error) {
    
  }

   




  }

  
  

  return {  getNfts, refreshNfts};
};

export default useNfts;

const getNetwork = (network) =>{
if(network == 'ETH' || 'eth' || 'ethereum') return Network.ETH_MAINNET
if(network == 'MATIC' || 'matic' || 'polygon') return Network.MATIC_MAINNET
else return Network.MATIC_MAINNET
}