import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CiHeart } from 'react-icons/ci'
import { IoEyeSharp } from 'react-icons/io5'
import { LiaStarSolid } from 'react-icons/lia'
import { Img } from "react-image"
import Skeleton from 'react-loading-skeleton'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handelAddToCart } from '../Redux/slices/cartSlice'
import { AddToWishlist } from '../Redux/slices/wishlistSlice'


export default function ProductCert({product}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {
    title,
    price,
    ratingsAverage,
    imageCover,  
  }= product
  return ( 
    <div className='rounded overflow-hidden shadow  transition-all duration-300 border border-gray-200' >
     <div className='relative group'>
     <Img src={imageCover} alt={title} className='w-full h-full object-contain' loader={<Skeleton height={300} />}/>
     <div className='absolute top-0 left-0 bottom-0 opacity-0 hover:opacity-100 transition-all duration-300 space-x-2 flex items-center bg-black/25 justify-center w-full h-full '>
       <span onClick={()=>dispatch(AddToWishlist(product._id))}
       className='text-2xl bg-slate-300 cursor-pointer rounded-full text-center p-2 flex items-center hover:scale-105 transition-all duration-300' ><CiHeart /></span>
       <span onClick={()=>navigate(`/productDetails/${title}`,{
 state: {
  product
}
  })} className='text-2xl bg-slate-300 cursor-pointer rounded-full text-center p-2 flex items-center hover:scale-105 transition-all duration-300'><IoEyeSharp /></span>
       <span onClick={()=>dispatch(handelAddToCart(product._id))} className='text-2xl bg-slate-300 cursor-pointer rounded-full text-center p-2 flex items-center hover:scale-105 transition-all duration-300'><AiOutlineShoppingCart /></span>

     </div>
     </div>
    <div className='p-2 space-y-1'>
    <h2 className='line-clamp-1 text-slate-400  font-semibold'>{title}</h2>
    <div className='flex items-center justify-between'>
    <p>{price} L.E</p>
    <p className='flex items-center gap-1'><LiaStarSolid className='text-amber-400'/><span>{ratingsAverage}</span></p>
    </div>
    </div>
    </div>
  )
}
