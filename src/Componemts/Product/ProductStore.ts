

import { create } from 'zustand'
import { Urls } from '../Cadre/Urls'
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

export interface AppState {
    productScenus: Product | undefined
    products: { [key: string]: Product },
    selectProduct: (uuid: string, products: { [key: string]: Product }) => Promise<void>,
    fetchProducts: (filter: Filter) => Promise<void>
}


const PRODUCT_SCENUS_CACHE: { [key: string]: ProductScenus } = {}

export const useProductStore = create<AppState>((set) => ({
    productScenus: undefined,
    products: {},
    fetchProducts: async (filter: Filter) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const products: { [key: string]: Product } = {};
        Urls.forEach((url, i) => {
            const uuid = (Math.random() * 10000000).toString(32) + i;
            products[uuid] = {
                uuid,
                image_url: [url.url],
                screen_url: '../../World/Rings/Ring_petal_1.ts',
            }
        });

        set(() => ({ products }));
    },
    async selectProduct(uuid: string, products: { [key: string]: Product }) {
        const product = products[uuid]
        console.log('@@@  1', product);

        if (!product) return;
        let productScenus = PRODUCT_SCENUS_CACHE[uuid];
        console.log('@@@  2', productScenus);

        if (productScenus) {
            WorldManager.worldManager?.setWorld(productScenus.scenus);
            set(() => ({
                productScenus
            }))
            return;
        }
        const { Product } = await import(/* @vite-ignore */product.screen_url);
        console.log('@@@  3', Product);

        const world = new Product()
        WorldManager.worldManager?.setWorld(world);

        productScenus = {
            ...product,
            scenus: world
        };

        PRODUCT_SCENUS_CACHE[uuid] = productScenus;

        set(() => ({ uuidSelected: uuid ,productScenus}))

    }

}))