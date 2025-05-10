
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CiLogin, CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaBars, FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/slices/auth';
import Cookies from 'js-cookie';
import { handelGetUserCart } from '../../Redux/slices/cartSlice';


export default function Navbar() {
 const [isVisable , setIsVisable] = useState(true)
 const {isAuthenticated} = useSelector(state => state.auth)
 const {CountOfCart} = useSelector(state => state.cart)
 const dispatch = useDispatch()

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
    name:'Categorys',
    path:'categorys'
  },
  {
    name:'Orders',
    path:'allOrders'
  }
 ]
 

 const toggleVisable = () => {
  setIsVisable(!isVisable)
 }

 useEffect(()=>{
  dispatch(handelGetUserCart())

 },[dispatch])

  return<>

<nav className='bg-slate-100 fixed z-50 right-0 left-0 '>
<div className='block  md:flex md:gap-2 xl-flex 2xl:flex justify-between items-center py-4 container'>
<div className='flex items-center justify-between '>
<div className=' mr-2 xl:mr-8  text-2xl font-bold relative' >
    <Link to='/'  className='flex items-center gap-1'>
        <img src="/cart.png" alt="" className='w-10 h-10' />  
        <h1>Salla style</h1>
    </Link>
  </div>
  <FaBars className='text-2xl md:hidden cursor-pointer' onClick={toggleVisable} />
</div>

  <div className={`${isVisable ? 'block' : 'hidden'} flex  flex-col md:flex-row  fixed md:relative md:top-0 md:left-0 md:right-0  right-0 top-[70px] bottom-0 px-6  bg-slate-100  justify-between items-center  `}>
  <div className='flex md:flex-row  flex-col justify-between items-start gap-6' >
<ul className='block md:flex gap-4 space-y-4 md:space-y-0 '>
   
   {navDetails.map((nav) => (
    <li className=''>
        <NavLink className={({isActive})=>{
          return `
          ${isActive ? 'font-bold' :""}`
        }} to={nav.path} >{nav.name}</NavLink>
    </li>
   ))}
    
</ul>
<div className='flex justify-start items-center  gap-4 '>
  <Link to="cart" className='text-2xl relative ' >
<AiOutlineShoppingCart />
    <span className='bg-gray-400 text-white absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs translate-x-1/2 -translate-y-1/2 font-bold '>
  {Cookies.get("cartCount") || 0}
    </span>
</Link>
<Link to="wishlist" className='text-xl relative '  >
<FaRegHeart />
<span className='bg-gray-400 text-white absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs translate-x-1/2 -translate-y-1/2 font-bold '>
    {Cookies.get("wishlistCount") || 0}
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

  
  </>
}
