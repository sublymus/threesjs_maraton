import { useAdminRoute } from '../../../AdminStore';
import '../../../../DashView/Layout/PageRole/RoleList/RoleList.css'
import { GenericList } from '../../../../DashView/Component/GenericList/GenericList';
import { useRoleStore } from '../RoleStore'
import { FilterLevel } from '../../../../DashView/Component/GenericList/ListSearchBar/Filter/FilterLevel/FilterLevel';
import { FilterCollector } from '../../../../DashView/Component/GenericList/ListSearchBar/Filter/FilterCollector/FilterCollector';
import { FilterInterval } from '../../../../DashView/Component/GenericList/ListSearchBar/Filter/FilterInterval/FilterInterval';
import { FilterSwitch } from '../../../../DashView/Component/GenericList/ListSearchBar/Filter/FilterSwitch/FilterSwitch';
import { bindToParentScroll } from "../../../../Tools/BindToParentScroll";
import { useEffect } from 'react';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
// import React from 'react'
export function RoleList() {
    const { current , setAbsPath,  qs} = useAdminRoute();
    const { roles ,  setSelectedRole ,  fetchRoles} = useRoleStore();
    const { user } = useRegisterStore();
    useEffect(()=>{ 
        current('roles') && user && fetchRoles();
    },[user])
    return current('roles') && (
        <div className="collaborator-list" ref={bindToParentScroll}>
            <div className="list-ctn">
                <GenericList filter={{
                    sortBy:'id',
                    sortableColumns: ['id', 'title', 'stock', 'price', 'date', 'status'],
                    limit: roles?.limit,
                    page: roles?.page,
                    total: roles?.total,
                    filter:{
                        price:FilterInterval([0,100000],[0,10000]),
                        stock:FilterInterval([0,10000],[0,10000]),
                        status: FilterCollector(['PAUSE','TRASH','NEW'], []),
                        index: FilterLevel([0, 100], 5),
                        is_dynamic_price:FilterSwitch(),
                        hasScene:FilterSwitch()
                    }}}
                    items_height={80} id={'collaborator_list'} datas={roles?.list||[]} itemsMapper={{
                       
                        id: {
                            getView(_, value:string, e, setRef) {
                                return (
                                    <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                )
                            }
                        },
                        name: GenericList.StringElement({ size_interval: [50, 200] }),
                       
                        created_at: GenericList.DateStringElement({size:200}),
                    }}
                    
                    onItemsSelected={(selectedItems , items)=>{
                        items.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '';
                        })
                        selectedItems.forEach((item)=>{
                            if(item.$itemRef) item.$itemRef.style.background = '#00f2';
                        });
                        setSelectedRole(selectedItems[0] as any);
                        qs({role_id:selectedItems[0].id}).setAbsPath(['roles','edit_role'])
                    }}
                    onQuery={(query)=>{
                        fetchRoles(query)
                    }}    
                    canAddNew
                    onNewRequired={()=>{
                        setAbsPath(['roles','create_role'])
                    }} 
                    top_height={40}
                    canPaginate
                    >

                </GenericList>
            </div>
        </div>
    )
}
