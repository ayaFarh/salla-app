import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';

export default function HeroSection() {
  // نخلي كل صورة لها حالة تحميل منفصلة
  const [loadingImages, setLoadingImages] = useState({
    banar5: true,
    baner1: true,
    banar3: true,
  });

  // لما الصورة تحمل، نوقف عرض السكيليتون
  const handleImageLoad = (key) => {
    setLoadingImages(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div className='grid grid-cols-12 mb-3'>
      <div className='col-span-7 md:col-span-8 xl:col-span-8'>
        <Swiper
          style={{ height: '100%' }}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            {loadingImages.banar5 && <Skeleton height={400} />}
            <img
              className={`w-full h-full object-cover ${loadingImages.banar5 ? 'hidden' : 'block'}`}
              src="/banar5.webp"
              alt=''
              onLoad={() => handleImageLoad('banar5')}
            />
          </SwiperSlide>
          <SwiperSlide>
            {loadingImages.baner1 && <Skeleton height={200} />}
            <img
              className={`w-full h-full object-cover ${loadingImages.baner1 ? 'hidden' : 'block'}`}
              src="/BANER1.webp"
              alt=''
              onLoad={() => handleImageLoad('baner1')}
            />
          </SwiperSlide>
          <SwiperSlide>
            {loadingImages.banar3 && <Skeleton height={200} />}
            <img
              className={`w-full h-full object-cover ${loadingImages.banar3 ? 'hidden' : 'block'}`}
              src="/banar3.webp"
              alt=''
              onLoad={() => handleImageLoad('banar3')}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='col-span-5 md:col-span-4 xl:col-span-4 bg-red-300 h-full'>
        <div className='h-1/2'>
          <img className='w-full h-full object-cover' src="/banar6 (1).webp" alt='' />
        </div>
        <div className='h-1/2'>
          <img className='w-full h-full object-cover' src="/cofe.webp " alt='' />
        </div>
      </div>
    </div>
  );
}
