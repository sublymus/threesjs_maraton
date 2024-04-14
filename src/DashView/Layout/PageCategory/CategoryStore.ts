import { create } from "zustand";
import { Category } from "../../../DataBase";
import { Host } from "../../../Config";
interface DashState {
    fetchCategories(): Promise<void>,
    categories: Category[] | undefined
}

const CATEGORIES_CACHE: {
    all?: Category[]
} & Record<string, any> = {};
export const useCategotyStore = create<DashState>((set) => ({
    categories: undefined,
    async fetchCategories() {
        if (!CATEGORIES_CACHE['all']) {
            try {
                const response = await fetch(`${Host}/get_categories`);
                const json =( await response.json())as Category[];
                if(!Array.isArray(json)) return
                set(()=>({categories:json}));
                CATEGORIES_CACHE['all'] = json;
            } catch (error:any) {
                return console.warn(error.message);
            }
        }
    },
}));
