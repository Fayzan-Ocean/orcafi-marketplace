import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { collection_item_data } from '../../data/collection_data';
import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
import Social_dropdown from '../../components/dropdown/Social_dropdown';
import Collection_items from '../../components/collectrions/Collection_items';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Meta from '../../components/Meta';
import { PrismaClient } from '@prisma/client'
import { getCldImageUrl } from 'next-cloudinary';
import aveta from 'aveta';
import useCollection from '../../hooks/collections/useCollection';
import { useEffect } from 'react';


const Collection = (props) => {
	const [likesImage, setLikesImage] = useState(false);
	const [collection, setCollectionData] = useState(props?.collectionData);
	const [collectionAlchemy, setcollectionAlchemy] = useState(props?.alchemyData);
	const {getCollection, refreshCollection} = useCollection()
	const router = useRouter();
	const pid = router.query.collection;

	const handleLikes = () => {
		if (!likesImage) {
			setLikesImage(true);
		} else {
			setLikesImage(false);
		}
	};

	useEffect(()=>{
		console.log(props)
	},[])


  

	return (
		<>
			<Meta title={`${collection?.name || collectionAlchemy?.metadata?.name} | Orcafi`} />

			<div className="pt-[5.5rem] lg:pt-24">
				{/* <!-- Banner --> */}
				<div className="relative h-[300px]">
					<Image
						src={props.coverImage  }
						alt="banner"
						layout="fill"
						objectFit="cover"
						className='bg-white'
					/>
				</div>
				{/* <!-- end banner --> */}

				{/* <!-- Profile --> */}
		
							<section key={props.collectionId} className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
								{/* <!-- Avatar --> */}
								<div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">


								{collectionAlchemy?.isSpam ? 
													<>
														<figure className="relative h-40 w-40 dark:border-red rounded-full border-[5px] border-white">
										<Image
											src={props.profileImage}
											alt={"title"}
											layout="fill"
											objectFit="contain"
											className="dark:border-red rounded-full   bg-white"
										/>
									
									</figure>
													</> 
													
													: 
													
													<>
									<figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-full border-[5px] border-white">
										<Image
											src={props.profileImage}
											alt={"title"}
											layout="fill"
											objectFit="contain"
											className="dark:border-jacarta-600 rounded-full   bg-white"
										/>
										<div
											className="dark:border-jacarta-600 bg-red absolute -right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
											data-tippy-content="Verified Collection"
										>
											{!collectionAlchemy?.isSpam  && (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													width="24"
													height="24"
													className="h-[.875rem] w-[.875rem] fill-white"
												>
													<path fill="none" d="M0 0h24v24H0z"></path>
													<path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
												</svg>
											)}
										</div>
									</figure>
													
													</>}



								
								</div>

								<div className="container">
									<div className="text-center">
										<h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
											{collection?.name || collectionAlchemy?.metadata?.name}
										</h2>
										<p className="font-display text-jacarta-600 mb-2 text-md font-medium dark:text-white">
											{collectionAlchemy?.metadata?.symbol}
										</p>
										<div className="mb-8">
											<span className="text-jacarta-400 text-sm font-bold">Created by </span>
											<Link href={"/user/" + collectionAlchemy?.metadata?.contractDeployer}>
												<a className="text-accent text-sm font-bold">{collectionAlchemy?.metadata?.contractDeployer?.slice(0,-30)+'...' || 'NaN'}</a>
											</Link>
										</div>

										<div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">

						



										<Link href="#" >
														<a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
															<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
																{collectionAlchemy?.metadata?.totalSupply ? aveta(collectionAlchemy?.metadata?.totalSupply) : NaN}
															</div>
															<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
																{"Items"}
															</div>
														</a>
													</Link>
													<Link href="#" >
														<a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
															<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
																{collectionAlchemy?.owners ? aveta(collectionAlchemy?.owners) : NaN}
															</div>
															<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
																{"Owners"}
															</div>
														</a>
													</Link>

					

													<Link href="#" >
														<a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
															<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
															{collectionAlchemy?.metadata?.opensea?.floorPrice || NaN}
															</div>
															<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
																{"Floor"}
															</div>
														</a>
													</Link>
													<Link href="#" >
														<a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl  py-4 hover:shadow-md sm:w-32">
															<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
																{collectionAlchemy?.metadata?.tokenType || NaN}
															</div>
															<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
																{"Type"}
															</div>
														</a>
													</Link>
													


										{/* {details.map(({ id, detailsNumber, detailsText }) => {
												return (
													<Link href="#" key={id}>
														<a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
															<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
																{detailsNumber}
															</div>
															<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
																{detailsText}
															</div>
														</a>
													</Link>
												);
											})} */} 


										</div>

										<p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">{collection?.description || collectionAlchemy?.metadata?.openSea?.description}</p>

										<div className="mt-6 flex items-center justify-center space-x-2.5 relative">
											<div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
												{/* <Likes data={} /> */}
												<div
													className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
													onClick={() => handleLikes()}
												>
													<button>
														{likesImage ? (
															<svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
																<use xlinkHref="/icons.svg#icon-heart-fill"></use>
															</svg>
														) : (
															<svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
																<use xlinkHref="/icons.svg#icon-heart"></use>
															</svg>
														)}
													</button>
												</div>
											</div>

											<Social_dropdown />

											<Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" 

											contractAddress={props?.collectionData?.contractAddress}
											
											/>
										</div>
									</div>
								</div>
							</section>
					

				{/* <!-- end profile --> */}
			</div>
			<Collection_items />
		</>
	);
};

export default Collection;


export async function getServerSideProps(context) {
	const  collection  = context.query.collection;

	const {getCollection, refreshCollection} = useCollection()

  
	// Fetch data for the specific post using the slug
  
	const getUser = async () => {
	  const prisma = new PrismaClient()
	
	  const collectionData = await prisma.collection.findUnique({
		where: {
			  contractAddress: collection
		}
	  });
	
	  if(!collectionData) {
		const collectionData2 = await prisma.collection.findUnique({
		  where: {
				slug: collection
		  }
		});
		await prisma.$disconnect()
	
		return collectionData2;
	  }
	
	  await prisma.$disconnect()
	
	  return collectionData;
	
	  
	  };
	  
	
	const collectionDatas = await getUser()

	const data = await getCollection(collection)
console.log(data)
  
	const imageUrlc = isValidUrl(collectionDatas?.coverUrl) ? collectionDatas?.coverUrl : getCldImageUrl({ src: "coverImages/"+collectionDatas?.coverUrl,
	quality: "50", height:300, width:1920})


	const imageUrlp  = isValidUrl(collectionDatas?.imageUrl) ? collectionDatas?.imageUrl : getCldImageUrl({ src: "profileImages/"+collectionDatas?.imageUrl,
	  quality: "50", height:150, width:150})

	  const profileImage = collectionDatas?.imageUrl ? imageUrlp : data?.metadata?.openSea?.imageUrl

	  const coverImage = collectionDatas?.coverUrl ? imageUrlc :  '/images/user/banner.jpg'


	 
	
	  if (collectionDatas ||data) {
		  return {
			  props: { 
				  collectionId: collectionDatas?.id || null,
				  collectionData: JSON.parse(JSON.stringify(collectionDatas)),
				  alchemyData: JSON.parse(JSON.stringify(data)),
				  coverImage: coverImage ,
				  profileImage: profileImage ? profileImage : '/images/user/user_avatar.gif',
				  contractAddress: collection
				  // other data
			  } 
		  }
	  } else {
		
		return {
	  props: {
		contractAddress: collection
		
	  }
	  
	  }
  
	
	};
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
  
