import { useRegisterStore } from "../../../PageAuth/RegisterStore";
import { useSessionStore } from '../SessionStore'
import { Click, limit, toDate } from "../../../../../Tools/StringFormater";
import { Host } from "../../../../../Config";
import './SessionCenter.css'
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../../../../Hooks";
import emojis from "emoji.json";
import { useDashRoute, useDashStore } from "../../../../dashStore";
import { UserInterface } from "../../../../../DataBase";
import { limitPopupPosition } from "../../../../../Tools/BindToParentScroll";
import { useMessageStore } from "../../ChatMessage/MessageStore";

const TITLE_LENGTH = 250

const FormatText = (text: string) => {
    return (text)
        .split(' ')
        .map((m, i) =>
            (
                m.includes('\n')) ?
                m.split('\n').map((n, ni) =>
                    <div key={i + "_" + ni}>
                        <span style={{ marginRight: '4px' }}>{n}</span>
                        <br />
                    </div>
                ) : <span style={{ marginRight: '4px' }} key={i}>{m}</span>)
}

export function SessionsCenter() {
    const {
        session: d,
        messages: ms,
        fetchCreateSession
    } = useSessionStore();
    const {
        fetchSendMessage,
        fetchDeleteMessageBoth,
        fetchDeleteMessageMe,
        fetchEditMessage,
    } = useMessageStore();
    const { user } = useRegisterStore();
    const { openChild } = useDashStore();
    const  { qs } = useDashRoute()
    const [scrollInit, setScrollInit] = useState(false)
    const [senderSize, setSenderSize] = useState(1)
    const [emijiOpen, setEmijiOpen] = useState(false)
    const messagesRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState('')
    const [files, setFiles] = useState<File[] | null>(null);
    const [id] = useState(Date.now() + '')
    const [scroll, setScroll] = useState({
        top: 0,
        bottom: 0,
        height: 0,
        isOpen: false,
        lastid: 0,
    })
    const size = useWindowSize();
    const calculTextareaSize = () => {
        if (!textareaRef.current) return;
        const d = textareaRef.current;
        const l = Math.ceil(d.scrollHeight / (d.getBoundingClientRect().height || 20))
        const a = Math.ceil(d.scrollHeight / 20)
        const n = d.value.split('\n').length;
        let v = Math.max(l, n, a);
        v = v > 10 ? 10 : (v - 1 >= 1 ? v - 1 : 1)
        setSenderSize(v)
    }
    useEffect(() => {
        calculTextareaSize()
    }, [size])
    useEffect(() => {
        window.addEventListener('click', () => {
            setEmijiOpen(false)
        })
    }, [])

    const photo = d?.other.photos[0];

    const current = (m: any, i: number) => {
        return m.list[i].user_id == user?.id ? 'right' : 'left'
    }
    const last = (m: any, i: number) => {
        return m.list[i - 1] && m.list[i - 1].user_id == user?.id ? 'right' : 'left'
    }
    const next = (m: any, i: number) => {
        return m.list[i + 1] && (m.list[i + 1].user_id == user?.id ? 'right' : 'left')
    }

    const isNewSession = !d?.title
    return !d ? (<div className="no-session">
        <div className="label">Select a chat to start messaging</div>
    </div>) : (user && (<div className="session-center">
    <div className="top">
            <div className="profile" style={{ background: `no-repeat center/cover url(${photo?.startsWith('/') ? Host : ''}${photo})` }} onClick={()=>{
                qs({client_id:d.other.id}).setAbsPath(['clients','client_profile'])
            }}></div>
            <div className="ctn-name">
                <div className="name">{limit(d.other.name, 50)}</div>
                {d[`${d.other_att}_opened_at`] && <div className="last-time">Last seen {toDate(d[`${d.other_att}_opened_at`])}</div>}
            </div>
            <div className="option">
                <div className="more" onClick={Click()}></div>
            </div>
        </div>
        
         <div className="top-title" onClick={(e)=>{
            
                openChild(<TitlePopup x={e.clientX} y={e.clientY} text={d.title}/>)
            }}>
            <div className="ctn-title" >
                <div className="text-title">{limit(d.title, 50)}</div>
               
            </div>
            <div className="option">
            {<div className="img" style={{background:`no-repeat center/cover url(${user.photos[0].startsWith('/')?Host:''}${user.photos[0]})`}}></div>}
            {<div className="img" style={{background:`no-repeat center/cover url(${d.other.photos[0].startsWith('/')?Host:''}${d.other.photos[0]})`}}></div>}
                <div className="status" onClick={Click()}>
                {(d.closed?.includes(user.id) && d.closed?.includes(d.other.id) ? "Closed" : d.closed?.includes(user.id)?'Closed':d.closed?.includes(d.other.id)?'Open':'Open')}
                
                </div>
            </div>
        </div>
        {isNewSession && <div className="title">
            <div className="ctn">
                <h1 className="label">New Session Title</h1>
                <div className="text">{FormatText(text)}</div>
            </div>
        </div>}
        <div className="messages" style={{ display: isNewSession ? 'none' : '' }} ref={(ref) => {
            messagesRef.current = ref;
            if (!scrollInit) {
                messagesRef.current && messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight });
                setScrollInit(true);
            }
        }} onScroll={(e) => {

            const div = e.currentTarget
            clearInterval(scroll.lastid)
            const id = setTimeout(() => {
                const s = {
                    isOpen: false,
                    height: div.scrollHeight,
                    bottom: div.scrollHeight - (div.scrollTop + div.getBoundingClientRect().height),
                    top: div.scrollTop,
                    onProcess: false,
                    lastid: id
                }
                if (s.bottom > 150) s.isOpen = true
                setScroll(s);
            }, 100);
            scroll.lastid = id;
        }}>

            {
                ms?.list?.map((m, i) => {

                    const side = current(ms, i);
                    const _last = last(ms, i);
                    const _next = next(ms, i);
                    let rang = '';
                    if (side == _last) {
                        if (_next && _last == _next) {
                            rang = 'mid'
                        }
                    } else if (_next && side == _next) rang = 'start'

                    return (
                        <div key={m.id} className="message"   >
                            <div className={"ctn " + side + ' ' + rang} onContextMenu={(e) => {
                                e.preventDefault();
                                openChild(<MessagePopu forMe={user.id == m.user_id} x={e.clientX} y={e.clientY} onDeleteBoth={() => {
                                    fetchDeleteMessageBoth(m.id)
                                }} onDeleteMe={() => {
                                    fetchDeleteMessageMe(m.id)
                                }} onEdit={() => {
                                    openChild(<MessageEditPopu x={e.clientX} y={e.clientY} text={m.text} onEdit={(t) => {
                                        openChild(undefined)
                                        fetchEditMessage({
                                            message_id: m.id,
                                            text: t
                                        });
                                    }} />, true)

                                }} other={d.other as any as UserInterface} />)
                            }}>
                                <div className="text">{
                                    m.text && FormatText(m.text)}</div>
                                <div className="files">
                                    {
                                        m.files?.map(f => (
                                            <div key={f} className="message-file" onClick={() => {
                                                window.open(
                                                    `${f.startsWith('/') ? Host : ''}${f}`,
                                                    undefined,
                                                );
                                            }}>
                                                <div className="save"></div>
                                                <div className="lable">{f.length > 35 ? limit(f, 25) + f.substring(f.length - 8, f.length) : f}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="info">
                                    {(m.created_at != m.updated_at) && <div className="edited"></div>}
                                    <div className="date">{toDate(m.created_at)}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
        <div className="sender">
            {
                scroll.isOpen && <div className="down-btn" onClick={() => {
                    messagesRef.current && (messagesRef.current.scrollTo({
                        behavior: 'smooth',
                        top: scroll.height
                    }))
                }}></div>
            }{
                emijiOpen && <div className="emoji-list" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    {
                        emojis.map((e) => (
                            <span key={e.char} onClick={(_e) => {
                                _e.preventDefault();
                                _e.stopPropagation();
                                setText(text + e.char)
                            }}>{e.char}</span>
                        ))
                    }
                </div>
            }
            <div className="ctn">
                <div className="left">
                    {!isNewSession && <>
                        <input multiple type="file" style={{ display: 'none' }} name="message_file" id={id + 'message_file'} onChange={(e) => {
                            if (!e.currentTarget.files) return;
                            const list: File[] = [];
                            for (let i = 0; i < e.currentTarget.files.length; i++) {
                                const file = e.currentTarget.files[i];
                                list.push(file)
                            }
                            setFiles(list.length > 0 ? (files ? [...files, ...list] : list) : null);
                        }} />
                        <label htmlFor={id + 'message_file'} className="add-file" onClick={Click()}></label>
                    </>} {
                        isNewSession && <div className="text-length">
                            {text.length}{isNewSession ? ('/' + TITLE_LENGTH) : ''}
                        </div>
                    }
                </div>

                <div className="sender_center">
                    <div className="files" style={{ display: isNewSession ? 'none' : '' }}>{
                        files && (files as any as Array<File>).map((f) => (
                            <div key={f.name} className="file">
                                <div className="remove" onClick={() => {
                                    files && setFiles(files.filter(a => a !== f));
                                }}></div>
                                <div className="text">{f.name}</div>
                            </div>
                        ))
                    }</div>
                    <textarea autoFocus ref={textareaRef} value={text} name="session_sender" placeholder="Type a message here.." id="session_sender" style={{ height: `${senderSize * 20}px` }} cols={30} rows={10} onChange={(_e) => {
                        calculTextareaSize();
                        setText(isNewSession && _e.currentTarget.value.length > TITLE_LENGTH ? _e.currentTarget.value.substring(0, TITLE_LENGTH) : _e.currentTarget.value)
                    }} onKeyDown={() => {
                        setEmijiOpen(false);
                    }}></textarea>

                </div>
                <div className="right">
                    <div className="emoji" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        Click()(e)
                        setEmijiOpen(!emijiOpen)
                    }}></div>
                    {/* <div className='audio' onClick={Click()}></div> */}
                    <div className="send" onClick={(e) => {
                        Click()(e);
                        if (isNewSession) {
                            fetchCreateSession(d.other.id, text);
                        } else {
                            fetchSendMessage({
                                context: d,
                                context_name: 'sessions',
                                files: files,
                                text
                            });
                        }
                        setFiles(null);
                        setText('')

                    }}>
                        <div className="icon"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>))
}

function MessagePopu({ x, y, onEdit, onDeleteBoth, onDeleteMe, other, forMe }: { forMe: boolean, other: UserInterface, x: number, y: number, onDeleteMe: () => void, onDeleteBoth: () => void, onEdit: () => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        ref.current && limitPopupPosition(ref.current)
    })
    return (
        <div ref={ref} className="message-popu" style={{ top: `${y}px`, left: `${x}px` }}>
            {forMe && <div className="edit" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit()
            }}>
                <div className="icon"></div>
                <div className="label">Edit message</div>
            </div>}
            <div className="delete-me" onClick={onDeleteMe}>
                <div className="icon"></div>
                <div className="label">Delete for me</div>
            </div>
            {forMe && <div className="delete-both" onClick={onDeleteBoth}>
                <div className="icon"></div>
                <div className="label">Delete also for {other.name} </div>
            </div>}
        </div>
    )
}

function TitlePopup({x, y, text}:{x: number, y: number,text:string}) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        ref.current && limitPopupPosition(ref.current)
    })
    return <p ref={ref} className="title-popup" style={{ top: `${y}px`, left: `${x}px` }}>
    {FormatText(text||'')}
</p>
}

function MessageEditPopu({ x, y, onEdit, text: _text }: { text: string, x: number, y: number, onEdit: (text: string) => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [text, setText] = useState(_text)
    useEffect(() => {
        ref.current && limitPopupPosition(ref.current)
    })
    return (
        <div ref={ref} className="message-edit-popu" style={{ top: `${y}px`, left: `${x}px` }} onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }}>
            <div className="title">Edit message</div>
            <div className="input">
                <textarea value={text} onChange={(e) => {
                    setText(e.currentTarget.value)
                }} />
                <div className="save" onClick={() => {
                    onEdit(text);
                }}>
                    <div className="save-ctn">
                        <div className="label">Save</div>
                        <div className="icon"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}