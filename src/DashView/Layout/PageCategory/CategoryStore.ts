import { create } from "zustand";
import { Category, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useProductStore } from "../PageProduct/ProductStore";
interface DashState {
    categories: ListType<Category> | undefined,
    selectedCategory: Category | undefined,
    productsUseCategory:ListType<ProductInterface>|undefined,
    fetchProductsUseCategory(category_id:string):Promise<void>,
    setSelectedCategories(selected: Category): any,
    fetchCategories(query?: Record<string, any>): Promise<void>,
}

export const useCategotyStore = create<DashState>((set) => ({
    categories: undefined,
    selectedCategory: undefined,
    productsUseCategory:undefined,
    async fetchProductsUseCategory(category_id){
        set(()=>({productsUseCategory:useProductStore.getState().products}))
    },
    setSelectedCategories(selected) {
        set(() => ({ selectedCategory: selected }))
    },
    async fetchCategories(filter) {
        try {
            const query :any = {};
            if(filter?.page) query.page = Number(filter.page);
            if(filter?.limit) query.limit = Number(filter.limit);
            if(filter?.sortBy) query.order_by = filter.sortBy;
            if(filter?.query.text) query.text = filter.query.text;
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }
            console.log(query);
            
            const response = await fetch(`${Host}/get_categories/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<Category>;
            if (!json || !json.list) return
            set(() => ({ categories: json }));
            console.log(json);
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
}));
