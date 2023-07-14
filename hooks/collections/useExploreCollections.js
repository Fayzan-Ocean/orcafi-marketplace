import { useState } from "react";
import { Alchemy, Network } from 'alchemy-sdk';
const settings = {
    apiKey: 'yARH1tpi16CXQDsn1-GXF-kt8DFnf6x6', // Replace with your Alchemy API key.
    network: Network.MATIC_MAINNET // Replace with your network.
  };
  
const alchemy = new Alchemy(settings);

const useExploreCollections = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const getCollections = async () => {

    const res = await fetch('/api/collections/collections')
    const data = await res.json()

    let nftData = []

    data.forEach( async (contract)=> {
        const alchemyData = await alchemy.nft.getNftsForContract(contract.contractAddress,{
            pageSize:3
        })
         console.log(alchemyData)
    });

   

    //const alchemyData = await alchemy.nft.getContractMetadataBatch(data)



    return data 




  }

  
  

  return { loading, error, getCollections };
};

export default useExploreCollections;