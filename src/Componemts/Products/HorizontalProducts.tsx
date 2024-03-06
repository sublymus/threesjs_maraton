import './HorizontalProducts.css'
import { useProductStore } from './ProductStore';
import { HorizontalCadreManager } from '../HorizontalCadre/HorizontalCadreManager';
import { HorizontalCadre } from '../HorizontalCadre/HorizontalCadre';
import { useEffect, useRef, useState } from 'react'



export function HorizontalProducts() {
  const { products, fetchProducts, selectProduct } = useProductStore()
  const productsRef = useRef<HTMLDivElement | null>(null)
  const horizontalCadreManagerRef = useRef<HorizontalCadreManager | null>(null);
  const indice = useRef<HTMLDivElement | null>(null);
  const [productArray, setProductArray] = useState<Array<any>>();
  const [onProcess , setOnProcess ] = useState(false)
  const [state] = useState({
    nearDiv :undefined as ({
      rect:DOMRect,
      div:HTMLDivElement,
      d_center:number
    }|undefined),
    refreshNearDiv(pending?:(div:HTMLDivElement)=>any){
      let minRect: DOMRect|undefined;
      let div:HTMLDivElement|undefined;
      let d_center = 0;
      state.divList.forEach((_div)=>{
        if(pending)pending(_div);
        if(!minRect){
          minRect = _div.getBoundingClientRect();
          div = _div;
          d_center =0;
          return;
        }
        const rec = _div.getBoundingClientRect();
        const D_center =(window.innerWidth/2)-(rec.left + rec.width/2);
        const D_minCenter = (window.innerWidth/2)-(minRect.left + minRect.width/2);
        if( Math.abs( D_center) < Math.abs( D_minCenter)){
          minRect = rec;
          div = _div;
          d_center =D_center;
        }
      })
      if(!minRect || !div) return;
      const near = {
        rect:minRect,
        div,
        d_center
      }
      state.nearDiv = near;
      return near;
    },
    divList:[] as HTMLDivElement[],
    anim() {
      if(onProcess) return
      const nearDiv = state.refreshNearDiv(div=> div==state.nearDiv?.div?(div.style.transform = 'scale(1)'):null);
      if(!nearDiv ) return
      
      const center = Math.floor((nearDiv.d_center*10000))/10000;
      nearDiv.div.style.transform = 'scale(1.2)';
      if(indice.current){
        indice.current.style.width = Math.abs(center)+'px';
        indice.current.style.left = (center>0?(window.innerWidth/2-center):window.innerWidth/2)+'px';
      }
      if(productsRef.current)productsRef.current.scrollTo({
        top: 0,
        left: productsRef.current.scrollLeft - (center/500),
        behavior: "instant",
      })
    },
  })
  useEffect(() => {
    const horizontalCadreManager = new HorizontalCadreManager(productsRef);
    horizontalCadreManagerRef.current = horizontalCadreManager;
    horizontalCadreManager.init();
    fetchProducts({});
  }, [fetchProducts]);

  useEffect(() => {
    setInterval(()=>{
      state.anim()
    })
  }, []);

  useEffect(() => {
    if (horizontalCadreManagerRef.current) {
      const list: any[] = []
      for (const uuid in products) {
        const product = products[uuid];
        const horizontalcadre = new HorizontalCadre();
        const productElement = (
          <div
            style={{ backgroundImage: `url(${product.images[0]})` }}
            className='product'
            onClick={() => {
              selectProduct(product.id, products)
            }}
            ref={ref=>{
              if(ref){
                state.divList.push(ref);
              };
            }}
            key={product.id}
          ></div>
        );
        horizontalCadreManagerRef.current.push(horizontalcadre);
        list.push(productElement);
      }
      setProductArray(list);
    }
  }, [products]);


  return (
    <div className='hori-ctn-products'>
      <div className="indice" ref={indice}></div>
      <div className="products" ref={productsRef} 
      onDrag={()=>{
        console.log('drag');
        
      }}
      onTouchMove={()=>{
        setOnProcess(true)
        console.log('touche');
      }}
      onTouchCancel={()=>{
        setOnProcess(false)
      }}
      onTouchEnd={()=>{
        setOnProcess(false)
        console.log('touche');
        
      }}
      onMouseDown={()=>{
         console.log('down');
       
      }}>

        {productArray}
      </div>
    </div>

  )
}
