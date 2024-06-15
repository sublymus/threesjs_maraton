import { useEffect, useRef, useState } from "react";
import { useRegisterStore } from "../../../PageAuth/RegisterStore";
import { useDiscussionStore } from '../DiscussionStore'
import { useServiveStore } from "./ServiceStore";
import { getImg, getSeconContext, limit, toDate } from "../../../../../Tools/StringFormater";
import { SearchUser } from "../../../../../DashView/Component/SearchUser/SearchUser";
import './ServiceNav.css'
import { useAdminRoute, useAdminStore } from "../../../../AdminStore";
import { limitPopupPosition } from "../../../../../Tools/BindToParentScroll";
import { useModeratorStore } from "../../../Moderators/ModeratorStore";
import { Discussion } from "../../../../../DataBase";
import { useUserStore } from "../../../Users/UserStore";
export function ServiceNav() {
    const {
        addDiscussion,
        blockDiscussion,
        deleteDiscussion,
        unBlockDiscussion,
    } = useDiscussionStore();
    const {
        serviceStore,
        serviceStores,
        setServiceStoreById,
        fetchServiceStores,
        serviceDiscussions,
        serviceDiscussion,
        setServiceDiscussionById,
        fetchServiceDiscussions,
    } = useServiveStore()
    const { check, json, pathList, qs } = useAdminRoute();
    const optionPath = pathList[3]?.split('_')[1]
    const [optionActive, setOptionActive] = useState(optionPath || 'all')
    const { openChild } = useAdminStore()
    const { user } = useRegisterStore();
    const { fetchUsers } = useUserStore();
    const { fetchModerators } = useModeratorStore();
    // const [stores, setStores] = useState<StoreInterface[]|undefined>();
    useEffect(() => {
        if (user && (json?.collaborator_id || json?.moderator_id)) {
            console.log({ json });

            setServiceDiscussionById({
                async findOther(other_id/*, store_id*/) {
                    return (await fetchUsers({ query: { user_id: other_id } }))?.list[0]
                },
                other_id: json?.collaborator_id || json?.moderator_id,
                store_id: json?.store_id
            })
        } else if (json && user && check('services') && json.store_id) {
            setServiceStoreById(json.store_id)
        }
        setOptionActive(optionPath || 'all')
    }, [json, user]);

    useEffect(() => {
        setOptionActive(optionPath || 'all')
    }, [pathList])

    useEffect(() => {
        user && check('services') && fetchServiceStores({})
    }, [user])

    useEffect(() => {
        check('services') && serviceStore && fetchServiceDiscussions({
            store_id: serviceStore.id
        })
    }, [serviceStore])

    if (!user) return undefined;
    const all = serviceDiscussions?.list.filter(d => {
        return !d.blocked?.includes(user.id)
    })
    const blocked = serviceDiscussions?.list.filter(d => {
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
    return (<div className="service-nav">
        <div className="title">
            <div className="label">{serviceStore?.name || 'Services'} </div>
            {
                serviceStore && <div className="add-new" onClick={() => {
                    openChild(<SearchUser user={user} openChild={openChild} fetchUsers={fetchModerators} setUser={(moderator) => {
                        addDiscussion({
                            other: moderator,
                        })
                    }} />, true, '#0002')
                }}> <span></span></div>
            }
        </div>
        {
            !serviceStore && <div className="options">
                <div className="option" onClick={() => {
                    qs(json || {}).setAbsPath(['chat', 'services', 'services_all'])
                }}><div className={(optionActive == 'all' ? 'active' : '')}>All{(all?.length || 0) > 0 ? <span></span> : undefined}</div></div>
                <div className="option" onClick={() => {
                    qs(json || {}).setAbsPath(['chat', 'services', 'services_new'])
                }}><div className={optionActive == 'new' ? 'active' : ''}>New {(_new?.length || 0) > 0 ? <span></span> : undefined}</div></div>
                <div className="option" onClick={() => {
                    qs(json || {}).setAbsPath(['chat', 'services', 'services_blocked'])
                }}><div className={optionActive == 'blocked' ? 'active' : ''}>Blocked  {(blocked?.length || 0) > 0 ? <span></span> : undefined}</div></div>
            </div>
        }
        <div className="search">
            <div className="input">
                <div className="icon"></div>
                <input type="text" placeholder='Search' />
            </div>
        </div>
        <div className="service-stores">
            {
                serviceStores?.list.map((s) => (
                    <div className={"store " + (serviceStore?.id == s.id ? 'active' : '')} onClick={() => {
                        // qs({ store_id: s.id }).setAbsPath(['chat', 'services', 'services_stores'])
                        qs({ store_id: s.id }).setAbsPath(['chat', 'services', 'services_all'])
                    }}>
                        <div className="logo" style={{ background: getImg(s.logo?.[0]) }}></div>
                        <div className="right">
                            <div className="top-ctn">
                                <div className="name">{limit(s.name, 16)}</div>
                            </div>
                            <div className="btm">
                                <div className="email">{limit(s.store_email, 24)}</div>
                                {/* <div className="count" style={{ display: discussion?.id == d.id ? 'none' : d.unchecked_count > 0 ? 'flex' : 'none' }}>{d.unchecked_count}</div> */}
                                <div className="count" style={{ display: 'flex' }}>5</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="services">
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
                        <div key={d.id} className={"service " + (serviceDiscussion?.id == d.id ? 'active' : '')} onClick={(e) => {
                            d.unchecked_count = 0;
                            //@ts-ignore
                            qs({ store_id: getSeconContext(undefined, d), [getSeconContext(undefined, d) ? 'collaborator_id' : 'moderator_id']: d.other.id }).setAbsPath(['chat', 'services', 'services_' + (optionActive || '_all')])
                            const div = e.currentTarget.querySelector('.count')! as HTMLDivElement;
                            div.style.display = 'none';

                        }} onContextMenu={(e) => {
                            e.preventDefault();
                            openChild(<DiscussionPopu blocked={!!blocked?.includes(d)} x={e.clientX} y={e.clientY}
                                onBlock={(block) => {
                                    if (block) {
                                        blockDiscussion(d);
                                        qs(json || {}).setAbsPath(['chat', 'services', 'services_blocked'])
                                    }
                                    else {
                                        unBlockDiscussion(d);
                                        qs(json || {}).setAbsPath(['chat', 'services', 'services_all'])
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
                                    <div className="count" style={{ display: serviceDiscussion?.id == d.id ? 'none' : d.unchecked_count > 0 ? 'flex' : 'none' }}>{d.unchecked_count}</div>
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
    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        ref.current && limitPopupPosition(ref.current)
    })
    return (
        <div ref={ref} className="service-popu" style={{ top: `${y}px`, left: `${x}px` }}>
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