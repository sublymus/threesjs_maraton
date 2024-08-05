import { useEffect, useRef, useState } from 'react';
import { ProductInterface, ProductScenus } from '../../../DataBase';
import { cardHorizontalCenter } from '../../../Tools/CardPosition';
import { getImg } from '../../../Tools/StringFormater';
import './ProductCard.css'
import { ProductQuantity } from '../ProductQuantity/ProductQuantity';
import { useCommandStore } from '../../Layout/PageCommand/CommandStore';
import { useAppStore } from '../../AppStore';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { PageAuth } from '../../Layout/PageRegister/PageAuth';
import { FavoritesBtn } from "../FavoritesBtn/FavoritesBtn";
export function ProductCard({ product, active, onClick, aspect, mode, onRefresh }: { onRefresh?: (product: ProductInterface) => any, canAddToCart?: boolean, aspect?: number/* ,maxW?:number,minW?:number */, mode?: string, onClick: () => any, active?: boolean, product: ProductScenus }) {

    const { addProductToCart } = useCommandStore();
    const { openChild } = useAppStore()
    const { user } = useRegisterStore()

    const ref = useRef<HTMLDivElement>(null);

    const [index, setIndex] = useState(0)
    // const [prod, setProd] = useState({ ...product });

    // useEffect(() => {
    //     setProd({ ...product });
    // }, [product])

    useEffect(() => {
        const handler = () => {
            if (ref.current && aspect != undefined && mode == 'v') {
                ref.current.style.height = `${ref.current.getBoundingClientRect().width * (aspect || 1)}px`
            }
        }
        (aspect != undefined && mode == 'v') && window.addEventListener('resize', handler);
        if (ref.current && (!aspect || mode == 'h')) {
            ref.current.style.height = ``
        }
        handler();
        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [ref, aspect, mode]);
    
    return (
        <div className={'product-card ' + mode + ' ' + (active ? 'active' : '')} onClick={onClick} ref={ref}>
            
                <div className="back"></div>
            <div className="images" ref={cardHorizontalCenter(undefined, setIndex)}>
                <div className="gap"></div>
                {
                    product.images.map((i) => (
                        <div key={i} className="image card-h-c " style={{ background: getImg(i) }}></div>
                    ))
                }

                <div className="gap"></div>
            </div>
            <div className="div" onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>{
                    user && <FavoritesBtn elm={product} onChange={() => {
                        onRefresh?.(product)
                    }} />
                }
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
                <h3 className="name _limit-text"><span className='product-title'>{product.title}</span> <span className='slash'>/</span> <span>{product.description}</span></h3>
                <div className="stars">
                    <div className={"star " + (product.note?.star ? '' : 'vide')}></div>
                    <div className="note">{product.note?.star || 0}</div>
                    <div className="point"></div>
                    <div className="vote">{product.note?.votes || 0}</div>
                    <div className="users"></div>
                    {!product.note?.star && <div className="new">New</div>}
                </div>
                <div className="add-btn unselectable" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                    {(
                        product.quantity != undefined &&
                        product.quantity != null &&
                        parseInt(product.quantity + '') != 0 &&
                        product.quantity.toString() != '0') ? <ProductQuantity canNull product={product} onChange={() => {
                            onRefresh?.(product)
                        }} /> : <div className="btn _limit-text" onClick={() =>
                            user ? addProductToCart({ product_id: product.id, quantity: 1, collected_features : product.featuresCollector?.allCollectedFeatures() }).then((c) => {
                                if (c?.id) {
                                    onRefresh?.(product)
                                }
                            }) : openChild(<PageAuth />, false, '#3455')
                        }>Add <span> to cart</span></div>}
                </div>
            </div>
        </div>
    )

} 