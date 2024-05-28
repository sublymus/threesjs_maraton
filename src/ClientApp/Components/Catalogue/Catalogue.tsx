import { WorldManager } from "../../../World/WorldManager";
import { CatalogueWorld } from "../../../World/Catalogue/Catalogue";
import { useEffect } from "react";
import { useAppRouter, useAppStore } from "../../AppStore";
import { useCatalogueStore } from "./CatalogueStore";
import { useProductStore } from "../Products/ProductStore";
import { useRegisterStore } from "../../Layout/PageRegister/RegisterStore";
// import React from "react";

export function Catalogue() {
    const { pathList, check } = useAppRouter();
    const { fetchCatalogues, catalogues } = useCatalogueStore();
    const { fetchProducts } = useProductStore()
    const { store } = useRegisterStore()
    const {blur}= useAppStore()
    useEffect(() => {
        if (store) {
            if (CatalogueWorld.catalogueWorld) return

            const catalogue = new CatalogueWorld();
            WorldManager.worldManager?.setWorld(catalogue);
            fetchCatalogues();
        }

    }, [store])
    useEffect(() => {
        if (!CatalogueWorld.catalogueWorld) return
        if (check('catalogue')) {
            WorldManager.worldManager?.setWorld(CatalogueWorld.catalogueWorld);
        } else if (check('product')) {
            catalogues && (fetchProducts({
                query: {
                    category_id: catalogues[0]?.id
                }
            }).then(() => {
                // setAbsPath(['product'])
            }))
        }
    }, [pathList])
    useEffect(()=>{
        WorldManager.worldManager &&( WorldManager.worldManager._renderer.domElement.style.filter = blur ? 'blur(10px)':'')
    },[blur])
    return (<></>)
}