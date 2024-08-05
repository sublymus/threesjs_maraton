import './PageCart.css'
import { useAppRouter } from "../../AppStore";
import { useProductStore } from '../PageProducts/ProductStore';
import { useEffect, useState } from 'react';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { Visites } from '../../Components/Visites/Visites';
import { MoreProduct } from '../../Components/MoreProduct/MoreProduct';
import { useCommandStore } from "../PageCommand/CommandStore";
import { CommandInterface } from '../../../DataBase';
import { getImg } from '../../../Tools/StringFormater';
import { toFilter } from '../../../Tools/FilterColor';
import { PageAuth } from '../PageRegister/PageAuth';
import { ProductQuantity } from "../../Components/ProductQuantity/ProductQuantity";
import { FavoritesBtn } from '../../Components/FavoritesBtn/FavoritesBtn';
export function PageCart() {
    const { check, pathList, navBack, qs } = useAppRouter();
    const { visites, fetchVisites } = useProductStore();
    const { current } = useAppRouter();
    const { user } = useRegisterStore();
    const { carts, fetchCarts, deleteCommand, confirmCommand } = useCommandStore();

    const [refresh, setRefresh] = useState(0)
    const [total, setTotal] = useState(0);
    const [all, setAll] = useState(0)
    const [selecteds, setSelecteds] = useState<CommandInterface[]>(carts?.list.map(c => c) || [])
    const [s] = useState<any>({})
    s.selecteds = selecteds
    useEffect(() => {
        let i = 0;
        let total = 0;
        selecteds.forEach((c: any) => {
            i += Number(c.quantity);
            total += c.price * c.quantity
        });
        setTotal(total)
        setAll(i)

    }, [refresh, selecteds])

    useEffect(() => {
        setSelecteds(carts?.list.filter(f => !!s.selecteds.find((a: any) => a.id == f.id)) || [])
    }, [carts])

    useEffect(() => {
        user && current('cart') && fetchCarts({}).then((cs => {
            if (cs?.list) {
                setSelecteds(cs.list)
            }
        }));
        !visites && user && current('cart') && fetchVisites({})
    }, [user, pathList]);


    return check('cart') && (!user ? <div className='page-cart'>
        <PageAuth detail='Google connexion is required to access your cart' />
    </div> : <div className='page-cart'>
        <div className="top-cart _flex">
            <div className="return" onClick={() => {
                navBack();
            }}></div>
            <div className="label _lr-auto">Cart</div>
        </div>
        <div className="cart-ctn">
            <div className="items">
                <div className="select-all">
                    <div className={"btn " + (selecteds.length < (carts?.list.length || 0) ? '' : 'select')} onClick={() => {
                        selecteds.length < (carts?.list.length || 0) ? setSelecteds(carts?.list.map(c => c) || []) : setSelecteds([])
                    }}>{selecteds.length < (carts?.list.length || 0) ? 'Select All' : 'Deselect All'}</div>
                    <a className="my-command " onClick={() => qs({ page: 'command' }).setAbsPath(['profile'])}>my orders <span></span></a>
                </div>
                {
                    carts?.list.map(c => (
                        <CartItem selected={!!selecteds.find((s) => s.id == c.id)} key={c.id} cart={c} onSelect={(c) => {
                            if (selecteds.find((s) => s.id == c.id)) {
                                setSelecteds(selecteds.filter(s => s.id != c.id))
                            } else {
                                setSelecteds([...selecteds, c])
                            }
                        }} onDelete={(c) => {
                            deleteCommand(c.id);
                        }} onQuantityChange={() => {
                            setRefresh(refresh + 1)
                        }} onLike={() => {
                            fetchCarts({}).then((cs => {
                                if (cs?.list) {
                                    setSelecteds(cs.list)
                                }
                            }));
                        }} />
                    ))
                }
            </div>
            <div className="right">
                <div className="go-to-checkout">
                    <div className="title" onClick={() => {
                        confirmCommand({
                            list: selecteds.map(s => s.id)
                        })
                    }}>Go to checkout</div>
                    <p>Available delivery methods and times can be selected when placing an order.</p>
                    <div className="infos">
                        <div className="count">
                            <h2>Your cart</h2>
                            <div className="val">{all} products <span></span> {/* '700g' */}</div>
                        </div>
                        <div>
                            <span>Products ({selecteds.length})</span>
                            <span className='initial-price'>{total.toLocaleString()}{'$'}</span>
                        </div>

                        <div>
                            <div className="text">
                                <div>Discount</div>
                                <div className="detail">More details <span></span></div>
                            </div>
                            <span className='discount'>{Number(0).toLocaleString()}{'$'}</span>
                        </div>
                    </div>
                    <div className="_flex">
                        <h1>total cost</h1>
                        <h1 className="total">{total.toLocaleString()}{'$'}</h1>
                    </div>
                </div>
                    <div className="cart-cover-image"></div>
            </div>
        </div>
        <Visites mode='h' />
        <MoreProduct mode='h' />
    </div>)
}


function CartItem({ cart, selected, onClick, onSelect, onDelete, onLike, onShare, onQuantityChange }: { onQuantityChange?: (c: CommandInterface) => any, onDelete?: (c: CommandInterface) => any, onLike?: (c: CommandInterface) => any, onShare?: (c: CommandInterface) => any, onClick?: (c: CommandInterface) => any, onSelect?: (c: CommandInterface) => any, selected?: boolean, cart: CommandInterface }) {
    console.log(cart);
    
    return <div className="cart-item" onClick={() => onClick?.(cart)}>
        <div className="infos">
            <div className="image" style={{ background: getImg(cart.images[0]) }}></div>
            <div className="info-right  _limit-text">
                <div className="top">
                    <div className="a">
                        <h3 className="name _limit-text"><span className='product-title'>{cart.title}</span> <span className='slash'>/</span> <span>{cart.description}</span></h3>
                        <div className="features">
                            {
                                Object.keys(/* cart.collected_features */{ ...cart.collected_features } || {}).slice(0, 2).map(k => (
                                    <div key={k} className='feature'><span className='k'>{k}</span>:<span className='v'>{(cart.collected_features || {})[k]?.name ? (cart.collected_features || {})[k]?.name : (cart.collected_features || {})[k]?.toString() }</span></div>
                                ))
                            }
                            {
                                Object.keys(/* cart.collected_features */{ ...cart.collected_features || {}}).length > 2 && (
                                    <div className="all-features">See more <span></span></div>
                                )
                            }
                        </div>
                    </div>
                    <div className="price ">
                        <span className="current">{(cart.price * cart.quantity).toLocaleString()} {'$'}</span>
                        {/* <span className="initial-price">{3300} {'$'}</span> */}
                    </div>
                    <ProductQuantity cart={cart} onChange={() => {
                        onQuantityChange?.(cart)
                    }} />

                </div>
                <div className="btm">
                    <div className="options" style={{ position: 'relative' }}>
                        <FavoritesBtn elm={cart} onChange={() => onLike?.(cart)} />
                        <div style={{ filter: toFilter(/* contrast */'#123').result.filter }} className="delete" onClick={() => {
                            onDelete?.(cart)
                        }}><span></span></div>
                        <div style={{ filter: toFilter(/* contrast */'#123').result.filter }} className="share" onClick={() => onShare?.(cart)}><span></span></div>
                    </div>
                    <div className={"check-box " + (selected ? 'selected' : '')} onClick={() => onSelect?.(cart)}>{selected ? 'selected' : 'not selected'}</div>
                </div>
            </div>
        </div>
    </div>
}