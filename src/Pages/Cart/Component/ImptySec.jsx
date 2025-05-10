import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function ImptySec() {
  return (
    <div className='container'>
    
    
   
    <h2 className='text-xl font-bold'>Shopping cart <FaShoppingCart className='inline-block'/></h2>
    <div className='flex flex-col space-y-4 items-center justify-center min-h-[300px]'>
       

        <h2 className='text-xl font-bold'>Your Cart is Empty</h2>
        <Link to='/' className='btn-primary uppercase'> add your first product </Link>
    </div>
    
    </div>
  )
}
