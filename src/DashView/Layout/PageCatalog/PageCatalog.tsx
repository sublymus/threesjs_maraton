import { useDashRoute } from '../../dashStore'
import './PageCatalog.css'
import { CatalogList } from './CatalogList/CatalogList'
// import { useState } from 'react'
import { ProductsListAccessor } from '../../Component/ProductsListAccessor/ProductsListAccessor'


export function PageCatalog() {

    const { check, setAbsPath, current } = useDashRoute();
    return check('catalogs') && (
        <div className='page-catalogs'>
            {
                current('catalogs') && <ProductsListAccessor active='CATALOGS' setActive={((a)=>setAbsPath(a.path as any))}/>
            }
            <CatalogList />
        </div>)
}




