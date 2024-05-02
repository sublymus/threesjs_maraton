import { useDashRoute } from '../../dashStore'
import {CollaboratorList} from './CollaboratorList/CollaboratorList'
import {CollaboratorProfile} from './CollaboratorProfile/CollaboratorProfile'
import { UsersListAccessor } from "../../Component/UsersListAccessor/UsersListAccessor";
import { NewCollaborator } from './NewCollaborator/NewCollaborator'
import './PageCollaborator.css'
// import React from 'react'

export function PageCollaborator() {

    const { check , current , setAbsPath} = useDashRoute();
    return check('collaborators') && (
        <div className='collaborator-page'>
            {
                (current('collaborators', 'collaborator_profile', 'new_collaborator')) && <UsersListAccessor active='collaborators' setActive={((a) => setAbsPath(a.path as any))} />
            }
            <CollaboratorList />
            <CollaboratorProfile />
            <NewCollaborator/>
        </div>
    )
}


















