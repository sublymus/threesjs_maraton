import './CatalogueOnglet.css'
import { useAppRouter } from "../../AppStore";
import { useCatalogueStore } from "../Catalogue/CatalogueStore";
import { useEffect, useState } from 'react';
import { CatalogueInterface } from '../../../DataBase';
// import { useEffect } from "react";

export function CatalogueOnglet() {
    const {  check } = useAppRouter();
    const {catalogue,setCatalogue,catalogues} = useCatalogueStore();
    const [active,setActive] = useState<CatalogueInterface|undefined>();
    useEffect(()=>{
        setActive(catalogue)
    },[catalogue])
    return check( 'catalogue_description') && (
        <div className="catalogue-onglet">
            {catalogues.map((catalogue)=>{
                return (<div className={"onglet "+(active?.id == catalogue.id?'active':'')} key={catalogue.id} onClick={()=>{
                    setCatalogue(catalogue);
                }}>
                {catalogue.label}
                </div>)
            })}
        </div>
    )
}