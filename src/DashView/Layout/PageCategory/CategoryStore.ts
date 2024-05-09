import { create } from "zustand";
import { Category, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useDashStore } from "../../dashStore";
import { useRegisterStore } from "../PageAuth/RegisterStore";
interface DashState {
    categories: ListType<Category> | undefined,
    selectedCategory: Category | undefined,
    categoryProducts: ListType<ProductInterface> | undefined,
    setSelectedCategory(selected: Category | undefined): any,
    fetchCategories(query?: Record<string, any>): Promise<void>,
    updateCategory(category: Record<string, any>): Promise<void>,
    fetchCategoryProducts(filter: Record<string, any>): Promise<void>;
    createCategory(category: Record<string, any>): Promise<string[] | undefined>
    removeCategory(category_id: string | undefined): Promise<string | undefined>
}

export const useCategotyStore = create<DashState>((set) => ({
    categories: undefined,
    selectedCategory: undefined,
    categoryProducts: undefined,
    async removeCategory(category_id) {
        if (!category_id) return;
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        const response = await fetch(`${Host}/delete_category/${category_id}`, {
            method: 'DELETE',
            headers: myHeaders
        });
        const json = await response.json();
        useDashStore.getState().fetchStoreVar()
        return json?.isDeleted;
    },
    async createCategory(category) {
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return

        category.index = category.index || 0;
        const formData = new FormData();
        const error: string[] = [];

        ['label', 'description', 'catalog_id', 'index'].forEach(p => {
            if (category[p] != undefined) {
                formData.append(p, category[p]);
            } else {
                return error.push(p + ' is not defined');
            }
        });

        console.log(error, category);

        if (error.length == 0) {
            const response = await fetch(`${Host}/create_category`, {
                method: 'POST',
                body: formData,
                headers: myHeaders
            });
            const json = await response.json();
            console.log(json);

            if (!json || !json.id) {
                error.push('Server Error, Try Later');
                return error
            }
            set(() => ({ selectedCategory: json }));
            useDashStore.getState().fetchStoreVar();
        } else {
            return error;
        }
    },
    async fetchCategoryProducts(filter) {
        if (!filter?.category_id) return;
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        try {
            const query: any = {};
            if (filter?.page) query.page = Number(filter.page);
            if (filter?.limit) query.limit = Number(filter.limit);
            if (filter?.sortBy) query.order_by = filter.sortBy;
            query.category_id = filter?.category_id
            query.all_status = true;  
            query.store_id = useRegisterStore.getState().store?.id;
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }

            const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`, {
                headers: myHeaders
            });

            const json = (await response.json()) as ListType<ProductInterface>;
            if (!json || !json.list) return
            set(() => ({ categoryProducts: json }));
            console.log(json);
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
    setSelectedCategory(selected) {
        set(() => ({ selectedCategory: selected }))
    },
    async updateCategory(category) {

        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return

        const formData = new FormData();
        let send = false;

        formData.append('category_id', category.category_id);
        ['label', 'index', 'status', 'catalog_id', 'description'].forEach(p => {
            if (category[p]) {
                formData.append(p, category[p]);
                send = true
            }
        });

        let newCategory: any = null
        if (send) {
            newCategory = await fetch(`${Host}/update_category`, {
                method: 'PUT',
                body: formData,
                headers:myHeaders
            });
        }
        if (category.scene_dir) {
            const f = new FormData();
            f.append('scene_dir', category.scene_dir);
            f.append('category_id', category.category_id);
            newCategory = await fetch(`${Host}/update_view_category`, {
                method: 'PUT',
                body: f,
                headers:myHeaders
            });
        }

        if (newCategory) {
            newCategory = await newCategory.json();
            set(() => ({ selectedCategory: newCategory }))
        }
    },
    async fetchCategories(filter) {
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        try {
            const query: any = {};
            if (filter?.page) query.page = Number(filter.page);
            if (filter?.limit) query.limit = Number(filter.limit);
            if (filter?.sortBy) query.order_by = filter.sortBy;
            if (filter?.query.text) query.text = filter.query.text;
            query.all_status = true
            query.store_id = useRegisterStore.getState().store?.id
           
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }

            const response = await fetch(`${Host}/get_categories/?${searchParams.toString()}`, { headers: myHeaders });
            const json = (await response.json()) as ListType<Category>;
            if (!json || !json.list) return
            set(() => ({ categories: json }));
            console.log(json);
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
}));
