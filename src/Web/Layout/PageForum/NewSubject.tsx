import React, { useEffect, useState } from 'react';
import './NewSubject.css'
import { useWebRoute } from "../../WebStore";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { nav_targs } from './PageForum';
import { useForumStore } from "./ForumStore";
const markdown = `
Describe your problem or what you are looking to do here.

# Title

> This is a important note https://sublymus.com

`

export function NewSubject() {
    const [targs, setTargs] = useState<any[]>([]);
    const { current } = useWebRoute();
    const [targError, setTargError] = useState<string | undefined>();
    const [titleError, setTitleError] = useState<string | undefined>();
    const [title, setTitle] = useState<string>('');
    const [area, setArea] = useState<string>(markdown);
    const [isPrivate,setPrivate] = useState(false);
    const [notif, setNotif] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const { create_store } = useForumStore()
    useEffect(() => {
        window.addEventListener('click', () => {
            setOpenNav(false)
        })
    }, [])
    return current('new_subject') && <div className="new-subject">
        <div className="left">
            <h1 className="title">Créer un sujet</h1>
            <p>Welcome to the Forum section, here you can contact us. You will send us a response as soon as possible. </p>
            <p>The forum uses markdown syntax.</p>
            <div className="info">
                <p>Italic: *<span className='italic'>Sublymus</span>*</p>
                <p>Bold: **<span className='bold'>Sublymus</span>**</p>
                <p>Italic + Bold: ***<span className='italic_bold'>Sublymus</span>***</p>
                <p>Optional: ~<span className='optional'>Sublymus</span>~</p>
            </div>
        </div>
        <div className="right">
            <div className="top">
                <div className="title">
                    <div className='label'>TITLE
                        <span className='error'>
                            {titleError}
                        </span>
                        <span className='count'>{title?.length}/256</span>
                    </div>
                    <input type="text" autoFocus placeholder='Subject Title' value={title} onChange={(e) => {
                        const v = e.currentTarget.value.trim();
                        if (v.length > 256) {
                            setTitleError('maximum length is 256')
                        } else if (v.length < 3) {
                            setTitleError('minimum length is 3')
                            setTitle(v);
                        } else {
                            setTitleError('')
                            setTitle(v);
                        }
                    }} />
                </div>
                <div className="targ-ctn">
                    <div className='label'>TARGS <span className={'error ' + (!(targError ?? false) ? '' : 'show')}>{targError}</span></div>
                    <div className="list" onClick={(e) => {
                        setOpenNav(!openNav);
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        {(targs.length == 0) && <div className="promt">Select one or more targs</div>}
                        {
                            targs.map(s => (
                                <div key={s.targ?.name + s.name} className="collected-targ " onClick={(e) => {
                                    setTargs(targs.filter(t => t.name != s.name))
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}>
                                    {<div style={{ background: s.targ?.icon || s.icon }}> <span className='x'></span>{s.targ?.name || s.name}</div>}
                                    {s.targ && <div>{s.name}</div>}
                                </div>
                            ))
                        }
                    </div>
                    <ul className={openNav ? 'open' : 'close'} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        {
                            nav_targs.map((n, i) => (
                                <div key={n.name + i}>
                                    <span className={'targ ' + (targs.find(t => t.name == n.name) ? 'active' : '')} onClick={() => {
                                        if (targs.length < 3) {
                                            setTargError('');
                                            setTargs([n, ...targs])
                                        } else if (targs.length < 1) {
                                            setTargError('at least one targ required')
                                        } else {
                                            setTargError('max targ is 3');
                                            setTimeout(() => {
                                                setTargError('');
                                            }, 2000);
                                        }
                                    }}><span className='icon' style={{ background: n.icon }}></span>{n.name}</span>
                                    {
                                        n.sections.map(s => (
                                            <li className={targs.find(t => t.name == s.name) ? 'active' : ''} key={s.name + n.name + i} onClick={() => {
                                                if (targs.length < 3) {
                                                    setTargError('');
                                                    setTargs([{
                                                        name: s.name,
                                                        targ: {
                                                            name: n.name,
                                                            icon: n.icon
                                                        }
                                                    }, ...targs])
                                                } else {
                                                    setTargError('maximum targ is 3');
                                                    setTimeout(() => {
                                                        setTargError('');
                                                    }, 5000);
                                                }

                                            }}>{s.name}</li>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <ZoneArea value={area} onChange={(t) => {
                console.log(t);
            }} />
            <div className="notif" onClick={(e)=>{
                if(e.currentTarget.className.includes('ok')){
                    e.currentTarget.classList.remove('ok')
                    setNotif(false)
                }else{
                    e.currentTarget.classList.add('ok')
                    setNotif(true)
                }
            }}>
                <div className="box"></div>Be notified in case of response.
            </div>
            <div className="notif" onClick={(e)=>{
                if(e.currentTarget.className.includes('ok')){
                    setPrivate(false)
                    e.currentTarget.classList.remove('ok')
                }else{
                    e.currentTarget.classList.add('ok')
                    setPrivate(true)
                }
            }}>
                <div className="box"></div>Make private, unavailable to the community only to the admin.
            </div>
            <div className="create">
                <div className="btn" onClick={() => {
                    let error = false;
                    if (targs.length > 3) {
                        setTargError('maximum targs length is 3')
                        error = true;
                    } else if (targs.length < 1) {
                        setTargError('at least one targ required')
                        error = true;
                    }
                    if (title.length > 256) {
                        setTitleError('maximum length is 256')
                        error = true;
                    } else if (title.length < 3) {
                        setTitleError('minimum length is 3')
                        error = true;
                    }
                    if(error) return;
                    create_store({
                        title,
                        targs,
                        message:area,
                        notif,
                        isPrivate
                    })
                }}>
                    Create the subject
                </div>
            </div>
        </div>
    </div>
}


export function ZoneArea({ onChange, value }: { onChange?: (text: string) => any, value?: string }) {

    const [md, setMd] = useState(value || '');
    const [mdError, setMdError] = useState('');
    const [mode, setMode] = useState('w');

    return (
        <div className="zone-area">
            <div className="top">
                <div className={"write " + (mode == 'write' ? 'active' : '')} onClick={() => {
                    setMode('write')
                }}></div>
                <div className={"preview " + (mode == 'preview' ? 'active' : '')} onClick={() => {
                    setMode('preview')
                }}></div>
                <div className={"splite " + (mode == 'splite' ? 'active' : '')} onClick={() => {
                    setMode('splite')
                }}></div>
                <div className={"splite-reverse " + (mode == 'splite-reverse' ? 'active' : '')} onClick={() => {
                    setMode('splite-reverse')
                }}></div>
                <span className='error'>{mdError}</span>
                <span className='count'>{md.length}/512</span>
            </div>
            <div className={"ctn " + (mode == 'splite-reverse' ? 'reverse' : '')}>

                <textarea spellCheck={'false'} className={mode} name="new_subject" id="new_subject" cols={30} rows={10} value={md} onChange={(e) => {
                    const v = e.currentTarget.value
                    if (v.length >= 512) {
                        setMdError('maximun length is 512')
                    } else {
                        setMdError('')
                        setMd(v);
                        onChange?.(v);
                    }
                }}></textarea>
                <div className={"text " + mode}>
                    <Markdown remarkPlugins={[remarkGfm]}>{md}</Markdown>
                </div>
            </div>

        </div>
    )
}