import { useDashRoute } from '../../../dashStore';
import './CollaboratorList.css'
import { GenericList } from '../../../Component/GenericList/GenericList';
import { useCollaboratorStore } from '../CollaboratorStore'
import { Host } from '../../../../Config';
import { FilterLevel } from '../../../Component/GenericList/ListSearchBar/Filter/FilterLevel/FilterLevel';
import { FilterCollector } from '../../../Component/GenericList/ListSearchBar/Filter/FilterCollector/FilterCollector';
import { FilterInterval } from '../../../Component/GenericList/ListSearchBar/Filter/FilterInterval/FilterInterval';
import { FilterSwitch } from '../../../Component/GenericList/ListSearchBar/Filter/FilterSwitch/FilterSwitch';
import { bindToParentScroll } from "../../../../Tools/BindToParentScroll";
import { StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
import { useEffect } from 'react';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
import { useRoleStore } from '../../PageRole/RoleStore';
// import React from 'react'
export function CollaboratorList() {
    const { current , setAbsPath, } = useDashRoute();
    const { collaborators ,  setSelectedCollaborator ,  fetchCollaborators} = useCollaboratorStore();
    const { store } = useRegisterStore();
    const {roles} = useRoleStore();
    useEffect(()=>{ 
        store&&fetchCollaborators();
    },[store])
    return current('collaborators') && (
        <div className="collaborator-list" ref={bindToParentScroll}>
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'title', 'stock', 'price', 'date', 'status'],
                    limit: collaborators?.limit,
                    page: collaborators?.page,
                    total: collaborators?.total,
                    filter:{
                        price:FilterInterval([0,100000],[0,10000]),
                        stock:FilterInterval([0,10000],[0,10000]),
                        status: FilterCollector(['PAUSE','TRASH','NEW'], []),
                        index: FilterLevel([0, 100], 5),
                        is_dynamic_price:FilterSwitch(),
                        hasScene:FilterSwitch()
                    }}}
                    items_height={80} id={'collaborator_list'} datas={collaborators?.list||[]} itemsMapper={{
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
                        email: GenericList.StringElement({ size:200}),
                        status:StatusElement,
                        role_id:{
                            getView(label, value, e, setRef) {
                                return (
                                    <div key={e.id} ref={setRef}>{roles?.list.find(r=>r.id == value)?.name}</div>
                                )
                            },
                        },
                        join_at: GenericList.DateStringElement({size:150}),
                        created_at: GenericList.DateStringElement({size:150}),
                    }}
                    
                    onItemsSelected={(selectedItems , items)=>{
                        items.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedCollaborator(selectedItems[0] as any);
                        setAbsPath(['collaborators','collaborator_profile'])
                    }}
                    onQuery={(query)=>{
                        fetchCollaborators(query)
                    }}     
                    canAddNew
                    onNewRequired={()=>{
                        setAbsPath(['collaborators','new_collaborator'])
                    }} 
                    top_height={40}
                    canPaginate
                    >

                </GenericList>
            </div>
        </div>
    )
}
