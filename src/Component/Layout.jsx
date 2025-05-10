import React from 'react'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

export default function Layout() {
  return (
   <>
   <Navbar/>
  <div className='py-20 min-h-screen'>
  <Outlet/>
  </div>
   <Footer/>
   </>
   
  )
}
