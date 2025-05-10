import React from 'react'
import Products from '../Products/Products'
import HeroSection from './HeroSection'
import Brand from '../Brands/Brand'
import Category from '../Category/Category'

export default function Home() {
  
  return (
    <section className='container space-y-6'>
      <HeroSection/>
      <Category/>
      <Brand/>
   <Products/>
    </section>
  )
}
