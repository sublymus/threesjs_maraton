import './index.css'
import ReactDOM from 'react-dom/client'
import { Products } from './Components/Products/Products'
import { Editer } from './Components/Editer/Editer'
import { WorldView } from './Components/WorldView/WorldView'
import { Catalogue } from './Components/Catalogue/Catalogue'
import { NavOption } from './Components/NavOption/NavOption'
import { Card ,MiniCard} from './Components/Card/Card'
import { ResearchBar } from './Components/ResearchBar/ResearchBar'
import { TopBar } from './Components/TopBar/TopBar'
import { ProfileImage } from './Components/ProfileImage/ProfileImage'
import { CatalogueOnglet } from './Components/CatalogueOnglet/CatalogueOnglet'
import { CatalogueDescription } from './Components/CatalogueDescription/CatalogueDescription'

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
