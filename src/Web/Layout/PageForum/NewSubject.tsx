import { useEffect, useState } from 'react';
import { PageAuth } from "../PageAuth/PageAuth";
import './NewSubject.css'
import { useWebRoute, useWebStore } from "../../WebStore";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { nav_targs } from './PageForum';
import { useForumStore } from "./ForumStore";
import { addNotifContext, requiredNotification } from '../../../Tools/Notification';
const markdown = `
Describe your problem or what you are looking to do here.

# Title

> This is a important note https://sublymus.com

`

export function NewSubject() {
    const [targs, setTargs] = useState<any[]>([]);
    const { current, qs } = useWebRoute();
    const { owner, openChild } = useWebStore()
    const [targError, setTargError] = useState<string | undefined>();
    const [titleError, setTitleError] = useState<string | undefined>();
    const [title, setTitle] = useState<string>('');
    const [area, setArea] = useState<string>(markdown);
    const [isPrivate, setPrivate] = useState(false);
    const [notif, setNotif] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const { create_subject } = useForumStore();
    const [mdError, setMdError] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        window.addEventListener('click', () => {
            setOpenNav(false)
        })
    }, [])
    useEffect(() => {
        owner && openChild(undefined)
    }, [owner]);


    const canSend = (edit?: boolean) => {

        if (loading) return false;
        let error = false;
        console.log('$$$$$$$$$');

        if (targs.length > 3) {
            edit && setTargError('maximum tags length is 3')
            error = true;
        } else if (targs.length < 1) {
            edit && setTargError('at least one tag required')
            error = true;
        }
        const t = title.trim();
        if (t.length > 256) {
            edit && setTitleError('maximum length is 256')
            error = true;
        } else if (t.length < 3) {
            edit && setTitleError('minimum length is 3')
            error = true;
        }
        const a = area.trim();
        if (a.length > 512) {
            edit && setMdError('maximum length is 512')
            error = true;
        } else if (a.length < 3) {
            edit && setMdError('minimum length is 3')
            error = true;
        }
        if (error) {
            return false
        }
        return true
    }
    return current('new_subject') && <div className="new-subject">
        <div className="left">
            <h1 className="title">Créer un sujet</h1>
            <p>Welcome to the Forum section, here you can contact us. You will send us a response as soon as possible. </p>
            <p>The forum uses markdown syntax.</p>

        </div>
        <div className="right">
            <div className="top">
                <div className="title">
                    <div className='label'>TITLE
                        <span className='error'>
                            {titleError}
                        </span>
                        <span className='count'>{title.trim()?.length}/256</span>
                    </div>
                    <input type="text" autoFocus placeholder='Subject Title' value={title} onChange={(e) => {
                        const v = e.currentTarget.value;
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
                    <div className='label'>TAGS <span className={'error ' + (!(targError ?? false) ? '' : 'show')}>{targError}</span></div>
                    <div className="list" onClick={(e) => {
                        setOpenNav(!openNav);
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        {(targs.length == 0) && <div className="promt">Select one or more tags</div>}
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
                                        if (targs.find(f => f.name == n.name)) setTargs(targs.filter(t => t.name != n.name))
                                        else if (targs.length < 3) {
                                            setTargError('');
                                            setTargs([{
                                                name: n.name,
                                                icon: n.icon,
                                            }, ...targs])
                                        } else if (targs.length < 1) {
                                            setTargError('at least one tag required')
                                        } else {
                                            setTargError('maximum tag is 3');
                                            setTimeout(() => {
                                                setTargError('');
                                            }, 2000);
                                        }
                                    }}><span className='icon' style={{ background: n.icon }}></span>{n.name}</span>
                                    {
                                        n.sections.map(s => (
                                            <li className={targs.find(t => t.name == s.name) ? 'active' : ''} key={s.name + n.name + i} onClick={() => {
                                                if (targs.find(f => f.name == s.name)) setTargs(targs.filter(t => t.name != s.name))
                                                else if (targs.length < 3) {
                                                    setTargError('');
                                                    setTargs([{
                                                        name: s.name,
                                                        targ: {
                                                            name: n.name,
                                                            icon: n.icon
                                                        }
                                                    }, ...targs])
                                                } else {
                                                    setTargError('maximum tag is 3');
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
                if (t.length >= 512) {
                    setMdError('maximun length is 512')
                } else if (t.length < 3) {
                    setMdError('minimum length is 3')
                    setArea(t);
                } else {
                    setMdError('')
                    setArea(t);
                }
            }} mdError={mdError} />
            <div className="notif" onClick={(e) => {
                if (e.currentTarget.className.includes('ok')) {
                    e.currentTarget.classList.remove('ok')
                    setNotif(false)
                } else {
                    e.currentTarget.classList.add('ok')
                    setNotif(true)
                    requiredNotification()
                }
            }}>
                <div className="box"></div>Be notified in case of response.
            </div>
            <div className="notif" onClick={(e) => {
                if (e.currentTarget.className.includes('ok')) {
                    setPrivate(false)
                    e.currentTarget.classList.remove('ok')
                } else {
                    e.currentTarget.classList.add('ok')
                    setPrivate(true)
                }
            }}>
                <div className="box"></div>Make private, unavailable to the community only to the admin.
            </div>
            <div className="create">
                <div className={"btn " + (!canSend() ? 'disable' : '')} onClick={() => {
                    if (!owner) {
                        openChild(<PageAuth />, true)
                        return
                    }
                    if (!canSend(true)) return;
                    console.log('send ...');

                    setLoading(true);
                    create_subject({
                        title: title,
                        targs,
                        message: area,
                        notif,
                        isPrivate
                    }).then((subject) => {
                        
                        setTimeout(() => {
                            console.log(subject);
                            setLoading(false);
                            if (subject?.id) {
                                if (notif) {
                                    addNotifContext({
                                        user: owner,
                                        context_id: subject.id,
                                        context_name: 'subjects'
                                    });
                                }
                                setArea(markdown);
                                setNotif(false);
                                setPrivate(false);
                                setTargs([]);
                                setTitle('');
                                qs({ subject_id: subject?.id }).setAbsPath(['forum', 'subject'])
                            }
                        }, 500);
                    })
                }}>
                    {
                        loading ? <span></span> : 'Create the subject'
                    }
                </div>
            </div>
        </div>
    </div>
}

export function ZoneArea({ onChange, value, mdError }: { mdError?: string, onChange?: (text: string) => any, value?: string }) {

    // const [md, setMd] = useState(value || '');
    const [mode, setMode] = useState('splite');

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
                <div className="info-icon">
                    <div className="info-text">
                        <p>Italic: *<span className='italic'>Text</span>*</p>
                        <p>Bold: **<span className='bold'>Text</span>**</p>
                        <p>Italic + Bold: ***<span className='italic_bold'>Text</span>***</p>
                        <p>Optional: ~<span className='optional'>Text</span>~</p>
                    </div>
                </div>
                <span className='error'>{mdError}</span>
                <span className='count'>{value?.length || 0}/512</span>
            </div>
            <div className={"ctn " + (mode == 'splite-reverse' ? 'reverse' : '')}>

                <textarea spellCheck={'false'} className={mode} name="new_subject" id="new_subject" cols={30} rows={10} value={value} onChange={(e) => {
                    const v = e.currentTarget.value
                    onChange?.(v);
                }}></textarea>
                <div className={"text " + mode}>
                    <Markdown remarkPlugins={[remarkGfm]}>{value}</Markdown>
                </div>
            </div>

        </div>
    )
}