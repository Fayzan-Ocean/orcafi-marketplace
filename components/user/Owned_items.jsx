import React from 'react'
import { useEffect } from 'react'
import CategoryItem from '../categories/categoryItem'



function Owned_items(props) {

useEffect(()=>{

    if(props.nfts){
        console.log("UserData Owned:", props.nfts)
      }

},[])

  return (
    <>
    <CategoryItem nfts={props.nfts} />
    
    </>
  )
}

export default Owned_items