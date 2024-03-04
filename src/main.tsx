import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import {Products} from './Componemts/Products/Products'
import {Editer} from './Componemts/Editer/Editer'
import { WorldLauncher } from './WorldLauncher'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* <Products/>
    <Editer/> */}
  </React.StrictMode>,
)

window.onload = ()=>{
  WorldLauncher(root);
}