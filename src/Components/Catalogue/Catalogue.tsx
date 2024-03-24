import { WorldManager } from "../../World/WorldManager";
import { CatalogueWorld } from "../../World/Catalogue/Catalogue";
import { useEffect } from "react";
import { useAppStore } from "../../AppStore";
import { useCatalogueStore } from "./CatalogueStore";
// import React from "react";

export function Catalogue() {
    const { pathList , check} = useAppStore();
    const {fetchCatalogues , initCatalogueListener} = useCatalogueStore();
    useEffect(() => {
        if (CatalogueWorld.catalogueWorld) return
       
        const catalogue = new CatalogueWorld();
        WorldManager.worldManager?.setWorld(catalogue);
        fetchCatalogues();
        initCatalogueListener();
    }, [])
    useEffect(() => {
        if (!CatalogueWorld.catalogueWorld) return
        if(check('catalogue')){
            WorldManager.worldManager?.setWorld(CatalogueWorld.catalogueWorld);
        }
    }, [pathList])

    return (<></>)
}