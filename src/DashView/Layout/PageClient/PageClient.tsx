import { useDashRoute } from '../../dashStore'
import { ClientList } from './ClientList/ClientList'
import { ClientProfile } from './ClientProfile/ClientProfile'
import { UsersListAccessor } from "../../Component/UsersListAccessor/UsersListAccessor";
import './PageClient.css'
// import React from 'react'

export function PageClient() {

    const { check , current , setAbsPath} = useDashRoute();
    return check('clients') && (
        <div className='client-page'>
            {
                (current('clients', 'client_profile')) && <UsersListAccessor active='clients' setActive={((a) => setAbsPath(a.path as any))} />
            }
            <ClientList />
            <ClientProfile />
        </div>
    )
}


















