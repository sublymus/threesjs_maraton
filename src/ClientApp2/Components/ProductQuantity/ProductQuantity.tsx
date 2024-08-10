import { useEffect, useState } from 'react';
import './ProductQuantity.css'
import { CommandInterface, ProductScenus } from '../../../DataBase';
import { toFilter } from '../../../Tools/FilterColor';
import { useCommandStore } from '../../Layout/PageCommand/CommandStore';

export function ProductQuantity({ cart, canNull, product, onChange , ingoreFeature}: {ingoreFeature?:boolean, onChange?: (count: number) => any, canNull?: boolean, cart?: CommandInterface, product?: ProductScenus }) {
    let [count, setCount] = useState(Number(cart?.quantity || product?.quantity || 0) || 0);
    const { addProductToCart } = useCommandStore()
    useEffect(()=>{
        setCount(Number(cart?.quantity || product?.quantity || 0) || 0);
    }, [product, cart])
    
    return <div className="cart-quantity" onClick={(e)=>{
        e.preventDefault();
        e.stopPropagation()
    }}>
        <div className={"min " + (count <= (canNull ? 0 : 1) ? 'bloc' : '')} onClick={() => {
            let c = parseInt(count + '');
            c = c - 1 <(canNull ? 0 : 1) ?(canNull ? 0 : 1) :c-1;
            setCount(c);
            console.log('counter===>>>> ', c);
            
            (product || cart) && addProductToCart({
                //@ts-ignore
                product_id: product?.id,
                //@ts-ignore
                command_id: cart?.id,
                quantity: c
            }).then(() => {
                onChange?.(count);
            })
        }}>
            <span style={{ filter: (count <= (canNull ? 0 : 1) ? 'bloc' : '') ? /* discret color */toFilter('#fff').result.filter : /* impact */ toFilter('#358f27').result.filter }}></span>
        </div>
        <div className="count">{count}</div>
        <div className={"max " + (count >= ((product||cart)?.stock || Number.MAX_VALUE) ? 'bloc' : '')} onClick={() => {
            let c = parseInt(count + '');
            c = c < ((product||cart)?.stock || Number.MAX_VALUE) ? c : ((product||cart)?.stock || Number.MAX_VALUE);
            c = c + 1;
            
            if(c>parseInt(((product||cart)?.stock||Number.MAX_VALUE)+'')) return
            setCount(c);
            (product || (product||cart)) && addProductToCart({
                //@ts-ignore
                product_id: product?.id,
                //@ts-ignore
                command_id: cart?.id,
                quantity: c,
                collected_features:ingoreFeature ?undefined:product?.featuresCollector?.allCollectedFeatures()
            }).then((c) => {
                console.log('________',c);
                
                onChange?.(count);
                return;
            })
        }}>
            <span style={{ filter: count >= ((product||cart)?.stock || Number.MAX_VALUE) ?/* discret color */toFilter('#fff').result.filter : /* impact */  toFilter('#358f27').result.filter }}></span>
        </div>
    </div>
}