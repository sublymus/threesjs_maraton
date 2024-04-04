import { useDashRoute } from '../../dashStore'
import './PageProduct.css'
import { ProductList } from './ProductList/ProductList'
import { ProductDash } from './ProductDash/ProductDash'
import { ProductPreview } from './ProductPreview/ProductPreview'
import { ProductStat } from './ProductStat/ProductStat'
import { useState } from 'react'
// import React from 'react'

const topCard = [
    {
        label: "PRODUCTS",
        value: '23',
        url: '/src/res/package.png'
    },
    {
        label: "CATEGORIES",
        value: '15',
        url: '/src/res/application.png'
    },
    {
        label: "CATALOGS",
        value: '4',
        url: '/src/res/catalog.png'
    },
    {
        label: "FEATURES",
        value: '78',
        url: '/src/res/jigsaw.png'
    },
]

export function PageProduct() {

    const { check } = useDashRoute();
    const [active, setActive] = useState('PRODUCT')
    return check('product') && (
        <div className='page-product'>
            {
                check('top_product')&&<div className="top-product">
                    {topCard.map((c, i) => (
                        <div className={'top-card ' + (c.label == active ? 'active' : '')} key={i} onClick={() => [
                            setActive(c.label)
                        ]} >
                            <h1 className="label" >{c.label}</h1>
                            <h1 className="value">{c.value}</h1>
                            <h1 className="icon" style={{ backgroundImage: `url(${c.url})` }}></h1>
                        </div>
                    ))}
                </div>
            }
            <ProductDash />
            <ProductList />
            <ProductPreview />
            <ProductStat />

        </div>
    )
}


















