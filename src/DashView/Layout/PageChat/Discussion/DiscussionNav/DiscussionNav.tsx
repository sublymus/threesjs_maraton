import { useEffect, useRef, useState } from "react";
import { useRegisterStore } from "../../../PageAuth/RegisterStore";
import { useDiscussionStore } from '../DiscussionStore'
import { getImg, limit, toDate } from "../../../../../Tools/StringFormater";
import { SearchUser } from "../../../../Component/SearchUser/SearchUser";
import './DiscussionNav.css'
import { useDashRoute, useDashStore } from "../../../../dashStore";
import { limitPopupPosition } from "../../../../../Tools/BindToParentScroll";
export function DiscussionsNav() {
    const [optionActive, setOptionActive] = useState('all')
    const {
        discussion,
        discussions,
        setDiscussion,
        fetchDiscussions,
        addDiscussion,
        asReadDiscussion,
        blockDiscussion,
        deleteDiscussion,
        unBlockDiscussion,
        openDiscussionMessages,
        setDiscussionByCollaboId
    } = useDiscussionStore();
    const { json} = useDashRoute();
    const { openChild} = useDashStore()
    const { user , store } = useRegisterStore();
    useEffect(() => { 
        store&&fetchDiscussions()
    }, [store])

    useEffect(()=>{
        if(json?.collaborator_id){
            setDiscussionByCollaboId(json?.collaborator_id)
        }
    },[json])
    useEffect(() => {
        if(discussion?.blocked?.includes(user?.id||'')){
            setOptionActive('blocked')
        }
    }, [discussion])

    if (!user) return undefined;
    const all = discussions?.filter(d => {
        return !d.blocked?.includes(user.id)
    })
    const blocked = discussions?.filter(d => {
        return d.blocked?.includes(user.id)
    })
    const _new = all?.filter(d => {
        return d.unchecked_count > 0
    })

    let ds: typeof discussions = [];
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
                openChild(<SearchUser setUser={(collabo) => {
                    addDiscussion(collabo)
                }} />, true, '#0002')
            }}> <span></span></div>
        </div>
        <div className="options">
            <div className="option" onClick={() => {
                setOptionActive('all')
            }}><div className={(optionActive == 'all' ? 'active' : '')}>All{(all?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            <div className="option" onClick={() => {
                setOptionActive('new')
            }}><div className={optionActive == 'new' ? 'active' : ''}>New {(_new?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            <div className="option" onClick={() => {
                setOptionActive('blocked')
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
                            setDiscussion(d);

                            openDiscussionMessages(d.id);
                            const div = e.currentTarget.querySelector('.count')! as HTMLDivElement;
                            div.style.display = 'none';

                        }} onContextMenu={(e) => {
                            e.preventDefault();
                            openChild(<DiscussionPopu blocked={!!blocked?.includes(d)} x={e.clientX} y={e.clientY}
                                onBlock={(block) => {
                                    if (block){
                                        blockDiscussion(d);
                                        setOptionActive('blocked');
                                    }
                                    else{
                                        unBlockDiscussion(d);
                                        setOptionActive('all');
                                    }
                                }}
                                onAsRead={() => {
                                    asReadDiscussion(d)
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

function DiscussionPopu({ x, y, onBlock, onAsRead, onDelete, blocked }: { blocked: boolean, x: number, y: number, onDelete: () => void, onBlock: (block: boolean) => void, onAsRead: () => void }) {
    const ref = useRef<HTMLDivElement|null>(null)
    useEffect(()=>{
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