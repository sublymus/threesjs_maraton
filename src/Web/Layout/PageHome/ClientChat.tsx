import { useState } from "react";
import "./ClientChat.css";


export function ClientChat() {
    const [active, setActive] = useState('session');

    return <div className="client-chat">
        <div className="top-onglet">
            <div className={"session " + (active == 'session' ? 'active' : '')} onClick={() => {
                setActive('session');
            }}>Session</div>
            <div className={"discussion " + (active == 'discussion' ? 'active' : '')} onClick={() => {
                setActive('discussion');
            }}>Discussion</div>
            <div className={"group " + (active == 'group' ? 'active' : '')} onClick={() => {
                setActive('group');
            }}>Group</div>
        </div>
        <div className="ctn">
            <div className={"ctn-session " + (active == 'session' ? 'active' : '')}>
                <div className="view-session">
                    <div className="client1 user">
                        <div className="label">Client</div>
                        <div className="client1-c conect">
                            <div className="message-c1 message"></div>
                        </div>
                    </div>
                    <div className="client2 user">
                        <div className="label">Client</div>
                        <div className="client2-c conect">
                            <div className="message-c2 message"></div>
                        </div>
                    </div>
                    <div className="collaborator user">
                        <div className="label">Collaborator</div>
                    </div>
                </div>
            </div>
            <div className={"ctn-discussion " + (active == 'discussion' ? 'active' : '')}>
                <div className="view-discussion">
                    <div className="collabo1 user">
                        <div className="label">Collaborator</div>
                        <div className="collabo1-c conect">
                            <div className="message-c1 message"></div>
                        </div>
                    </div>
                    <div className="collabo1-collabo2 conect">
                        <div style={{position:'relative'}}><div className="message-c3 message"></div></div>
                    </div>
                    <div className="collabo2 user">
                        <div className="label">Collaborator</div>
                        <div className="collabo2-c conect">
                            <div className="message-c2 message"></div>
                        </div>
                    </div>
                    <div className="admin user">
                        <div className="label">Admin</div>
                    </div>
                </div>
            </div>
            <div className={"ctn-group " + (active == 'group' ? 'active' : '')}></div>
        </div>
    </div>
} 