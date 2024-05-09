import { WorldManager } from "../../../World/WorldManager";
import { CatalogueWorld } from "../../../World/Catalogue/Catalogue";
import { useEffect } from "react";
import { useAppRouter } from "../../AppStore";
import { useCatalogueStore } from "./CatalogueStore";
import { useProductStore } from "../Products/ProductStore";
import { useRegisterStore } from "../../Layout/PageRegister/RegisterStore";
// import React from "react";

export function Catalogue() {
    const { pathList, check, setAbsPath } = useAppRouter();
    const { fetchCatalogues, catalogues } = useCatalogueStore();
    const { fetchProducts } = useProductStore()
    const { store } = useRegisterStore()
    useEffect(() => {
        console.log('fetchCatalogues', { store });
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
                filter: {
                    category_id: catalogues[0]?.id
                }
            }).then(() => {
                setAbsPath(['product'])
            }))
        }
    }, [pathList])
    return (<></>)
}