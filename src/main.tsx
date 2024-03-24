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


import React, { useEffect } from 'react'
import { useAppStore } from './AppStore'

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
    <Products />
    <Editer />
    <WorldView root={root} />
    <TopBar />
    <Profile />
    <CatalogueOnglet />
    <CatalogueDescription />
    <Catalogue />
    <PageAbout />
    <PageBlog />
    <PageService />
  </React.StrictMode>,
)


function App() {
  const {pathList , init} =  useAppStore();
  useEffect(() => {
    // let  list  = pathList.filter(f => f!=='/')
    // if(list.length <= 0) list = ['catalogue']
    init()
    // window.location.hash = list.join('/');

  }, []);
  return (<></>)
}