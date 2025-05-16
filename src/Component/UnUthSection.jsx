import React from 'react'
import { Img } from 'react-image';
import { Link } from 'react-router-dom';

export default function UnUthSection() {
  return (
    <div className='space-y-2 flex flex-col items-center justify-center  w-full h-screen rounded bg-slate-100'>
        <div>
            <Img src="/2411819_emoji_man_sad_smiley_upset_icon.png" alt='' className='w-[100px] m-auto'/>
        </div>
      <h2 className='text-2xl font-bold'>You are not logged in</h2>
      <p className='text-xl'>Please login to your account first</p>
      <Link to={'/Auth/login'} className='bg-slate-200 px-3 py-2 rounded '>Login</Link>

    </div>
  )
}
