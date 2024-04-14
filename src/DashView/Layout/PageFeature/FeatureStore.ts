import { create } from "zustand";
import { Category, Feature } from "../../../DataBase";
import { Host } from "../../../Config";
interface DashState {
    fetchFeatures(): Promise<void>,
    features: Feature[] | undefined
}

const FEATURES_CACHE: {
    all?: Feature[]
} & Record<string, any> = {};
export const useFeatureStore = create<DashState>((set) => ({
    features: undefined,
    async fetchFeatures() {
        if (!FEATURES_CACHE['all']) {
            try {
                const response = await fetch(`${Host}/get_features`);
                const json =( await response.json())as Feature[];
                if(!Array.isArray(json)) return
                set(()=>({features:json}));
                FEATURES_CACHE['all'] = json;
            } catch (error:any) {
                return console.warn(error.message);
            }
        }
    },
}));
