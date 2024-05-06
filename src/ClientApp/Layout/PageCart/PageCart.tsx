import {useAppRouter } from "../../AppStore"
import './PageCart.css'
import { useProductStore } from "../../Components/Products/ProductStore";
import { useState } from "react";
import { ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";

export function PageCart() {
    const { check } = useAppRouter();
    const { products } = useProductStore();
    const ps = [...products, ...products, ...products];
    return (check('cart') && <div className="page-cart">
        <div className="products">
            {
                ps.map((p, i) => <Card  product={{ ...p, stock: 20 }} collectedFeatures={{}} id={p.id} quanty={i} key={p.id+i} />)
            }
        </div>
        <div className="btm">
            <div className="resume">
                <div className="count">{ps.length}</div>
            <div className="total">{32000} ₽</div>
            </div>
            <div className="command">{ps.length}</div>
        </div>
    </div>
    )
}

function Card(cartProduct: {
    product: ProductInterface,
    quanty: number,
    id: string,
    collectedFeatures: Record<string, string | number | boolean>
}) {
    const { product, quanty } = cartProduct
    const [_quanty, setQuanty] = useState(quanty);

    return (
        <div className="product">
            <div className="img" style={{ backgroundImage: `url(${Host}${product.images[0]})` }}></div>
            <div className="title">{product.title}</div>
            <div className="quanty">
                <div className="min" onClick={() => {
                    setQuanty(_quanty - 1 < 0 ? 0 : _quanty - 1)
                }}></div>
                <div className="number">{_quanty}</div>
                <div className="max" onClick={() => {
                    setQuanty(_quanty + 1 > product.stock ? product.stock : _quanty + 1)
                }}></div>
            </div>
            <div className="price">{product.price * (quanty)} ₽</div>
            <div className="remove"></div>
        </div>
    )
}