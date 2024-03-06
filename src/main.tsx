import React, { useEffect } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { Products } from './Componemts/Products/Products'
import { Editer } from './Componemts/Editer/Editer'
import { WorldView } from './Componemts/WorldView/WorldView'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Products />
    <Editer />
    <WorldView root={root} />
  </React.StrictMode>,
)
