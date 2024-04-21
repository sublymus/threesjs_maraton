import './CatalogList.css'
import { useDashRoute } from '../../../dashStore'
import { GenericList } from '../../../Component/GenericList/GenericList'
import {useCatalogStore} from '../CatalogStore';
export function CatalogList() {
    const { current ,  setAbsPath } = useDashRoute()
    const  {  catalogs , fetchCatalogs , setSelectedCatalog} = useCatalogStore()
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
                        total_product:GenericList.StringElement(),
                        label: GenericList.StringElement({ size_interval: [50, 200] }),
                        description: GenericList.StringElement({ size_interval: [50, 200] }),
                        status: GenericList.StringElement({size:150}),
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
                        setAbsPath(['store','catalogs','dash_catalogs'])
                    }}
                    onQuery={(query)=>{
                        fetchCatalogs(query);
                    }}     
                    top_height={40}
                    canAddNew
                    onNewRequired={()=>{
                        setAbsPath(['store','catalogs','new_catalog'])
                    }}
                    >
                </GenericList>
            </div>
        </div>
    )
}