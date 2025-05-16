import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItems from './Component/CartItems';
import ImptySec from './Component/ImptySec';
import ShippingAdrees from '../ShappingAdrees/ShippingAdrees';
import { handelGetUserCart } from '../../Redux/slices/cartSlice';
import LoadingAnimation from '../../Component/LoadingAnimation';
import UnUthSection from '../../Component/UnUthSection';

export default function Cart() {
  const { loading, cart } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handelGetUserCart());
  }, [dispatch]);

  const hasProducts = cart?.data?.products?.length > 0;

  return (
    <div className="container space-y-4">
      <div className="bg-slate-100 py-4 rounded space-y-4">
        {loading ? (
          <LoadingAnimation />
        ) : !isAuthenticated ? (
          <UnUthSection />
        ) : hasProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CartItems />
            <ShippingAdrees />
          </div>
        ) : (
          <ImptySec />
        )}
      </div>
    </div>
  );
}

