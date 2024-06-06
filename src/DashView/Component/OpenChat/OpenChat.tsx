import { UserInterface } from '../../../DataBase'
import { useDashRoute } from '../../dashStore'
import './OpenChat.css'

export function OpenChat({ user ,channel}: { user: UserInterface, channel:'discussions'|'sessions'|'discussions_admin' }) {

    const { qs } = useDashRoute();

    return (
        <div className="open-chat" onClick={() => {
            if(channel =='discussions_admin'){
                qs({ moderator_id: user.id }).setAbsPath(['chat','discussions','discussions_admin'])
            }else
            qs({ [(channel=='discussions'?'collaborator':'client')+'_id']: user.id }).setAbsPath(['chat', channel])
        }}>
            <div className="ctn">
                <div className="icon"></div>
                <div className="label">Open {channel=='discussions'?'Chat':channel=='sessions'?'Session':'Chat Admin'}</div>
            </div>
        </div>
    )
}