import { useAdminRoute } from '../../AdminStore'
import {RoleList} from './RoleList/RoleList'
import {RoleDash} from './RoleDash/RoleDash'
import { UsersListAccessor } from "../../../DashView/Component/UsersListAccessor/UsersListAccessor";
import './PageRole.css'
// import React from 'react'

export function PageRole() {

    const { check , current , setAbsPath} = useAdminRoute();
    return check('roles') && (
        <div className='role-page'>
            {
                (current('roles', 'edit_role')) && <UsersListAccessor collabo={false} active='roles' setActive={((a) => setAbsPath(a.path as any))} />
            }
            <RoleList />
            <RoleDash />
        </div>
    )
}


















