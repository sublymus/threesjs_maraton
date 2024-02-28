import { useEffect, useRef, useState } from 'react'
import './Product.css'
import { Cadre } from '../Cadre/Card';
import { CadreManager } from '../Cadre/CadreManager'
import { useProductStore } from './ProductStore';

export function Products() {
  const { products, fetchProducts, selectProduct } = useProductStore()
  const productsRef = useRef<HTMLDivElement | null>(null)
  const cadreManagerRef = useRef<CadreManager | null>(null);
  const [productArray, setProductArray] = useState<Array<any>>()
  console.log('@@@@@');

  useEffect(() => {
    const cadreManager = new CadreManager(productsRef);
    cadreManagerRef.current = cadreManager;
    cadreManager.init();
    fetchProducts({})
  }, [fetchProducts])

  useEffect(() => {
    console.log('products');
    if (cadreManagerRef.current) {
      const list: any[] = []
      for (const uuid in products) {
        const product = products[uuid];
        const cadre = new Cadre();
        const productElement = (
          <div
          onClick={()=>{
            selectProduct(product.uuid,products)
          }}
            key={product.uuid}
            //NB: wepp j'ai lu l'heure; on n'est pas obliger d'utiliser useRef sur un component au quelle on a access 
            ref={ref => ref ? cadre.setDiv(ref) : null}
            className='product'
            style={{ backgroundImage: `url(${product.image_url[0]})` }}
          ></div>
        );
        cadreManagerRef.current.push(cadre);
        list.push(productElement);
      }
      setProductArray(list);
    }
  }, [products]);


  return (
    <div className='ctn-products'>
      <div className="products" ref={productsRef}>
        {productArray}
      </div>
    </div>

  )
}
