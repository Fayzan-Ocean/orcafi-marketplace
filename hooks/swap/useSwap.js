import { NftSwapV4,NftSwap  } from '@traderxyz/nft-swap-sdk';
import { useState } from 'react';
import { usePublicClient } from 'wagmi'
import { useContract, useWalletClient } from 'wagmi'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi';
import { useEthersProvider } from '../useEthersProvider';
import { useEthersSigner } from '../useEthersSigner';


const useSwap =  () => {



const provider = useEthersProvider()
const signer = useEthersSigner()

const CHAIN_ID = 137

const swapSdk = new NftSwapV4(provider, signer, CHAIN_ID);


const listNft = async ( nft, token, owner)=> {
  try {

    //console.log("Posted: ",nft,token)
     const approvalStatusForUserA = await swapSdk.loadApprovalStatus(
      nft,
      owner
    );



    if (!approvalStatusForUserA?.contractApproved) {
      const approvalTx = await swapSdk.approveTokenOrNftByAsset(
        nft,
        owner
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${nft[0].tokenAddress} contract to swap with 0x v4 (txHash: ${approvalTxReceipt.transactionHash})`
      );
    }

 
  
    
     //await swapSdk.approveTokenOrNftByAsset(nft, owner);

      
      const order = swapSdk.buildNftAndErc20Order(nft,token,'sell',
            // My wallet address
            owner
          );
           

      const signedOrder = await swapSdk.signOrder(order);

      const postedOrder = await swapSdk.postOrder(signedOrder,137);
      console.log("Posted: ",postedOrder)

  } catch (error) {
    console.log(error)
  }


   
    
          
          
    
    }

const buyNft = async (token,buyerAddress, signedOrder) =>{

  console.log(signedOrder)


  const approve = await swapSdk.loadApprovalStatus(token,buyerAddress)
   console.log(approve)

   if(!approve?.contractApproved){
      const approvalTx = await swapSdk.approveTokenOrNftByAsset(
            token,
            buyerAddress
          );
          const approvalTxReceipt = await approvalTx.wait();

          console.log(approvalTx)

          console.log(
            `Approved ${token[0].tokenAddress} contract to swap with 0x. TxHash: ${approvalTxReceipt.transactionHash})`
          );
   }

 
   
    

    const fillTx = await swapSdk.fillSignedOrder(signedOrder);
    const fillTxReceipt = await swapSdk.awaitTransactionHash(fillTx);
    console.log(`🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`);



    }

const getOrders = async (contractAddress, nftId, buyOrSell, network) =>{

      try {

        const orders = await swapSdk.getOrders({
          nftToken: contractAddress,
          nftTokenId: nftId,
          chainId: network,
          sellOrBuyNft: buyOrSell, // Only show asks (sells) for this NFT (excludes asks)
        });

  

        const foundOrder = orders.orders[0];

        return foundOrder;
        
      } catch (error) {
        console.log(error)
      }

    }
    
    
const getOffers = async (contractAddress, nftId, buyOrSell, network) =>{

      try {

        const orders = await swapSdk.getOrders({
          nftToken: contractAddress,
          nftTokenId: nftId,
          chainId: network,
          sellOrBuyNft: buyOrSell, // Only show asks (sells) for this NFT (excludes asks)
        });

  

        const foundOrder = orders.orders;

        return foundOrder;
        
      } catch (error) {
        console.log(error)
      }

    }

const cancelOrders = async (order) =>{
  try {
   
    const cancel = await swapSdk.cancelOrder(order?.order?.nonce, order?.nftType); 
    return cancel
    
  } catch (error) {
    console.log(error)
  }

  }

const bidNft = async (nft, token, owner) => {

    try {

      const approvalStatusForUserA = await swapSdk.loadApprovalStatus(
        token,
        owner
      );
  
  console.log(approvalStatusForUserA)
  
      if (!approvalStatusForUserA?.contractApproved) {
        const approvalTx = await swapSdk.approveTokenOrNftByAsset(
          token,
          owner
        );
        const approvalTxReceipt = await approvalTx.wait();
        console.log(
          `Approved ${token.tokenAddress} contract to swap with 0x v4 (txHash: ${approvalTxReceipt.transactionHash})`
        );
      }


      const bidOrder = swapSdk.buildOrder(token, nft, owner);

      const signedOrder = await swapSdk.signOrder(bidOrder);
      	
      const postedOrder = await swapSdk.postOrder(signedOrder, CHAIN_ID);

      console.log(postedOrder)


    } catch (error) {

      console.log(error)
      
    }

  }





  return {   listNft, buyNft, bidNft, getOrders,getOffers, cancelOrders  };
};




export default useSwap;









  
  // Approve NFT to trade (if required)
 /*  await nftSwapSdk.approveTokenOrNftByAsset(CRYPTOPUNK, walletAddressMaker);
  
  // Build order
  const order = nftSwapSdk.buildOrder(
    CRYPTOPUNK, // Maker asset to swap
    FOUR_HUNDRED_TWENTY_WETH, // Taker asset to swap
    walletAddressMaker
  );
  // Sign order so order is now fillable
  const signedOrder = await nftSwapSdk.signOrder(order);
  
  // [Part 2: Taker that wants to buy the punk fills trade]
  const nftSwapSdk = new NftSwap(provider, signerForTaker, CHAIN_ID);
  const walletAddressTaker = '0x9876...';
  
  // Approve USDC to trade (if required)
  await nftSwapSdk.approveTokenOrNftByAsset(FOUR_HUNDRED_TWENTY_WETH, walletAddressTaker);
  
  // Fill order :)
  const fillTx = await nftSwapSdk.fillSignedOrder(signedOrder);
  const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash);
  console.log(`🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`) */