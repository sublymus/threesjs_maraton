import { useEffect, useRef, useState } from "react";
import { useRegisterStore } from "../../../PageAuth/RegisterStore";
import { useDiscussionStore } from '../DiscussionStore'
import { getImg, getSeconContext, limit, toDate } from "../../../../../Tools/StringFormater";
import { SearchUser } from "../../../../Component/SearchUser/SearchUser";
import './DiscussionNav.css'
import { useDashRoute, useDashStore } from "../../../../dashStore";
import { limitPopupPosition } from "../../../../../Tools/BindToParentScroll";
import { useCollaboratorStore } from "../../../PageCollaborator/CollaboratorStore";
import { useModeratorStore } from "../../../PageModerator/ModeratorStore";
import { Discussion } from "../../../../../DataBase";
export function DiscussionsNav() {
    const {
        discussion,
        discussions,
        fetchDiscussions,
        addDiscussion,
        // asReadDiscussion,
        blockDiscussion,
        deleteDiscussion,
        unBlockDiscussion,
        setDiscussionByOtherId
    } = useDiscussionStore();
    const { check ,json, pathList, qs, setAbsPath } = useDashRoute();
    const optionPath = pathList[3]?.split('_')[1]
    const [optionActive, setOptionActive] = useState(optionPath || 'all')
    const { openChild } = useDashStore()
    const { user, store } = useRegisterStore();
    const { fetchCollaborators } = useCollaboratorStore();
    const { fetchModerators } = useModeratorStore()

    useEffect(() => {
        if (json?.collaborator_id || json?.moderator_id) {
            setDiscussionByOtherId({
                other_id: json?.collaborator_id || json?.moderator_id,
                for_moderator: !!json?.moderator_id,
                async findOther(other_id, for_moderator) {
                    if (for_moderator) {
                        return useModeratorStore.getState().moderators?.list.find((m) => m.id == other_id) || (await useModeratorStore.getState().fetchModerators({ query: { user_id: other_id } }))?.list[0]
                    }
                    return useCollaboratorStore.getState().collaborators?.list.find((c) => c.id == other_id) || (await useCollaboratorStore.getState().fetchCollaborators({ query: { user_id: other_id } }))?.list[0]
                },
            })
        }
        check('chat')&& !discussions && store && fetchDiscussions({})
        setOptionActive(optionPath || 'all')
    }, [json, store]);

    useEffect(() => {
        setOptionActive(optionPath || 'all')
    }, [pathList])

    if (!user) return undefined;

    const all = discussions?.list.filter(d => {
        return !d.blocked?.includes(user.id) && !!getSeconContext(store?.id || '', d)
    })

    const blocked = discussions?.list.filter(d => {
        return d.blocked?.includes(user.id)
    })
    const _new = discussions?.list.filter(d => {
        return d.unchecked_count > 0 && !d.blocked?.includes(user.id)
    })
    const context_admin = discussions?.list.filter(d => {
        return !getSeconContext(store?.id || '', d)
    })
    let ds: Discussion[] | undefined = [];
    if (optionActive == 'admin') {
        ds = context_admin;
    } else if (optionActive == 'new') {
        ds = _new;
    } else if (optionActive == 'blocked') {
        ds = blocked;
    } else {
        ds = all;
    }

    return (<div className="discussion-nav">
        <div className="title">
            <div className="label">Chats </div>
            <div className="add-new" onClick={() => {
                openChild(<SearchUser fetchUsers={fetchCollaborators} openChild={openChild} user={user} setUser={(collabo, discMode) => {
                    console.log({ discMode });

                    addDiscussion({
                        other: collabo,
                        for_moderator: discMode == 'moderators'
                    })
                    if (discMode == 'moderators') setAbsPath(['chat', 'discussions', 'discussions_admin'])
                }} selector={{
                    list: [{
                        name: 'collaborators',
                        fetch: fetchCollaborators
                    }, {
                        name: 'moderators',
                        fetch: fetchModerators
                    }],
                }} />, true, '#0002')
            }}> <span></span></div>
        </div>
        <div className="options">
            <div className="option" onClick={() => {
                qs(json || {}).setAbsPath(['chat', 'discussions', 'discussions_all'])
            }}><div className={(optionActive == 'all' ? 'active' : '')}>All{(all?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            <div className="option" onClick={() => {
                qs(json || {}).setAbsPath(['chat', 'discussions', 'discussions_new'])
            }}><div className={optionActive == 'new' ? 'active' : ''}>New {(_new?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            <div className="option" onClick={() => {
                qs(json || {}).setAbsPath(['chat', 'discussions', 'discussions_blocked'])
            }}><div className={optionActive == 'blocked' ? 'active' : ''}>Blocked  {(blocked?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            <div className="option" onClick={() => {
                qs(json || {}).setAbsPath(['chat', 'discussions', 'discussions_admin'])
            }}><div className={optionActive == 'admin' ? 'active' : ''}>Admin  {(context_admin?.length || 0) > 0 ? <span></span> : undefined}</div></div>
        </div>
        <div className="search">
            <div className="input">
                <div className="icon"></div>
                <input type="text" placeholder='Search' />
            </div>
        </div>
        <div className="discussions">
            {
                ds?.map((d) => {
                    let mark = '';
                    if (d.last_message?.user_id == user.id) {
                        if (d[`${d.other_att}_opened_at`]) {
                            if (new Date(d[`${d.other_att}_opened_at`]) < new Date(d.last_message.created_at)) {
                                mark = 'one'
                            } else {
                                mark = 'double'
                            }
                        } else {
                            mark = 'one'
                        }
                    }
                    return (
                        <div key={d.id} className={"discussion " + (discussion?.id == d.id ? 'active' : '')} onClick={(e) => {
                            d.unchecked_count = 0;
                            
                            store && qs({ 
                                [getSeconContext(store.id,d)?'collaborator_id':'moderator_id']: d.other.id ,
                                nav:document.querySelector('.back-close.nav')!.getBoundingClientRect().width==0?undefined:'min'
                                //@ts-ignore
                            }).setAbsPath(['chat', 'discussions', 'discussions_' + (optionActive || '_all')])
                            const div = e.currentTarget.querySelector('.count')! as HTMLDivElement;
                            div.style.display = 'none';

                        }} onContextMenu={(e) => {
                            e.preventDefault();
                            openChild(<DiscussionPopu canBlock={!!getSeconContext(store?.id,d)} blocked={!!blocked?.includes(d)} x={e.clientX} y={e.clientY}
                                onBlock={(block) => {
                                    if (block) {
                                        blockDiscussion(d);
                                        qs(json || {}).setAbsPath(['chat', 'discussions', 'discussions_blocked'])
                                    }
                                    else {
                                        unBlockDiscussion(d);
                                        qs(json || {}).setAbsPath(['chat', 'discussions', 'discussions_all'])
                                    }
                                }}
                                onAsRead={() => {
                                    // asReadDiscussion(d)
                                }}
                                onDelete={() => {
                                    deleteDiscussion(d)
                                }}
                            />)
                        }} >
                            <div className="photo" style={{ background: getImg(d.other.photos[0]) }}></div>
                            <div className="right">
                                <div className="top-ctn">
                                    <div className="name">{limit(d.other.name, 16)}</div>
                                    <div className="date">{d.last_message && toDate(d.last_message.created_at)}</div>
                                </div>
                                <div className="btm">
                                    <div className={"checked " + mark}></div>
                                    <div className="text">{d.last_message ? limit(d.last_message.text, 24) : 'New Discussion'}</div>
                                    <div className="count" style={{ display: discussion?.id == d.id ? 'none' : d.unchecked_count > 0 ? 'flex' : 'none' }}>{d.unchecked_count}</div>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    </div>)
}

function DiscussionPopu({ x, y, onBlock, onAsRead, onDelete, blocked , canBlock}: {canBlock:boolean, blocked: boolean, x: number, y: number, onDelete: () => void, onBlock: (block: boolean) => void, onAsRead: () => void }) {
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
            {canBlock && <div className="block" onClick={() => onBlock(!blocked)}>
                <div className="icon"></div>
                <div className="label">{blocked ? 'Unblock' : 'Bolck'}</div>
            </div>}
            <div className="delete" onClick={onDelete}>
                <div className="icon"></div>
                <div className="label">Delete chat</div>
            </div>
        </div>
    )
}