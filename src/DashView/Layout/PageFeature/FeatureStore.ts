import { create } from "zustand";
import { Category, Feature, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useProductStore } from "../PageProduct/ProductStore";
interface DashState {
    features: ListType<Feature> | undefined,
    selectedFeature: Feature | undefined,
    productsUseFeature:ListType<ProductInterface>|undefined,
    fetchProductsUseFeature(feature_id:string):Promise<void>
    setSelectedFeature(selected: Feature): any,
    fetchFeatures(query?: Record<string, any>): Promise<void>,
}

// const FEATURES_CACHE: {
//     all?: ListType<Feature>
// } & Record<string, any> = {};
export const useFeatureStore = create<DashState>((set) => ({
    features: undefined,
    selectedFeature: undefined,
    productsUseFeature:undefined,
    async fetchProductsUseFeature(feature_id){
        set(()=>({productsUseFeature:useProductStore.getState().products}))
    },
    setSelectedFeature(selected) {
        set(()=>({selectedFeature:selected}))
    },
    async fetchFeatures(filter) {
        try {
          
            console.log('filter', filter);
            
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
            const response = await fetch(`${Host}/get_features/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<Feature>;
            if (!json || !json.list) return
            set(() => ({ features: json }));
        } catch (error: any) {
            return console.warn(error.message);
        }

    },
}));
