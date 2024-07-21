import { create } from "zustand";
import { ListType , CategoryInterface } from "../../../DataBase";

import { useRegisterStore } from "../PageRegister/RegisterStore";
import { Host } from "../../../Config";

interface CategoryState {
    categories:ListType<CategoryInterface>|undefined,
    fetchCategoies(filter?:{
        category_id?:string,
        page?:number, 
        limit?:number,
        parent_id?:string, 
        text?:string, 
        order_by?:string,
        no_save?:boolean 
    }):Promise<ListType<CategoryInterface>|undefined>
}

export const useCategoryStore = create<CategoryState>((set)=>({
    categories:undefined,
    async fetchCategoies(filter) {
        console.log({filter});
        
        const store = useRegisterStore.getState().store;
        if (!store) return;
        const query: any = { ...filter };

        query.store_id =store.id;
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_categories/?${searchParams.toString()}`);
        const categories = (await response.json()) as ListType<CategoryInterface>
        if(!categories?.list) return
        if (!filter?.no_save) {
            set(() => ({ categories }))
        }
        console.log(categories);
        
        return {
            ...categories,
        }
    },
}))