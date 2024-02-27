import React from 'react'
import ReactDOM from 'react-dom/client'
import {WorldManager } from './World/World'
import {Products} from './Componemts/Product/Product'
import './index.css'


const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Products/>
  </React.StrictMode>,
)

setTimeout(async () => {
  const w = document.getElementById('world')!
  root.prepend(w)
  const world = new WorldManager(w)
  world.animus(0); 
});