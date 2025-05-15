import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCart from '../../Component/ProductCart';
import ProductSkelton from '../../Component/ProductSkelton';
import { getAllProducts } from '../../Redux/slices/productSlice';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

export default function Products() {
    const {loading, products ,error } = useSelector(state => state.product);
    const [searchTerm, setSearchTerm] = useState('');
   const dispatch =useDispatch()
   console.log(products);
    
   useEffect(()=>{
    dispatch(getAllProducts({page:2}));
   },[dispatch])
   
   const handleNextPage = () => {
    const nextPage = products.metadata?.nextPage;
    if (nextPage) {
      dispatch(getAllProducts({ page: nextPage }));
    }
  };
  
  const handlePrevPage = () => {
    const prevPage = products.metadata?.prevPage;
    if (prevPage) {
      dispatch(getAllProducts({ page: prevPage }));
    }
  };

  const handleSearch = () => {
    dispatch(getAllProducts({ page: 1,keyword: searchTerm }));
  };
  
  return (
    <div className='space-y-4'>
    
    <div className=' flex  flex-col md:flex-row justify-between gap-2'>
      <h2 className='text-2xl font-bold'>Our products</h2>
    <div className='flex gap-2 flex-col md:flex-row justify-between items-center relative w-full md:w-1/2'>
     <input className='input-primary flex-grow w-full h-full ' type='text' name='text' placeholder='Search by product name' value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>
     <button className='bg-slate-400 text-white py-2 px-4  absolute top-0 right-0' onClick={handleSearch}>Search</button>
    </div>
    </div>
    <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
   {error? (
          <div className="col-span-full  min-h-screen flex items-center justify-center text-center text-gray-500 text-xl font-semibold">
               Network error
          </div>)
   :loading ?Array.from({ length: 12}).map((_, i) => <ProductSkelton key={i} />) :
   ((products.data && products.data.length > 0) && products.data.map((prod) => (
    <ProductCart 
        product={prod}
       />
      ))
   )}
      <div className='col-span-full border border-gray-200 border-l-0 border-r-0 space-x-2 flex items-center justify-end py-2'>
        <span  onClick={handlePrevPage} className='text-2xl cursor-pointer'><IoIosArrowBack /></span>
        <p>page {products.metadata?.currentPage || 0} from {products.metadata?.numberOfPages || 0} </p>
        <span onClick={handleNextPage} className='text-2xl cursor-pointer'><IoIosArrowForward/> </span>
      </div>
    </div>
    </div>
  )
}