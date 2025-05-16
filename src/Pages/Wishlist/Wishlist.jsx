import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import WishlistItems from './WishlistItems';
import EmptySec from './EmptySec';
import { GetUserWishlist } from '../../Redux/slices/wishlistSlice';
import LoadingAnimation from '../../Component/LoadingAnimation';
import UnUthSection from '../../Component/UnUthSection';

export default function Wishlist() {
  const { loading, wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(GetUserWishlist());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className='container'>
      {loading ? (
        <LoadingAnimation />
      ) : isAuthenticated ? (
        wishlist && wishlist.length > 0 ? (
          <WishlistItems />
        ) : (
          <EmptySec />
        )
      ) : (
        <UnUthSection />
      )}
    </div>
  );
}
