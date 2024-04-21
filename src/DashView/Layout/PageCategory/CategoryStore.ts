import { create } from "zustand";
import { Category, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
interface DashState {
    categories: ListType<Category> | undefined,
    selectedCategory: Category | undefined,
    categoryProducts:ListType<ProductInterface>|undefined,
    setSelectedCategories(selected: Category): any,
    fetchCategories(query?: Record<string, any>): Promise<void>,
    updateCategory(category:Record<string, any>):Promise<void>,
    fetchCategoryProducts(filter:Record<string, any>):Promise<void>; 
    createCategory(category:Record<string, any>):Promise<string[]|undefined>
}

export const useCategotyStore = create<DashState>((set) => ({
    categories: undefined,
    selectedCategory: undefined,
    categoryProducts:undefined,
    async createCategory(category) {
        category.index = category.index ||0;
        const formData = new FormData();
        const error :string[]= [];
       
        ['label', 'description', 'catalog_id', 'index'].forEach(p => {
            if (category[p]!=undefined) {
                formData.append(p, category[p]);
            }else{
                return error.push(p+' is not defined');
            }
        }); 

        console.log(error , category);
        
        if (error.length==0) {
            const response =await fetch(`${Host}/create_category`, {
                method: 'POST',
                body: formData
            });
            const json = await response.json();
            console.log(json);
            
            if(!json || !json.id){ 
                error.push('Server Error, Try Later');
                return  error
            }
            set(()=>({selectedCategory:json}));
        }else{
            return error;
        }
    },
    async fetchCategoryProducts(filter){
        if(!filter?.category_id) return;
        try {
            const query :any = {};
            if(filter?.page) query.page = Number(filter.page);
            if(filter?.limit) query.limit = Number(filter.limit);
            if(filter?.sortBy) query.order_by = filter.sortBy;
            query.category_id = filter?.category_id
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }
            console.log(query);
            
            const response = await fetch(`${Host}/get_category_products/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<ProductInterface>;
            if (!json || !json.list) return
            set(() => ({ categoryProducts: json }));
            console.log(json);
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
    setSelectedCategories(selected) {
        set(() => ({ selectedCategory: selected }))
    },
    async updateCategory(category) {
        const formData = new FormData();
        let send = false;
        
        console.log(category);
        formData.append('category_id', category.category_id);
        ['label', 'index', 'catalog_id', 'description'].forEach(p => { 
            if (category[p]) {
                formData.append(p, category[p]);
                send = true
            } 
        }); 
        if (send) {
            const response = fetch(`${Host}/update_category`, {
                method: 'PUT',
                body: formData
            });
        }   
        if (category.scene_dir) {
            const f = new FormData();
            f.append('scene_dir', category.scene_dir);
            f.append('category_id', category.category_id);
            const res = fetch(`${Host}/update_view_category`, {
                method: 'PUT',
                body: f
            });
        }
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
