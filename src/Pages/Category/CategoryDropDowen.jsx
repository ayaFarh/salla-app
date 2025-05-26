import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcategory } from "../../Redux/slices/categorySlice";
import { handelSpacialSubcategoryToCat } from "../../Redux/slices/subcategorySlice";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";



export default function CategoryDropDowen({setCategoryDrop}) {
  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );
  const{DropDowensubcategoriesByCatId}=useSelector((state)=>state.subcategory)
  const dispatch = useDispatch();
  const categoryRef = useRef()

  
  
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDrop(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setCategoryDrop]);
  
  useEffect(() => {
    dispatch(getAllcategory());
  }, [dispatch]);
useEffect(() => {
  if (categories.data) {
    categories.data.forEach((cat) => {
      dispatch(handelSpacialSubcategoryToCat({ id: cat._id,isDropdown: true, limit: 3 }));
    });
  }
}, [dispatch,categories.data]);


if(error){
  return (
    <div className="text-center py-10 text-xl font-semibold text-gray-200">
      Network Error
    </div>
  );
}
  
  return (
    <>


    {loading ? (
  <div className="fixed bg-slate-50 shadow-2xl w-[90%] top-[70px] right-0 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 rounded z-[9999] p-4 gap-4" >
    {[...Array(10)].map((_, index) => (
      <ul key={index} className="space-y-2">
        {/* Skeleton for category title */}
        <li>
          <Skeleton className="h-4 w-3/4 rounded bg-gray-300" />
        </li>

        {/* Skeletons for subcategories */}
        {[...Array(3)].map((_, subIndex) => (
          <li key={subIndex}>
            <Skeleton className="h-2 w-2/3 rounded bg-gray-200" />
          </li>
        ))}
      </ul>
    ))}
  </div>
) : (
  <div
      ref={categoryRef}
      className="fixed bg-slate-50 shadow-2xl w-[90%] top-[70px] right-0 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 rounded z-[9999]"
    >
     {Array.isArray(categories.data) &&
  categories.data.map((category) => (
    <ul className="p-2" key={category._id} onClick={()=>setCategoryDrop(false)}>
      <Link
        to={`/category/${category.name}/${category._id}`}
        className="font-bold"
      >
        {category.name}
      </Link>

      {(DropDowensubcategoriesByCatId[category._id] || []).map((subcat) => (
        <li className="p-2 text-sm cursor-pointer" key={subcat._id}>
          {subcat.name}
        </li>
      ))}
    </ul>
  ))}
    </div>
)}
    </>
  );
}
