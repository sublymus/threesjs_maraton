import './PageCommand.css'
import { useCommandStore } from "./CommandStore";
import { useEffect } from "react";
import { useRegisterStore } from "../PageRegister/RegisterStore";
import { getImg } from "../../../Tools/StringFormater";
import { CommandInterface } from '../../../DataBase';
import { toFilter } from '../../../Tools/FilterColor';

const StatusColors :any = {
    // IN_DELIVERY :'#345'
}

export function PageCommand() {
    const { store } = useRegisterStore();
    const { commands, fetchCommands } = useCommandStore();
    useEffect(() => {
        store && fetchCommands({})
    }, [store])
    return <div className="page-command">
        <div className="orders">
            {
                commands?.list.map((p) => (
                    <OrderItem order={p} key={p.id} onShare={() => { }} onClick={() => { }} onLike={() => { }} />
                )
                )
            }
        </div>
    </div>
} let features = {
    metal: 'gold',
    'gem': 'Diamon',
    size: 56
} as any

function OrderItem({ order, onClick, onLike, onShare, onComment }: { onComment?: (c: CommandInterface) => any, onLike?: (c: CommandInterface) => any, onShare?: (c: CommandInterface) => any, onClick?: (c: CommandInterface) => any, order: CommandInterface }) {

    return <div className="order-item" onClick={() => onClick?.(order)}>
        <div className="infos">
            <div className="image" style={{ background: getImg(order.images[0]) }}></div>
            <div className="info-right  _limit-text">
                <div className="top">
                    <div className="a">
                        <h3 className="name _limit-text"><span className='product-title'>{order.title}</span> <span className='slash'>/</span> <span>{order.description}</span></h3>
                        <div className="features">
                            {
                                Object.keys(/* order.collected_features */{ ...features } || {}).slice(0, 2).map(k => (
                                    <div key={k} className='feature'><span className='k'>{k}</span>:<span className='v'>{(/* order.collected_features */features || {})[k]}</span></div>
                                ))
                            }
                            {
                                Object.keys(/* order.collected_features */features || {}).length > 2 && (
                                    <div className="all-features">See more <span></span></div>
                                )
                            }
                        </div>
                    </div>
                    <div className="price ">
                        <span className="current">{(order.price * order.quantity).toLocaleString()} {'$'}</span>
                        {/* <span className="initial-price">{3300} {'$'}</span> */}
                    </div>
                    <div className="status" style={{background:StatusColors[order.status]}}>{order.status}</div>

                </div>
                <div className="btm">
                    <div className="options">
                        <div style={{ filter: toFilter(/* contrast */'#123').result.filter }} className="to-favorites" onClick={() => onLike?.(order)}><span ></span></div>
                        <div style={{ filter: toFilter(/* contrast */'#123').result.filter }} className="start-comment" onClick={() => {
                            onComment?.(order)
                        }}><span></span></div>
                        <div style={{ filter: toFilter(/* contrast */'#123').result.filter }} className="share" onClick={() => onShare?.(order)}><span></span></div>
                    </div>
                    <div className="ref-id" onClick={(e) => {
                        navigator.clipboard.writeText('#' + order.id.split('-')[0])
                        const div = e.currentTarget;
                        const span = div.querySelector('span')! as HTMLSpanElement;
                        span.classList.add('anim-top');
                        setTimeout(() => {
                            span.classList.remove('anim-top');
                            span.classList.add('anim-btm');
                            setTimeout(() => {
                                span.classList.remove('anim-btm');
                            }, 300);
                        }, 300);
                    }}>Ref Id : #{order.id.split('-')[0]} <span style={{ filter:/* Discret */toFilter('#333').result.filter }}></span></div>
                    {/* <div className="check-box">
                        lol {'>'}
                    </div> */
                        // suivre la command
                    }
                </div>
            </div>
        </div>
    </div>
}