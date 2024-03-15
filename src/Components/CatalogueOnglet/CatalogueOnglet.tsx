import './CatalogueOnglet.css'
import { useAppStore } from "../../AppStore";
import { useCatalogueStore } from "../Catalogue/CatalogueStore";
import { useEffect, useState } from 'react';
import { Catalogue } from '../../DataBase';
// import { useEffect } from "react";

export function CatalogueOnglet() {
    const { page, isAllowed } = useAppStore();
    const {catalogue,setCatalogue,catalogues} = useCatalogueStore();
    const [active,setActive] = useState<Catalogue|undefined>();
    useEffect(()=>{
        setActive(catalogue)
    },[catalogue])
    return isAllowed(page, 'catalogue_description') && (
        <div className="catalogue-onglet">
            {catalogues.map((catalogue)=>{
                return (<div className={"onglet "+(active?.id == catalogue.id?'active':'')} key={catalogue.id} onClick={()=>{
                    setCatalogue(catalogue);
                }}>
                {catalogue.name}
                </div>)
            })}
        </div>
    )
}