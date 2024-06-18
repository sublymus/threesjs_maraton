import { useAppRouter } from "../../AppStore"
import './PageCommand.css'
import { useCommandStore } from "./CommandStore";
import { useEffect } from "react";
import { useRegisterStore } from "../PageRegister/RegisterStore";
import { getImg } from "../../../Tools/StringFormater";

export function PageCommand() {
    const { check } = useAppRouter();
    const {store} = useRegisterStore();
    const {  commands , fetchCommands } = useCommandStore();
    useEffect(()=>{
        store&&fetchCommands({})
    },[store])
    return (check('command') && <div className="page-command">
         <div className="cart-top">Commands</div>
        <div className="products">
            {
                commands?.list.map((p) =>(
                    <div className={"product " + p.status}>
                        <div className="img" style={{ background: getImg(p.images[0]) }}></div>
                        <div className="ref">
                            <div className="title">{p.title}</div>
                            <div className="id">#{p.id.slice(0, 13)}</div>
                            <div className="id">{new Date(p.created_at).toDateString()}</div>
                        </div>
                        <div className="number">{p.quantity}</div>
                        <div className="price">{Math.trunc(p.price * p.quantity * 100) / 100} ₽</div>
                        <div className="status">{p.status}</div>
                    </div>
                )
             )
            }
        </div>
    </div>
    )
}
 