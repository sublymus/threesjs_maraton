import { ProductScenus } from '../../../DataBase';
import { getImg } from '../../../Tools/StringFormater';
import { NoteStars } from '../NoteStars/NoteStars';
import './ProductCard.css'

export function ProductCard({ product, active, onClick }: {onClick:()=>any,active:boolean, product: ProductScenus }) {
    return (
        <div className={'product-card '+(active?'active':'')} onClick={onClick}>
            <div className="images">
                {
                    product.images.map((i) => (
                        <div key={i} className="image" style={{ background: getImg(i) }}></div>
                    ))
                }
            </div>
            <div className="infos">
                <div className="name">{product.title}</div>
                <div className="stars">
                    {product.note && <NoteStars note={product.note.value}/>}
                    <div className="value">{product.note?.vote} <span></span></div>
                </div>
                <div className="price">
                    <div className="value">12450.93 $</div>
                </div>
                <div className="add-btn">
                    <div className="btn">Add <span> to cart</span></div>
                </div>
            </div>
        </div>
    )

} 