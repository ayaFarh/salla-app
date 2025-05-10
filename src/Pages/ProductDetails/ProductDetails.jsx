import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { LiaStarSolid } from 'react-icons/lia';
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useLocation } from 'react-router-dom';

export default function ProductDetails() {
    const { state } = useLocation();
    const product = state.product;
    console.log(product);

    
  

    const imageitems = product?.images.map((imageurl) => ({
        original: imageurl,
        thumbnail: imageurl,
        originalClass: 'custom-image',
        
    }));

    return (
        <div className='container'>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 md:col-span-5 xl:col-span-4 2xl:col-span-4'>
                    <ReactImageGallery
                        items={imageitems}
                        showFullscreenButton={false}
                        showNav={false}
                        showPlayButton={false}
                        showThumbnails={true}
                        lazyLoad={true}
                    />
                </div>
                <div className='flex flex-col items-start justify-center space-y-1 col-span-12 md:col-span-6 xl:col-span-8 2xl:col-span-8'>
                    <h1 className='font-semibold text-2xl'>{product.title}</h1>
                    <h2 className='text-gray-400 font-bold'>{product.category.name}</h2>
                   
                    <p>{product.description}</p>
                    <div className='flex justify-between gap-6 items-center mt-2'>
                        <span>{product.price} L.E</span>
                        <p className='flex items-center gap-1'>
                            <LiaStarSolid className='text-amber-400' />
                            <span>{product.ratingsAverage}</span>
                        </p>
                    </div>
                    <div className='btn-primary w-full mt-3 p-1 flex items-center justify-center gap-1 text-white'>
                        <AiOutlineShoppingCart className="inline-block" />
                        <span>Add To Cart</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
