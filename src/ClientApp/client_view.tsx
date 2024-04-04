import './index.css'
import { Products } from './Components/Products/Products'
import { Editer } from './Components/Editer/Editer'
import { WorldView } from './Components/WorldView/WorldView'
import { Catalogue } from './Components/Catalogue/Catalogue'
import { TopBar } from './Components/TopBar/TopBar'
import { Profile } from './Layout/PageProfile/Profile'
import { CatalogueOnglet } from './Components/CatalogueOnglet/CatalogueOnglet'
import { CatalogueDescription } from './Components/CatalogueDescription/CatalogueDescription'
import { Summary } from "./Components/Summary/Summary";


import React, { useEffect } from 'react'
import { useAppRouter } from './AppStore'
import { useRegisterStore } from './Layout/PageRegister/RegisterStore'

const root = document.getElementById('root')!;

 const getClientView = (children: React.ReactNode) => {
    return children
}

export const ClientView = getClientView(
    <React.StrictMode>
        <App />
        <Products />
        <Editer />
        <Summary />
        <WorldView root={root} />
        <TopBar />
        <Profile />
        <CatalogueOnglet />
        <CatalogueDescription />
        <Catalogue />

    </React.StrictMode>,
)


function App() {
    const {autentificate} = useRegisterStore();
    useEffect(() => {
        autentificate();
    }, []);
    return (<></>)
}