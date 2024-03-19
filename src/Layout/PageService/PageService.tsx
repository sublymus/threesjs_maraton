import './PageService.css'
import { useAppStore } from "../../AppStore";
import { useState } from 'react';
// import React from 'react';
const discussions = [
    {
        id: 'z',
        client_id: '1',
        service_id: 'a',
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore eos consequuntur cumque molestiae natus pariatur inventore similique nihil autem unde accusamus aliquid rerum doloremque, dolore voluptatem? Ratione consectetur magni iure!',
        icon: '',
        is_closed: false
    }, {
        id: 'u',
        client_id: 'b',
        service_id: 'a',
        title: 'rwerwgrgrgr',
        icon: '',
        is_closed: true,
    }, {
        id: 'e',
        client_id: 'd',
        service_id: 'a',
        title: 'rwerwgrgrgr',
        icon: '',
        is_closed: false,
    },
]
const messages = [
    {
        id: "1",
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore eos consequuntur cumque molestiae natus pariatur inven',
        client: '1',
        created_at: "2024-02-15T19-36-20"
    }, {
        id: "2",
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore eos consequuntur cumque molestiae natus pariatur inventore similique nihil autem unde accusamus aliquid rerum doloremque, dolore voluptatem? Ratione consectetur magni iure!',
        client: 'a',
        created_at: "2024-02-15T19-36-20"
    }, {
        id: "3",
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore eos consequuntur cumque molestiae natus pariatur inventore similique nihil autem unde accusamus aliquid rerum doloremque, dolore voluptatem? Ratione consectetur magni iure!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore eos consequuntur cumque molestiae natus pariatur inventore similique nihil autem unde accusamus aliquid rerum doloremque, dolore voluptatem? Ratione consectetur magni iure!',
        client: 'a',
        created_at: "2024-02-15T19-36-20"
    }, {
        id: "4",
        text: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Tempore eos consequuntur cumque',
        client: '1',
        created_at: "2024-02-15T19-36-20"
    },
]
export function PageService() {
    const { page, isAllowed, setPage } = useAppStore();
    const [discussion, setDiscussion] = useState<typeof discussions[0] | null>(discussions[0])
    return isAllowed(page, 'page-service') && (
        <div className="page-service">
            <div className="service-background" onClick={() => {
                setPage('catalogue')
            }}></div>
            <div className="ctn-service">
                <div className="close"  onClick={() => {
                setPage('catalogue')
            }}></div>
                <div className="ctn-service2">
                    <div className="discussion-ctn">
                        {
                            discussions.map((discusion) => (
                                <div className='discussion' key={discusion.id} onClick={() => {
                                    setDiscussion(discusion)
                                }}>
                                    <div className="icon">{discusion.icon}</div>
                                    <div className="title">{discusion.title.length >= 35 ? discusion.title.slice(0, 35) + '...' : discusion.title}</div>
                                    <div className={"is-closed " + (discusion.is_closed ? 'yes' : '')}>{(discusion.is_closed ? 'open' : 'close')}</div>
                                </div>))
                        }
                    </div>
                    <div className="messages">
                        <div className="ctn-sms">
                            {
                                messages.map((message) => (
                                    <div key={message.id} className={'message-ctn ' + ((message.client != discussion?.service_id) ? 'right' : '')}>
                                        <div className={"message "}>
                                            <div className="icon"></div>
                                            <div className="text-ctn">
                                                <div className="text">{message.text}</div>
                                                <div className="bottom">
                                                    <div className='hour'>{message.created_at}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="sender">
                            <textarea  name="sms" id="sms" />
                            <div className='icon'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}