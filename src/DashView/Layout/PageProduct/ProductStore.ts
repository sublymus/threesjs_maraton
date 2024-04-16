import { create } from "zustand";
import { ListType, ProductInterface } from "../../../DataBase";
import { Host } from '../../../Config'

interface ProductState {
    products: ListType<ProductInterface> | undefined;
    fetchProducts(filter?: Record<string, any>): Promise<void>;
    selectedProduct: ProductInterface | undefined;
    setSelectedProduct(selected: ProductInterface): Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: undefined,
    selectedProduct: undefined,
    async fetchProducts(filter) {
        // , category_id, catalog_id,  text, 
        const query :any = {};
        if(filter?.page) query.page = Number(filter.page);
        if(filter?.limit) query.limit = Number(filter.limit);
        if(filter?.sortBy) query.order_by = filter.sortBy;
        if(filter?.query.text) query.text = filter.query.text;
        if(filter?.query.price) query.price_min = filter.query.price[0];
        if(filter?.query.price) query.price_max = filter.query.price[1];
        if(filter?.query.stock) query.stock_min = filter.query.stock[0];
        if(filter?.query.stock) query.stock_max = filter.query.stock[1];
        query.is_features_required = true;
        
        console.log('query',query);
        console.log('filter',filter);
        
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`);
        const json = await response.json() as ListType<ProductInterface>;
        if (!json || !json.list) return;
        set(() => ({ products: json }))
        console.log(json);
    },
    async setSelectedProduct(selected) {
        set(() => ({ selectedProduct: selected }))
    },
}));
