
import { Host } from '../../../Config';
import { useAppRouter } from '../../AppStore';
import './HorizontalProducts.css'
import { useProductStore } from './ProductStore';
import { useEffect, useState } from 'react'



export function HorizontalProducts() {
  const { product,products  } = useProductStore()
  const [active,setActive] = useState('');
  const {qs} = useAppRouter()
useEffect(()=>{
  setActive(product?.id||'')
},[product])
  return (
    <div className='hori-ctn-products'>
      <div className="products">

        {products?.list.map(product=>(
          <div
          style={{ backgroundImage: `url(${Host}${product.images[0]})` }}
          className={'product ' + (active == product.id?'active':'')}
          onClick={() => {
            qs({product_id:product.id}).setAbsPath(['product'])
          }}
          key={product.id}
        ></div>
        ))}
      </div>
    </div>

  )
}
