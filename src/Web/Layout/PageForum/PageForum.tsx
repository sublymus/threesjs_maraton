import './PageForum.css'
import { useWebRoute } from "../../WebStore";
import { Subject } from "./Subject";
import { getImg, limit } from '../../../Tools/StringFormater';
import { ListPaging } from '../../../DashView/Component/GenericList/ListPaging/ListPaging';
import { useEffect, useState } from 'react';
import { useForumStore } from './ForumStore';

export const nav_targs = [{
    name: 'Products',
    icon: '#739',
    sections: [{
        name: 'product',
        targ: 'Product'
    }, {
        targ: 'Product',
        name: 'categories',
    }, {
        targ: 'Product',
        name: 'feactures',
    }, {
        targ: 'Product',
        name: '3D view',
    }]
}, {
    name: 'Users',
    icon: '#b58605',
    sections: [{
        targ: 'User',
        name: 'clients',
    }, {
        targ: 'User',
        name: 'collaborators',
    }, {
        targ: 'User',
        name: 'moderators',
    }, {
        targ: 'User',
        name: 'Roles',
    }]
}, {
    name: 'Chat',
    icon: '#0042d1',
    sections: [{
        targ: 'Chat',
        name: 'client Session',
    }, {
        targ: 'Chat',
        name: 'discussion',
    }, {
        targ: 'Chat',
        name: 'admin',
    }]
}, {
    name: 'Command',
    icon: '#46bf36',
    sections: [{
        targ: 'Command',
        name: 'validation',
    }, {
        targ: 'Command',
        name: 'delivery',
    }, {
        targ: 'Command',
        name: 'payment',
    }]
}, {
    name: 'Interfaces',
    icon: '#46bf36',
    sections: [{
        targ: 'Interfaces',
        name: 'change',
    }, {
        targ: 'Interfaces',
        name: 'update',
    }, {
        targ: 'Interfaces',
        name: 'edit',
    }]
}, {
    name: 'Statistique',
    icon: '#940377',
    sections: [{
        targ: 'Statistique',
        name: 'filter',
    }, {
        targ: 'Statistique',
        name: 'auto tracker',
    }, {
        targ: 'Statistique',
        name: 'limitation',
    }]
}]
export function PageForum() {
    const { check, current, qs, setAbsPath, json } = useWebRoute();
    const page = json?.page || 1;
    const { subjects, fetchSubjects } = useForumStore()
    const [openNav, setOpenNav] = useState(false);
    const [search, setSearch] = useState(json?.text || '');

    useEffect(() => {
        setSearch(json?.text || '')
        current('forum') && fetchSubjects(json as any || {})
    }, [json])
    useEffect(() => {
        window.addEventListener('click', () => {
            setOpenNav(false)
        })
    }, []);
    const split = (value: string) => {
        let i = 0;
        let jsx: (JSX.Element | string)[] = [];
        let T = value;
        while (T.includes('\n') || T.includes('\r')) {
            T = T.replace('\n\n', ' ')
                .replace('\n', ' ')
                .replace('\r\r', ' ')
                .replace('\r', ' ')
        }

        T = T.trim()
        let t = T.trim().toLocaleLowerCase();
        const sh = search.trim().toLocaleLowerCase();
        i = t.indexOf(sh);
        let v = '';
        let e = 0;
        if (i != -1) {
            let a = T.substring(0, i).lastIndexOf(' ');
            a = a == -1 ? 0 : a + 1;
            i = a;
            T = T.substring(i, 150)

            t = T.trim().toLocaleLowerCase()
            i = 0;
            while (i != -1) {
                i = t.indexOf(sh, i);
                if (i == -1) {
                    jsx.push(T.substring(e, T.length))
                    continue;
                }
                jsx.push(T.substring(e, i))
                e = i + sh.length;
                v = T.substring(i, e);
                jsx.push(<span>{v}</span>)
                console.log({ i, T, sh, v });
                i = e

            }

        }
        else jsx.push(limit(value, 150))
        return jsx
    }
    return check('forum') && (!current('forum') ? <>
        <Subject />
    </> : <div className='page-forum'>
        <div className="top">
            <h1 className="title">Forum</h1>
            <div className="search-section" tabIndex={0} >
                <input autoFocus type="text" placeholder='Search a subject' value={search} onChange={(e) => {
                    setSearch(e.currentTarget.value);
                }} />
                <div onClick={() => {
                    qs({ ...json, text: search }).apply()
                }}>Search</div>
            </div>
        </div>
        <div className="center">
            <nav>
                <div className="new-subject" onClick={() => {
                    setAbsPath(['forum', 'new_subject'])
                }}>New Subject <span></span></div>
                <div className='filter' onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    setOpenNav(!openNav);
                }}>Filter : <span>{json?.targ_name || 'all subject'}</span></div>
                {
                    <ul className={openNav ? 'open' : 'close'} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        <span className={'targ all ' + (json?.targ_name == undefined ? 'active' : '')} onClick={() => {
                            qs({ ...json, targ_name: undefined, page: 1 }).apply()
                        }}>All subjects</span>
                        {
                            nav_targs.map((n, i) => (
                                <div key={n.name + i} >
                                    <span className={'targ ' + (json?.targ_name == n.name ? 'active' : '')} onClick={() => {
                                        qs({ ...json, targ_name: n.name, page: 1 }).apply()
                                    }}><span className='icon' style={{ background: n.icon }}></span>{n.name}</span>
                                    {
                                        n.sections.map(s => (
                                            <li className={(json?.targ_name == s.name ? 'active' : '')} key={s.name + n.name + i} onClick={() => {
                                                qs({ ...json, targ_name: s.name, page: 1 }).apply()
                                            }}>{s.name}</li>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </ul>
                }
            </nav>
            <div className="list">
                {
                    !((subjects?.list.length || 0) > 0) && <div className="nothing">
                        no subject matches the search <span>{json?.text||'undefined'}</span> in the targ <span>{json?.targ_name ||'all subject'}</span>
                    </div>
                }
                {
                    subjects?.list.map((s) => (
                        <a key={s.id} className="subject" onClick={() => qs({ subject_id: s.id }).setAbsPath(['forum', 'subject'])}>
                            <div className="photo" style={{ background: getImg(s.user.photos[0]) }}></div>
                            <div className="right">
                                <div className="text">
                                    <h3 className="title">{
                                        search.trim() ? split(s.title) : s.title
                                    }</h3>
                                    <div className="info">
                                        <div className="name">{s.user.name} </div>
                                        <div className="date">, {new Date(s.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <div className="message">{
                                        search.trim() ? split(s.message) : s.message
                                    }</div>
                                </div>
                                <div className="targs">
                                    <div className="open-targs" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const tl = e.currentTarget.parentElement!.querySelector('.targs.list')!;
                                        if (tl.className.includes('open')) {
                                            tl.classList.add('close')
                                            tl.classList.remove('open')
                                        } else {
                                            tl.classList.add('open')
                                            tl.classList.remove('close')
                                        }
                                    }}></div>
                                    <div className="targs list" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}>
                                        {
                                            s.targs.map(s => (
                                                <div key={s.name} className={"targ " + (s.targ ? 's' : '')}>
                                                    {<div className="t" style={{ background: s.targ?.icon || s.icon }}>{s.targ?.name || s.name}</div>}
                                                    {s.targ && <div className="s">{s.name}</div>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="count"><span></span>{s.comment_count || 0}</div>
                                </div>
                            </div>
                        </a>
                    ))
                }
                {
                    ((subjects?.list.length || 0) > 0) && <ListPaging limit={subjects?.limit || 10} page={page} total={subjects?.total || 0} setPage={(p) => {
                        qs({ ...json, page: p }).apply();
                    }} />
                }
            </div>
        </div>
    </div>)
}