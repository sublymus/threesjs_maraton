import './index.css'
import ReactDOM from 'react-dom/client'
import { Products } from './Componemts/Products/Products'
import { Editer } from './Componemts/Editer/Editer'
import { WorldView } from './Componemts/WorldView/WorldView'
import { Catalogue } from './Componemts/Catalogue/Catalogue'
import { NavOption } from './Componemts/NavOption/NavOption'
import { Card ,MiniCard} from './Componemts/Card/Card'
import { ResearchBar } from './Componemts/ResearchBar/ResearchBar'
import { TopBar } from './Componemts/TopBar/TopBar'
import { ProfileImage } from './Componemts/ProfileImage/ProfileImage'
import { CatalogueOnglet } from './Componemts/CatalogueOnglet/CatalogueOnglet'
import { CatalogueDescription } from './Componemts/CatalogueDescription/CatalogueDescription'

import { PageAbout } from "./Layout/PageAbout/PageAbout";
import { PageBlog } from "./Layout/PageBlog/PageBlog";
import { PageService } from "./Layout/PageService/PageService";
// import { PageBlog } from "./Layout/PageBlog/PageBlog";


import React from 'react'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Products />
    <Editer />
    <WorldView root={root} />
    <NavOption/>
    <Card/>
    <MiniCard/>
    <ResearchBar/>
    <TopBar/>
    <ProfileImage/>
    <CatalogueOnglet/>
    <CatalogueDescription/>
    <Catalogue/>
    <PageAbout/>
    <PageBlog/>
    <PageService/>
  </React.StrictMode>,
)
