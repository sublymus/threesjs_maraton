import './PageService.css'
import { useAppStore } from "../../AppStore";
import { useState } from 'react';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { useProfileStore } from '../PageProfile/ProfileStore';
// import React from 'react';
const discussions = [
    {
        id: 'z',
        client_id: '1',
        service_id: 'a',
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore eos consequuntur cumque molestiae natus pariatur inventore similique nihil autem unde accusamus aliquid rerum doloremque, dolore voluptatem? Ratione consectetur magni iure!',
        icon: '',
        created_at: "2024-02-15T19-36-20",
        is_closed: false
    }, {
        id: 'u',
        client_id: 'b',
        service_id: 'a',
        title: 'rwerwgrgrgr',
        icon: '',
        created_at: "2024-02-15T19-36-20",
        is_closed: true,
    }, {
        id: 'e',
        client_id: 'd',
        service_id: 'a',
        title: 'rwerwgrgrgr',
        icon: '',
        created_at: "2024-02-15T19-36-20",
        is_closed: false,
    },
];
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
    const { check } = useAppStore();
    const {user} = useRegisterStore();
    const {openPhoto} = useProfileStore();
    const [discussion, setDiscussion] = useState<typeof discussions[0] | null>(discussions[0])

    return check('service') && (
        <div className="page-service">

            <div className="ctn-service2">
                <div className="discussion-ctn">
                    {
                        discussions.map((discusion) => (
                            <div className='discussion' key={discusion.id} onClick={() => {
                                setDiscussion(discusion)
                            }}>
                                <div className="title">{discusion.title.length >= 35 ? discusion.title.slice(0, 35) + '...' : discusion.title}</div>
                                <div className="stat">
                                <div className={"date " + (discusion.is_closed ? 'yes' : '')}>{new Date().toDateString()}</div>
                                <div className={"is-closed " + (discusion.is_closed ? 'yes' : '')}>{(discusion.is_closed ? 'open' : 'close')}</div>
                                </div>
                            </div>))
                    }
                </div>
                <div className="messages">
                    <div className="ctn-sms">
                        {
                            messages.map((message) =>{
                                const url = message.client == discussion?.service_id ? 'https://lesdeuxpiedsdehors.com/wp-content/uploads/2019/05/comprendre-la-composition-photo.jpg' : 'https://img.freepik.com/photos-gratuite/flamme-rougeoyante-abstraite-tombe-dans-ia-generative-eclairage-electrique_188544-8092.jpg?size=626&ext=jpg&ga=GA1.1.1908636980.1711670400&semt=sph';
                                return (
                                    <div key={message.id} className={'message-ctn ' + ((message.client != discussion?.service_id) ? 'right' : '')}>
                                    <div className={"message "} >
                                        <div className="icon" style={{border:'1px' ,
                                        backgroundImage:`url(${url})` }} onClick={()=>[
                                            openPhoto(url)
                                        ]}></div>
                                        <div className="text-ctn">
                                            <div className="text">{message.text}</div>
                                            <div className="bottom">
                                                <div className='hour'>{message.created_at}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                    <div className="sender">
                        <textarea name="sms" id="sms" />
                        <div className='icon'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}