
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
        category_id?: string,
        name?: string,
        caracteristique?: { [key: string]: string | number | boolean }
    }
}

interface ProductScenus extends ProductInterface {
    featuresCollector?: FeaturesCollector,
    scene?: AbstractWorld
}
export interface ProductState {
    products: ProductScenus[]
    product: ProductScenus | undefined,
    selectProduct: (id: ProductScenus) => Promise<void>,
    fetchProducts: (filter: Filter) => Promise<void>;
}


const PRODUCTS_CACHE: { [key: string]: ProductScenus } = {}

export const useProductStore = create<ProductState>((set) => ({
    product: undefined,
    products: [],

    fetchProducts: async (_filter: Filter) => {
        const products = await DataBase.fetchRings()
        const product = Object.values(products)[0];
        if (!product) return;
        const productScenus = await showProductWorld(product);
        set(() => ({ products, product:productScenus }));
    },

    async selectProduct(product:ProductScenus) {
        if (!product) return;
        const productScenus = await showProductWorld(product);
        set(() => ({ product:productScenus }))
    }
}))

async function showProductWorld(product:ProductScenus) {

    if (!product) return;

    WorldManager.worldManager?.currentWorl?.close();

    let productCache = PRODUCTS_CACHE[product.id];

    if (productCache?.scene) {
        WorldManager.worldManager?.setWorld(productCache.scene);
        return productCache
    }
    
    const {World} =await import(/* @vite-ignore */product.scene_url)
    const world = new World() as AbstractWorld;
    WorldManager.worldManager?.setWorld(world);
    
    const collector: CollectedFeatures = {}
    productCache = {
        ...product,
        scene: world,
        featuresCollector: {
            collectFeature(feature, value) {
                if (value) {
                    collector[feature.id] = value
                    world.updateFeature(feature, value)
                } else {
                    collector[feature.id] = feature.default
                    world.updateFeature(feature, feature.default)
                }
            },
            getCollectedFeatures(key) {
                return collector[key];
            },
            allCollectedFeatures() {
                return collector
            }
        }
    };
    
    return PRODUCTS_CACHE[product.id] = productCache;

}
