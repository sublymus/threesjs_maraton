import { useState } from 'react'
import { useDashRoute } from '../../dashStore'
import './PageChat.css'
import { useRegisterStore } from '../PageAuth/RegisterStore'
import { Host } from '../../../Config'
// import React from 'react'

const ds = [
    {
        "id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
        "creator_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
        "receiver_id": "00867d5b-7916-4426-ac6c-f5ba8eda629c",
        "deleted": null,
        "blocked": null,
        "unchedked_count": 2,// calculer
        "last_message":{
            "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
            "table_name": "discussions",
            "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
            "text": "opas",
            "files": [],
            "rating_id": null,
            "survey_id": null,
            "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
            "created_at": "2024-05-09 14:04:52",
            "updated_at": "2024-05-09 14:04:52"
        },
        "creator_opened_at": "2024-05-09 12:30:15",
        "receiver_opened_at": null,
        "created_at": null,
        "updated_at": "2024-05-09 13:46:04",
        "receiver": {
            "id": "00867d5b-7916-4426-ac6c-f5ba8eda629c",
            "name": "Opus Opus",
            "email": "sublymus@gmail.com",
            "photos": [
                "https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"
            ],
            "type": null,
            "status": null,
            "created_at": "2024-05-09 12:08:34",
            "updated_at": "2024-05-09 12:08:34"
        },
        "creator": {
            "id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
            "name": "opas opas",
            "email": "sablymus@gmail.com",
            "photos": [
                "https://lh3.googleusercontent.com/a/ACg8ocIEZZjZmlzj7KRhH7VOqo501Eh4eAnFvFMRSnsmQI0TSzH4q50=s96-c"
            ],
            "type": null,
            "status": null,
            "created_at": "2024-05-09 12:10:01",
            "updated_at": "2024-05-09 12:10:01"
        }
    }
]
let toDate = (date: string) => {
    let a: any = new Date(date).toLocaleTimeString();
    a = a.split(':');
    return `${a[0]}:${a[1]}`
}
let limit = (text: string, max: number) => {
    return text.length > max ? text.substring(0, max) + '..' : text
}
export function PageChat() {
    const { user } = useRegisterStore();
    const [optionActive, setOptionActive] = useState('all')
    const [discussionActive, setDiscussionActive] = useState<typeof ds[number]>()
    const { check } = useDashRoute();

    return check('chat') && user && (
        <div className='page-chat'>
            <div className="chat-nav">
                <div className="chats-top">
                    <div className="top">
                        <div className="icon discussions-icon "></div>
                        <div className="icon groups "></div>
                        <div className="icon sessions "></div>
                        <div className="icon surveys "></div>
                        <div className="icon profile " style={{ background: `no-repeat center/cover url(${user.photos[0].startsWith('/') ? Host : ''}${user.photos[0]})` }}></div>
                    </div>
                    <div className="title">
                        <div className="label">Chats</div>
                        <div className="add-new"> <span></span></div>
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
                </div>
                <div className="discussions">
                    {
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,].map((_,i)=>({...ds[0],id:(ds[0].id+i)})).map((d,i) => {
                            const me = d.creator_id == user.id ? 'creator' : 'receiver';
                            const other = d.creator_id == user.id ? 'receiver' : 'creator';
                            d.id = d.id+i
                            return (
                                <div key={d.id} className={"discussion "+ (discussionActive?.id == d.id?'active':'')} onClick={()=>{
                                    setDiscussionActive(d)
                                }}>
                                    <div className="photo" style={{ background: `no-repeat center/cover url(${d[other].photos[0].startsWith('/') ? Host : ''}${d[other].photos[0]})` }}></div>
                                    <div className="right">
                                        <div className="top-ctn">
                                            <div className="name">{limit(d[other].name,16)}</div>
                                            <div className="date">{toDate(d.last_message.created_at)}</div>
                                        </div>
                                        <div className="btm">
                                            <div className="checked"></div>
                                            <div className="text">{limit('d.last_message_textlast_message_text',24)}</div>
                                            <div className="count">{d.unchedked_count}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
            <div className="chat-center">

            </div>
            <div className="chat-info">

            </div>

        </div>
    )
}


















