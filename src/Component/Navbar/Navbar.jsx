import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CiLogin, CiUser } from "react-icons/ci";
import {  IoCloseOutline } from "react-icons/io5";
import { FaBars, FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/slices/auth';
import Cookies from 'js-cookie';
import { handelGetUserCart } from '../../Redux/slices/cartSlice';
import CategoryDropDowen from '../../Pages/Category/CategoryDropDowen';
import { GetUserWishlist } from '../../Redux/slices/wishlistSlice';
import Loader from '../Loader';
import { getAllcategory } from '../../Redux/slices/categorySlice';
import Skeleton from 'react-loading-skeleton';


export default function Navbar() {
 const [isVisable , setIsVisable] = useState(false)
 const {isAuthenticated} = useSelector(state => state.auth)
 const {CountOfCart,loadingnnnnn:loadingCart} = useSelector(state => state.cart)
 const {wishlistCount,loading:wishlistLoading}=useSelector(state => state.wishlist)
const[categoryDrop,setCategoryDrop]=useState(false)
const[categoryPhone,setCategoryPhone]=useState(false)
const { loading: loadingCategory, categories} = useSelector(
    (state) => state.categories
  );

const menueRef =useRef()
const dispatch = useDispatch()
const toggleRef = useRef();

// useEffect(() => {
//   function handleClickOutside(event) {
//   if (
//     menueRef.current &&
//     !menueRef.current.contains(event.target) &&
//     toggleRef.current && 
//     !toggleRef.current.contains(event.target) &&
//     window.innerWidth < 768
//   ) {
//     setIsVisable(false);
//   }
// }

//   document.addEventListener('click', handleClickOutside); 

//   return () => {
//     document.removeEventListener('click', handleClickOutside);
//   };
// }, []);


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
    name:'Categories',
    path:'#'
  },
  {
    name:'Orders',
    path:'allOrders'
  }
 ]
  
 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsVisable(true);
    } else {
      setIsVisable(false);
    }
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

 const toggleVisable = () => {
  setIsVisable(!isVisable)
 }

 useEffect(() => {
  const mediaQuery = window.matchMedia('(min-width: 768px)');

  const handleMediaChange = (e) => {
    if (e.matches) {
      setCategoryPhone(false);
    }
  };

  mediaQuery.addEventListener('change', handleMediaChange);

  return () => {
    mediaQuery.removeEventListener('change', handleMediaChange);
  };
}, []);

useEffect(() => {
  dispatch(handelGetUserCart())
  dispatch(GetUserWishlist())
  dispatch(getAllcategory())
}, [dispatch])

 const handelCloseMenu =()=>{
  if(window.innerWidth < 768 ){
    setIsVisable(false)
  }
 }

 

  return<>

<nav className='bg-slate-100 fixed z-50 right-0 left-0'>
<div className='block  md:flex md:gap-2 xl-flex 2xl:flex justify-between items-center py-4 containerA'>
<div className='flex items-center justify-between '>
<div className=' mr-2 xl:mr-8  text-2xl font-bold relative' >
    <Link to='/'  className='flex items-center gap-1'>
        <img src="/cart.png" alt="" className='w-10 h-10' />  
        <h1>Salla style</h1>
    </Link>
  </div>
 <button
  ref={toggleRef}
  className="text-2xl md:hidden cursor-pointer"
  onClick={toggleVisable}
>
  {isVisable ? <IoCloseOutline className="text-3xl" /> : <FaBars  />}
</button>
  
</div>

  <div
  ref={menueRef}
  className={`
    ${isVisable ? 'flex' : 'hidden'} 
    flex-col md:flex-row 
    fixed md:relative 
    md:top-0 md:left-0 md:right-0  
    right-0 top-[70px] 
    w-full md:w-auto 
    bg-slate-100  
    px-6 py-4 
    md:py-0 
    z-40
  `}
>
  <div className='flex md:flex-row  flex-col justify-between items-start gap-6' >
<ul 
 
className='block md:flex gap-4 space-y-4 md:space-y-0 '>
   
   {navDetails.map((nav) => (
  <li key={nav.name}
  onClick={()=>{
    if(nav.name !== "Categories"){
      handelCloseMenu()
    }
  }}
  >
    {nav.name === "Categories" ? (
      <div
        onClick={(e) => {
          e.preventDefault();
          if(window.innerWidth > 767){
            setCategoryDrop(prev => !prev);
          }else if(window.innerWidth < 767){
            setCategoryPhone(prev => !prev)
          }
        }}
        className={`${
          categoryDrop ? 'font-bold ' : ''
        } cursor-pointer `}
      >
        <div className='space-y-3'>
         <span> {nav.name}</span>
        <div >{categoryPhone && <ul className='font-semibold space-y-2' onClick={()=>{handelCloseMenu()}}>
         {loadingCategory ? <Skeleton height={200} className='w-full' /> :categories.data && categories.data.map((cat) => (
           <li key={cat._id} className='flex items-start '>
             <Link to={`/category/${cat.name}/${cat._id}`}>{cat.name}</Link>
           </li>
         ))}
          </ul>}</div>
        </div>
      </div>
    ) : (
      <NavLink
        className={({ isActive }) =>
          `${isActive ?   'font-bold' : ''}`
        }
        to={nav.path}
        onClick={()=>{setCategoryDrop(false)}}
      >
        {nav.name}
      </NavLink>
    )}
  </li>
))}
    
</ul>
<div className='flex justify-start items-center  gap-4 ' onClick={()=>{
  handelCloseMenu()  
 setCategoryDrop(false)
  }}>
  <Link to="cart" className='text-2xl relative ' >
<AiOutlineShoppingCart />
    <span className='bg-gray-400 text-white absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs translate-x-1/2 -translate-y-1/2 font-bold '>
  {isAuthenticated ? (loadingCart ? <Loader/> : CountOfCart) : 0}
    </span>
</Link>
<Link to="wishlist" className='text-xl relative '>
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
</div>
  </div> 

</div>
</nav>
  {categoryDrop && <CategoryDropDowen categoryDrop={categoryDrop} setCategoryDrop={setCategoryDrop}/>}
  
  </>
}
