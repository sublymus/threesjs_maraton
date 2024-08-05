
import { create } from 'zustand'
import { ListType, ClientVisites, ProductScenus, FeaturesCollector, CollectedFeatures, features } from '../../../DataBase'
// import { AbstractWorld, WorldManager } from '../../../World/WorldManager'
import { Host } from '../../../Config';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
//B
export interface ProductState {
    visites: ListType<ClientVisites> | undefined
    products: ListType<ProductScenus> | undefined,
    product: ProductScenus | undefined,
    featuresCollector: FeaturesCollector | undefined,
    setVisites(partialProducts :Partial<ListType<ProductScenus> >| undefined, products ?:ListType<ProductScenus>| undefined):void,
    setProducts(partialProducts :Partial<ListType<ProductScenus> >| undefined, products ?:ListType<ProductScenus>| undefined):void,
    setProductById(d: { product_id: string, collected: Record<string, any> }): void
    selectProduct: (id: ProductScenus | undefined) => Promise<void>,
    fetchVisites(filter: { after_date?: string, before_date?: string, client_id?: string, product_id?: string, limit?: number, page?: number }): Promise<void>;
    setClientVisite(product_id: string): Promise<void>;
    fetchProducts: (filter: {
        page?: number,
        limit?: number,
        add_cart?:boolean,
        product_id?:string,
        order_by?: string,
        lol?:boolean,
        category_id?: string,
        text?: string,
        is_features_required?:boolean,
        caracteristique?: { [key: string]: string | number | boolean }
        no_save?: boolean
    }) => Promise<ListType<ProductScenus> | undefined>;
}


// const PRODUCTS_CACHE: { [key: string]: ProductScenus } = {}

