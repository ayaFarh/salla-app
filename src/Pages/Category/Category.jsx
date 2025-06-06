import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getspacialCategory } from '../../Redux/slices/categorySlice';
import { handelSpacialSubcategoryToCat } from '../../Redux/slices/subcategorySlice';
import LoadingAnimation from '../../Component/LoadingAnimation';

export default function Category() {
  const { catId, catName } = useParams();
  const dispatch = useDispatch();
  const { subcategoriesByCatId, loading } = useSelector((state) => state.subcategory);
  const subcategories = subcategoriesByCatId[catId] || [];
  
  useEffect(() => {
    dispatch(getspacialCategory({id: catId}));
    dispatch(handelSpacialSubcategoryToCat({ id: catId }));
  }, [dispatch, catId]);

  

  return (
    <div className='space-2-2'>
      <h2 className='my-2 text-2xl font-bold'>{catName}</h2>

      {/* Subcategories */}
     <div className=''>
  {loading || !Object.prototype.hasOwnProperty.call(subcategoriesByCatId, catId) ? (
    <LoadingAnimation />
  ) : subcategories.length > 0 ? (
    <div className='space-y-4'>
      <ul className='flex flex-wrap gap-2'>
        <li className='text-black px-2 py-1 border border-black cursor-pointer'>All</li>
        {subcategories.map((sub) => (
          <li
            className='text-black px-2 py-1 border border-black cursor-pointer'
            key={sub._id}
          >
            {sub.name}
          </li>
        ))}
      </ul>
      <p>oops there is no products yet</p>
    </div>
  ) : (
    <p className="text-gray-500">No subcategories found.</p>
  )}
</div>


    </div>
  );
}
