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
  const [data] = useState<any>({});

  useEffect(() => {


    data.press = (e: MouseEvent) => {
      data.x0 = e.clientX;
      data.y0 = e.clientX;
      console.log('press________________');
    }

    data.move = (e: MouseEvent) => {
      if (data.x0 == undefined || data.y0 == undefined) {
        return
      }
      data.x = e.clientX;
      data.y = e.clientY;
      console.log('move>>>>>>>>>>>>>>>>');
    }

    data.release = () => {
      delete data.x0;
      delete data.y0;
      console.log('release ::::::::::::::::::::');
    }
    document.ondrag = () => {
      console.log('drage_____');

    }
    document.ondragleave = () => {
      console.log('drage_____');

    }
    document.ondrag = () => {
      console.log('drage_____');

    }
  })



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
            style={{ backgroundImage: `url(${product.image_url[0]})` }}
            className='product'
            onClick={() => {
              selectProduct(product.uuid, products)
            }}
            key={product.uuid}
            // NB: wepp j'ai lu l'heure; on n'est pas obliger d'utiliser useRef sur un component au quelle on a access 
            ref={ref => ref ? (() => {
              cadre.setDiv(ref);
              ref.onmousedown = (e) => {
                data.div = ref;
                data.press(e)
              }
            })() : null}
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
      <div className="products" ref={productsRef}
      // onMouseOut={data.release}
      // onMouseMove={()=>console.log('PPPPPPPPPPPPPPPPPPPP')}
      // onMouseLeave={data.release}

      >
        {productArray}
      </div>
    </div>

  )
}
