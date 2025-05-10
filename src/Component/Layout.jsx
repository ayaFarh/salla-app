import React from 'react'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import ScrollToTop from '../ScrolTop'

export default function Layout() {
  return (
   <>
   <ScrollToTop/>
   <Navbar/>
  <div className='py-20 min-h-screen'>
  <Outlet/>
  </div>
   <Footer/>
   </>
   
  )
}
