import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import {WorldManager } from './World/World'
import 'three/examples/jsm/Addons';
import {VerticalProducts} from './Componemts/Products/VerticalProducts'
import {HorizontalProducts} from './Componemts/Products/HorizontalProducts'
import {Editer} from './Componemts/Editer/Editer'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HorizontalProducts/>
    {/* <VerticalProducts/> */}
    <Editer/>
  </React.StrictMode>,
)

setTimeout(async () => {
  const w = document.getElementById('world')!
  root.prepend(w)
  const world = new WorldManager(w)
  world.animus(0); 
});