import { NATIVE_TOKEN_ADDRESS_AS_ERC20 } from "@traderxyz/nft-swap-sdk";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bidsModalHide } from "../../redux/counterSlice";
import useSwap from "../../hooks/swap/useSwap";
import { useAccount } from "wagmi";

const BidsModal = () => {
  const { bidsModal, bidOrderData } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [ETHAmount, setETHAmount] = useState(0.05);
  const [loadingBid, setloadingBid] = useState(false);
  const [usdWETH, setusdWETH] = useState(0.01);


  const {bidNft} = useSwap()
  const {address} = useAccount()

  const handleEThAmount = (e) => {
    e.preventDefault();
    setETHAmount(e.target.value);
  };

  
  useEffect(()=>{

    if(bidOrderData){
      console.log(bidOrderData?.payload?.metadata)
    }



  },[])

const handleBidNft = async () => {
  setloadingBid(true)
  const token = {
      type: "ERC20",
      tokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      amount: String(parseFloat(ETHAmount)*10e17), // 5000 USDC (5000 * 6 decimals)
  }

  const nft = {
     type: bidOrderData?.payload?.metadata?.tokenType,
     tokenAddress: bidOrderData?.payload?.metadata?.contract?.address,
     tokenId: bidOrderData?.payload?.metadata?.tokenId,
  }
  
  try {
   
    const bidOnNft = await bidNft(nft, token,address)

  } catch (error) {
    console.log(error)
  }

  setloadingBid(false)

}

useEffect(()=>{

  const getMaticRate = async () =>{
    const data = await fetch("https://api.coincap.io/v2/assets/ethereum")
    const usdMaticData = await data.json()

    setusdWETH(usdMaticData?.data?.priceUsd)

    console.log(String(parseFloat(ETHAmount)*10e17))

  }
  
  getMaticRate().catch(console.error);

},[])



  return (
    <div>
      <div className={bidsModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Make an Offer
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(bidsModalHide())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                  Price
                </span>
              </div>

              <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-2 flex items-center overflow-hidden rounded-lg border">
                <div className="border-jacarta-100 bg-jacarta-50 flex flex-1 items-center self-stretch border-r px-2">
                  <span>
                    <svg className="icon icon-ETH mr-1 h-5 w-5">
                      <use xlinkHref="/icons.svg#icon-ETH"></use>
                    </svg>
                  </span>
                  <span className="font-display text-jacarta-700 text-sm">
                    ETH
                  </span>
                </div>

                <input
                  type="number"
                  className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inse dark:text-jacarta-700"
                  placeholder="Amount"
                  value={ETHAmount}
                  onChange={(e) => handleEThAmount(e)}
                />

                <div className="bg-jacarta-50 border-jacarta-100 flex flex-1 justify-end self-stretch border-l dark:text-jacarta-700">
                  <span className="self-center px-2 text-sm">$ {parseFloat(parseFloat(usdWETH)*parseFloat(ETHAmount)).toFixed(2)}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="dark:text-jacarta-400 text-sm">
                  Balance: 0.0000 WETH
                </span>
              </div>

              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                />
                <label
                  htmlFor="terms"
                  className="dark:text-jacarta-200 text-sm"
                >
                  By checking this box, I agree to {"Xhibiter's"}{" "}
                  <a href="#" className="text-accent">
                    Terms of Service
                  </a>
                </label>
              </div>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="bg-red  hover:bg-jacarta-800 rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                  onClick={handleBidNft}
                >
                  {loadingBid ? <> Loading..</> : <>Make an Offer</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
