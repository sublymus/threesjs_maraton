import { useDashRoute } from '../../dashStore'
import './PageCatalog.css'
import { CatalogList } from './CatalogList/CatalogList'
import { CatalogDash } from './CatalogDash/CatalogDash'
// import { useState } from 'react'
import { ProductsListAccessor } from '../../Component/ProductsListAccessor/ProductsListAccessor'


export function PageCatalog() {

    const { check, setAbsPath, current } = useDashRoute();
    return check('catalogs') && (
        <div className='page-catalogs'>
            {
                (current('catalogs') || current('new_catalog')|| current('dash_catalogs'))  && <ProductsListAccessor active='categories' setActive={((a)=>setAbsPath(a.path as any))}/>
            }
            <CatalogDash/>
            <CatalogList />
        </div>)
}




