import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function EmptySec() {
  return (
    <div className=' bg-slate-100 p-3 rounded'>
        <h2 className='text-xl font-bold'>Shopping wishlist <FaHeart className='inline-block'/></h2>
        <div className='flex flex-col space-y-4 items-center justify-center min-h-[300px]'>
           
            <h2 className='text-xl font-bold'>Your Wishlist is Empty</h2>
            <Link to='/' className='btn-primary uppercase'> add your first product </Link>
        </div>
        
        </div>
  )
}
