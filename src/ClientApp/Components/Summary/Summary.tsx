import './Summary.css'
import { useAppRouter } from "../../AppStore";
import { useProductStore } from '../Products/ProductStore';
import { Component, Feature } from '../../../DataBase';
import { getImg } from '../../../Tools/StringFormater';
;

export function Summary() {
    const { check } = useAppRouter();
    const { product, featuresCollector } = useProductStore();

    const a = featuresCollector?.allCollectedFeatures() || {};

    const f: Record<string, Feature> = {};

    product?.features.list.forEach(t => f[t.id] = t);
    let price = 0;
    Object.keys(a).forEach(key=>price+=(a[key]?.price)||0)
    return check('summary') && (
        <div className="summary">
            <div className='summary-top'>
                <div className="label"> Summary</div>
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
                                        <div className="v-price">{(a[key] as Component)?.price || 0} {a[key]?.devise}</div>
                                    </div>
                                    <div className="v-info">
                                        <div className="v-label">{(a[key] as Component)?.name}</div>
                                        <div className="v-icon" style={{ background: getImg(a?.[key]?.icon[0] || '') }}></div>
                                    </div>
                                </div>
                            )
                        )
                    })
                }
            </div>
            <div className='summary-command'>
                <div className="total"> Totale {price} $</div>
                <div className="btn">Add to Cart</div>
            </div>
        </div>
    )
}  