export const useProductStore = create<ProductState>((set, get) => ({
    visites: undefined,
    product: undefined,
    products: { limit: 25, list: [], page: 1, total: 0 },
    setProducts(partialPs , ps ) {
        //@ts-ignore
        set(({products})=>({products:(products ||ps) && {...products,...ps,...partialPs}}))
    },
    setVisites(partialPs , ps ) {
        //@ts-ignore
        set(({visites})=>({visites:(visites ||ps) && {...visites,...ps,...partialPs}}))
    },
    async setClientVisite(product_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h?.user) return
        const formData = new FormData();
        formData.append('product_id', product_id);
        /* const response =  */await fetch(`${Host}/set_client_visited`, {
            headers: h.headers,
            body: formData,
            method: 'PUT'
        });
    },
    async fetchVisites({ after_date, before_date, client_id, product_id, limit, page }) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const query: any = {};
        query.store_id = h.store.id;
        query.product_id = product_id || '';
        query.client_id = client_id || '';
        query.limit = limit || 6;
        query.page = page || 1;
        query.after_date = after_date || '';
        query.before_date = before_date || '';
        query.add_favorite = true;
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            (value != undefined) && searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_client_visited/?${searchParams.toString()}`, {
            headers: h.headers
        });
        const json = await response.json() as ListType<ClientVisites>;
        if (!json || !json.list) return;
        set(() => ({ visites: json }));
    },
    featuresCollector: undefined,
    async setProductById(d) {
        if (!d.product_id) return;
        const ps = get().products;
        const p1 = ps?.list.find((p) => p.id == d.product_id);
        if (p1) {
            get().selectProduct(p1)
            set(() => ({ featuresCollector: p1?.featuresCollector }))
            // showProductWorld(set, p1);
        } else {
            const store = useRegisterStore.getState().store;
            if (!store) return;
            const query: any = {};
            query.product_id = d.product_id;
            query.is_features_required = true;
            query.store_id = store.id;
            query.by_product_category = !ps?.list[0] // TODO la recher n'est pas optimise, le produit peut ne pas se trouver dans la list, a cause de limit et page
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                (value != undefined) && searchParams.set(key, value);
            }
            const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`);
            const ps2 = (await response.json()) as ListType<ProductScenus>
            if (!ps2.list) return
            const p2 = ps2.list.find(p => p.id == d.product_id) || ps2.list[0];
            set(() => ({ products: ps ? { ...ps, list: [...(ps2.list.filter(p => !ps.list.find(_p => _p.id == p.id))), ...ps.list] } : ps2, product: p2, featuresCollector: p2?.featuresCollector }))
            get().selectProduct(p2)

        }
    },
    fetchProducts: async (filter) => {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return;
        const query: any = { ...filter };
        
        query.store_id = h.store.id;
        query.add_favorite = true;
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            (value != undefined) && searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`,{
            headers:h.headers
        });
        const products = (await response.json()) as ListType<ProductScenus>
        if (!products?.list) return
        if (!filter?.no_save) {
            set(() => ({ products }))
        }
        // console.log(products);

        return {
            ...products,
        }
        // const product = products[0];

        // if (!product) return;

        // const productScenus = await showProductWorld(set,product);
        // set(() => ({ products, product:productScenus , featuresCollector:productScenus?.featuresCollector}));
    },

    async selectProduct(product) {
        if (!product) return set(() => ({ product: undefined }));

        // const productScenus = await showProductWorld(set, product);
        // set(() => ({ product: productScenus, featuresCollector: productScenus?.featuresCollector }))
        // product.features = features;
        const collector: CollectedFeatures = {};
        product?.features.list.forEach(f => {
            collector[f.name] = f.components?.[0];
        });
        product && (product.featuresCollector = {
            collectFeature(feature, value) {
                if (value != undefined) {
                    collector[feature.name] = value
                    // world.localLoader.updateFeature(feature, value.code)
                } else {
                    if (feature.components?.[0]) {
                        collector[feature.name] = feature.components?.[0];
                        // feature.default_value && world.localLoader.updateFeature(feature, feature.default_value.code)
                    }
                }
                set(() => ({ featuresCollector: product.featuresCollector && { ...product.featuresCollector } }))
            },
            getCollectedFeatures(key) {
                return collector[key];
            },
            allCollectedFeatures() {
                return collector
            }
        })
        set(() => ({ product }));
        // console.log(' selectProduct',get().product , productScenus);
        get().setClientVisite(product.id)
    }
}))

// async function showProductWorld(set: (cb: (data: Partial<ProductState>) => Partial<ProductState>) => void, product: ProductScenus) {
//     if (!WorldManager.worldManager) {
//         return;
//     }
//     if (!product) return;
//     WorldManager.worldManager?.currentWorl?.close();

//     let productCache = PRODUCTS_CACHE[product.id];

//     if (productCache?.scene) {
//         WorldManager.worldManager.setWorld(productCache.scene);
//         return productCache
//     }
//     const { World } = await import(/* @vite-ignore */`${Host}${product.scene_dir}/World.js`);

//     const world = new World() as AbstractWorld
//     await WorldManager.worldManager.initialize((...a) => {
//         world.init(...a)
//     });
//     //  WorldManager.worldManager.setWorld(world);

//     const l: Function[] = []
//     const collector: CollectedFeatures = {}
//     product.features.list.forEach(f => {
//         collector[f.id] = f.components?.find(v => !!v.is_default);
//         f.default_value = collector[f.id];
//         l.push(() => {
//             world.localLoader.getModel().then(() => {
//                 world.localLoader.updateFeature(f, f.default_value?.code || '')
//             })
//         })
//     });
//     productCache = {
//         ...product,
//         scene: world,
//         featuresCollector: {
//             collectFeature(feature, value) {
//                 if (value != undefined) {
//                     collector[feature.id] = value
//                     world.localLoader.updateFeature(feature, value.code)
//                 } else {
//                     if (feature.default_value) {
//                         collector[feature.id] = feature.components?.find(v => v.is_default);
//                         feature.default_value && world.localLoader.updateFeature(feature, feature.default_value.code)
//                     }
//                 }
//                 set(() => ({ featuresCollector: productCache.featuresCollector && { ...productCache.featuresCollector } }))
//             },
//             getCollectedFeatures(key) {
//                 return collector[key];
//             },
//             allCollectedFeatures() {
//                 return collector
//             }
//         }
//     };
//     WorldManager.worldManager.setWorld(world);
//     l.forEach(f => f())
//     return PRODUCTS_CACHE[product.id] = productCache;
// }
