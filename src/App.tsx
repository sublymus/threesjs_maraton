import { useEffect, useRef, useState } from 'react'
import './App.css'
import {Cadre } from './Card'
import { Urls } from './Urls'
import { CadreManager } from './CadreManager'

 

function App() {
  const [products] = useState(Urls)

  const productsRef = useRef<HTMLDivElement | null>(null)

  const cadreManager = new CadreManager(productsRef,{
    SIZE: 200, INFLUENCE: 0.11, DELAY: 5, AMPLITUDE: 200, SCOPE: 200
});
 
  const productArray = products.map((product) => {
    const productRef = useRef<HTMLDivElement | null>(null)
    const productElement = <div key={Math.random().toString()} ref={productRef} className='product' style={{ backgroundImage: `url(${product.url})` }}></div>;
    cadreManager.push( new Cadre(productRef));
    return productElement;
  });

  useEffect(() => {
    cadreManager.init()
    
  })
  
  //.current 
  return (
    <>
      <div className='app'>
        <div className="products" ref={productsRef}>
          {productArray}
        </div>
      </div>
    </>
  )
}

export default App
