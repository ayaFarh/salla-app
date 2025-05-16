import React from 'react'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import ScrollToTop from '../ScrolTop'

export default function Layout() {
  return (
   <>
   <ScrollToTop/>
   <Navbar    categoryDrop={false} setCategoryDrop={false}/>  
  <div className='containerA py-20 min-h-screen'>
  <Outlet/>
  </div>
   <Footer/>
   </>
   
  )
}
