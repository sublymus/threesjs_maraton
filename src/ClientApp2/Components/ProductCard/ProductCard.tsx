import { useState } from 'react';
import { ProductScenus } from '../../../DataBase';
import { cardHorizontalCenter } from '../../../Tools/CardPosition';
import { getImg } from '../../../Tools/StringFormater';
import { NoteStars } from '../NoteStars/NoteStars';
import './ProductCard.css'

export function ProductCard({ product, active, onClick }: { onClick: () => any, active: boolean, product: ProductScenus }) {
    const [index, setIndex] = useState(0)
    return (
        <div className={'product-card ' + (active ? 'active' : '')} onClick={onClick}>
            <div className="images" ref={cardHorizontalCenter(undefined, setIndex)}>
                <div className="gap"></div>
                {
                    product.images.map((i) => (
                        <div key={i} className="image card-h-c " style={{ background: getImg(i) }}></div>
                    ))
                }

                <div className="gap"></div>
            </div>
            <div className="infos">
                <div className="counters">
                    {
                        product.images.map((i, a) => (
                            <div key={i} className={"counter " + (index == a ? 'active' : '')}></div>
                        ))
                    }
                </div>
                <div className="name">{product.title}</div>
                <div className="stars">
                    {product.note && <NoteStars note={product.note.star} />}
                    <div className="value">{product.note?.votes} <span></span></div>
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