
import { create } from 'zustand'
import {  ListType, ClientVisites, ProductScenus, FeaturesCollector, CollectedFeatures } from '../../../DataBase'
import { AbstractWorld, WorldManager } from '../../../World/WorldManager'
import { Host } from '../../../Config';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';


export interface Filter {
    page?: number,
    limit?: number,
    order_by?: string,
    query?: {
        category_id?: string,
        text?: string,
        caracteristique?: { [key: string]: string | number | boolean }
    } & Record<string, any>
}

export interface ProductState {
    visites:ListType<ClientVisites>|undefined
    products: ListType<ProductScenus>|undefined,
    product: ProductScenus | undefined,
    featuresCollector: FeaturesCollector | undefined,
    setProductById(d: { product_id: string, collected: Record<string, any> }): void
    selectProduct: (id: ProductScenus) => Promise<void>,
    fetchVisites(filter: { after_date?: string, before_date?: string, client_id?: string, product_id?: string, limit?: number, page?: number }): Promise<void>;
    setClientVisite( product_id: string): Promise<void>;
    fetchProducts: (filter: Filter) => Promise<ListType<ProductScenus> | undefined>;
}


const PRODUCTS_CACHE: { [key: string]: ProductScenus } = {}

export const useProductStore = create<ProductState>((set) => ({
    visites:undefined,
    product: undefined,
    products: { limit: 25, list: [], page: 1, total: 0 },
    async setClientVisite(product_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();
        formData.append('product_id', product_id);
        /* const response =  */await fetch(`${Host}/set_client_visited`, {
            headers: h.headers,
            body:formData,
            method:'PUT'
        });
    },
    async fetchVisites({ after_date, before_date, client_id, product_id, limit, page }) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const query: any = {};
        query.store_id = h.store.id;
        query.product_id = product_id || '';
        query.client_id = client_id || '';
        query.limit = limit || 25;
        query.page = page || 1;
        query.after_date = after_date||'';
        query.before_date = before_date || '';
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_client_visited/?${searchParams.toString()}`, {
            headers: h.headers
        });
        const json = await response.json() as ListType<ClientVisites>;
        if (!json || !json.list) return;
        console.log(json.list);
        
       set(()=>({visites:json}))
    },
    featuresCollector: undefined,
    async setProductById(d) {
        if (!d.product_id) return;
        const ps = useProductStore.getState().products;
        const p1 = ps?.list.find((p) => p.id == d.product_id);
        if (p1) {
            useProductStore.getState().selectProduct(p1)
            set(()=>({featuresCollector: p1?.featuresCollector }))
            showProductWorld(set,p1);
        } else {
            const store = useRegisterStore.getState().store;
            if (!store) return;
            const query: any = {};
            query.product_id = d.product_id;
            query.is_features_required = true;
            query.store_id = useRegisterStore.getState().store?.id;
            query.by_product_category = !ps?.list[0]
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }
            const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`);
            const ps2 = (await response.json()) as ListType<ProductScenus>
            if(!ps2.list) return
            const p2 =ps2.list.find(p=>p.id == d.product_id) || ps2.list[0];
            set(() => ({ products: ps &&{ ...ps, list: [...ps.list,...(ps2.list.filter(p=>!ps.list.find(_p=>_p.id==p.id)))] }, product: p2 ,featuresCollector: p2?.featuresCollector}))
            useProductStore.getState().selectProduct(p2)
            // if()
        }
    },
    fetchProducts: async (filter: Filter) => {
        const store = useRegisterStore.getState().store;
        if (!store) return;
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
        set(() => ({ products }))
        return products
        // const product = products[0];

        // if (!product) return;

        // const productScenus = await showProductWorld(set,product);
        // set(() => ({ products, product:productScenus , featuresCollector:productScenus?.featuresCollector}));
    },

    async selectProduct(product: ProductScenus) {
        if (!product) return;

        const productScenus = await showProductWorld(set, product);
        set(() => ({ product: productScenus, featuresCollector: productScenus?.featuresCollector }))

        useProductStore.getState().setClientVisite(product.id)
    }
}))

async function showProductWorld(set: (cb: (data: Partial<ProductState>) => Partial<ProductState>) => void, product: ProductScenus) {
    if (!WorldManager.worldManager) {
        return;
    }
    if (!product) return;
    WorldManager.worldManager?.currentWorl?.close();

    let productCache = PRODUCTS_CACHE[product.id];

    if (productCache?.scene) {
        WorldManager.worldManager.setWorld(productCache.scene);
        return productCache
    }
    const { World } = await import(/* @vite-ignore */`${Host}${product.scene_dir}/World.js`);

    const world = new World() as AbstractWorld
    await WorldManager.worldManager.initialize((...a) => {
        world.init(...a)
    });
    //  WorldManager.worldManager.setWorld(world);
    const l: Function[] = []
    const collector: CollectedFeatures = {}
    product.features.list.forEach(f => {
        collector[f.id] = f.components?.find(v => !!v.is_default);
        f.default_value = collector[f.id];
        l.push(() => {
            world.localLoader.getModel().then(() => {
                world.localLoader.updateFeature(f, f.default_value?.code || '')
            })
        })
    });
    productCache = {
        ...product,
        scene: world,
        featuresCollector: {
            collectFeature(feature, value) {
                if (value != undefined) {
                    collector[feature.id] = value
                    world.localLoader.updateFeature(feature, value.code)
                } else {
                    if (feature.default_value) {
                        collector[feature.id] = feature.components?.find(v => v.is_default);
                        feature.default_value && world.localLoader.updateFeature(feature, feature.default_value.code)
                    }
                }
                set(() => ({ featuresCollector: productCache.featuresCollector && { ...productCache.featuresCollector } }))
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
    l.forEach(f => f())
    return PRODUCTS_CACHE[product.id] = productCache;
}
