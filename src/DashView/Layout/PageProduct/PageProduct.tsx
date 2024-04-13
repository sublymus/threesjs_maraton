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
        url: '/src/res/package.png',
        path:['store','products']
    },
    {
        label: "CATEGORIES",
        value: '15',
        url: '/src/res/application.png',
        path:['store','categories']
    },
    {
        label: "CATALOGS",
        value: '4',
        url: '/src/res/catalog.png',
        path:['store','catalogs']
    },
    {
        label: "FEATURES",
        value: '78',
        url: '/src/res/jigsaw.png',
        path:['store','features']
    },
]

export function PageProduct() {

    const { check , setAbsPath , current } = useDashRoute();
    const [active, setActive] = useState('PRODUCTS')
    return (
        <>
            {
                check('store') && (
                    <div className='page-product'>
                        {
                            current('products') && <div className="top-product">
                                {topCard.map((c, i) => (
                                    <div className={'top-card ' + (c.label == active ? 'active' : '')} key={i} onClick={() => {
                                        setActive(c.label);
                                        setAbsPath(topCard[i].path as any);
                                    }} >
                                        <h1 className="label">{c.label}</h1>
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

                    </div>)
            }
        </>

    )
}


















