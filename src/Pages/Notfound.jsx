import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <div className='flex justify-center items-center h-screen'>
       <div className='flex flex-col items-center justify-center gap-2'>
       <img src='/error-page.png' alt="not found"  className='w-1/2 m-auto'/>
       <p className='text-2xl text-center'>Page Not Found</p>
       <Link to='/' className='btn-primary w-1/2 text-center'>Go Home</Link>
       </div>
    </div>
  )
}
