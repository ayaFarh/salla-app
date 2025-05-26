import React, { useState } from 'react'
import { FaMinus, FaPlus, FaShoppingCart, FaWindowMinimize } from 'react-icons/fa';
import { Img } from 'react-image';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import Skeleton from 'react-loading-skeleton';
import {deleteSpacialProductCart, handelAllDeletCart, handelUpdateCart } from '../../../Redux/slices/cartSlice';

export default function CartItems() {
    const cart = useSelector((state) => state.cart.cart);
    const cartProduct = cart?.data?.products
    const dispatch =useDispatch()
    const [products, setProducts] = useState(cartProduct)
    const deleteProduct = (id) => {
        const saveProduct =products;
        setProducts((prev) => prev.filter((item) => item.product._id !== id));
        dispatch(deleteSpacialProductCart(id))
        .unwrap()
        .catch(()=>{
            setProducts((prev) => [...prev, saveProduct]);
        })
    }
   const deletAllProduct = () => {
        const saveProduct =products;
        setProducts([]);
        dispatch(handelAllDeletCart())
        .unwrap()
        .catch(()=>{
            setProducts((prev) => [...prev, saveProduct]);
        })
       
   }
  return (
    <div className='space-y-4 container'>
         <h2 className='text-xl font-bold'>Shopping cart <FaShoppingCart className='inline-block'/></h2>
        <div className='space-y-4'>
        {products?.map((item) => (
    <div key={item._id} className='flex items-center justify-between'>
        <div className='flex gap-2'>
            <Img src={item.product.imageCover} alt={item.product.title} className='w-24 h-24 object-contain' loader={<Skeleton className='w-24 h-24 bg-slate-500'/>}/>
            <div className='space-y-2'>
            <p className='font-semibold'>price :{item.price} L.E</p>
            <button className='text-red-400 cursor-pointer' onClick={ ()=>deleteProduct(item.product._id)} ><MdDelete className='inline-block text-2xl'/> Remove</button>
            </div>
        </div>


        <div className='flex items-center gap-2'>
            <span className='p-2 border border-blue-400 rounded flex items-center cursor-pointer' onClick={()=>{dispatch(handelUpdateCart({id:item.product._id,count:item.count+1}))
        }}><FaPlus /></span>
            <p>{item.count}</p>
            <span  className='p-2 border border-blue-400 rounded flex items-center cursor-pointer' onClick={()=>{dispatch(handelUpdateCart({id:item.product._id,count:item.count-1}))}}><FaMinus />
            </span>
        </div>
      
    </div>
  ))}
  <div onClick={()=>deletAllProduct()} className='bg-red-300 p-2 w-fit rounded uppercase cursor-pointer '>clear cart</div>
</div>

    </div>
  )
}
