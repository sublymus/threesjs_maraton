import './RoleDash.css'
import { useDashRoute } from '../../../dashStore'
import { ChoiseOptions } from '../../../Component/ChoiseOption/ChoiseOption'
import { useRoleStore } from '../RoleStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { InputText } from '../../../Component/Form/Input';
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard';
import { useEffect, useState } from 'react';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
export function RoleDash() {

    const { selectedRole,setRoleById, updateRole , newRole , deleteRole } = useRoleStore();
    const { current, json } = useDashRoute();

    const [collected] = useState<Record<string, any>>({})
    const isDash = current('edit_role');
    const isNew = current('create_role');

    useEffect(()=>{
        if(json?.role_id){
            setRoleById(json?.role_id)
        }
    },[json])

    return  (isDash || isNew) && (
        (!selectedRole && isDash) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
        <div className="role-dash" ref={bindToParentScroll}>
            <EditorTopBar title='Role Information' mode={isDash?'delete':'create'} deteleKey={selectedRole?.id} onDelete={()=>{
              selectedRole && deleteRole(selectedRole.id);
            }}
            onCreate={()=>{
                newRole(collected); 
            }}/>
            <section className='editor'>
                <div className="left-side">
                    <InputText min={3} max={25} placeholder='Role Name' prompt='Role Name' editable label='Name' value={(isDash?selectedRole?.name:'')} onChange={(value) => {
                        isDash ? updateRole({
                            name: value as string
                        }) : collected['name'] = value
                    }} />
                    {
                        isDash && <>
                            <InputText label='Id' value={(selectedRole?.id)} />
                            <InputText label='Created At' value={(selectedRole?.created_at)} />
                            <InputText label='Update At' value={(selectedRole?.updated_at)} />
                            <ActionsCard />
                        </>
                    }
                </div>
                <div className="right-side">
                    <ChoiseOptions isNew={isNew} onChange={(value) => {
                        isDash ? updateRole({
                            options: value
                        }) : collected['options'] = value
                    }} />
                </div>
            </section>
        </div>
    ))
}
