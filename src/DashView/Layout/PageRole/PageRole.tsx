import { useDashRoute } from '../../dashStore'
import {RoleList} from './RoleList/RoleList'
import {RoleDash} from './RoleDash/RoleDash'
import { UsersListAccessor } from "../../Component/UsersListAccessor/UsersListAccessor";
import './PageRole.css'
// import React from 'react'

export function PageRole() {

    const { check , current , setAbsPath} = useDashRoute();
    return check('roles') && (
        <div className='role-page'>
            {
                (current('roles', 'edit_role')) && <UsersListAccessor active='roles' setActive={((a) => setAbsPath(a.path as any))} />
            }
            <RoleList />
            <RoleDash />
        </div>
    )
}


















