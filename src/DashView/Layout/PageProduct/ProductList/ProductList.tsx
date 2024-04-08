import { useDashRoute } from '../../../dashStore';
import './ProductList.css'
import { GenericList } from '../../../Component/GenericList/GenericList'
import { DataBase } from '../../../../DataBase';
// import React from 'react'
export function ProductList() {
    const { check } = useDashRoute();
    return check('list_product') && (
        <div className="product-list">
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'title', 'stock', 'price', 'date', 'status'],
                    limit: 25,
                    page: 5,
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
                    items_height={80} id={'product_list'} datas={DataBase.rings_Products} itemsMapper={{
                        images: GenericList.ImageElement({ schadow: '#345', size: 80 }),
                        id: GenericList.StringElement({ resizable: false }),
                        title: GenericList.StringElement({ size_interval: [50, 200] }),
                        status: GenericList.StringElement(),
                        stock: GenericList.StringElement(),
                        category_id: GenericList.StringElement(),
                        price: GenericList.StringElement(),
                        features: GenericList.StringElement(),
                        created_at: GenericList.StringElement(),
                    }}
                    
                    onItemsSelected={(selectedItems , items)=>{
                        items.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = 'initial'
                        })
                        selectedItems.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '#3455'
                        });
                    }}
                    onQuery={(query)=>{
                        console.log(query);
                        
                    }}
                    
                    top_height={40}
                    
                    >

                </GenericList>
            </div>
        </div>
    )
}
