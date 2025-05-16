import React from 'react'
import animation from '../../public/cartAnimation.json'
import Lottie from 'lottie-react'
export default function LoadingAnimation() {
  return (
    <div className='flex justify-center items-center min-h-[500px]'>
        <div  style={{ width: 300, height: 200 }}> 
    <Lottie animationData={animation} loop={true} /> </div>
    </div>
  )
}
