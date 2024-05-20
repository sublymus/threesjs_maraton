import { useDashRoute } from '../../dashStore'
import { ModeratorList } from './ModeratorList/ModeratorList'
import { ModeratorProfile } from './ModeratorProfile/ModeratorProfile'
import { UsersListAccessor } from "../../Component/UsersListAccessor/UsersListAccessor";
import './PageModerator.css'
// import React from 'react'

export function PageModerator() {

    const { check , current , setAbsPath} = useDashRoute();
    return check('moderators') && (
        <div className='moderator-page'>
            {
                (current('moderators', 'moderator_profile')) && <UsersListAccessor active='moderators' setActive={((a) => setAbsPath(a.path as any))} />
            }
            <ModeratorList />
            <ModeratorProfile />
        </div>
    )
}
