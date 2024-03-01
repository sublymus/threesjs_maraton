import { useEffect, useRef, useState } from 'react'
import './VerticalProducts.css'
import { VerticalCadre } from '../VerticalCadre/VerticalCadre';
import { VerticalCadreManager } from '../VerticalCadre/VerticalCadreManager'
import { useProductStore } from './ProductStore';


export function VerticalProducts() {
  const { products, fetchProducts, selectProduct } = useProductStore()
  const productsRef = useRef<HTMLDivElement | null>(null)
  const verticalCadreManagerRef = useRef<VerticalCadreManager | null>(null);
  const [productArray, setProductArray] = useState<Array<any>>()


  useEffect(() => {
    const verticalCadreManager = new VerticalCadreManager(productsRef);
    verticalCadreManagerRef.current = verticalCadreManager;
    verticalCadreManager.init();
    fetchProducts({});
  }, [fetchProducts]);

  useEffect(() => {
    console.log('products');
    if (verticalCadreManagerRef.current) {
      const list: any[] = []
      for (const uuid in products) {
        const product = products[uuid];
        const verticalcadre = new VerticalCadre();
        const productElement = (
          <div
            style={{ backgroundImage: `url(${product.image_url[0]})` }}
            className='product'
            onClick={() => {
              selectProduct(product.uuid, products)
            }}
            key={product.uuid}
            ref={(ref)=>ref?verticalcadre.setDiv(ref):null}
          ></div>
        );
        verticalCadreManagerRef.current.push(verticalcadre);
        list.push(productElement);
      }
      setProductArray(list);
    }
  }, [products]);


  return (
    <div className='vert-ctn-products'>
      <div className="products" ref={productsRef}>
        {productArray}
      </div>
    </div>

  )
}

