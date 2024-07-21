import { useState } from 'react';
import { ProductScenus } from '../../../DataBase';
import { cardHorizontalCenter } from '../../../Tools/CardPosition';
import { getImg } from '../../../Tools/StringFormater';
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
               
               
                <div className="price">
                    <div className="value">12450.93 $</div>
                </div>
                <h3 className="name limit-text"><span className='product-title'>{product.title}</span> <span className='slash'>/</span> <span>{product.description}</span></h3>
                <div className="stars">
                   <div className={"star "+(product.note?.star?'':'vide')}></div>
                   <div className="note">{product.note?.star}</div>
                   <div className="point"></div>
                   <div className="vote">{product.note?.votes}</div>
                   <div className="users"></div>
                   {!product.note?.star && <div className="new">New</div>}
                </div>
                <div className="add-btn" onClick={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                    <div className="btn">Add <span> to cart</span></div>
                </div>
            </div>
        </div>
    )

} 