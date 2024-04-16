import './CategoryList.css'
import { useDashRoute } from '../../../dashStore'
import { GenericList } from '../../../Component/GenericList/GenericList';
import { useCategotyStore } from '../CategoryStore'

// import { FilterLevel } from './ListSearchBar/Filter/FilterLevel/FilterLevel';
// import { FilterSwitch } from "./ListSearchBar/Filter/FilterSwitch/FilterSwitch";
// import { FilterCollector } from "./ListSearchBar/Filter/FilterCollector/FilterCollector";
// import { FilterListCollector } from "./ListSearchBar/Filter/FilterListCollector/FilterListCollector";

import *  as countries from 'countries-list'
import { FilterInterval } from '../../../Component/GenericList/ListSearchBar/Filter/FilterInterval/FilterInterval';
import { FilterLevel } from '../../../Component/GenericList/ListSearchBar/Filter/FilterLevel/FilterLevel';
import { FilterSwitch } from '../../../Component/GenericList/ListSearchBar/Filter/FilterSwitch/FilterSwitch';
import { FilterCollector } from '../../../Component/GenericList/ListSearchBar/Filter/FilterCollector/FilterCollector';
import { FilterListCollector } from '../../../Component/GenericList/ListSearchBar/Filter/FilterListCollector/FilterListCollector';

export function CategoryList() {
    const { current , setAbsPath} = useDashRoute();
    const {fetchCategories , categories, setSelectedCategories} = useCategotyStore();
   
    console.log(categories?.limit);
    
    return current('categories') && (
        <div className="category-list">
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'label','description', 'catalog_id' , 'index' , 'status', 'created_at', 'total_products'],
                    limit: categories?.limit||1,
                    page: categories?.page,
                    total: categories?.total,
                    filter:{
                        index: FilterLevel([0, 100], 5),
                        status: FilterCollector(['PAUSE','TRASH','NEW'], []),
                        total_products:FilterInterval([0,1000],[0,1000])
                    }
                }}
                    items_height={80} id={'category_list'} datas={categories?.list||[]} itemsMapper={{
                        id: {
                            getView(_, value:string, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        label: GenericList.StringElement({ size_interval: [50, 200] }),
                        status: GenericList.StringElement({size:150}),
                        total_products: GenericList.StringElement({size:150}),
                        catalog_id: {
                            getView(_, value, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        created_at: GenericList.DateStringElement({size:200}),
                    }}
                    onItemsSelected={(selectedItems , items)=>{
                        items.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedCategories(selectedItems[0] as any);
                        setAbsPath(['store','products','dash_product'])
                    }}
                    onQuery={(query)=>{
                        fetchCategories(query);
                    }}     
                    top_height={40}>

                </GenericList>
            </div>
        </div>
    )
}
