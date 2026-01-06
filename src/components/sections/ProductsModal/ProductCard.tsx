import React from 'react'

import { ProductCardProps } from './types'

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className='bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
    <div className='aspect-[4/3] overflow-hidden'>
      <img
        src={product.image}
        alt={product.name}
        className='w-full h-full object-cover'
        loading='lazy'
      />
    </div>
    <div className='p-4'>
      <h3 className='font-semibold text-gray-900 mb-1'>{product.name}</h3>
      <p className='text-sm text-gray-600 mb-2'>{product.description}</p>
      <span className='text-cta font-medium'>{product.price}</span>
    </div>
  </div>
)
