import { useDashRoute } from '../../../dashStore';
import './ProductList.css'
import {GenericList} from '../../../Component/GenericList/GenericList'
// import React from 'react'

export function ProductList() {
    
    const {check } = useDashRoute();
    return check('list_product')&&(
        <div className="product-list">
             <div className="list-ctn">
             <GenericList id={'product_list'}/>
             </div>
        </div>
    )
}