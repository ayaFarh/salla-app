import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Img } from 'react-image';
import Loader from '../../Component/Loader';
import LoadingAnimation from '../../Component/LoadingAnimation';

export default function HeroSection() {
  return (
    <div className='grid grid-cols-12 mb-3'>
      {/* */}
      <div className='col-span-7 md:col-span-8 xl:col-span-8'>
        <Swiper
          style={{ height: '100%' }}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <Img className='w-full h-full object-cover' src="/banar5.jpg" alt='' loader={<LoadingAnimation/>} />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-full h-full object-cover' src="/front-view-woman-posing-with-monochrome-outfit.jpg" alt='' />
          </SwiperSlide>
          <SwiperSlide> 
            <Img className='w-full h-full object-cover' src="/ketchen (2).jpg" alt=''  loader={<LoadingAnimation />}/>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* */}
      <div className='col-span-5 md:col-span-4 xl:col-span-4 bg-red-300 h-full'>
        
        <div className='h-1/2'>
          <img className='w-full h-full object-cover' src="/banar6.jpg" alt='' />
        </div>
        <div className='h-1/2'>
          <img className='w-full h-full object-cover' src="/cofe.jpg " alt=''/>
        </div>
      </div>
    </div>
  );
}
