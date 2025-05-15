import React, { useEffect } from 'react'
import { getAllBrands } from '../../Redux/slices/brandSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Skeleton from 'react-loading-skeleton';
import { Img } from 'react-image';


export default function Brand() {
  const dispatch = useDispatch();
  const { loading, brands, error } = useSelector(state => state.brands);
 console.log(brands);
 
   
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]); 

  if (error) {
    return (
      <div className="text-center py-10 text-xl font-semibold text-red-500">
        Network Error
      </div>
    );
  }

  return (
    <div className=''>
      <h2 className='my-2 text-xl font-bold'>Shop popular Brand</h2>
      {loading ?(<div className="">
       <Skeleton height={200}  className='w-full'/>
      </div>):(<Swiper
        style={{ height: '100%' }}
        loop={true}
        slidesPerView={4}
        spaceBetween={5}
        className='cursor-pointer'
        breakpoints={{
          0: {
            slidesPerView: 2, 
          },
          640: {
            slidesPerView: 2, 
          },
          768: {
            slidesPerView: 3, 
          },
          1024: {
            slidesPerView: 4, 
          },
        }}
      >
        {brands.data && brands.data.length > 0 ? (
          brands.data.map((brand) => (
            <SwiperSlide key={brand.id} className='rounded overflow-hidden shadow border border-gray-400 '>
              <Img className='w-full h-full object-cover ' src={brand.image} alt={brand.name} loader={<Skeleton height={200} />}/>
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">No brands found</div>
        )}
      </Swiper>)}
    </div>
  );
}
