import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";
import { getCldImageUrl } from 'next-cloudinary';
import useSwap from "../../hooks/swap/useSwap";
import { formatEther } from "viem";


const CategoryItem = (props) => {
  const { sortedtrendingCategoryItemData } = useSelector(
    (state) => state.counter
  );
  const dispatch = useDispatch();

  const {getOrders} = useSwap()

  const [ownerImageUrl, setownerImageUrl]  = useState()
  const [creatorImageUrl, setcreatorImageUrl]  = useState()
  const [nftOrders, setnftOrders]  = useState([])

  const getAllOrders = async ()=>{
     if (props?.nfts) {
      const nftOrdersList = await Promise.all(
        props?.nfts?.map(async (item, index) => {
          const myorders = await getOrders(
            item?.nfts?.contract?.address,
            item?.nfts?.tokenId,
            'sell',
            137
          );
    
          return myorders;
        })
      );
    
      setnftOrders(nftOrdersList);
      console.log(nftOrdersList);
    }
  }


  const getTokenName = (chainId, tokenAddress)=>{
    if(chainId=='137' && tokenAddress == '0x0000000000000000000000000000000000001010'){

      return 'MATIC'

    }

  }




  useEffect(()=>{

 

    getAllOrders()

   


  },[])

  return (
    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
      {props?.nfts?.map((item,index) => {
        const {
          image,
          title,
          price,
          bidLimit,
          bidCount,
          likes,
          creator,
          owner,
        } = item;

          

        return (
          <article key={index}>
            <div className="dark:bg-j655555acarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              <figure className="relative">
                <Link href={item?.link}>
                  <a>
                    <img
                      src={image}
                      alt="item 5"
                      className="w-full h-[230px] rounded-[0.625rem] object-cover"
                    />
                  </a>
                </Link>

                <Likes like={likes} />

                <div className="absolute left-3 -bottom-3">
                  <div className="flex -space-x-2">
                    <Link href={item?.link}>
                      <a>
                        <Tippy content={<span>creator: { creator?.username ||creator?.slice(0,-35)}</span>}>
                          <img
                            src={item?.creator?.profileImage ? getCldImageUrl({ src: "profileImages/"+item?.creator?.profileImage,
                            quality: "50", height:150, width:150}) : '/images/avatars/owner_2.png'}
                            alt="creator"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link>
                    <Link href={item?.link}>
                      <a>
                        <Tippy content={<span>owner: {owner.username}</span>}>
                          <img
                            src={getCldImageUrl({ src: "profileImages/"+item?.owner?.profileImage,
                            quality: "50", height:150, width:150}) || '/images/avatars/creator_2.png'}
                            alt="owner"
                            layout="fill"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link>
                  </div>
                </div>
              </figure>
              <div className="mt-7 flex items-center justify-between">
                <Link href={item?.link}>
                  <a>
                    <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                      {title}
                    </span>
                  </a>
                </Link>

                {/* auction dropdown  */}
                <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full " />
              </div>
              <div className="mt-2 text-sm">
              {nftOrders[index] ? <>
               <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                  {formatEther(nftOrders[index]?.erc20TokenAmount)} {nftOrders[index] ? <>{getTokenName(nftOrders[index]?.chainId,nftOrders[index]?.erc20Token)}</> : <></>}
                </span>
              </> : <>
              
              </>}
               
               {/*  <span className="dark:text-jacarta-300 text-jacarta-500">
                  {bidCount}/{bidLimit}
                </span> */}
              </div>

           
              

              {nftOrders[index] ? <>

              <div className="flex flex-wrap gap justify-center gap-2">

              <button className=" bg-red mt-4 flex items-center w-full justify-center text-white text-center py-1 rounded hover:bg-jacarta-800"
               onClick={() => dispatch(buyModalShow())}
              >
                <span
                  className="text-white font-display text-sm text-center align-middle font-semibold"
                 
                >
                  Buy now
                </span>
        
              </button>

     

              </div>
              
             
              
              </> : <></>}
            </div>
            
          </article>
        );
      })}
    </div>
  );
};

export default CategoryItem;
