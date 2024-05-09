import { create } from "zustand";
import { CatalogueInterface, Category, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useDashStore } from "../../dashStore";
import { useRegisterStore } from "../PageAuth/RegisterStore";
interface DashState {
    catalogs: ListType<CatalogueInterface> | undefined,
    selectedCatalog: CatalogueInterface | undefined,
    catalogProducts: ListType<ProductInterface> | undefined,
    catalogCategories: ListType<Category> | undefined,
    setSelectedCatalog(selected: CatalogueInterface | undefined): any,
    fetchCatalogs(query?: Record<string, any>): Promise<void>,
    updateCatalog(catalog: Record<string, any>): Promise<void>,
    fetchCatalogProducts(filter: Record<string, any>): Promise<void>;
    fetchCatalogCategories(filter: Record<string, any>): Promise<void>;
    createCatalog(catalog: Record<string, any>): Promise<string[] | undefined>
    removeCatalog(catalog_id: string): Promise<string | undefined>
}


const CATALOG_CACHE: {
    all?: CatalogueInterface[];
} & Record<string, any> = {};
export const useCatalogStore = create<DashState>((set) => ({
    catalogs: undefined,
    selectedCatalog: undefined,
    catalogProducts: undefined,
    catalogCategories: undefined,
    async removeCatalog(catalog_id) {
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        const response = await fetch(`${Host}/delete_catalog/${catalog_id}`, {
            method: 'DELETE',
            headers: myHeaders
        });
        const json = await response.json();
        useDashStore.getState().fetchStoreVar()
        return json?.isDeleted;
    },
    async createCatalog(catalog) {
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return

        catalog.index = catalog.index || 0;
        catalog.store_id = useRegisterStore.getState().store?.id;
        const formData = new FormData();
        const error: string[] = [];

        ['label', 'description', 'store_id', 'index'].forEach(p => {
            if (catalog[p] != undefined) {
                formData.append(p, catalog[p]);
            } else {
                return error.push(p + ' is not defined');
            }
        });

        console.log(error, catalog);

        if (error.length == 0) {
            const response = await fetch(`${Host}/create_catalog`, {
                method: 'POST',
                body: formData,
                headers: myHeaders
            });
            const json = await response.json();
            if (!json || !json.id) {
                error.push('Server Error, Try Later');
                return error
            }
            set(() => ({ selectedCatalog: json }));
            useDashStore.getState().fetchStoreVar();
        } else {
            return error;
        }
    },
    async fetchCatalogCategories(filter) {
        if (!filter?.catalog_id) return;
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        try {
            const query: any = {};
            if (filter?.page) query.page = Number(filter.page);
            if (filter?.limit) query.limit = Number(filter.limit);
            if (filter?.sortBy) query.order_by = filter.sortBy;
            query.catalog_id = filter.catalog_id
            query.all_status = true
            query.store_id = useRegisterStore.getState().store?.id
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }

            const response = await fetch(`${Host}/get_categories/?${searchParams.toString()}`, {
                headers: myHeaders
            });
            const json = (await response.json()) as ListType<Category>;
            if (!json || !json.list) return
            set(() => ({ catalogCategories: json }));
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
    async fetchCatalogProducts(filter) {
        if (!filter?.catalog_id) return;
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        try {
            const query: any = {};
            if (filter?.page) query.page = Number(filter.page);
            if (filter?.limit) query.limit = Number(filter.limit);
            if (filter?.sortBy) query.order_by = filter.sortBy;
            query.catalog_id = filter.catalog_id
            query.all_status = true;  
            query.store_id = useRegisterStore.getState().store?.id
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }

            const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`, { headers: myHeaders });
            const json = (await response.json()) as ListType<ProductInterface>;
            if (!json || !json.list) return
            set(() => ({ catalogProducts: json }));
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
    async updateCatalog(catalog) {
        if (!catalog.catalog_id) return;
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        let send = false;
        const formData = new FormData();
        formData.append('catalog_id', catalog.catalog_id);
        ['label', 'index', 'status', 'description'].forEach(p => {
            if (catalog[p]) {
                formData.append(p, catalog[p]);
                send = true
            }
        });

        let newCatalog: any = null
        if (send) {
            newCatalog = await fetch(`${Host}/update_catalog`, {
                method: 'PUT',
                body: formData,
                headers: myHeaders
            });

        }
        if (catalog.scene_dir) {
            console.log(catalog);

            const f = new FormData();
            f.append('scene_dir', catalog.scene_dir);
            f.append('catalog_id', catalog.catalog_id)
            newCatalog = await fetch(`${Host}/update_view_catalog`, {
                method: 'PUT',
                body: f,
                headers: myHeaders
            });
        }
        if (newCatalog) {
            newCatalog = await newCatalog.json()
            set(() => ({ catalogProducts: newCatalog }));
        }
    },
    setSelectedCatalog(selected) {
        set(() => ({ selectedCatalog: selected }));
    },
    async fetchCatalogs(filter) {
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
            const response = await fetch(`${Host}/get_catalogs/?${searchParams.toString()}`, { headers: myHeaders });
            const json = (await response.json()) as ListType<CatalogueInterface>
            if (!json || !json.list) return
            set(() => ({ catalogs: json }));
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
}));

