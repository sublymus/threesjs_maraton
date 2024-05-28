import { useDashRoute } from '../../../dashStore';
import './ClientList.css'
import { GenericList } from '../../../Component/GenericList/GenericList';
import { useClientStore } from '../ClientStore'
import { Host } from '../../../../Config';
import { FilterLevel } from '../../../Component/GenericList/ListSearchBar/Filter/FilterLevel/FilterLevel';
import { FilterCollector } from '../../../Component/GenericList/ListSearchBar/Filter/FilterCollector/FilterCollector';
import { FilterInterval } from '../../../Component/GenericList/ListSearchBar/Filter/FilterInterval/FilterInterval';
import { FilterSwitch } from '../../../Component/GenericList/ListSearchBar/Filter/FilterSwitch/FilterSwitch';
import { bindToParentScroll } from "../../../../Tools/BindToParentScroll";
import { StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
import { useEffect } from 'react';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
// import React from 'react'
export function ClientList() {
    const { current,qs } = useDashRoute();
    const { clients , setSelectedClient , fetchClients} = useClientStore();
    const { store } = useRegisterStore();
    useEffect(()=>{ 
        current('clients') && store&&fetchClients();
    },[store])
    return current('clients') && (
        <div className="client-list" ref={bindToParentScroll}>
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'title', 'stock', 'price', 'date', 'status'],
                    limit: clients?.limit,
                    page: clients?.page,
                    total: clients?.total,
                    filter:{
                        price:FilterInterval([0,100000],[0,10000]),
                        stock:FilterInterval([0,10000],[0,10000]),
                        status: FilterCollector(['PAUSE','TRASH','NEW'], []),
                        index: FilterLevel([0, 100], 5),
                        is_dynamic_price:FilterSwitch(),
                        hasScene:FilterSwitch()
                    }}}
                    items_height={80} id={'client_list'} datas={clients?.list||[]} itemsMapper={{
                        photos: {
                            getView(label, value, e, setRef) {
                                return (
                                    GenericList.ImageElement().getView(label , `${value[0].startsWith('/')?Host:''}${value[0]}` , e , setRef)
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
                        name: GenericList.StringElement({ size_interval: [50, 200] }),
                        status:{
                            getView(label, _value, e, setRef) {
                                return (StatusElement.getView(label,'VISIBLE',e, setRef))
                            },
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
                        setSelectedClient(selectedItems[0] as any);
                        qs({client_id:selectedItems[0].id}).setAbsPath(['clients','client_profile'])
                    }}
                    onQuery={(query)=>{
                        fetchClients(query)
                    }}    
                     
                    top_height={40}
                    canPaginate
                    >

                </GenericList>
            </div>
        </div>
    )
}
