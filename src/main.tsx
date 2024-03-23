import './index.css'
import ReactDOM from 'react-dom/client'
import { Products } from './Components/Products/Products'
import { Editer } from './Components/Editer/Editer'
import { WorldView } from './Components/WorldView/WorldView'
import { Catalogue } from './Components/Catalogue/Catalogue'
import { TopBar } from './Components/TopBar/TopBar'
import { Profile } from './Layout/PageProfile/Profile'
import { CatalogueOnglet } from './Components/CatalogueOnglet/CatalogueOnglet'
import { CatalogueDescription } from './Components/CatalogueDescription/CatalogueDescription'

import { PageAbout } from "./Layout/PageAbout/PageAbout";
import { PageBlog } from "./Layout/PageBlog/PageBlog";
import { PageService } from "./Layout/PageService/PageService";


import React from 'react'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App/>
    <Products />
    <Editer />
    <WorldView root={root} />
    <TopBar/>
    <Profile/>
    <CatalogueOnglet/>
    <CatalogueDescription/>
    <Catalogue/>
    <PageAbout/>
    <PageBlog/>
    <PageService/>
  </React.StrictMode>,
)


function App(){
  
  return (<></>)
}