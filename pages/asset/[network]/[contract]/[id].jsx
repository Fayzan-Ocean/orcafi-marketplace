
import useNft from '../../../../hooks/nft/useNft';


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Auctions_dropdown from '../../../../components/dropdown/Auctions_dropdown';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Items_Countdown_timer from '../../../../components/items_countdown_timer';
import { ItemsTabs } from '../../../../components//component';

import Likes from '../../../../components//likes';
import Meta from '../../../../components//Meta';
import { useDispatch } from 'react-redux';
import { listModalShow, bidsModalShow, buyModalShow } from '../../../../redux/counterSlice';
import useUser from '../../../../hooks/user/useUser';
import { useAccount } from 'wagmi';
import useSwap from '../../../../hooks/swap/useSwap';
import { getCldImageUrl } from 'next-cloudinary';
import { PrismaClient } from '@prisma/client'
import { parseEther, formatEther } from 'viem';


function NFT(props) {


  const [nftAlchemy, setnftAlchemy] = useState(props?.nftAlchemy);
  const [creator, setcreator] = useState(props?.creatorData);
  const [owner, setowner] = useState(props?.ownerData);
  const [order, setOrder] = useState();
  const [offers, setOffers] = useState();

  const { address, isError, isLoading } = useAccount()
  const dispatch = useDispatch();
  const {listNft,getOrders, getOffers, cancelOrders} = useSwap()

  const [imageModal, setImageModal] = useState(false);


  const listNftForErc20 = async ()=>{

  

  }

  const handleRemoveListing = async () => {

	try {
		
		const cancel = await cancelOrders(order)
		console.log(cancel)

	} catch (error) {
		
	}



  }





useEffect( ()=>{

	const getOrder = async ()=>{
		const orderData = await getOrders(nftAlchemy?.metadata?.contract?.address, nftAlchemy?.metadata?.tokenId,'sell',137)
		//console.log("Order: ",orderData)
		setOrder(orderData)
	}

	const getOffer = async ()=>{
		const offerData = await getOffers(nftAlchemy?.metadata?.contract?.address, nftAlchemy?.metadata?.tokenId,'buy',137)

		console.log("Offers: ",offerData)
		setOffers(offerData)
	}

	

	getOrder()
	getOffer()

if(props){
	//console.log(owner)
}
 
 },[address]) 


  return (
   <>
   
   <Meta title={`${nftAlchemy?.metadata?.title} | Orcafi`} />
			{/*  <!-- Item --> */}
			<section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
				<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
					<img src="/images/gradient_light.jpg" alt="gradient" className="h-full" />
				</picture>
				<div className="container">
					{/* <!-- Item --> */}

            {String(address).toLowerCase()==String(nftAlchemy?.owner[0]).toLowerCase() ? <> <div className="flex dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2xl border bg-white px-4 py-4 mb-10 justify-end gap-1">
								<div className='col-end-7	'><Link href="#" >
                  <button
                    className="bg-red shadow-md hover:bg-jacarta-800 inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                    onClick={() => dispatch( listModalShow(nftAlchemy))}
                  >
                    List for Sale
                  </button>
                </Link></div>
				
                <div className='col-end-7	'><Link href="#" >
                  <button
                    className="bg-white shadow-md hover:bg-jacarta-800 inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-jacarta-800 hover:text-white transition-all border"
                    onClick={handleRemoveListing}
                  >
                   Remove Listing
                  </button>
                </Link></div>
              </div></> : <></>}
           
              {/* <!-- end bid --> */}

								<div className="md:flex md:flex-wrap" key={nftAlchemy?.metadata?.tokenId}>
									{/* <!-- Image --> */}
									<figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
										<button className=" w-full" onClick={() => setImageModal(true)}>
											<img src={nftAlchemy?.metadata?.media[0]?.gateway} alt={"title"} className="rounded-2xl cursor-pointer  w-full" />
										</button>

										{/* <!-- Modal --> */}
										<div className={imageModal ? 'modal fade show block' : 'modal fade'}>
											<div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
												<img src={nftAlchemy?.metadata?.media[0]?.gateway} alt={"title"} className="h-full rounded-2xl" />
											</div>

											<button
												type="button"
												className="btn-close absolute top-6 right-6"
												onClick={() => setImageModal(false)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													width="24"
													height="24"
													className="h-6 w-6 fill-white"
												>
													<path fill="none" d="M0 0h24v24H0z" />
													<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
												</svg>
											</button>
										</div>
										{/* <!-- end modal --> */}
									</figure>

									{/* <!-- Details --> */}
									<div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
                  
										{/* <!-- Collection / Likes / Actions --> */}
										<div className="mb-3 flex">
											{/* <!-- Collection --> */}
											<div className="flex items-center">
												<Link href={"/collection/"+nftAlchemy?.metadata?.contract?.address}>
													<a className="text-accent mr-2 text-sm font-bold">{nftAlchemy?.metadata?.contract?.name}</a>
												</Link>
												<span
													className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
													data-tippy-content="Verified Collection"
												>
													<Tippy content={<span>Verified Collection</span>}>
														<svg className="icon h-[.875rem] w-[.875rem] fill-white">
															<use xlinkHref="/icons.svg#icon-right-sign"></use>
														</svg>
													</Tippy>
												</span>
											</div>

											{/* <!-- Likes / Actions --> */}
											<div className="ml-auto flex items-stretch space-x-2 relative">
											{/* 	<Likes
													like={"likes"}
													classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4"
												/> */}

												{/* <!-- Actions --> */}
												<Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
											</div>
										</div>

                    

										<h1 className=" flex gap-2 font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                    {nftAlchemy?.metadata?.title}  
										</h1>

                  

									{/* 	<div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
											<div className="flex items-center">
												<Tippy content={<span>ETH</span>}>
													<span className="-ml-1">
														<svg className="icon mr-1 h-4 w-4">
															<use xlinkHref="/icons.svg#icon-ETH"></use>
														</svg>
													</span>
												</Tippy>
												<span className="text-green text-sm font-medium tracking-tight">
													{"price"} ETH
												</span>
											</div>
											<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
												Highest bid
											</span>
											<span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
												1/1 available
											</span>
										</div> */}

										<p className="dark:text-jacarta-300 mb-10">{nftAlchemy?.metadata?.description}</p>

										{/* <!-- Creator / Owner --> */}
										<div className="mb-8 flex flex-wrap">
											<div className="mr-8 mb-4 flex">
												<figure className="mr-4 shrink-0">
													<Link href={"/user/"+ creator?.data?.username || nftAlchemy?.metadata?.contract?.contractDeployer }>
														<a className="relative block">
															<img
																src={creator?.image || "/images/avatars/creator_9.png"}
																alt={"creatorname"}
																className="rounded-2lg h-12 w-12"
																loading="lazy"
															/>
															<div
																className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
																data-tippy-content="Verified Collection"
															>
																<Tippy content={<span>Verified Collection</span>}>
																	<svg className="icon h-[.875rem] w-[.875rem] fill-white">
																		<use xlinkHref="/icons.svg#icon-right-sign"></use>
																	</svg>
																</Tippy>
															</div>
														</a>
													</Link>
												</figure>
												<div className="flex flex-col justify-center">
													<span className="text-jacarta-400 block text-sm dark:text-white">
														Creator
													</span>
													<Link href={"/user/"+ nftAlchemy?.metadata?.contract?.contractDeployer}>
														<a className="text-accent block">
															<span className="text-sm font-bold">{creator?.data?.username || nftAlchemy?.metadata?.contract?.contractDeployer.slice(0,-34)}</span>
														</a>
													</Link>
												</div>
											</div>

											<div className="mb-4 flex">
												<figure className="mr-4 shrink-0">
													<Link href={"/user/"+ owner?.data?.username || nftAlchemy?.owner[0] }>
														<a className="relative block">
															<img
																src={owner?.image || "/images/avatars/creator_2.png"}
																alt={owner?.image}
																className="rounded-full h-12 w-12"
																loading="lazy"
															/>
															<div
																className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
																data-tippy-content="Verified Collection"
															>
																<Tippy content={<span>Verified Collection</span>}>
																	<svg className="icon h-[.875rem] w-[.875rem] fill-white">
																		<use xlinkHref="/icons.svg#icon-right-sign"></use>
																	</svg>
																</Tippy>
															</div>
														</a>
													</Link>
												</figure>
												<div className="flex flex-col justify-center">
													<span className="text-jacarta-400 block text-sm dark:text-white">
														Owned by
													</span>
													<Link href={"/user/"+ owner?.data?.username || nftAlchemy?.owner[0] }>
														<a className="text-accent block">
															<span className="text-sm font-bold">{owner?.data?.username || nftAlchemy?.owner[0].slice(0,-34)}</span>
														</a>
													</Link>
												</div>
											</div>
										</div>


						{order ? <>	<div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
											<div className="mb-8 sm:flex sm:flex-wrap">
												{/* <!-- Highest bid --> */}
												<div className="sm:w-1/2 sm:pr-4 lg:pr-8">
												
													<div className="mt-3 flex">
														<figure className="mr-4 shrink-0">
															<Link href="#">
																<a className="relative block">
																	<img
																		src={nftAlchemy?.metadata?.media[0]?.gateway}
																		alt="avatar"
																		className="rounded-2lg h-12 w-12"
																		loading="lazy"
																	/>
																</a>
															</Link>
														</figure>
														<div>
															<div className="flex items-center whitespace-nowrap align-middle">
																<Tippy content={<span>MATIC</span>}>
																	<span className="-ml-1">
																	<img
																src={"/images/crypto-trading/matic.png"}
																alt="avatar 2"
																className="rounded-2lg mr-1"
																loading="lazy"
																width={18}
																height={18}
															/>
																	</span>
																</Tippy>
																<span className="text-green text-lg font-medium leading-tight tracking-tight">
																	{formatEther(order?.erc20TokenAmount)} {props?.nftData?.network == 'matic' ? 'MATIC' : 'ETH'}
																</span>
															</div>
															{/* <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
																~10,864.10
															</span> */}
														</div>
													</div>
												</div>

												{/* <!-- Countdown --> */}
											<div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
													<span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
														Listing Expires in
													</span>
													{order?.order?.expiry ? 
												<Items_Countdown_timer time={order?.order?.expiry} /> : null}
												</div> 
											</div>

											{String(address).toLowerCase()!=String(nftAlchemy?.owner[0]).toLowerCase() ? <>
											
											<div className='flex gap-6'><Link href="#">
												<button
													className="bg-red hover:bg-jacarta-900 inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
													onClick={() => dispatch(buyModalShow({order:order,nft:nftAlchemy}))}
												>
													Buy Now
												</button>
											</Link>
											<Link href="#">
												<button
													className=" bg-light-base hover:bg-jacarta-900 inline-block w-full rounded-full py-3 px-8 hover:text-white text-center font-semibold text-bjacarta-800 transition-all border dark:text-jacarta-800 dark:hover:text-white dark:hover:border-jacarta-800"
													onClick={() => dispatch(bidsModalShow(nftAlchemy))}
												>
													Make Offer
												</button>
											</Link></div>
											
											</> : <></> }



						



											
										</div></> : <></>}
										


									
										{/* <!-- end bid --> */}
									</div>
									{/* <!-- end details --> */}
								</div>
			
					<ItemsTabs offers={offers} rarity={nftAlchemy?.rarity} metadata={nftAlchemy?.metadata} network={props?.nftData?.network}/>
				</div>
			</section>
			{/* <!-- end item --> */}
{/* 
			<More_items /> */}
   
   </>
  )
}

export default NFT

export async function getServerSideProps(context) {
	const  nftData  = context.query;

  const {getNft, refreshNft} = useNft()
  const {getUser} = useUser()

  let ownerImage, creatorImage

  const data = await getNft(nftData?.contract,nftData?.network,parseInt(nftData?.id))

  const creatorData = await getUser(data?.metadata?.contract?.contractDeployer)
 	console.log(creatorData)
  const ownerData = await getUser(data?.owner[0])
  console.log(ownerData)


  if(creatorData){
	creatorImage =  getCldImageUrl({ src: "profileImages/"+creatorData?.profileImage,
    quality: "50", height:150, width:150})
  }
  if(ownerData){
	ownerImage =  getCldImageUrl({ src: "profileImages/"+ownerData?.profileImage,
    quality: "50", height:150, width:150})
  }
 


		
	return {
	  props: {
      nftData: nftData,
      ownerData: JSON.parse(JSON.stringify({
		data: ownerData,
		image: ownerImage
	})),
      creatorData: JSON.parse(JSON.stringify({
		data: creatorData,
		image: creatorImage
	})),
      nftAlchemy: JSON.parse(JSON.stringify(data))
	  }
	  
	  }
  

  }

  const isValidUrl = urlString=> {
	var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}