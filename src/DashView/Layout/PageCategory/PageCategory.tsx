import { useDashRoute } from '../../dashStore'
import './PageCategory.css'
import { CategoryList } from './CategoryList/CategoryList'
// import { useState } from 'react'
import { ProductsListAccessor } from '../../Component/ProductsListAccessor/ProductsListAccessor'
import { CategoryDash } from "./CategoryDash/CategoryDash";

export function PageCategory() {

    const { check, setAbsPath, current } = useDashRoute();
    return check('categories') && (
        <div className='page-categories'>
            {
                (current('categories') || current('new_category')|| current('dash_categories')) && <ProductsListAccessor active='CATEGORIES' setActive={((a)=>setAbsPath(a.path as any))}/>
            }
            <CategoryList />
            <CategoryDash/>
        </div>)
}


















