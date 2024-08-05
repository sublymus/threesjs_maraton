import { useDashRoute } from '../../../dashStore';
import './ProductList.css'
import { GenericList } from '../../../Component/GenericList/GenericList';
import { useProductStore } from '../ProductStore'
import { Host } from '../../../../Config';
import { FilterLevel } from '../../../Component/GenericList/ListSearchBar/Filter/FilterLevel/FilterLevel';
import { FilterCollector } from '../../../Component/GenericList/ListSearchBar/Filter/FilterCollector/FilterCollector';
import { FilterInterval } from '../../../Component/GenericList/ListSearchBar/Filter/FilterInterval/FilterInterval';
import { FilterSwitch } from '../../../Component/GenericList/ListSearchBar/Filter/FilterSwitch/FilterSwitch';
import { bindToParentScroll } from "../../../../Tools/BindToParentScroll";
import { StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
import { useEffect, useState } from 'react';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
import { SearchFilterBindJson } from '../../../../Tools/SearchFilterBindJson';
// import React from 'react'
export function ProductList() {
    const { current, setAbsPath, qs, json} = useDashRoute();
    const { store } = useRegisterStore()
    const { fetchProducts, products, setSelectedProduct } = useProductStore();
    const [filter, setFilter] = useState({
        sortBy: 'id',
        sortableColumns: ['id', 'title', 'stock', 'price', 'date', 'status'],
        limit: products?.limit,
        page: products?.page,
        total: products?.total,
        filter: {
            price: FilterInterval([0, 100000], [0, 10000]),
            stock: FilterInterval([0, 10000], [0, 10000]),
            status: FilterCollector(['PAUSE', 'TRASH', 'NEW'], []),
            index: FilterLevel([0, 100], 5),
            is_dynamic_price: FilterSwitch(),
            hasScene: FilterSwitch()
        }
    })
    const [s] =useState<any>({})
    s.json = json;
    s.filter = filter;

    useEffect(()=>{
        if(SearchFilterBindJson(s.filter,s.json)){
            console.log('diff', s.filter);
            setFilter({...s.filter})
            
        };
    },[json, store])
    useEffect(() => {
        current('products') && store && fetchProducts({...filter, filter:undefined})
    }, [store])

    return current('products') && (
        <div className="product-list" ref={bindToParentScroll}>
            <div className="list-ctn">
                <GenericList filter={filter}
                    items_height={80} id={'product_list'} datas={products?.list || []} itemsMapper={{
                        images: {
                            getView(label, value, e, setRef) {
                                return (
                                    GenericList.ImageElement().getView(label, `${Host}${value[0]}`, e, setRef)
                                )
                            }
                        },
                        id: {
                            getView(_, value: string, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        title: GenericList.StringElement({ size_interval: [50, 200] }),
                        status: StatusElement,
                        stock: GenericList.StringElement(),
                        category_id: {
                            getView(_, value, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        price: GenericList.StringElement({ size: 200 }),
                        created_at: GenericList.DateStringElement({ size: 200 }),
                    }}

                    onItemsSelected={(selectedItems, items) => {
                        items.forEach((item) => {
                            if (item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item) => {
                            if (item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedProduct(selectedItems[0] as any);
                        qs({product_id:selectedItems[0].id}).setAbsPath(['products', 'dash_product'])
                    }}
                    onQuery={(query) => {
                        fetchProducts(query)
                    }}
                    top_height={40}
                    canAddNew
                    canPaginate
                    onNewRequired={() => {
                        setAbsPath(['products', 'new_product'])
                    }}>

                </GenericList>
            </div>
        </div>
    )
}
