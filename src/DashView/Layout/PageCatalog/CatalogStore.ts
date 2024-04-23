import { create } from "zustand";
import { CatalogueInterface, Category, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useDashStore } from "../../dashStore";
interface DashState {
    catalogs: ListType<CatalogueInterface> | undefined,
    selectedCatalog: CatalogueInterface|undefined,
    catalogProducts:ListType<ProductInterface>|undefined,
    catalogCategories:ListType<Category>|undefined,
    setSelectedCatalog(selected:CatalogueInterface|undefined):any,
    fetchCatalogs(query?: Record<string, any>): Promise<void>,
    updateCatalog(catalog:Record<string, any>):Promise<void>,
    fetchCatalogProducts(filter:Record<string, any>):Promise<void>;
    fetchCatalogCategories(filter:Record<string, any>):Promise<void>;
    createCatalog(catalog:Record<string, any>):Promise<string[]|undefined>
    removeCatalog(catalog_id: string|undefined):Promise<string|undefined>
}

const CATALOG_CACHE: {
    all?: CatalogueInterface[];
} & Record<string, any> = {};
export const useCatalogStore = create<DashState>((set) => ({
    catalogs: undefined,
    selectedCatalog:undefined,
    catalogProducts:undefined,
    catalogCategories:undefined,
    async removeCatalog(catalog_id) {
        if(!catalog_id) return;
        const response = await fetch(`${Host}/delete_catalog/${catalog_id}`, {
            method: 'DELETE'
        });
        const json  = await  response.json();
        console.log({json});
        
        return json?.isDeleted;
    },
    async createCatalog(catalog) {
        catalog.index = catalog.index ||0;
        const formData = new FormData();
        const error :string[]= [];
       
        ['label', 'description', 'index'].forEach(p => {
            if (catalog[p]!=undefined) {
                formData.append(p, catalog[p]);
            }else{
                return error.push(p+' is not defined');
            }
        }); 

        console.log(error , catalog);
        
        if (error.length==0) {
            const response =await fetch(`${Host}/create_catalog`, {
                method: 'POST',
                body: formData
            });
            const json = await response.json();
            if(!json || !json.id){ 
                error.push('Server Error, Try Later');
                return  error
            }
            set(()=>({selectedCatalog:json}));
            useDashStore.getState().fetchStoreVar();
        }else{
            return error;
        }
    },
    async fetchCatalogCategories(filter) {
        if(!filter?.catalog_id) return;
        try {
            const query :any = {};
            if(filter?.page) query.page = Number(filter.page);
            if(filter?.limit) query.limit = Number(filter.limit);
            if(filter?.sortBy) query.order_by = filter.sortBy;
            query.catalog_id = filter.catalog_id
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }
            
            const response = await fetch(`${Host}/get_categories/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<Category>;
            if (!json || !json.list) return
            set(() => ({ catalogCategories: json }));
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
    async fetchCatalogProducts(filter) {
        if(!filter?.catalog_id) return;
        try {
            const query :any = {};
            if(filter?.page) query.page = Number(filter.page);
            if(filter?.limit) query.limit = Number(filter.limit);
            if(filter?.sortBy) query.order_by = filter.sortBy;
            query.catalog_id = filter.catalog_id
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }
            
            const response = await fetch(`${Host}/get_catalog_products/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<ProductInterface>;
            if (!json || !json.list) return
            set(() => ({ catalogProducts: json }));
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
    async updateCatalog(catalog) {
        const formData = new FormData();
        if(!catalog.catalog_id) return;
        let send = false;
        formData.append('catalog_id', catalog.catalog_id);
        ['label', 'index', 'status','description'].forEach(p => { 
            if (catalog[p]) {
                formData.append(p, catalog[p]);
                send = true
            } 
        }); 

        if (send) {
            const response = fetch(`${Host}/update_catalog`, {
                method: 'PUT',
                body: formData
            });
        }   
        if (catalog.scene_dir) {
            console.log(catalog);
            
            const f = new FormData();
            f.append('scene_dir', catalog.scene_dir);
            f.append('catalog_id', catalog.catalog_id)
            const res = fetch(`${Host}/update_view_catalog`, {
                method: 'PUT',
                body: f
            });
        }
    },
    setSelectedCatalog(selected) {
        set(()=>({selectedCatalog:selected}));
    },
    async fetchCatalogs(filter) {
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
            const response = await fetch(`${Host}/get_catalogs/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<CatalogueInterface>
            if (!json || !json.list) return
            set(() => ({ catalogs: json }));
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
}));

/*
 
}

export const useCategotyStore = create<DashState>((set) => ({
    categories: undefined,
    selectedcatalog: undefined,
    catalogProducts:undefined,
    async fetchcatalogProducts(filter){
        if(!filter?.query.catalog_id) return;
        try {
            const query :any = {};
            if(filter?.page) query.page = Number(filter.page);
            if(filter?.limit) query.limit = Number(filter.limit);
            if(filter?.sortBy) query.order_by = filter.sortBy;
            query.catalog_id = filter?.query.catalog_id
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }
            console.log(query);
            
            const response = await fetch(`${Host}/get_catalog_products/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<ProductInterface>;
            if (!json || !json.list) return
            set(() => ({ catalogProducts: json }));
            console.log(json);
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
    setSelectedCategory(selected) {
        set(() => ({ selectedcatalog: selected }))
    },
    async updatecatalog(catalog) {
        const formData = new FormData();
        let send = false;
        
        console.log(catalog);
        formData.append('catalog_id', catalog.catalog_id);
        ['label', 'index', 'catalog_id', 'description'].forEach(p => { 
            if (catalog[p]) {
                formData.append(p, catalog[p]);
                send = true
            } 
        }); 
        if (send) {
            const response = fetch(`${Host}/update_catalog`, {
                method: 'PUT',
                body: formData
            });
        }   
        if (catalog.scene_dir) {
            const f = new FormData();
            f.append('scene_dir', catalog.scene_dir);
            f.append('catalog_id', catalog.catalog_id);
            const res = fetch(`${Host}/update_view_catalog`, {
                method: 'PUT',
                body: f
            });
        }
    },
*/