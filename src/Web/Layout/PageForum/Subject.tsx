import './Subject.css';
import { useWebRoute, useWebStore } from "../../WebStore";
import { useEffect, useState } from 'react';

import { getImg } from '../../../Tools/StringFormater';
import { SubjectInterface, useForumStore } from './ForumStore';
import { ZoneArea } from './NewSubject';
import { ListType, Message } from '../../../DataBase';
import { PageAuth } from '../PageAuth/PageAuth';
import { addNotifContext, removeNotifContext, requiredNotification, sendNotificationData } from '../../../Tools/Notification';

const default_message = `
write your message here,

*Italic*
**Bold**
***Italic + Bold***
~Optional~
> A important note
#### 
new line
`
export function Subject() {
    const { current, json } = useWebRoute();
    const { owner, openChild } = useWebStore()
    const { getSubjectById, send_message, fetchMessage } = useForumStore()
    const [messages, setMessages] = useState<ListType<Message>>()
    const [subject, setSubject] = useState<SubjectInterface>();
    const [message, setMessage] = useState(default_message);
    const [notif, setNotif] = useState(false);
    const [reply_id] = useState<string | undefined>();
    useEffect(() => {
        current('subject') && json?.subject_id && getSubjectById(json.subject_id).then((subject) => {
            setSubject(subject)
            console.log({ subject });
        })
        current('subject') && json?.subject_id && fetchMessage({ context_id: json.subject_id, context_name: 'subjects' }).then(list => {
            setMessages(list);
            console.log({ list });

        })
    }, [json])
    return current('subject') && subject && <div className="page-subject">
        <div className="top">
            <h1 className="title">{subject.title}</h1>
            <div className="info">
                <div className="photo" style={{ background: getImg(subject.user.photos[0]) }}></div>
                <div className="user-name">{subject.user.name}</div>
                <div className="date">, {new Date(subject.created_at).toLocaleDateString()}</div>
                <div className="targs" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    {
                        subject.targs.map(s => (
                            <div key={s.name} className={"targ " + (s.targ ? 's' : '')}>
                                {<div className="t" style={{ background: s.targ?.icon || s.icon }}>{s.targ?.name || s.name}</div>}
                                {s.targ && <div className="s">{s.name}</div>}
                            </div>
                        ))
                    }
                </div>
                <div className="report"></div>
            </div>
        </div>
        <div className="message">
            {
                subject.message
            }
        </div>
        <h2 className="count-response">{messages?.total || 0} Response{(messages?.list.length || 0) > 1 ? 's' : ''}</h2>
        <div className="responses">
            {
                messages?.list.map(r => (
                    <div key={r.id} className="response">
                        <div className="photo p1" style={r.user && { background: getImg(r.user.photos[0]) }}></div>
                        <div className="right">
                            <div className="top-top">
                                <div className="photo p2" style={r.user && { background: getImg(r.user.photos[0]) }}></div>
                                <div className="top">
                                    <div className="name">{r.user?.name}</div>
                                    <div className="date">, {new Date(r.created_at).toLocaleDateString()}</div>
                                    {(r.user?.id == r.user_id) && <div className="author">author</div>}
                                    <div className="reply"></div>
                                    <div className="report"></div>
                                </div>
                            </div>
                            <div className="message">{r.text}</div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="new-response">
            <div className="prompt">YOUR MESSGAE</div>
            <ZoneArea value={message} onChange={(text) => {
                setMessage(text);
            }} />
            <div className="notif" onClick={(e) => {
                if (e.currentTarget.className.includes('ok')) {
                    e.currentTarget.classList.remove('ok')
                    owner && removeNotifContext({
                        user: owner,
                        context_id: subject.id,
                        context_name: 'subjects'
                    })
                } else {
                    e.currentTarget.classList.add('ok')
                    requiredNotification().then(() => {
                        if (owner) {
                            addNotifContext({
                                user: owner,
                                context_id: subject.id,
                                context_name: 'subjects'
                            });
                            sendNotificationData(owner);
                        }
                    })

                }
            }}>
                <div className="box"></div>BE NOTIFIED IN CASE OF RESPONSE
            </div>
            <div className="answer" onClick={() => {
                if (!owner) {
                    return openChild(<PageAuth />, true)
                }
                send_message({
                    context_id: subject.id,
                    context_name: 'subjects',
                    text: message,
                    reply_id,
                })
            }}>Answer</div>
        </div>
    </div>
}