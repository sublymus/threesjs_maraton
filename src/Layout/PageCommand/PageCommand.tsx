import { Host, useAppStore } from "../../AppStore"
import './PageCommand.css'
import { useRegisterStore } from "../PageRegister/RegisterStore";
import { useProductStore } from "../../Components/Products/ProductStore";
import { useState } from "react";
import { ProductInterface } from "../../DataBase";

export function PageCommand() {
    const { check } = useAppStore();
    const { products } = useProductStore();
    const { } = useRegisterStore();
    return (check('command') && <div className="page-command">
        <div className="products">
            {
                products.map((p , i) => <Card  product={p} collectedFeatures={{}} id={p.id} quanty={i} key={p.id}  />)
            }
        </div>
    </div>
    )
} 

function Card(cartProduct:{
    product:ProductInterface,
    quanty:number,
    id:string,
    collectedFeatures:Record<string, string|number|boolean>
}) {
    const { product , quanty } = cartProduct
    const [_quanty ,  setQuanty] = useState(quanty);
    return (
        <div className="product">
                        <div className="img" style={{backgroundImage:`url(${Host}${product.images[0]})`}}></div>
                        <div className="title">{product.title}</div>
                            <div className="quanty">
                                <div className="min" onClick={()=>{
                                    setQuanty(quanty-1 < 0? 0:quanty-1)
                                }}></div>
                                <div className="number">{_quanty}</div>
                                <div className="plus"  onClick={()=>{
                                    setQuanty(quanty+1 > product.stock? product.stock:quanty+1)
                                }}></div>
                            </div>
                            <div className="price">{product.price*(quanty+1)} ₽</div>
                    </div>
    )
}