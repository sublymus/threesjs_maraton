import { UserInterface } from '../../../DataBase'
import { useDashRoute } from '../../dashStore'
import './OpenChat.css'

export function OpenChat({ user ,channel}: { user: UserInterface, channel:'discussions'|'sessions' }) {

    const { qs } = useDashRoute();

    return (
        <div className="open-chat" onClick={() => {
            qs({ [(channel=='discussions'?'collaborator':'client')+'_id']: user.id }).setAbsPath(['chat', channel])
        }}>
            <div className="ctn">
                <div className="icon"></div>
                <div className="label">Open {channel=='discussions'?'Chat':'Session'}</div>
            </div>
        </div>
    )
}