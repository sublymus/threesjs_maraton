import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import {WorldManager } from './World/World'
import 'three/examples/jsm/Addons';
import {Products} from './Componemts/Products/Products'
import {Editer} from './Componemts/Editer/Editer'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Products/>
    <Editer/>
  </React.StrictMode>,
)

setTimeout(async () => {
  const w = document.getElementById('world')!
  root.prepend(w)
  const world = new WorldManager(w)
  world.animus(0); 
});