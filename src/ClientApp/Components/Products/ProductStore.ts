
import { create } from 'zustand'
import { features, Feature, ProductInterface, Component, ListType } from '../../../DataBase'
import { AbstractWorld, WorldManager } from '../../../World/WorldManager'
import { Host } from '../../../Config';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';

export type CollectedFeatures = { [key: string]: Component | undefined}

export type FeaturesCollector = {
    collectFeature(feature: Feature, value: Component | undefined): void
    getCollectedFeatures(key: string): Component | undefined
    allCollectedFeatures(): CollectedFeatures
};

export interface Filter {
    page?: number,
    limit?: number,
    order_by?:string,
    query?: {
        category_id?: string,
        text?: string,
        caracteristique?: { [key: string]: string | number | boolean }
    }&Record<string, any>
}

interface ProductScenus extends ProductInterface {
    featuresCollector?: FeaturesCollector,
    scene?: AbstractWorld
}
export interface ProductState {
    products: ListType<ProductScenus>
    product: ProductScenus | undefined,
    featuresCollector:FeaturesCollector|undefined,
    selectProduct: (id: ProductScenus) => Promise<void>,
    fetchProducts: (filter: Filter) => Promise<ListType<ProductScenus>|undefined>;
}


const PRODUCTS_CACHE: { [key: string]: ProductScenus } = {}

export const useProductStore = create<ProductState>((set) => ({
    product: undefined,
    products: {limit:25,list:[],page:1,total:0},
    featuresCollector:undefined,
   
    fetchProducts: async (filter: Filter) => {
        const store = useRegisterStore.getState().store;
        if(!store) return;
        const query: any = {};
        if (filter?.page) query.page = Number(filter.page); 
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.order_by) query.order_by = filter.order_by;
        if (filter?.query?.text) query.text = filter.query.text;
        if (filter?.query?.price) query.price_min = filter.query.price[0];
        if (filter?.query?.price) query.price_max = filter.query.price[1];
        if (filter?.query?.stock) query.stock_min = filter.query.stock[0];
        if (filter?.query?.stock) query.stock_max = filter.query.stock[1];
        if (filter?.query?.product_id) query.product_id = filter.query.product_id;
        if (filter?.query?.category_id) query.category_id = filter.query.category_id;
       
        query.is_features_required = true;
        query.store_id = useRegisterStore.getState().store?.id;
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`);
        const products = (await response.json()) as ListType<ProductScenus>
        console.log(products);
        set(() => ({ products}))
        return products
        // const product = products[0];
        
        // if (!product) return;
        
        // const productScenus = await showProductWorld(set,product);
        // set(() => ({ products, product:productScenus , featuresCollector:productScenus?.featuresCollector}));
    },

    async selectProduct(product:ProductScenus) {
        if (!product) return;
        
        const productScenus = await showProductWorld(set,product);
        set(() => ({ product:productScenus , featuresCollector:productScenus?.featuresCollector }))
    }
}))

async function showProductWorld(set:(cb :(data:Partial<ProductState>)=> Partial<ProductState>)=>void ,product:ProductScenus) {
    if(!WorldManager.worldManager) {
        return;
    }
    if (!product) return;
console.log('1');

    WorldManager.worldManager?.currentWorl?.close();

    let productCache = PRODUCTS_CACHE[product.id];

    if (productCache?.scene) {
        WorldManager.worldManager.setWorld(productCache.scene);
        return productCache
    }
    
console.log('2');
    const {World} =await import(/* @vite-ignore */`${Host}${product.scene_dir}/World.js`);

    const world = new World() as AbstractWorld
    await WorldManager.worldManager.initialize(world.getDependencies(),(...a)=>{
        world.init(...a)
    });
  //  WorldManager.worldManager.setWorld(world);
    
console.log('3');
    const collector: CollectedFeatures = {}
    // features.list.forEach(f=>{
    //     collector[f.id]= f.components?.find(v=> (v as any).id == f.default_value);
    // });
    productCache = {
        ...product,
        // features:features,
        scene: world,
        featuresCollector: {
            collectFeature(feature, value) {
                if (value != undefined) {
                    collector[feature.id] = value
                    world.localLoader.updateFeature(feature, value.code)
                } else { 
                    //collector[feature.id] = feature.components?.find(v=> (v as any).id == feature.default_value);
                    //world.localLoader.updateFeature(feature, feature.default_value) 
                }
                set(()=>({featuresCollector:productCache.featuresCollector&&{...productCache.featuresCollector}}))
            },
            getCollectedFeatures(key) {
                return collector[key];
            },
            allCollectedFeatures() {
                return collector
            }
        }
    };
    WorldManager.worldManager.setWorld(world);
console.log('4');
    return PRODUCTS_CACHE[product.id] = productCache;
}
