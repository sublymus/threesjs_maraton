
import { create } from 'zustand'
import { ListType, ClientVisites, ProductScenus, FeaturesCollector, CollectedFeatures } from '../../../DataBase'
// import { AbstractWorld, WorldManager } from '../../../World/WorldManager'
import { Host } from '../../../Config';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { AbstractWorld, WorldManager } from '../../../World/WorldManager';
//B
export interface ProductState {
    visites: ListType<ClientVisites> | undefined
    products: ListType<ProductScenus> | undefined,
    product: ProductScenus | undefined,
    featuresCollector: FeaturesCollector | undefined,
    setVisites(partialProducts: Partial<ListType<ProductScenus>> | undefined, products?: ListType<ProductScenus> | undefined): void,
    setProducts(partialProducts: Partial<ListType<ProductScenus>> | undefined, products?: ListType<ProductScenus> | undefined): void,
    setProductById(d: { product_id: string, collected: Record<string, any> }): void
    selectProduct: (id: ProductScenus | undefined, fack?: boolean) => Promise<void>,
    fetchVisites(filter: { after_date?: string, before_date?: string, client_id?: string, product_id?: string, limit?: number, page?: number }): Promise<void>;
    setClientVisite(product_id: string): Promise<void>;
    fetchProducts: (filter: {
        page?: number,
        limit?: number,
        add_cart?: boolean,
        product_id?: string,
        order_by?: string,
        lol?: boolean,
        category_id?: string,
        text?: string,
        is_features_required?: boolean,
        caracteristique?: { [key: string]: string | number | boolean }
        no_save?: boolean
    }) => Promise<ListType<ProductScenus> | undefined>;
}

const PRODUCTS_CACHE: any = {}

export const useProductStore = create<ProductState>((set, get) => ({
    visites: undefined,
    product: undefined,
    products: { limit: 25, list: [], page: 1, total: 0 },
    setProducts(partialPs, ps) {
        //@ts-ignore
        set(({ products }) => ({ products: (products || ps) && { ...products, ...ps, ...partialPs } }))
    },
    setVisites(partialPs, ps) {
        //@ts-ignore
        set(({ visites }) => ({ visites: (visites || ps) && { ...visites, ...ps, ...partialPs } }))
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
        const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`, {
            headers: h.headers
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

    async selectProduct(product, fack) {
        if (!product) return set(() => ({ product: undefined }));


        // product.features = features;
        // if(cache[product.id]){
        //     product.featuresCollector = cache[product.id];
        // }else{
        let collector: CollectedFeatures = {};
        (product?.features)?.list?.forEach(f => {

            collector[f.name] = f.components?.find(v => v.is_default);
            // console.log(f.components, collector[f.name]);
        });
        // console.log();

        product && (product.featuresCollector = {
            collectFeature(feature, value) {
                // console.log(feature, value);

                if (value != undefined) {
                    collector[feature.name] = value
                    // world.localLoader.updateFeature(feature, value.code)
                } else {
                    const def = feature.components?.find(v => v.is_default)
                    if (def) {
                        collector[feature.name] = def;
                        // feature.default_value && world.localLoader.updateFeature(feature, feature.default_value.code)
                    }
                }
                set(() => ({ featuresCollector: product.featuresCollector && { ...product.featuresCollector } }))
            },
            getCollectedFeatures(key) {
                return collector[key];
            },
            setAll(all: CollectedFeatures) {
                collector = all;
                // console.log({all});
            },
            allCollectedFeatures() {
                // console.log({collector});
                return collector
            }
        });
        //     cache[product.id] = product.featuresCollector;
        // }

        if (fack) return
        showProductWorld(set, product).then(productScenus => {
            set(({ product }) => ({ product: product?.id == productScenus?.id ? productScenus : product }))
        })
        set(() => ({ product }));
        get().setClientVisite(product.id)
    }
}))

// const  PRODUCTS_CACHE:any = {}

async function showProductWorld(_set: (cb: (data: Partial<ProductState>) => Partial<ProductState>) => void, product: ProductScenus) {
    if (!WorldManager.worldManager || !product || !product.scene_dir) {
        return product;
    }

    let savedWorld = PRODUCTS_CACHE[product.id];
    
    if (WorldManager.worldManager?.currentWorl && (WorldManager.worldManager?.currentWorl == savedWorld)) {
        WorldManager.worldManager?.currentWorl?.open();
        product.scene = savedWorld
        console.log('%%');

        return product

    }


    if (savedWorld) {
        WorldManager.worldManager.setWorld(savedWorld);
        product.scene = savedWorld;
        console.log('##');
        return product
    }
    WorldManager.worldManager?.currentWorl?.close();
    const { World } = await import(/* @vite-ignore */`${Host}${product.scene_dir}/World.js`);

    const world = new World() as AbstractWorld
    await WorldManager.worldManager.initialize((...a) => {
        world.init(...a)

        console.log({ a });

    });

    const l: Function[] = []
    product.features.list.forEach(f => {
        l.push(() => {
            world.localLoader.getModel().then(() => {
                world.localLoader.updateFeature(f, f.components?.find(c => c.is_default)?.scene_code || '')
            })
        })
    })
    product.scene = world;
    WorldManager.worldManager.setWorld(world);
    l.forEach(f => f())
    PRODUCTS_CACHE[product.id] = world;
    return product
}
