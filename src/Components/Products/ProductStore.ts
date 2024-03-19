
import { create } from 'zustand'
import { DataBase, Feature, ProductInterface, VALUES } from '../../DataBase'
import { AbstractWorld, WorldManager } from '../../World/WorldManager'
import { Host } from '../../AppStore';

export type CollectedFeatures = { [key: string]: VALUES | undefined}

export type FeaturesCollector = {
    collectFeature(feature: Feature, value: VALUES | undefined): void
    getCollectedFeatures(key: string): VALUES | undefined
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
        const response = await fetch(`${Host}/get_products/?page=1&limit=25&is_features_required=true`,{
            method:'GET'
        });
        const products = (await response.json()) as ProductScenus[]
        
        const product = products[0];
        if (!product) return;
        console.log(product);
        
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
    if(!WorldManager.worldManager) {
        return;
    }
    if (!product) return;

    WorldManager.worldManager?.currentWorl?.close();

    let productCache = PRODUCTS_CACHE[product.id];

    if (productCache?.scene) {
        WorldManager.worldManager.setWorld(productCache.scene);
        return productCache
    }
    
    const {World} =await import(/* @vite-ignore */`${Host}${product.scene_dir}/World.js`);

    const world = new World() as AbstractWorld
    await WorldManager.worldManager.initialize(world.getDependencies(),(...a)=>{
        world.init(...a)
    });
  //  WorldManager.worldManager.setWorld(world);
    
    const collector: CollectedFeatures = {}
    productCache = {
        ...product,
        scene: world,
        featuresCollector: {
            collectFeature(feature, value) {
                if (value != undefined) {
                    collector[feature.id] = value
                    world.localLoader.updateFeature(feature, value)
                } else { 
                    collector[feature.id] = feature.default_value
                    world.localLoader.updateFeature(feature, feature.default_value) 
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
