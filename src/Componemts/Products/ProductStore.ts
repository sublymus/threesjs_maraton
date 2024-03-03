
import { create } from 'zustand'
import { Urls } from '../VerticalCadre/Urls'
import { AbstractWorld, WorldManager } from '../../World/World'

export interface Product {
    uuid: string,
    image_url: string[],
    screen_url: string,
}
export interface ProductScenus extends Product {
    uuid: string,
    image_url: string[],
    screen_url: string,
    scenus: AbstractWorld
}

export interface Filter {
    page?: number,
    limit?: number,
    filter?: {
        category_id: string,
        name: string,
        caracteristique: { [key: string]: string | number | boolean }
    }
}

export interface ProductState {
    productScenus: ProductScenus | undefined
    products: { [key: string]: Product },
    selectProduct: (uuid: string, products: { [key: string]: Product }) => Promise<void>,
    fetchProducts: (filter: Filter) => Promise<void>;
}


const PRODUCT_SCENUS_CACHE: { [key: string]: ProductScenus } = {}


export const useProductStore = create<ProductState>((set) => ({
    productScenus: undefined,
    products: {},

    fetchProducts: async (_filter: Filter) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const products: { [key: string]: Product } = {};
        Urls.forEach((url, i) => {
            const uuid = (Math.random() * 10000000).toString(32) + i;
            products[uuid] = {
                uuid,
                image_url: [url.url],
                screen_url: `/src/World/Rings/Ring_petal_${1}.ts`,
            }
        });
        
        await _selectProduct(Object.values(products)[0].uuid, products,set);
        set(() => ({ products }));
    },

    async selectProduct(uuid: string, products: { [key: string]: Product }) {

        await _selectProduct(uuid, products, set);

    }
}))

async function _selectProduct(uuid: string, products: { [key: string]: Product }, set:any) {
    const product = products[uuid];

    if (!product) return;
    let productScenus = PRODUCT_SCENUS_CACHE[uuid];

    if (productScenus) {
        WorldManager.worldManager?.setWorld(productScenus.scenus);
        set(() => ({
            productScenus
        }))
        return;
    }
    const { Product } = await import(/* @vite-ignore */product.screen_url);

    const world = new Product()
    WorldManager.worldManager?.setWorld(world);

    productScenus = {
        ...product,
        scenus: world
    };

    PRODUCT_SCENUS_CACHE[uuid] = productScenus;

    set(() => ({ uuidSelected: uuid, productScenus }))

}
