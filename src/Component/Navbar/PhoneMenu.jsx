import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useEffect} from 'react'
import { CiLogin, CiUser } from "react-icons/ci";
import {  IoCloseOutline } from "react-icons/io5";
import { FaBars, FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch} from 'react-redux';
import { logout } from '../../Redux/slices/auth';
import Cookies from 'js-cookie';
import { handelGetUserCart } from '../../Redux/slices/cartSlice';
import CategoryDropDowen from '../../Pages/Category/CategoryDropDowen';
import { GetUserWishlist } from '../../Redux/slices/wishlistSlice';
import Loader from '../Loader';
import { getAllcategory } from '../../Redux/slices/categorySlice';
import Skeleton from 'react-loading-skeleton';
import { IoIosArrowDown } from "react-icons/io";


export default function PhoneMenu({IsScreenSmall,setIsScreenSmall}) {
     const {isAuthenticated} = useSelector(state => state.auth)
 const {CountOfCart,loadingnnnnn:loadingCart} = useSelector(state => state.cart)
 const {wishlistCount,loading:wishlistLoading}=useSelector(state => state.wishlist)
const {loading,categoryDropPhone} = useSelector((state) => state.categories);
const [showCategory, setShowCategory] = useState(false);
console.log(categoryDropPhone);

 const dispatch = useDispatch()
 const phoneRef=useRef()
 useEffect(() => {
  dispatch(handelGetUserCart())
  dispatch(GetUserWishlist())
  dispatch(getAllcategory())
}, [dispatch])
    const navDetails = [
  {
    name:'Home',
    path:'/'
  },
  {
    name:'Products',
    path:'products'
  },
  {
    name:'Category',
    path:'#'
  },
  {
    name:'Orders',
    path:'allOrders'
  }]
  
  const handelShowCat=()=>{
    setShowCategory(!showCategory)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phoneRef.current && !phoneRef.current.contains(event.target)) {
        setIsScreenSmall(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsScreenSmall]);
  return (
  <div
  ref={phoneRef}
  className={`fixed top-[56px] bottom-0 z-50 w-[60%] max-[768px]:w-[40%] max-[540px]:w-[60%] bg-slate-100 p-3 transition-all duration-300 ease-in-out ${
    IsScreenSmall ? 'right-0' : '-right-full'
  }`}
>
       
       <div className='flex flex-col justify-start items-start  h-full containerA'>
         
         <ul className='flex flex-col items-start justify-start gap-4  h-full ' >
            {navDetails.map((nav , index) =>(
            <>
           <li key={index}>
  {nav.name === "Category" ? (
    <div
      className='cursor-pointer  text-2xl flex flex-col items-start gap-1'
      onClick={handelShowCat}
    >
     <div> {nav.name}<IoIosArrowDown className={`text-2xl transition-transform inline-block ${showCategory ? 'rotate-180' : ''}`} /> </div>
       {nav.name === "Category" && showCategory && <div>
                <ul className='flex  flex-col'>
                    {loading ? <Skeleton height={10} width={150} count={5} className='bg-gray-600 '/> : categoryDropPhone.data.map((cat , index) =>(
                        <li key={index}>
                            <NavLink to={`/category/${cat.name}/${cat._id}`} className='cursor-pointer text-2xl text-gray-500' onClick={()=>setIsScreenSmall(false)}>{cat.name}</NavLink>
                        </li>
                    ))
                    
                    }
                </ul>
                
                </div>}
    </div>
  ) : (
    <Link
      to={nav.path}
      className='cursor-pointer text-2xl'
      onClick={() => setIsScreenSmall(false)}
    >
      {nav.name}
    </Link>
  )}
</li>
           
            </>
        ))}

        {/* icons */}
            <div className='flex justify-center items-center  gap-4 '>
              <Link to="cart" className='text-2xl relative ' onClick={()=>setIsScreenSmall(false)}>
            <AiOutlineShoppingCart />
                <span className='bg-gray-400 text-white absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs translate-x-1/2 -translate-y-1/2 font-bold '>
              {isAuthenticated ? (loadingCart ? <Loader/> : CountOfCart) : 0}
                </span>
            </Link>
            <Link to="wishlist" className='text-xl relative ' onClick={()=>setIsScreenSmall(false)}>
            <FaRegHeart />
            <span className='bg-gray-400 text-white absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs translate-x-1/2 -translate-y-1/2 font-bold '>
                {isAuthenticated ? (wishlistLoading ? <Loader/> : wishlistCount) : 0 }
                </span>
            </Link>
            {isAuthenticated ? (
            <button className='text-2xl cursor-pointer' onClick={()=>dispatch(logout())}>
            <CiLogin  />
            </button>
            ) : (
              <Link to ="/Auth/login" className='text-2xl'  >
            <CiUser />
            </Link>
            )}
            </div>
       
        </ul>
       </div>
        

     

    </div>
  )
}
