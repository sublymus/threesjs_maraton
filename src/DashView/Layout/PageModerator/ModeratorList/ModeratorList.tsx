import { useDashRoute } from '../../../dashStore';
import './ModeratorList.css'
import { GenericList } from '../../../Component/GenericList/GenericList';
import { useModeratorStore } from '../ModeratorStore'
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
export function ModeratorList() {
    const { current , qs } = useDashRoute();
    const { moderators , setSelectedModerator , fetchModerators} = useModeratorStore();
    const { store } = useRegisterStore();
    useEffect(()=>{ 
        // current('moderators') && store&&fetchModerators();
    },[store])
    return current('moderators') && (
        <div className="moderator-list" ref={bindToParentScroll}>
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'title', 'stock', 'price', 'date', 'status'],
                    limit: moderators?.limit,
                    page: moderators?.page,
                    total: moderators?.total,
                    filter:{
                        price:FilterInterval([0,100000],[0,10000]),
                        stock:FilterInterval([0,10000],[0,10000]),
                        status: FilterCollector(['PAUSE','TRASH','NEW'], []),
                        index: FilterLevel([0, 100], 5),
                        is_dynamic_price:FilterSwitch(),
                        hasScene:FilterSwitch()
                    }}}
                    items_height={80} id={'moderator_list'} datas={moderators?.list||[]} itemsMapper={{
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
                        setSelectedModerator(selectedItems[0] as any);
                        qs({moderator_id:selectedItems[0].id}).setAbsPath(['moderators','moderator_profile'])
                    }}
                    onQuery={(query)=>{
                        fetchModerators(query)
                    }}    
                     
                    top_height={40}
                    canPaginate
                    >

                </GenericList>
            </div>
        </div>
    )
}
