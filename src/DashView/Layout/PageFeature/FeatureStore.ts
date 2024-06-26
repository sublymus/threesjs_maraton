import { create } from "zustand";
import { Feature, ListType, ProductInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useProductStore } from "../PageProduct/ProductStore";
import { useDashStore } from "../../dashStore";
import { useRegisterStore } from "../PageAuth/RegisterStore";
interface DashState {
    features: ListType<Feature> | undefined,
    selectedFeature: Feature | undefined,
    productsUseFeature:ListType<ProductInterface>|undefined,
    fetchProductsUseFeature(feature_id:string):Promise<void>
    setSelectedFeature(selected: Feature|undefined): any,
    updateFeature(feature: Record<string, any>): Promise<void>;
    createFeature(feature: Record<string, any>): Promise<string[]|undefined>;
    fetchFeatures(query?: Record<string, any>, noSave?:boolean): Promise<ListType<Feature> | undefined>,
    removeFeature(feature_id: string):Promise<string|undefined>
    setFeatureById(feature_id:string):void;
}

// const FEATURES_CACHE: {
//     all?: ListType<Feature>
// } & Record<string, any> = {};
export const useFeatureStore = create<DashState>((set) => ({
    features: undefined,
    selectedFeature: undefined,
    productsUseFeature:undefined,
    async setFeatureById(feature_id) {
        const f = useFeatureStore.getState().selectedFeature || useFeatureStore.getState().features?.list.find(f=>f.id == feature_id);
        if(f){
            set(()=>({selectedFeature:f}));
        }else{
            const feature = (await useFeatureStore.getState().fetchFeatures({
                feature_id
            },true))?.list[0];
            set(()=>({selectedFeature:feature}));
        }
    },
    async removeFeature(feature_id) {
        const response = await fetch(`${Host}/delete_feature/${feature_id}`, {
            method: 'DELETE'
        });
        const json  = await  response.json();
        console.log({json});
        
        return json?.isDeleted;
    },
    async fetchProductsUseFeature(_feature_id){
        set(()=>({productsUseFeature:useProductStore.getState().products}))
    },
    setSelectedFeature(selected) {
        set(()=>({selectedFeature:selected}))
    },
    async createFeature(_feature) {

        useDashStore.getState().fetchStoreVar();
        return undefined
    },
    async updateFeature(_feature) {
        return undefined
    },
    async fetchFeatures(filter, noSave) {
            const query :any = {};
            if(filter?.page) query.page = Number(filter.page);
            if(filter?.limit) query.limit = Number(filter.limit);
            if(filter?.sortBy) query.order_by = filter.sortBy;
            if(filter?.query?.text) query.text = filter.query?.text;
            if(filter?.feature_id) query.feature_id = filter.feature_id;
            query.store_id = useRegisterStore.getState().store?.id
            const searchParams = new URLSearchParams({});
            for (const key in query) {
                const value = query[key];
                searchParams.set(key, value);
            }
            const response = await fetch(`${Host}/get_features/?${searchParams.toString()}`);
            const json = (await response.json()) as ListType<Feature>;
            if (!json || !json.list) return undefined
            if(!noSave)set(() => ({ features: json }));
            console.log(json);
            return json

    },
}));
