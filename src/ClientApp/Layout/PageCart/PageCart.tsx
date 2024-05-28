import { useAppRouter } from "../../AppStore"
import './PageCart.css'
import { useCommandStore } from "../PageCommand/CommandStore";
import { useEffect } from "react";
import { CommandInterface } from "../../../DataBase";
import { useRegisterStore } from "../PageRegister/RegisterStore";
import { getImg } from "../../../Tools/StringFormater";

export function PageCart() {
    const { check, setAbsPath } = useAppRouter();
    const { carts, fetchCarts,confirmCommand } = useCommandStore();
    const { store } = useRegisterStore()
    useEffect(() => {
        store && fetchCarts({})
    }, [store])

    let i = 0;
    carts?.list?.forEach((c) => i += Number(c.quantity));
    let total = 0;
    carts?.list?.forEach((c) => total += c.price * c.quantity);
    return (check('cart') && <div className="page-cart">
        <div className="cart-top">
            Your Cart
        </div>
        <div className="products">
            {
                carts?.list?.map((p) => <Card cart={p} key={p.id} />)
            }
        </div>
        <div className="btm">
            <div className="resume">
                <div className="count"><span>{i}</span> {(i || 0) > 1 ? 'Items' : 'Item'}</div>
                <div className="total">Total : <span>{Math.trunc(total * 100) / 100}</span> ₽</div>
            </div>
            <div className="command" onClick={()=>{
                confirmCommand().then((ok)=>{   
                    if(ok){
                        setAbsPath(['profile','command'])
                    }
                })
            }}> COMMAND</div>
        </div>
    </div>
    )
}

function Card({ cart }: { cart: CommandInterface }) {
    const { updateCommand , deleteCommand} = useCommandStore();
    const _q = Number(cart.quantity);
    return (
        <div className="product">
            <div className="img" style={{ background: getImg(cart.images[0]) }}></div>
            <div className="text">
                <div className="title">{cart.title}</div>
                <div className="id">#{cart.id.split('-')[0]}</div>
            </div>
            <div className="quantity">
                
                <div className="min" onClick={() => {
                    const q = _q - 1 < 0 ? 0 : _q - 1;
                    updateCommand(cart.id, q)
                }}></div>
                <div className="number">{cart.quantity}</div>
                <div className="max" onClick={() => {
                    const q = _q + 1 > cart.stock ? cart.stock : _q + 1
                    updateCommand(cart.id, q)
                }}></div>
            </div>
            <div className="price">{Math.trunc(cart.price * _q * 100) / 100} ₽</div>
            <div className="remove" onClick={() => {
                deleteCommand(cart.id)
            }}></div>
        </div>
    )
}