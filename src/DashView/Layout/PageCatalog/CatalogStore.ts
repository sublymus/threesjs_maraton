import { create } from "zustand";
import { CatalogueInterface, ListType } from "../../../DataBase";
import { Host } from "../../../Config";
interface DashState {
    catalogs: ListType<CatalogueInterface> | undefined,
    selectedCatalog: CatalogueInterface|undefined,
    setSelectedCatalog(selected:CatalogueInterface):any,
    fetchCatalogs(query?: Record<string, any>): Promise<void>,
}

const CATALOG_CACHE: {
    all?: CatalogueInterface[]
} & Record<string, any> = {};
export const useCatalogStore = create<DashState>((set) => ({
    catalogs: undefined,
    selectedCatalog:undefined,
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
            console.log(json);
        } catch (error: any) {
            return console.warn(error.message);
        }
    },
}));
