import React from 'react'
import Products from '../Products/Products'
import HeroSection from './HeroSection'
import Brand from '../Brands/Brand'
import CategorySlider from '../Category/CategorySlider'


export default function Home() {
  
  return (
    <section className='space-y-6'>
      <HeroSection/>
   <CategorySlider/>
      <Brand/>
   <Products/>
    </section>
  )
}
