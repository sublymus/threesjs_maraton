import './PageFeature.css'
import { useDashRoute } from '../../dashStore'
import { FeaturesList } from './FeaturesList/FeaturesList'
import { FeaturesDash } from './FeaturesDash/FeaturesDash'
// import { useState } from 'react'
import { ProductsListAccessor } from '../../Component/ProductsListAccessor/ProductsListAccessor'


export function PageFeature() {

    const { check, setAbsPath, current } = useDashRoute();
    return check('features') && (
        <div className='page-features'>
            {
                current('features') && <ProductsListAccessor active='FEATURES' setActive={((a)=>setAbsPath(a.path as any))}/>
            }
            <FeaturesList />
            <FeaturesDash/>
        </div>)
}
