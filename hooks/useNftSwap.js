import React, { useEffect, useState } from 'react';
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk';

const useNftSwap = (
  provider,
  signer,
  chainId,
  makerAsset,
  takerAsset,
  walletAddressMaker,
  walletAddressTaker
) => {
  const [nftSwapSdk, setNftSwapSdk] = useState(null);

  useEffect(() => {
    const initializeNftSwapSdk = async () => {
      const sdk = new NftSwapV4(provider, signer, chainId);
      setNftSwapSdk(sdk);
    };

    initializeNftSwapSdk();
  }, [provider, signer, chainId]);

  const approveTokenOrNftByAsset = async (asset, walletAddress) => {
    if (nftSwapSdk) {
      await nftSwapSdk.approveTokenOrNftByAsset(asset, walletAddress);
    }
  };

  const signOrder = async (order) =>{
        
        if (nftSwapSdk) {
            return await nftSwapSdk.signOrder(order);
          }
    }
  const fillSignedOrder = async (signedOrder) => {
    if (nftSwapSdk) {
      return await nftSwapSdk.fillSignedOrder(signedOrder);
    }
  };

  

  return {
    approveTokenOrNftByAsset,
    signOrder,
    fillSignedOrder,
    
  };
};