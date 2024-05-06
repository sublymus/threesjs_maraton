import './CatalogList.css'
import { useDashRoute } from '../../../dashStore'
import { GenericList } from '../../../Component/GenericList/GenericList'
import {useCatalogStore} from '../CatalogStore';
import { StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
export function CatalogList() {
    const { current ,  setAbsPath } = useDashRoute()
    const  {  catalogs , fetchCatalogs , setSelectedCatalog} = useCatalogStore()
    console.log(catalogs);
    
    return current('catalogs')&&(
        <div className="catalog-list" >
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'label','description' , 'index' , 'status', 'created_at'],
                    limit: catalogs?.limit,
                    page: catalogs?.page,
                    total: catalogs?.total, 
                    filter:{}
                }}
                    items_height={80} id={'category_list'} datas={catalogs?.list||[]} itemsMapper={{
                        id: {
                            getView(_, value:string, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        label: GenericList.StringElement({ size_interval: [50, 200] }),
                        total_product:{
                            getView(label, value, e, setRef) {
                                const mapper = GenericList.StringElement();
                                return mapper.getView(label,value||0,e, setRef);
                            },
                        },
                        description: GenericList.StringElement({ size_interval: [50, 200] }),
                        status:StatusElement,
                        created_at: GenericList.DateStringElement({size:200}),
                    }}
                    
                    onItemsSelected={(selectedItems , items)=>{
                        items.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedCatalog(selectedItems[0] as any);
                        setAbsPath(['catalogs','dash_catalogs'])
                    }}
                    onQuery={(query)=>{
                        fetchCatalogs(query);
                    }}     
                    top_height={40}
                    canAddNew
                    canPaginate
                    onNewRequired={()=>{
                        setAbsPath(['catalogs','new_catalog'])
                    }}
                    >
                </GenericList>
            </div>
        </div>
    )
}