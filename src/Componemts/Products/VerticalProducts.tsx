import { useEffect, useRef, useState } from 'react'
import './VerticalProducts.css'
import { VerticalCadre } from '../VerticalCadre/VerticalCadre';
import { VerticalCadreManager } from '../VerticalCadre/VerticalCadreManager'
import { useProductStore } from './ProductStore';


export function VerticalProducts() {
  const { products, fetchProducts, selectProduct, productScenus } = useProductStore()
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
    if (verticalCadreManagerRef.current) {
      const list: any[] = []
      for (const uuid in products) {
        const product = products[uuid];
        const verticalcadre = new VerticalCadre();
        const productElement = (
          <div
            style={{ backgroundImage: `url(${product.image_url[0]})` }}
            className={`product ${(product.uuid == productScenus?.uuid) ? 'active' : ''}`}
            data-uuid={uuid}
            onClick={() => {
              selectProduct(uuid, products);
              console.log(product.uuid, productScenus?.uuid);
            }}
            key={product.uuid}
            ref={(ref) => ref ? verticalcadre.setDiv(ref) : null}
          >
            <div className='index'></div>
          </div>
        );
        verticalCadreManagerRef.current.push(verticalcadre);
        list.push(productElement);
      }
      setProductArray(list);
    }
  }, [products]);

  useEffect(() => {
    if (verticalCadreManagerRef.current) {
      verticalCadreManagerRef.current.cadreList.forEach((cadre) => {
        const div = cadre.getDiv();

        if (div) {
          const valid  = productScenus?.uuid == div.dataset.uuid;
          div.className = 'product ' +( valid?'selected':'');
        }
      })
    }
  }, [productScenus])

  return (
    <div className='vert-ctn-products'>
      <div className="products" ref={productsRef}>
        {productArray}
      </div>
    </div>

  )
}

