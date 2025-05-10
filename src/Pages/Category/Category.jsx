import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Skeleton from 'react-loading-skeleton';
import { Img } from 'react-image';
import { getAllcategory } from '../../Redux/slices/categorySlice';


export default function Category() {
    const dispatch = useDispatch();
    const { loading, categories, error } = useSelector(state => state.categories);
    console.log(categories);
    
  
    useEffect(() => {
      dispatch(getAllcategory());
    }, [dispatch]); 
  
    if (error) {
      return (
        <div className="text-center py-10 text-xl font-semibold text-red-500">
          Network Error
        </div>
      );
    }
    return (
        <div className='container'>
          <h2 className='my-2 text-xl font-bold'>Shop popular category</h2>
          {loading ?(<div className="">
           <Skeleton height={200}  className='w-full'/>
          </div>):(<Swiper
            style={{ height: '100%' }}
            loop={true}
            slidesPerView={4}
            spaceBetween={2}
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
            {categories.data && categories.data.length > 0 ? (
              categories.data.map((cat) => (
                <SwiperSlide key={cat.id} className='overflow-hidden shadow '>
                  <Img className='w-full h-80 object-cover' src={cat.image} alt={cat.name} loader={<Skeleton height={200} />}/>
                  <h2 className='font-semibold'>{cat.name}</h2>
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">No brands found</div>
            )}
          </Swiper>)}
        </div>
      );
}
