import './Summary.css'
import { useAppRouter } from "../../AppStore";
import { useProductStore } from '../Products/ProductStore';
import { Component, Feature } from '../../../DataBase';
import { getImg } from '../../../Tools/StringFormater';
import { useCommandStore } from '../../Layout/PageCommand/CommandStore';
import { useProfileStore } from '../../Layout/PageProfile/ProfileStore';
import { useState } from 'react';
;

export function Summary() {
    const { check, setAbsPath, } = useAppRouter();
    const { product, featuresCollector } = useProductStore();
    const { addProductToCart } = useCommandStore()
    const { setLastPath } = useProfileStore()
    const [open, setOpen] = useState(true)
    const a = featuresCollector?.allCollectedFeatures() || {};
    const f: Record<string, Feature> = {};
    product?.features.list.forEach(t => f[t.id] = t);
    let price = 0;
    Object.keys(a).forEach(key => price += (a[key]?.price) || 0)
    return check('summary') && (
        !open ? <div className="summary">
            <div className="close turn" onClick={() => {
                setOpen(true);
            }}></div> </div> :
            (
                <div className="summary">
                    <div className='summary-top'>
                        <div className="top-top">
                            <div className="label"> Summary</div>
                            <div className="close" onClick={() => {
                                console.log('##########');
                                setOpen(false);
                            }}></div>
                        </div>
                        <div className="product-info">
                            <div className="title">{product?.title}</div>
                            <div className="base-price">{product?.price} P</div>
                        </div>
                    </div>
                    <div className='summary-list'>
                        {
                            Object.keys(a).map((key) => {
                                return (
                                    (
                                        <div key={key} className="summary-fiture" >
                                            <div className="f-info">
                                                <div className="f-icon" style={{ background: getImg(f[key].icon[0]) }}></div>
                                                <div className="f-name">{f[key].name}</div>
                                                <div className="v-price">+{(a[key] as Component)?.price || 0}</div>
                                            </div>
                                            <div className="v-info">
                                                <div className="v-label">{(a[key] as Component)?.name}</div>
                                                <div className="v-icon" style={{ background: getImg(a?.[key]?.images?.[0] || '') }}></div>
                                            </div>
                                        </div>
                                    )
                                )
                            })
                        }
                    </div>
                    <div className='summary-command'>
                        <div className="total"> Totale {(product?.price || 0) + price} $</div>
                        <div className="btn" onClick={() => {
                            product && addProductToCart(product.id, 1, a).then((p) => {
                                if (p?.id) {
                                    setLastPath(1)
                                    setAbsPath(['profile', 'cart'])
                                }
                            })
                        }}>Add to Cart</div>
                    </div>
                </div>
            )
    )
}
//http://localhost:5173/demo/Ladona#product={%22product_id%22:%2205e7dc8e-f409-46ae-91cc-6a125add8c5b%22}
//http://localhost:5173/demo/Ladona#product={%22product_id%22=%2205e7dc8e-f409-46ae-91cc-6a125add8c5b%22}
