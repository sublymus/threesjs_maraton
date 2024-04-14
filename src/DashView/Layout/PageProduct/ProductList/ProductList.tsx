import { useDashRoute } from '../../../dashStore';
import './ProductList.css'
import { GenericList } from '../../../Component/GenericList/GenericList';
import {useProductStore} from '../ProductStore'
import { Host } from '../../../../Config';
// import React from 'react'
export function ProductList() {
    const { current , setAbsPath} = useDashRoute();
    const {fetchProducts , products, setSelectedProduct} = useProductStore();
    
    return current('products') && (
        <div className="product-list">
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'title', 'stock', 'price', 'date', 'status'],
                    limit: 25,
                    page: 1,
                    total: 200,
                    filter:[
                        {
                            name:'Price',
                            type:'interval',
                            values:[[0,20000],[0,20000]],
                            icon:''
                        },
                        {
                            name:'stock',
                            type:'interval',
                            values:[[0,20000],[0,20000]],
                            icon:''
                        },
                        {
                            name:'Catalogs',
                            type:'collector',
                            values:[['Jewelry','Watch','Accessory'],[]],
                            icon:''
                        },
                        {
                            name:'Categories',
                            type:'collector',
                            values:[['Ring','Necklace','Chain','earring'],[]],
                            icon:''
                        },
                        {
                            name:'Features',
                            type:'listCollector',
                            values:[['Ring','Necklace','Chain','earring'],[]],
                            icon:''
                        },
                    ]
                }}
                    items_height={80} id={'product_list'} datas={products||[]} itemsMapper={{
                        images: {
                            getView(label, value, e, setRef) {
                                return (
                                    GenericList.ImageElement().getView(label , `${Host}${value[0]}` , e , setRef)
                                )
                            }
                        },
                        id: {
                            getView(_, value:string, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        title: GenericList.StringElement({ size_interval: [50, 200] }),
                        status: GenericList.StringElement({size:150}),
                        stock: GenericList.StringElement(),
                        category_id: {
                            getView(_, value, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        price: GenericList.StringElement({size:200}),
                        created_at: GenericList.DateStringElement({size:200}),
                    }}
                    
                    onItemsSelected={(selectedItems , items)=>{
                        items.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedProduct(selectedItems[0] as any);
                        setAbsPath(['store','products','dash_product'])
                    }}
                    onQuery={(query)=>{
                        fetchProducts(query)
                        
                    }}     
                    top_height={40}>

                </GenericList>
            </div>
        </div>
    )
}
