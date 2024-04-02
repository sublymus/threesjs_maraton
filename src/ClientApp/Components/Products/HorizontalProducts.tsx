import { Host } from '../../AppStore';
import './HorizontalProducts.css'
import { useProductStore } from './ProductStore';
import { useEffect, useState } from 'react'



export function HorizontalProducts() {
  const { product,products, fetchProducts, selectProduct  } = useProductStore()
  const [active,setActive] = useState('');
  useEffect(() => {
    fetchProducts({});
  }, [fetchProducts]);

useEffect(()=>{
  setActive(product?.id||'')
},[product])
  return (
    <div className='hori-ctn-products'>
      <div className="products">

        {products.map(product=>(
          <div
          style={{ backgroundImage: `url(${Host}${product.images[0]})` }}
          className={'product ' + (active == product.id?'active':'')}
          onClick={() => {
            selectProduct(product)
          }}
          key={product.id}
        ></div>
        ))}
      </div>
    </div>

  )
}
