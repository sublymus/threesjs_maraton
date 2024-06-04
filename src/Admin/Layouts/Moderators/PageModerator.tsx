import { useAdminRoute } from '../../AdminStore'
import { ModeratorList } from './ModeratorList/ModeratorList'
import { ModeratorProfile } from './ModeratorProfile/ModeratorProfile'
import { UsersListAccessor } from "../../../DashView/Component/UsersListAccessor/UsersListAccessor";
import { NewModerator } from './NewModerator/NewModerator'
import './PageModerator.css'
// import React from 'react'

export function PageModerator() {

    const { check , current , setAbsPath} = useAdminRoute();
    return check('moderators') && (
        <div className='moderator-page'>
            {
                (current('moderators', 'moderator_profile')) && <UsersListAccessor collabo={false} active='moderators' setActive={((a) => setAbsPath(a.path as any))} />
            }
            <ModeratorList />
            <ModeratorProfile />
            <NewModerator/>
        </div>
    )
}


















