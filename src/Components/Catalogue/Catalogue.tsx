import { WorldManager } from "../../World/WorldManager";
import { CatalogueWorld } from "../../World/Catalogue/Catalogue";
import { World } from "../../World/Rings/Ring_petal_1";
import { useEffect } from "react";
import { useAppStore } from "../../AppStore";
import { useCatalogueStore } from "./CatalogueStore";
// import React from "react";

export function Catalogue() {
    const { page } = useAppStore();
    const {fetchCatalogues , initCatalogueListener} = useCatalogueStore();
    useEffect(() => {
        if (CatalogueWorld.catalogueWorld) return
        new World();
        const catalogue = new CatalogueWorld();
        WorldManager.worldManager?.setWorld(catalogue);
        fetchCatalogues();
        initCatalogueListener();
    }, [])
    useEffect(() => {
        if (!CatalogueWorld.catalogueWorld) return
        if(page=='catalogue'){
            WorldManager.worldManager?.setWorld(CatalogueWorld.catalogueWorld);
        }
    }, [page])

    return (<></>)
}