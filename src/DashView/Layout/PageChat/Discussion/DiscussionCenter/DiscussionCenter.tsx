import { useRegisterStore } from "../../../PageAuth/RegisterStore";
import { useDiscussionStore } from '../DiscussionStore'
import { Click, limit, toDate } from "../../../../../Tools/StringFormater";
import { Host } from "../../../../../Config";
import './DiscussionCenter.css'
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../../../../Hooks";


export function DiscussionsCenter() {
    const { discussion: d, messages: ms ,fetchSendMessage } = useDiscussionStore()
    const { user } = useRegisterStore();
    const [senderSize, setSenderSize] = useState(1)
    const messagesRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
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
        console.log({ l, a, n, v });
        // console.log(v);

        setSenderSize(v)
    }
    useEffect(() => {
        calculTextareaSize()
    }, [size])
    useEffect(()=>{
        textareaRef.current && textareaRef.current.scrollTo({top:textareaRef.current.scrollHeight})
    },[])
    
    const photo = d?.[d?.other]?.photos[0];

    const current = (m: any, i: number) => {
        return m.list[i].user_id == user?.id ? 'right' : 'left'
    }
    const last = (m: any, i: number) => {
        return m.list[i - 1] && m.list[i - 1].user_id == user?.id ? 'right' : 'left'
    }
    const next = (m: any, i: number) => {
        return m.list[i + 1] && (m.list[i + 1].user_id == user?.id ? 'right' : 'left')
    }
    return d && user && (<div className="discussion-center">
        <div className="top">
            <div className="profile" style={{ background: `no-repeat center/cover url(${photo?.startsWith('/') ? Host : ''}${photo})` }}></div>
            <div className="ctn-name">
                <div className="name">{limit(d['receiver'].name, 50)}</div>
                <div className="last-time">Last seen {toDate(d['creator_opened_at'])}</div>
            </div>
            <div className="option">
                <div className="more" onClick={Click()}></div>
            </div>
        </div>
        <div className="messages" ref={messagesRef} onScroll={(e) => {

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
                console.log(id);

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
                        <div key={m.id} className="message">
                            <div className={"ctn " + side + ' ' + rang}>
                                <div className="text">{m.text}</div>
                                <div className="file"></div>
                                <div className="date">{toDate(m.created_at)}</div>
                            </div>
                        </div>
                    )
                })
            }
              
        </div>
        <div className="sender">
            {
                scroll.isOpen && <div className="down-btn" onClick={() => {
                    console.log('##########');

                    messagesRef.current && (messagesRef.current.scrollTo({
                        behavior: 'smooth',
                        top: scroll.height
                    }))
                }}></div>
            }
            <div className="ctn">
                <div className="left">
                    <div className="add-file" onClick={Click()}></div>
                </div>
                <textarea ref={textareaRef} name="discussion_sender" placeholder="Type a message here.." id="discussion_sender" style={{ height: `${senderSize * 20}px` }} cols={30} rows={10} onChange={(_e) => {
                    calculTextareaSize()
                }}></textarea>
                <div className="right">
                    <div className="emoji" onClick={Click()}></div>
                    <div className='audio' onClick={Click()}></div>
                    <div className="send" onClick={(e) => {
                        Click()(e);
                        fetchSendMessage({
                            discussion_id:d.id,
                            text:textareaRef.current?.value
                        })
                    }}>
                        <div className="icon"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
