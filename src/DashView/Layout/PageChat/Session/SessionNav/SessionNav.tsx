import { useEffect, useRef, useState } from 'react';
import { SearchUser } from '../../../../Component/SearchUser/SearchUser';
import { useDashRoute, useDashStore } from '../../../../dashStore'
import './SessionNav.css'
import { useSessionStore } from '../SessionStore';
import { getImg, limit, toDate } from '../../../../../Tools/StringFormater';
import { limitPopupPosition } from '../../../../../Tools/BindToParentScroll';
import { useRegisterStore } from '../../../PageAuth/RegisterStore';

export function SessionNav({ }: {}) {
    const [optionActive, setOptionActive] = useState('opened')
    const { openChild } = useDashStore();
    const { json, qs } = useDashRoute();
    const {
        addSession,
        asReadSession,
        closeSession,
        openSession,
        deleteSession,
        fetchSessions,
        // setSession,
        session,
        sessions,
        // openSessionMessages,
        setSessionByClientId
    } = useSessionStore();

    const { user, store } = useRegisterStore();

    useEffect(() => {
        store && fetchSessions()
    }, [store])

    useEffect(() => {
        if (json?.client_id) {
            setSessionByClientId(json?.client_id);
        }
    }, [json])
    useEffect(() => {
        if (session?.closed?.includes(user?.id || '')) {
            setOptionActive('closed')
        }
    }, [session])

    if (!user) return undefined;
    const openeds = sessions?.filter(s => !s.closed?.includes(user.id));
    const closeds = sessions?.filter(s => s.closed?.includes(user.id));
    const news = sessions?.filter(s => s.unchecked_count > 0)

    let ss: typeof sessions = [];
    if (optionActive == 'opened') {
        ss = openeds;
    } else if (optionActive == 'closed') {
        ss = closeds;
    } else {
        ss = news;
    }
    return (
        <div className="session-nav">
            <div className="title">
                <div className="label">Sessions </div>
                <div className="add-new" onClick={() => {
                    openChild(<SearchUser setUser={(client) => {
                        addSession(client)
                    }} />, true, '#0002')
                }}> <span></span></div>
            </div>
            <div className="options">
                <div className="option" onClick={() => {
                    setOptionActive('opened')
                }}><div className={(optionActive == 'opened' ? 'active' : '')}>Open{(openeds?.length || 0) > 0 ? <span></span> : undefined}</div></div>
                <div className="option" onClick={() => {
                    setOptionActive('closed')
                }}><div className={optionActive == 'closed' ? 'active' : ''}>Closed {(closeds?.length || 0) > 0 ? <span></span> : undefined}</div></div>
                <div className="option" onClick={() => {
                    setOptionActive('new')
                }}><div className={optionActive == 'new' ? 'active' : ''}>New  {(news?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            </div>
            <div className="search">
                <div className="input">
                    <div className="icon"></div>
                    <input type="text" placeholder='Search' />
                </div>
            </div>
            <div className="sessions">
                {
                    ss?.map((s) => {
                        let mark = '';
                        if (s.last_message?.user_id == user.id) {
                            if (s[`${s.other_att}_opened_at`]) {
                                if (new Date(s[`${s.other_att}_opened_at`]) < new Date(s.last_message?.created_at || '')) {
                                    mark = 'one'
                                } else {
                                    mark = 'double'
                                }
                            } else {
                                mark = 'one'
                            }
                        }
                        return (
                            <div key={s.id} className={"session " + (session?.id == s.id ? 'active' : '')} onClick={(e) => {
                                console.log(s.other, user);
                                
                                qs({ 'client_id': s.other.id }).setAbsPath(['chat', 'sessions'])
                                // setSessionByClientId(s.other.id)//setSession(s);
                                // openSessionMessages(s.id);
                                const div = e.currentTarget.querySelector('.count')! as HTMLDivElement;
                                div.style.display = 'none';
                            }} onContextMenu={(e) => {
                                e.preventDefault();
                                openChild(<SessionPopu closed={!!closeds?.includes(s)} x={e.clientX} y={e.clientY}
                                    onClose={(close) => {
                                        if (close) {
                                            closeSession(s);
                                            setOptionActive('closed');
                                        }
                                        else {
                                            openSession(s);
                                            setOptionActive('opened');
                                        }
                                    }}
                                    onAsRead={() => {
                                        asReadSession(s)
                                    }}
                                    onDelete={() => {
                                        deleteSession(s)
                                    }}
                                />)
                            }} >
                                <div className="photo" style={{ background: getImg(s.other.photos[0]) }}></div>
                                <div className="right">
                                    <div className="top-ctn">
                                        <div className="name">{limit(s.other.name, 16)}</div>
                                        <div className="date">{s.last_message && toDate(s.last_message.created_at)}</div>
                                    </div>
                                    <i className="center-ctn">
                                        {limit(s.title, 20)}
                                    </i>
                                    <div className="btm">
                                        <div className={"checked " + mark}></div>
                                        <div className="text">{s.last_message ? limit(s.last_message.text, 24) : 'New Session'}</div>
                                        <div className="count" style={{ display: session?.id == s.id ? 'none' : s.unchecked_count > 0 ? 'flex' : 'none' }}>{s.unchecked_count}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}

function SessionPopu({ x, y, onClose, onAsRead, onDelete, closed }: { closed: boolean, x: number, y: number, onDelete: () => void, onClose: (close: boolean) => void, onAsRead: () => void }) {
    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        ref.current && limitPopupPosition(ref.current)
    })
    return (
        <div ref={ref} className="discussion-popu" style={{ top: `${y}px`, left: `${x}px` }}>
            <div className="as-read" onClick={onAsRead}>
                <div className="icon"></div>
                <div className="label">Mark as read</div>
            </div>
            <div className="block" onClick={() => onClose(!closed)}>
                <div className="icon"></div>
                <div className="label">{closed ? 'Open' : 'Close'}</div>
            </div>
            <div className="delete" onClick={onDelete}>
                <div className="icon"></div>
                <div className="label">Delete chat</div>
            </div>
        </div>
    )
}