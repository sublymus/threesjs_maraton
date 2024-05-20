import {useAppRouter } from "../../AppStore"
import './PageCart.css'
import { useProductStore } from "../../Components/Products/ProductStore";
import { useState } from "react";
import { ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";

export function PageCart() {
    const { check } = useAppRouter();
    const { products } = useProductStore();
    const ps = products.list;
    return (check('cart') && <div className="page-cart">
        <div className="products">
            {
                ps.map((p, i) => <Card  product={{ ...p, stock: 20 }} collectedFeatures={{}} id={p.id} quantity={i} key={p.id+i} />)
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
    quantity: number,
    id: string,
    collectedFeatures: Record<string, string | number | boolean>
}) {
    const { product, quantity } = cartProduct
    const [_quantity, setQuantity] = useState(quantity);

    return (
        <div className="product">
            <div className="img" style={{ backgroundImage: `url(${Host}${product.images[0]})` }}></div>
            <div className="title">{product.title}</div>
            <div className="quantity">
                <div className="min" onClick={() => {
                    setQuantity(_quantity - 1 < 0 ? 0 : _quantity - 1)
                }}></div>
                <div className="number">{_quantity}</div>
                <div className="max" onClick={() => {
                    setQuantity(_quantity + 1 > product.stock ? product.stock : _quantity + 1)
                }}></div>
            </div>
            <div className="price">{product.price * (quantity)} ₽</div>
            <div className="remove"></div>
        </div>
    )
}