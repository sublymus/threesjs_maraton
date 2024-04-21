import './CategoryList.css'
import { useDashRoute } from '../../../dashStore'
import { GenericList } from '../../../Component/GenericList/GenericList';
import { useCategotyStore } from '../CategoryStore'

import { FilterInterval } from '../../../Component/GenericList/ListSearchBar/Filter/FilterInterval/FilterInterval';
import { FilterLevel } from '../../../Component/GenericList/ListSearchBar/Filter/FilterLevel/FilterLevel';
import { FilterCollector } from '../../../Component/GenericList/ListSearchBar/Filter/FilterCollector/FilterCollector';
import { StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
export function CategoryList() {
    const { current , setAbsPath} = useDashRoute();
    const {fetchCategories , categories, setSelectedCategory} = useCategotyStore();
   
    console.log(categories?.limit);
    
    return current('categories') && (
        <div className="category-list">
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'label','description', 'catalog_id' , 'index' , 'status', 'created_at', 'total_products'],
                    limit: categories?.limit,
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
                        status:StatusElement,
                        total_products: {
                            getView(label, value, e, setRef) {
                                const mapper = GenericList.StringElement();
                                return mapper.getView(label,value||0,e, setRef);
                            },
                        },
                        catalog_id: {
                            getView(_, value, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        created_at: GenericList.DateStringElement({size:500}),
                    }}
                    onItemsSelected={(selectedItems , items)=>{
                        items.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedCategory(selectedItems[0] as any);
                        setAbsPath(['store','categories','dash_categories'])
                    }}
                    onQuery={(query)=>{
                        fetchCategories(query);
                    }}     
                    top_height={40}
                    canAddNew
                    canPaginate
                    onNewRequired={()=>{
                        setAbsPath(['store','categories','new_category'])
                    }}>

                </GenericList>
            </div>
        </div>
    )
}
