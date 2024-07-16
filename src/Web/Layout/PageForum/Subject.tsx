import './Subject.css';
import { useWebRoute, useWebStore } from "../../WebStore";
import { useEffect, useState } from 'react';
import { getImg } from '../../../Tools/StringFormater';
import { useForumStore } from './ForumStore';
import { ZoneArea } from './NewSubject';
import { PageAuth } from '../PageAuth/PageAuth';
import { addNotifContext, get_notif_contexts, removeNotifContext, requiredNotification, sendNotificationData } from '../../../Tools/Notification';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notifPermission } from '../../../Hooks';

const default_text = `
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
    const { setSubjectById, send_message, fetchMessages, messages, subject } = useForumStore()
    const [message, setMessage] = useState(default_text);
    const [reply_id] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [mdError, setMdError] = useState('');
    const [notif, setNotif] = useState(false);
    const e = notifPermission()
    useEffect(() => {
        current('subject') && json?.subject_id && setSubjectById(json.subject_id)
        current('subject') && json?.subject_id && fetchMessages({ context_id: json.subject_id, context_name: 'subjects' })
    }, [json])

    useEffect(() => {
        current('subject') && owner && subject && get_notif_contexts({
            context_id: subject.id,
            context_name: 'subjects',
            user: owner
        }).then((b) => {
            const c = b?.find(f => f.context_id == subject.id)
            console.log(c,b, subject);  
            if(c && e){
                setNotif(true);
            }else{
                setNotif(false);
            }
        })

    }, [json, subject, owner])
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
                                    {(r.user_id == subject.user_id) && <div className="author">author</div>}
                                    <div className="reply"></div>
                                    <div className="report"></div>
                                </div>
                            </div>
                            <div className="message">
                                <Markdown remarkPlugins={[remarkGfm]}>{r.text}</Markdown>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="new-response">
            <div className="prompt">YOUR MESSGAE</div>
            <ZoneArea value={message} onChange={(t) => {
                console.log(t);
                if (t.length > 512) {
                    setMdError('maximun length is 512')
                } else if (t.length < 3) {
                    setMdError('minimum length is 3')
                    setMessage(t);
                } else {
                    setMdError('')
                    setMessage(t);
                }
            }} mdError={mdError} />
            <div className={"notif " + (notif ? 'ok' : '')} onClick={() => {
                if (!owner) {
                    return openChild(<PageAuth />, true)
                }
                const n = !notif;
                
                if (!n) {
                    owner && removeNotifContext({
                        user: owner,
                        context_id: subject.id,
                        context_name: 'subjects'
                    }).then(e=>{
                        setNotif(!!e?.deleted);
                    })
                } else {
                    requiredNotification().then(() => {
                        if (owner) {
                            sendNotificationData(owner);
                            addNotifContext({
                                user: owner,
                                context_id: subject.id,
                                context_name: 'subjects'
                            });
                            setNotif(true);
                        }
                    })
                }
            }}>
                <div className="box"></div>BE NOTIFIED IN CASE OF RESPONSE
            </div>
            <div className={"answer " + ((loading || message.trim().length > 512 || message.trim().length < 3) ? 'disable' : '')} onClick={() => {
                if (!owner) {
                    return openChild(<PageAuth />, true)
                }
                if (loading || message.trim().length > 512 || message.trim().length < 3) {
                    return
                }
                setLoading(true);
                send_message({
                    context_id: subject.id,
                    context_name: 'subjects',
                    text: message,
                    reply_id,
                }).then(() => {
                    setTimeout(() => {
                        setMessage('')
                        setLoading(false);
                    }, 1000);
                })
            }}>{
                    loading ? <span></span> : 'Answer'
                }</div>
        </div>
    </div>
}


