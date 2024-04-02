import './Summary.css'
import { useAppRouter } from "../../AppStore";
import { useProductStore } from '../Products/ProductStore';
import { F_Value, Feature } from '../../../DataBase';
;

export function Summary() {
    const { check } = useAppRouter();
    const { product , featuresCollector } = useProductStore();

    const a = featuresCollector?.allCollectedFeatures() || {};
    
    const f:Record<string, Feature> = {};

    product?.features.forEach(t=>f[t.id]=t);
    
    console.log();
    

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
                    Object.keys(a).map((key) => (
                        <div className="summary-fiture">
                        <div className="f-info">
                            <div className="f-icon" style={{backgroundImage:`url(${f[key].icon})`}}></div>
                            <div className="f-name">{f[key].name}</div>
                            <div className="v-price">{(a[key] as F_Value)?.price||0} P</div>
                        </div>
                            <div className="v-info">
                                <div className="v-label">{(a[key] as F_Value)?.label}</div>
                                <div className="v-icon"  style={{backgroundImage:`url(${(a[key] as F_Value)?.url})`}}></div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='summary-command'>
                <div className="total"> Totale {3000} p</div>
                <div className="btn">Add to Cart</div>
            </div>
        </div>
    )
}  