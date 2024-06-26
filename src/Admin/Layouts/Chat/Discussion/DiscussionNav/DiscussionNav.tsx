import { useEffect, useRef, useState } from "react";
import { useRegisterStore } from "../../../PageAuth/RegisterStore";
import { useDiscussionStore } from '../DiscussionStore'
import { getImg, getSeconContext, limit, toDate } from "../../../../../Tools/StringFormater";
import { SearchUser } from "../../../../../DashView/Component/SearchUser/SearchUser";
import '../../../../../DashView/Layout/PageChat/Discussion/DiscussionNav/DiscussionNav.css'
import { useAdminRoute, useAdminStore } from "../../../../AdminStore";
import { limitPopupPosition } from "../../../../../Tools/BindToParentScroll";
import { useModeratorStore } from "../../../Moderators/ModeratorStore";
import { Discussion } from "../../../../../DataBase";
import { useUserStore } from "../../../Users/UserStore";
export function DiscussionsNav() {
    const {
        discussion,
        discussions,
        fetchDiscussions,
        addDiscussion,
        blockDiscussion,
        deleteDiscussion,
        unBlockDiscussion,
        setDiscussionByOtherId
    } = useDiscussionStore();
    const { json, pathList, qs, check } = useAdminRoute();
    const optionPath = pathList[3]?.split('_')[1]
    const [optionActive, setOptionActive] = useState(optionPath || 'all')
    const { openChild } = useAdminStore()
    const { user } = useRegisterStore();
    const { fetchUsers } = useUserStore();
    const { fetchModerators } = useModeratorStore();

    useEffect(() => {
        if (user && (json?.collaborator_id || json?.moderator_id)) {
            setDiscussionByOtherId({
                async findOther(other_id/*, store_id*/) {
                    return (await fetchUsers({ query: { user_id: other_id } }))?.list[0]
                },
                other_id: json?.collaborator_id || json?.moderator_id,
                store_id: json?.store_id
            })
        }
        setOptionActive(optionPath || 'all')
    }, [json, user]);
    useEffect(() => {
        check('chat') && !discussions && user && fetchDiscussions({ store_id: null })
    }, [user])
    useEffect(() => {
        setOptionActive(optionPath || 'all')
    }, [pathList])


    if (!user) return undefined;
    const all = discussions?.list.filter(d => {
        return !d.blocked?.includes(user.id)
    })
    const blocked = discussions?.list.filter(d => {
        return d.blocked?.includes(user.id)
    })
    const _new = all?.filter(d => {
        return d.unchecked_count > 0
    })

    let ds: Discussion[] | undefined = [];
    if (optionActive == 'all') {
        ds = all;
    } else if (optionActive == 'new') {
        ds = _new;
    } else {
        ds = blocked;
    }

    let new_sum = 0;
    _new?.forEach((n) => {
        new_sum += n.unchecked_count
    })
    let blocked_sum = 0;
    _new?.forEach((n) => {
        blocked_sum += n.unchecked_count
    })
    return (<div className="discussion-nav">
        <div className="title">
            <div className="label">Chats </div>
            <div className="add-new" onClick={() => {
                openChild(<SearchUser user={user} openChild={openChild} fetchUsers={fetchModerators} setUser={(moderator) => {
                    addDiscussion({
                        other: moderator,
                    })
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
                            qs({
                                store_id: getSeconContext(undefined, d),
                                [getSeconContext(undefined, d) ? 'collaborator_id' : 'moderator_id']: d.other.id,
                                nav: document.querySelector('.back-close.nav')!.getBoundingClientRect().width == 0 ? undefined : 'min'
                                //@ts-ignore
                            }).setAbsPath(['chat', 'discussions', 'discussions_' + (optionActive || '_all')])
                            const div = e.currentTarget.querySelector('.count')! as HTMLDivElement;
                            div.style.display = 'none';

                        }} onContextMenu={(e) => {
                            e.preventDefault();
                            openChild(<DiscussionPopu blocked={!!blocked?.includes(d)} x={e.clientX} y={e.clientY}
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
                            <div className="photo" style={{ background: getImg(d.other?.photos?.[0]) }}></div>
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
                                {d.store && <div className="store-name">{d.store.name}</div>}
                            </div>
                        </div>
                    )
                })

            }
        </div>
    </div>)
}

function DiscussionPopu({ x, y, onBlock, onAsRead, onDelete, blocked }: { blocked: boolean, x: number, y: number, onDelete: () => void, onBlock: (block: boolean) => void, onAsRead: () => void }) {
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
            <div className="block" onClick={() => onBlock(!blocked)}>
                <div className="icon"></div>
                <div className="label">{blocked ? 'Unblock' : 'Bolck'}</div>
            </div>
            <div className="delete" onClick={onDelete}>
                <div className="icon"></div>
                <div className="label">Delete chat</div>
            </div>
        </div>
    )
}