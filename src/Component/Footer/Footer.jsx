import React from 'react'


export default function Footer() {
  return <>
<footer className='bg-slate-100 py-4'>
 <div className='container'>
 <h2 className='my-2 text-xl font-bold'>Get Salla style App </h2>
  <p className='my-2'>We will Sent you link open it in your phone to download the App</p>
  <div className='grid grid-cols-12 gap-2'>
    <div className='col-span-12 sm:col-span-8  md:col-span-8 lg:col-span-9 xl:col-span-10'>
    <input className='input-primary flex-grow w-full h-full ' type='email' name='email' placeholder='Email ..'></input>
    </div>
   <div className='col-span-12 sm:col-span-4  md:col-span-4 lg:col-span-3 xl:col-span-2'>
   <button className='uppercase btn-primary w-50'>share app link</button>
   </div>
  </div>

<div className='flex flex-col xl:flex-row  mt-5 justify-between items-center border-gray-200 border-y-2 py-4 mb-10 '>
<div className='flex gap-3 flex-wrap  flex-col md:flex-row justify-center items-center '>
  <p className='text-xl text-nowrap'>Payment partner</p>
<div className='flex gap-2 p-4 '>
<img src="/paypal.png" alt='' className='w-16 object-containr'></img>
<img src="/mastercard.webp" alt='' className='w-16 object-contain'></img>
<img src="/amazon-pay.png" alt='' className='w-16 object-contain'></img>
<img src="/American-Express-Color.png"alt='' className='w-16 object-contain'></img>
</div>
</div>
<div className='flex flex-col md:flex-row  justify-center items-center'>
  <p className='px-3 text-nowrap'>Get deliveries With salla style </p>
  <div className='flex gap-2 p-4 '>
  <img src="/get-apple-store.png" alt='' className='w-20'></img>
  <img src="/get-google-play.png" alt='' className='w-20'></img>
  </div>
</div>
</div>
 </div>
</footer>


  </>
}
