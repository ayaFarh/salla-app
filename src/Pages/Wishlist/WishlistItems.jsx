import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handelAddToCart } from '../../Redux/slices/cartSlice';
import { Img } from 'react-image';
import { LiaStarSolid } from 'react-icons/lia';
import { IoEyeSharp } from 'react-icons/io5';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { deleteFromWishlist } from '../../Redux/slices/wishlistSlice';
import { MdDelete } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';

export default function WishlistItems() {
    const {wishlist} = useSelector((state) => state.wishlist);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [wishProducts, setWishProducts] = useState(wishlist)
    const handelDelet = (product) => {
  const savedProduct = product;
  setWishProducts((prev) => prev.filter((item) => item._id !== savedProduct._id));
  dispatch(deleteFromWishlist(savedProduct._id))
    .unwrap()
    .catch(() => {
      setWishProducts((prev) => [...prev, savedProduct]);
    });
};

    
    
  return (
    <div className='space-y-4 '>
     <h2 className='text-2xl font-bold'>Shopping wishlist <FaHeart className='inline-block'/></h2>
    
    <div className='grid grid-cols-1 max-[767px]:grid-cols-2  max-[500px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
     
        {wishProducts.length > 0 ? wishProducts.map((item) => (
            <div className='rounded overflow-hidden shadow  transition-all duration-300 border border-gray-200' key={item._id}>
               <div className='relative group'>
               <Img src={item.imageCover} alt={item.title} className='w-full h-full object-contain' loader={<Skeleton height={350} />}/>
               <div className='absolute top-0 left-0 bottom-0 opacity-0 hover:opacity-100 transition-all duration-300 space-x-2 flex items-center bg-black/25 justify-center w-full h-full '>
                 <span onClick={()=>navigate(`/productDetails/${item.title}`,
                 {
                    state : {
                         product:item
                        }})}

             className='text-2xl bg-slate-300 cursor-pointer rounded-full text-center p-2 flex items-center hover:scale-105 transition-all duration-300'><IoEyeSharp /></span>
                 <span onClick={()=>dispatch(handelAddToCart(item._id))} className='text-2xl bg-slate-300 cursor-pointer rounded-full text-center p-2 flex items-center hover:scale-105 transition-all duration-300'><AiOutlineShoppingCart /></span>
                 <span onClick={()=> handelDelet(item)}
                       className='text-2xl text-red-600 bg-slate-300 cursor-pointer rounded-full text-center p-2 flex items-center hover:scale-105 transition-all duration-300'  ><MdDelete /></span>
               </div>
               </div>
              <div className='p-2 space-y-1'>
              <h2 className='line-clamp-1 text-slate-400  font-semibold'>{item.title}</h2>
              <div className='flex items-center justify-between'>
              <p>{item.price} L.E</p>
              <p className='flex items-center gap-1'><LiaStarSolid className='text-amber-400'/><span>{item.ratingsAverage}</span></p>
              </div>
              </div>
              </div>
        )) : null}
    </div>
    </div>
  )
}
