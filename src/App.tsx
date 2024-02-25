import { useEffect, useRef, useState } from 'react'
import './App.css'

const urls = [
  { url: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { url: 'https://images.unsplash.com/photo-1613945407943-59cd755fd69e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },]

type FuncAsArray = { [key: number]: (this: FuncType) => void }
type FuncType = {
  tx: number,
  rect: DOMRect,
  div: React.MutableRefObject<HTMLDivElement | null>,
  y0:number
};





















const SIZE = 200;
const INFLUENCE = 0.11; 
const DELAY = 5;  
const AMPLITUDE = 200;
const SCOPE =  AMPLITUDE;
const STEP = 20;

let amplitude= AMPLITUDE;
let y= 0;
let y0 = 0;
let isHover= false;
function initFunc(this: FuncType) {
  if (!this.div.current) return
  this.rect = this.div.current.getBoundingClientRect();
}

function delayFunc() {
  const DY = y - y0
  y0 +=(DY / DELAY)
}

function reframeFunc() { 
  if (isHover )
    if(amplitude+STEP>AMPLITUDE) amplitude = AMPLITUDE;
    else amplitude+=STEP;
  else
    if(amplitude-STEP <1) amplitude = 1 
    else amplitude-=STEP;

}
function bellFunc(this: FuncType) {
  if (!this.div.current) return;

  const scale = (Math.sqrt(amplitude) / (SCOPE))
  const Y = Math.pow((this.rect.y - y0) * scale, 2)
  this.tx = (amplitude / (amplitude + Y)) * amplitude
  
  this.div.current.style.transform = `translateX(${this.tx}px)`
}

function resizeFunc(this: FuncType) {
  if (!this.div.current) return;
  const size = SIZE*(1-INFLUENCE)+ INFLUENCE*SIZE* (this.tx / AMPLITUDE);
  this.div.current.style.width = `${size}px`;
  this.div.current.style.height = `${size}px`;
}

const FuncList = [initFunc, bellFunc,resizeFunc]





























function App() {
  const [products] = useState(urls)

  const productsRef = useRef<HTMLDivElement | null>(null)

  const eachProductRefList: (FuncType & FuncAsArray)[] = [];
  const FuncCollector: FuncAsArray = {};
 
  FuncList.forEach((func, i) => FuncCollector[i] = func);

  const productArray = products.map((product) => {
    const productRef = useRef<HTMLDivElement | null>(null)
    const productElement = <div key={Math.random().toString()} ref={productRef} className='product' style={{ backgroundImage: `url(${product.url})` }}></div>;
    eachProductRefList.push({
      tx: 0,
      y0:0,
      rect: new DOMRect(),
      div: productRef,
      ...FuncCollector
    });
    return productElement
  });

  useEffect(() => {
    productsRef.current?.addEventListener('mousemove', (e) => {
      y = e.clientY-SIZE/2;
    });
    productsRef.current?.addEventListener('mouseenter', () => {
     isHover =true;
    });
    productsRef.current?.addEventListener('mouseleave', () => {
      isHover = false;
    });
    const animus = (_time: number) => {
      // let setp = 0;
      // if(firstTime){
      //   setp = 0;
      // }else{
      //   setp = time-lastTime;
      // }
      // lastTime = time;
      [delayFunc,reframeFunc].forEach(f=>f())
      eachProductRefList.forEach((m) => {
        for (let i = 0; i < FuncList.length; i++) {
          m[i]();
        }
      })
      requestAnimationFrame(animus);
    }
    requestAnimationFrame(animus);
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
