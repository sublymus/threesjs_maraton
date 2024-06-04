import { useAdminRoute } from '../../AdminStore'
import { UserList } from './UsertList/UserList'
import { UserProfile } from './UserProfile/UserProfile'
import { UsersListAccessor } from "../../../DashView/Component/UsersListAccessor/UsersListAccessor";
import './PageUser.css'
// import React from 'react'

export function PageUser() {

    const { check , current , setAbsPath} = useAdminRoute();
    return check('users') && (
        <div className='user-page'>
            {
                (current('users', 'user_profile')) && <UsersListAccessor collabo={false} active='users' setActive={((a) => setAbsPath(a.path as any))} />
            }
            <UserList />
            <UserProfile />
        </div>
    )
}


















