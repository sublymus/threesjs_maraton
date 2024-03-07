import './index.css'
import ReactDOM from 'react-dom/client'
import { Products } from './Componemts/Products/Products'
import { Editer } from './Componemts/Editer/Editer'
import { WorldView } from './Componemts/WorldView/WorldView'
import { Logo } from './Componemts/Logo/Logo'
import { Catalogue } from './Componemts/Catalogue/Catalogue'
import { NavOption } from './Componemts/NavOption/NavOption'
import { Card ,MiniCard} from './Componemts/Card/Card'
import { ResearchBar } from './Componemts/ResearchBar/ResearchBar'
import { NavLink } from './Componemts/NavLink/NavLink'
import { ProfileImage } from './Componemts/ProfileImage/ProfileImage'
import { CatalogueOnglet } from './Componemts/CatalogueOnglet/CatalogueOnglet'
import { CatalogueDescription } from './Componemts/CatalogueDescription/CatalogueDescription'
import React from 'react'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Products />
    <Editer />
    <WorldView root={root} />
    <Logo></Logo>
    <NavOption/>
    <Card/>
    <MiniCard/>
    <ResearchBar/>
    <NavLink/>
    <ProfileImage/>
    <CatalogueOnglet/>
    <CatalogueDescription/>
    <Catalogue/>
  </React.StrictMode>,
)
