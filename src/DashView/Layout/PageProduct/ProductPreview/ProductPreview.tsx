import { useDashRoute } from '../../../dashStore'
import './ProductPreview.css'

export function ProductPreview() {
    
    const { current } = useDashRoute();

    return  current('product_preview')&&(
        <div className="product-preview">

        </div>
    )
}