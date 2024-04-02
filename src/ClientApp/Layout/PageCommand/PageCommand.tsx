import { Host, useAppRouter } from "../../AppStore"
import './PageCommand.css'
import { useRegisterStore } from "../PageRegister/RegisterStore";
import { useProductStore } from "../../Components/Products/ProductStore";
import { ProductInterface } from "../../../DataBase";
;

export function PageCommand() {
    const { check } = useAppRouter();
    const { products } = useProductStore();
    const { } = useRegisterStore();
    return (check('command') && <div className="page-command">
        <div className="products">
            {
                [...products, ...products, ...products].map((p, i) => <Card status={['pause', 'running', 'revoke', 'delivery'][(i++) % 4]} product={{ ...p, stock: 20 }} collectedFeatures={{}} id={p.id} quanty={i} key={p.id+i} />)
            }
        </div>
    </div>
    )
}

function Card(cartProduct: {
    product: ProductInterface,
    quanty: number,
    id: string,
    status: string,
    collectedFeatures: Record<string, string | number | boolean>
}) {
    const { product, quanty, status } = cartProduct
    
    return (
        <div className={"product " + status}>
            <div className="img" style={{ backgroundImage: `url(${Host}${product.images[0]})` }}></div>
            <div className="ref">
                <div className="title">{product.title}</div>
                <div className="id">{product.id.slice(0,13)}</div>
            </div>
            <div className="number">{quanty}</div>
            <div className="price">{product.price * (quanty)} ₽</div>
            <div className="status">{status}</div>
            <div className="remove"></div>
        </div>
    )
}