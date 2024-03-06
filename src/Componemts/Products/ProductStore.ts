
import { create } from 'zustand'
import { DataBase, Feature, ProductInterface } from '../../DataBase'
import { AbstractWorld, WorldManager } from '../../World/WorldManager'


export type CollectedFeatures = { [key: string]: Feature['values'][0] }

export type FeaturesCollector = {
    collectFeature(feature: Feature, value: Feature['values'][0] | undefined): void
    getCollectedFeatures(key: string): Feature['values'][0] | undefined
    allCollectedFeatures(): CollectedFeatures
};


export interface Filter {
    page?: number,
    limit?: number,
    filter?: {
        category_id: string,
        name: string,
        caracteristique: { [key: string]: string | number | boolean }
    }
}

interface ProductScenus extends ProductInterface {
    featuresCollector?: FeaturesCollector,
    scene?: AbstractWorld
}

interface MapProductScenus{
    [key: string]:ProductScenus
}


export interface ProductState {
    products: MapProductScenus
    product:ProductScenus|undefined,
    selectProduct: (id: string, products: MapProductScenus) => Promise<void>,
    fetchProducts: (filter: Filter) => Promise<void>;
}

const PRODUCTS_CACHE: { [key: string]: ProductScenus } = {}

export const useProductStore = create<ProductState>((set) => ({
    product: undefined,
    products: {},

    fetchProducts: async (_filter: Filter) => {
        const products = await DataBase.fetchRings()
        await showProductWorld(Object.values(products)[0].id, products);
        set(() => ({ products }));
    },

    async selectProduct(id: string, products: MapProductScenus) {
        await showProductWorld(id, products);
        set(()=>({product:products[id]}))
    }
}))

async function showProductWorld(id: string, products: MapProductScenus) {
    const product = products[id];
    if (!product) return;
    
    WorldManager.worldManager?.currentWorl?.close();

    let productCache = PRODUCTS_CACHE[id];

    if (productCache?.scene) {
        WorldManager.worldManager?.setWorld(productCache.scene);
        return;
    }

    const { World } = await import(/* @vite-ignore */product.scene_url);

    const world = new World() as AbstractWorld;
    WorldManager.worldManager?.setWorld(world);

    const collector :CollectedFeatures = {}
    productCache = {
        ...product,
        scene: world,
        featuresCollector:{
            collectFeature(feature, value){
               if(value){
                   collector[feature.id] = value
                   world.updateFeature(feature, value)
                }else{
                    collector[feature.id] = feature.default
                   world.updateFeature(feature, feature.default)
                }
            },
            getCollectedFeatures(key){
                return collector[key];
            },
            allCollectedFeatures(){
                return collector
            }
        }

    };

    PRODUCTS_CACHE[id] = productCache;

}
