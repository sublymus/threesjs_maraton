
import { create } from 'zustand'
import { DataBase, ProductInterface } from '../../DataBase'
import { AbstractWorld } from '../../World/WorldManager'
import { CatalogueWorld } from '../../World/Catalogue/Catalogue'

export interface CatalogueInfo{
    selectedProduct:ProductInterface
}

interface AppState {
    info: CatalogueInfo |undefined,
    fetchCatalogue(name:string):Promise<void>
}

const CATALOGUE_MODEL_CACHE : {[name:string]:AbstractWorld[]}= {}

export const useCatalogueStore = create<AppState>((set) => ({
    info:undefined,
    async fetchCatalogue(name:string) {
        if(CATALOGUE_MODEL_CACHE[name]){
            const promises = CATALOGUE_MODEL_CACHE[name].map((world)=>new Promise(async (rev)=>{
                CatalogueWorld.catalogueWorld?.addModel(await world.getModel());
                rev(null);
            }))
            await Promise.allSettled(promises)
            return 
        }
        const catalogueProducts = await DataBase.fetchCatalogue(name);
        CATALOGUE_MODEL_CACHE[name] = [];
        catalogueProducts.map((product)=>new Promise(async (rev)=>{
            const {World} =await import(/* @vite-ignore */product.scene_url)
            const world = new World() as AbstractWorld;
            CATALOGUE_MODEL_CACHE[name].push(world)
            CatalogueWorld.catalogueWorld?.addModel(await world.getModel())
        }))
    },
}))
