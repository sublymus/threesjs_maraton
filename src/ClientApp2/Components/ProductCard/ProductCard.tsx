import { useEffect, useRef, useState } from 'react';
import { ProductScenus } from '../../../DataBase';
import { cardHorizontalCenter } from '../../../Tools/CardPosition';
import { getImg } from '../../../Tools/StringFormater';
import './ProductCard.css'
import { ProductQuantity } from '../ProductQuantity/ProductQuantity';
import { useCommandStore } from '../../Layout/PageCommand/CommandStore';
import { useProductStore } from '../../Layout/PageProducts/ProductStore';

export function ProductCard({ product, active, onClick, aspect, mode}: { canAddToCart?:boolean, aspect?: number/* ,maxW?:number,minW?:number */, mode?: string, onClick: () => any, active?: boolean, product: ProductScenus }) {
    const [index, setIndex] = useState(0)
    const ref = useRef<HTMLDivElement>(null);
    const { addProductToCart } = useCommandStore();
    const { fetchProducts , products, setProducts, selectProduct, product:selectedProduct } = useProductStore();
    const [prod, setProd] = useState({...product});
    
    useEffect(()=>{
        setProd({...product});    
    },[product])
    
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
    
    const refreshProducts = ()=>{
        product && fetchProducts({
            add_cart:true,
            product_id:product.id,
            no_save:true
        }).then((p)=>{
            if(p?.list[0].id){
                const newP = {...p?.list[0]};
                products && setProducts({
                    ...products,
                    list:products?.list.map((l=>l.id==p?.list[0].id?newP:l))
                })
                selectedProduct?.id == p?.list[0].id && (selectProduct(newP))
                return 
            }
        })
    }
    return (
        <div className={'product-card ' + mode + ' ' + (active ? 'active' : '')} onClick={onClick} ref={ref}>
            <div className="images" ref={cardHorizontalCenter(undefined, setIndex)}>
                <div className="gap"></div>
                {
                    prod.images.map((i) => (
                        <div key={i} className="image card-h-c " style={{ background: getImg(i) }}></div>
                    ))
                }

                <div className="gap"></div>
            </div>
            <div className="infos">
                <div className="counters">
                    {
                        prod.images.map((i, a) => (
                            <div key={i} className={"counter " + (index == a ? 'active' : '')}></div>
                        ))
                    }
                </div>


                <div className="price">
                    <div className="value">12450.93 $</div>
                </div>
                <h3 className="name _limit-text"><span className='product-title'>{prod.title}</span> <span className='slash'>/</span> <span>{prod.description}</span></h3>
                <div className="stars">
                    <div className={"star " + (prod.note?.star ? '' : 'vide')}></div>
                    <div className="note">{prod.note?.star}</div>
                    <div className="point"></div>
                    <div className="vote">{prod.note?.votes}</div>
                    <div className="users"></div>
                    {!prod.note?.star && <div className="new">New</div>}
                </div>
                <div className="add-btn" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                    {(  
                        prod.quantity != undefined &&
                        prod.quantity != null &&
                        parseInt(prod.quantity + '') != 0 &&
                        prod.quantity.toString() != '0')? <ProductQuantity canNull product={prod} onChange={() => {
                            refreshProducts()
                        }} /> : <div className="btn" onClick={() =>
                            addProductToCart({product_id:prod.id, quantity:1}).then((c) => {
                                if (c?.id) {
                                    refreshProducts()
                                }
                            })}>Add <span> to cart</span></div>}
                </div>
            </div>
        </div>
    )

} 