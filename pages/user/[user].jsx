import React, { useEffect, useState,useMemo  } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Social_dropdown from "../../components/dropdown/Social_dropdown";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import user_data from "../../data/user_data";
import User_items from "../../components/user/User_items";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { CopyToClipboard } from "react-copy-to-clipboard";
import Head from "next/head";
import Meta from "../../components/Meta";
import { useIsMounted } from "../../hooks/useIsMounted";
import { useAccount, useConnect, useDisconnect, Address, Context } from 'wagmi'
import { CldImage } from 'next-cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import { PrismaClient } from '@prisma/client'
import useUser from "../../hooks/user/useUser";


const User = (props) => {

 
  const isMounted = useIsMounted()
  const { address,isConnected, isConnecting, isDisconnected } = useAccount()
  const router = useRouter();
  const pid = router.query.user;
  // console.log(pid);

  const [likesImage, setLikesImage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(props.userData);
  const [coverImageUrl, setcoverImageUrl] = useState(props.coverImage);
  const [profileImageUrl, setprofileImageUrl] = useState(props.profileImage);

  const [icon, seticon] = useState(true);
  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };

  useEffect(() => {



  
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  useEffect(()=>{
    if(props){
       console.log("Props: ",props)
    }

    
  },[])
  


  
  if (!isMounted) return null
  if(isDisconnected || address != props?.userData?.wallet) return (
    <>


   <Meta title={user?.username ? user?.username+"User | Orcafi " : user?.slice(0,-35)+" | Orcafi"} />
     
    
     
      <div className="pt-[5.5rem] lg:pt-24" key={user?.id}>
              {/* <!-- Banner --> */}
              <div className="relative h-[18.75rem]">
              {/* <Image
                  src={imageUrl}
                  alt="banner"
                  layout="fill"
                  objectFit="cover"
                />  */}
{user && user?.coverImage? <>  <Image
                  src={coverImageUrl}
                  alt="banner"
                  layout="fill"
                  objectFit="cover"
                /> 
</> : <>

<Image
                  src={'/images/user/banner.jpg'}
                  alt="banner"
                  layout="fill"
                  objectFit="cover"
                /> 
</>}
         

              </div>
              {/* <!-- end banner --> */}
              <section className="dark:bg-jacarta-800 bg-light-base relative  pt-28">
                {/* <!-- Avatar --> */}
                <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-full border-[5px] border-white">
                   {/*  <Image
                      src={getCldImageUrl({ src: "profileImages/"+userData?.profileImage})}
                      alt={title}
                      layout="fill"
                      objectFit="contain"
                      className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
                    /> */}
                  {user && user?.profileImage ? <>   <Image
                      src={profileImageUrl}
                      alt={user?.profileImage}
                      layout="fill"
                      objectFit="contain"
                      className="dark:border-jacarta-600 rounded-full border-[5px] border-white"
                    />
        </> : <>
            <Image
                          src='/images/avatars/creator_2.jpg'
                          alt={user?.profileImage}
                          layout="fill"
                          objectFit="contain"
                          className=" mix-blend-color-burn dark:border-jacarta-600 rounded-full border-[5px] border-white"
                        />
        
        </>} 
                    <div
                      className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                      data-tippy-content="Verified Collection"
                    >
                      {icon && (
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
                </div>

                <div className="container">
                  <div className="text-center">
                    <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                      {user?.username}
                    </h2>
                    <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                      <Tippy content="ETH">
                        <svg className="icon h-4 w-4 mr-1">
                          <use xlinkHref="/icons.svg#icon-ETH"></use>
                        </svg>
                      </Tippy>

                      <Tippy
                        hideOnClick={false}
                        content={
                          copied ? <span className="px-1">copied</span> : <span className="px-1">copy</span>
                        }
                      >
                        <button className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                          <CopyToClipboard
                            text={user?.wallet || user}
                            onCopy={() => setCopied(true)}
                          >
                            <span>{user?.wallet || user}</span>
                          </CopyToClipboard>
                        </button>
                      </Tippy>
                    </div>

                    <p className="dark:text-jacarta-300 mx-auto mb-4 max-w-xl text-lg">
                      {user?.description}
                    </p>
                    <span className="text-jacarta-400">
                      Joined  {new Date(user?.createdAt).toDateString()}
                    </span>

                    <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                      <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                        <div className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
                          <button onClick={() => handleLikes()}>
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

                      <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- end profile --> */}
              <User_items userAddress={user?.wallet} nfts={props?.nfts}/>
            </div> 
     
      
      
     
    </>
  );
  return (
    <>


    {isMounted && address &&isConnected   ?
    
    <><Meta title={user ? user?.username+"User | Orcafi " : "Orcafi"} />
     
    
     
      <div className="pt-[5.5rem] lg:pt-24" key={user?.id}>
              {/* <!-- Banner --> */}
              <div className="relative h-[18.75rem]">
              {/* <Image
                  src={imageUrl}
                  alt="banner"
                  layout="fill"
                  objectFit="cover"
                />  */}
{user && user?.coverImage? <>  <Image
                  src={coverImageUrl}
                  alt="banner"
                  layout="fill"
                  objectFit="cover"
                /> 
</> : <>

<Image
                  src={'/images/user/banner.jpg'}
                  alt="banner"
                  layout="fill"
                  objectFit="cover"
                /> 
</>}
         

              </div>
              {/* <!-- end banner --> */}
              <section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
                {/* <!-- Avatar --> */}
                <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-full border-[5px] border-white">
                   {/*  <Image
                      src={getCldImageUrl({ src: "profileImages/"+userData?.profileImage})}
                      alt={title}
                      layout="fill"
                      objectFit="contain"
                      className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
                    /> */}
                  {user && user?.profileImage ? <>   <Image
                      src={profileImageUrl}
                      alt={user?.profileImage}
                      layout="fill"
                      objectFit="contain"
                      className="dark:border-jacarta-600 rounded-full border-[5px] border-white"
                    />
        </> : <>
            <Image
                          src='/images/avatars/creator_2.jpg'
                          alt={user?.profileImage}
                          layout="fill"
                          objectFit="contain"
                          className=" mix-blend-color-burn dark:border-jacarta-600 rounded-full border-[5px] border-white"
                        />
        
        </>} 
                    <div
                      className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                      data-tippy-content="Verified Collection"
                    >
                      {icon && (
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
                </div>

                <div className="container">
                  <div className="text-center">
                    <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                      {user?.username}
                    </h2>
                    <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                      <Tippy content="ETH">
                        <svg className="icon h-4 w-4 mr-1">
                          <use xlinkHref="/icons.svg#icon-ETH"></use>
                        </svg>
                      </Tippy>

                      <Tippy
                        hideOnClick={false}
                        content={
                          copied ? <span className="px-1">copied</span> : <span className="px-1">copy</span>
                        }
                      >
                        <button className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                          <CopyToClipboard
                            text={user?.wallet}
                            onCopy={() => setCopied(true)}
                          >
                            <span>{user?.wallet}</span>
                          </CopyToClipboard>
                        </button>
                      </Tippy>
                    </div>

                    <p className="dark:text-jacarta-300 mx-auto mb-4 max-w-xl text-lg">
                      {user?.description}
                    </p>
                    <span className="text-jacarta-400">
                      Joined  {new Date(user?.createdAt).toDateString()}
                    </span>

                    <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                      <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                        <div className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm">
                          <button onClick={() => handleLikes()}>
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

                      <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
                    </div>
                  </div>
                </div>
              </section>
              {/* <!-- end profile --> */}
              <User_items userAddress={user?.wallet} nfts={props?.nfts}/>
            </div> </> : 
            
            <> </>}
     
     
      
      
     
    </>
  );
};

export default User;


export async function getServerSideProps(context) {
  const  user  = context.query.user;
  const {getUserNfts} = useUser()
  // Fetch data for the specific post using the slug

  const getUser = async () => {
    const prisma = new PrismaClient()
  
    const userData = await prisma.user.findUnique({
      where: {
            wallet: user
      }
    });
  
    if(!userData) {
      const userData2 = await prisma.user.findUnique({
        where: {
              username: user
        }
      });
      await prisma.$disconnect()
  
      return userData2;
    }
  
    await prisma.$disconnect()
  
    return userData;
  
    
    };
    
    
  
  const userDatas = await getUser()

  const imageUrlc =  getCldImageUrl({ src: "coverImages/"+userDatas?.coverImage,
  quality: "50", height:300, width:1920})
  const imageUrlp  = getCldImageUrl({ src: "profileImages/"+userDatas?.profileImage,
    quality: "50", height:150, width:150})

  const userNfts = await getUserNfts(userDatas?.wallet || user)

   
  
    if (userDatas) {
        return {
            props: { 
                userId: userDatas.id,
                userData: JSON.parse(JSON.stringify(userDatas)),
                coverImage: imageUrlc,
                profileImage: imageUrlp,
                nfts: JSON.parse(JSON.stringify(userNfts))
                // other data
            } 
        }
    } else {
      
      return {
    props: { 

      userData:user,
     
      nfts: JSON.parse(JSON.stringify(userNfts))
      // other data
  } 
    
    }

  
  };
}
