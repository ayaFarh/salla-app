import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CiLogin, CiUser } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { FaBars, FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/slices/auth';
import { GetUserWishlist } from '../../Redux/slices/wishlistSlice';
import Loader from '../Loader';
import CategoryDropDowen from '../../Pages/Category/CategoryDropDowen';
import PhoneMenu from './PhoneMenu';

export default function Navbar() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { CountOfCart, loadingnnnnn: loadingCart } = useSelector(state => state.cart);
  const { wishlistCount, loading: wishlistLoading } = useSelector(state => state.wishlist);

  const [categoryDrop, setCategoryDrop] = useState(false);
  const [IsScreenSmall, setIsScreenSmall] = useState(false);

  const dispatch = useDispatch();

  const navDetails = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: 'products' },
    { name: 'Category', path: '#' },
    { name: 'Orders', path: 'allOrders' }
  ];

   useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768 && IsScreenSmall) {
      setIsScreenSmall(false);
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [IsScreenSmall]);

  const toggleVisible = () => setIsScreenSmall(prev => !prev);

  return (
    <>
      <nav className='bg-slate-100 fixed z-50 right-0 left-0 top-0'>
        <div className='block md:flex justify-between items-center py-2 containerA'>
          <div className='flex items-center justify-between'>
            <div className='text-2xl font-bold'>
              <Link to='/' className='flex items-center gap-1'>
                <img src="/cart.png" alt="logo" className='w-10 h-10' />
                <h1>Salla style</h1>
              </Link>
            </div>
            <button
              className={`md:hidden transition-all duration-300 ${IsScreenSmall ? 'rotate-180' : ''}`}
              onClick={toggleVisible}
            >
              {IsScreenSmall ? <IoCloseOutline className='text-3xl' /> : <FaBars className='text-2xl' />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex px-6 py-4 z-40'>
            <div className='flex justify-between items-start gap-6'>
              <ul className='flex gap-4'>
                {navDetails.map(nav => (
                  <li key={nav.name}>
                    {nav.name === "Category" ? (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (window.innerWidth > 767) {
                            setCategoryDrop(prev => !prev);
                          }
                        }}
                        className={`${categoryDrop ? 'font-bold' : ''} cursor-pointer`}
                      >
                        <span>{nav.name}</span>
                      </div>
                    ) : (
                      <NavLink
                        to={nav.path}
                        onClick={() => setCategoryDrop(false)}
                        className={({ isActive }) => `${isActive ? 'font-bold' : ''}`}
                      >
                        {nav.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>

              <div className='flex items-center gap-4' onClick={() => setCategoryDrop(false)}>
                <Link to="cart" className='text-2xl relative'>
                  <AiOutlineShoppingCart />
                  <span className='bg-gray-400 text-white absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs translate-x-1/2 -translate-y-1/2 font-bold'>
                    {isAuthenticated ? (loadingCart ? <Loader /> : CountOfCart) : 0}
                  </span>
                </Link>
                <Link to="wishlist" className='text-xl relative'>
                  <FaRegHeart />
                  <span className='bg-gray-400 text-white absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs translate-x-1/2 -translate-y-1/2 font-bold'>
                    {isAuthenticated ? (wishlistLoading ? <Loader /> : wishlistCount) : 0}
                  </span>
                </Link>
                {isAuthenticated ? (
                  <button className='text-2xl cursor-pointer' onClick={() => dispatch(logout())}>
                    <CiLogin />
                  </button>
                ) : (
                  <Link to="/Auth/login" className='text-2xl'>
                    <CiUser />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Phone Menu - Always Rendered */}
      <PhoneMenu IsScreenSmall={IsScreenSmall} setIsScreenSmall={setIsScreenSmall} />

      {/* Category Dropdown */}
      {categoryDrop && <CategoryDropDowen categoryDrop={categoryDrop} setCategoryDrop={setCategoryDrop} />}
    </>
  );
}
