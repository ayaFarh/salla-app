import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function ProductSkelton() {
  return (
    <div className="p-4 ">
    <div>
    <Skeleton height={300}  className='w-full'/>
    <Skeleton count={1} />
  <div className='flex items-center justify-between'>
  <Skeleton count={1} width={50}/>
  <Skeleton count={1} width={50}/>
  </div>
    </div>
  </div>
  )
}
