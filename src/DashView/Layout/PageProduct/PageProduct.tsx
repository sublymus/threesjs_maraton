import { useDashRoute } from '../../dashStore'
import './PageProduct.css'
import { ProductList } from './ProductList/ProductList'
import { ProductDash } from './ProductDash/ProductDash'
import { ProductPreview } from './ProductPreview/ProductPreview'
import { ProductStat } from './ProductStat/ProductStat'
// import { useState } from 'react'
import { ProductsListAccessor } from "../../Component/ProductsListAccessor/ProductsListAccessor";
// import React from 'react'

export function PageProduct() {

    const { check, setAbsPath, current } = useDashRoute();

    return (
        <>
            {
                check('products') && (
                    <div className='page-product'>
                        {
                           ( current('products')|| current('dash_product') || current('new_product')) && <ProductsListAccessor active='PRODUCTS' setActive={((a)=>setAbsPath(a.path as any))}/>
                        }
                        <ProductDash  />
                        <ProductList  />
                        <ProductPreview />
                        <ProductStat /> 
                    </div>)
            }
        </>

    )
}


















