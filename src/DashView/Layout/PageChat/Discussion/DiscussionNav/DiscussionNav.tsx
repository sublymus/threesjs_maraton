import { useEffect, useState } from "react";
import { useRegisterStore } from "../../../PageAuth/RegisterStore";
import { useDiscussionStore } from '../DiscussionStore'
import { getImg, limit , toDate } from "../../../../../Tools/StringFormater";
import { Host } from "../../../../../Config";
import { SearchUser } from "../../../../Component/SearchUser/SearchUser";
import './DiscussionNav.css'
import { useDashStore } from "../../../../dashStore";
export function DiscussionsNav() {
    const [optionActive, setOptionActive] = useState('all')
    const {discussion ,discussions, setDiscussion, fetchDiscussion , fetchMessages , addDiscussion} = useDiscussionStore()
    const {openChild} = useDashStore()
    const { user } = useRegisterStore();
    useEffect(()=>{
        fetchDiscussion()
    },[])
    return user && (<div className="discussion-nav">
        <div className="title">
            <div className="label">Chats</div>
            <div className="add-new" onClick={()=>{
                openChild(<SearchUser setUser={(collabo)=>{
                    console.log({collabo});
                    
                    addDiscussion(collabo)
                }}/>, '#0002')
            }}> <span></span></div>
        </div>
        <div className="options">
            <div className="option" onClick={() => {
                setOptionActive('all')
            }}><div className={(optionActive == 'all' ? 'active' : '')}>All <span></span></div></div>
            <div className="option" onClick={() => {
                setOptionActive('new')
            }}><div className={optionActive == 'new' ? 'active' : ''}>New <span></span></div></div>
            <div className="option" onClick={() => {
                setOptionActive('blocked')
            }}><div className={optionActive == 'blocked' ? 'active' : ''}>Blocked <span></span></div></div>
        </div>
        <div className="search">
            <div className="input">
                <div className="icon"></div>
                <input type="text" placeholder='Search' />
            </div>
        </div>
        <div className="discussions">
            {
                discussions?.map((d, i) => {
                    const mark = 'one';
                    return (
                        <div key={d.id} className={"discussion " + (discussion?.id == d.id ? 'active' : '')} onClick={(e) => {
                            setDiscussion(d);
                            fetchMessages(d.id);
                            const div = e.currentTarget.querySelector('.count')! as HTMLDivElement;
                            div.style.display = 'none'
                        }}>
                            <div className="photo" style={{ background: getImg(d[d.other].photos[0]) }}></div>
                            <div className="right">
                                <div className="top-ctn">
                                    <div className="name">{limit(d[d.other].name, 16)}</div>
                                    <div className="date">{toDate(d?.last_message.created_at)}</div>
                                </div>
                                <div className="btm">
                                    <div className={"checked " + (i % 3 == 0 ? mark : '')}></div>
                                    <div className="text">{limit(d?.last_message.text, 24)}</div>
                                    <div className="count" style={{display:discussion?.id == d.id ?'none':d.unchedked_count>0?'flex':'none'}}>{d.unchedked_count}</div>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    </div>)
}
