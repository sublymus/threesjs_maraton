import { create } from "zustand";
import { Category, Feature, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useProductStore } from "../PageProduct/ProductStore";
import { useDashStore } from "../../dashStore";
interface DashState {
    features: ListType<Feature> | undefined,
    selectedFeature: Feature | undefined,
    productsUseFeature:ListType<ProductInterface>|undefined,
    fetchProductsUseFeature(feature_id:string):Promise<void>
    setSelectedFeature(selected: Feature|undefined): any,
    updateFeature(feature: Record<string, any>): Promise<void>;
    createFeature(feature: Record<string, any>): Promise<string[]|undefined>;
    fetchFeatures(query?: Record<string, any>): Promise<void>,
    removeFeature(feature_id: string):Promise<string|undefined>
}

// const FEATURES_CACHE: {
//     all?: ListType<Feature>
// } & Record<string, any> = {};
export const useFeatureStore = create<DashState>((set) => ({
    features: undefined,
    selectedFeature: undefined,
    productsUseFeature:undefined,
    async removeFeature(feature_id) {
        const response = await fetch(`${Host}/delete_feature/${feature_id}`, {
            method: 'DELETE'
        });
        const json  = await  response.json();
        console.log({json});
        
        return json?.isDeleted;
    },
    async fetchProductsUseFeature(feature_id){
        set(()=>({productsUseFeature:useProductStore.getState().products}))
    },
    setSelectedFeature(selected) {
        set(()=>({selectedFeature:selected}))
    },
    async createFeature(feature) {

        useDashStore.getState().fetchStoreVar();
        return undefined
    },
    async updateFeature(feature) {
        return undefined
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
