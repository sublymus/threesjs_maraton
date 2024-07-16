import { useEffect, useRef, useState } from 'react'
import './VerticalProducts.css'
import { VerticalCadre } from './VerticalCadre/VerticalCadre';
import { VerticalCadreManager } from './VerticalCadre/VerticalCadreManager'
import { useProductStore } from './ProductStore';
import { Host } from '../../../Config';


export function VerticalProducts() {
  const { products, selectProduct, product } = useProductStore()
  const productsRef = useRef<HTMLDivElement | null>(null)
  const verticalCadreManagerRef = useRef<VerticalCadreManager | null>(null);
  const [productArray, setProductArray] = useState<Array<any>>()


  useEffect(() => {
    const verticalCadreManager = new VerticalCadreManager(productsRef);
    verticalCadreManagerRef.current = verticalCadreManager;
    verticalCadreManager.init();
  }, []);

  useEffect(() => {
    if (verticalCadreManagerRef.current && products) {
      const list: any[] = []
      let first=true;
      let i = 0;
      for (const product of  products?.list) {
        const verticalcadre = new VerticalCadre();
        const productElement = (
          <div
            style={{ backgroundImage: `url(${Host}${product.images[0]})` }}
            className={`product ${(first) ? 'selected' : ''}`}
            data-uuid={product.id+(i++)}
            onClick={() => {
              selectProduct(product);
            }}
            key={product.id+i}
            ref={(ref) => ref ? verticalcadre.setDiv(ref) : null}
          >
            <div className='index'></div>
          </div>
        );
        verticalCadreManagerRef.current.push(verticalcadre);
        list.push(productElement);
        first= false;
      }
      setProductArray(list);
    }
  }, [products]);

  useEffect(() => {
    if (verticalCadreManagerRef.current) {
      verticalCadreManagerRef.current.cadreList.forEach((cadre) => {
        const div = cadre.getDiv();

        if (div) {
          const valid  = product?.id == div.dataset.uuid;
          div.className = 'product ' +( valid?'selected':'');
        }
      })
    }
  }, [product])

  return (
    <div className='vert-ctn-products'>
      <div className="products" style={{background:'#3450'}} ref={productsRef}>
        {productArray}
      </div>
    </div>

  )
}

