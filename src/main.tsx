import './index.css'
import ReactDOM from 'react-dom/client'
import { Products } from './Componemts/Products/Products'
import { Editer } from './Componemts/Editer/Editer'
import { WorldView } from './Componemts/WorldView/WorldView'
import { Logo } from './Componemts/Logo/Logo'
import { Catalogue } from './Componemts/Catalogue/Catalogue'
import React from 'react'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Products />
    <Editer />
    <WorldView root={root} />
    <Logo></Logo>
    <Catalogue/>
  </React.StrictMode>,
)
