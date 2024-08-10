import { create } from "zustand";
import { Component, Feature, ListType, ProductInterface } from "../../../../DataBase";
import { Host } from "../../../../Config";
import { useProductStore } from "../../PageProduct/ProductStore";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
interface DashState {
    features: ListType<Feature> | undefined,
    selectedFeature: Feature | undefined,
    productsUseFeature: ListType<ProductInterface> | undefined,
    fetchProductsUseFeature(feature_id: string): Promise<void>
    setSelectedFeature(selected: Feature | undefined): any,
    updateFeature(feature: Record<string, any>): Promise<Feature | undefined>;
    createFeature(feature: Record<string, any>): Promise<Feature | undefined>;
    fetchFeatures(query?: Record<string, any>, noSave?: boolean): Promise<ListType<Feature> | undefined>,
    removeFeature(feature_id: string): Promise<string | undefined>
    setFeatureById(feature_id: string): void;
}

// const FEATURES_CACHE: {
//     all?: ListType<Feature>
// } & Record<string, any> = {};
export const useFeatureStore = create<DashState>((set) => ({
    features: undefined,
    selectedFeature: undefined,
    productsUseFeature: undefined,
    async setFeatureById(feature_id) {
        const f = useFeatureStore.getState().selectedFeature || useFeatureStore.getState().features?.list.find(f => f.id == feature_id);
        if (f) {
            set(() => ({ selectedFeature: f }));
        } else {
            const feature = (await useFeatureStore.getState().fetchFeatures({
                feature_id
            }, true))?.list[0];
            set(() => ({ selectedFeature: feature && { ...feature } }));
        }
    },
    async removeFeature(feature_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return

        const response = await fetch(`${Host}/delete_feature/${feature_id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        const json = await response.json();
        return json?.isDeleted;
    },
    async fetchProductsUseFeature(_feature_id) {
        set(() => ({ productsUseFeature: useProductStore.getState().products }))
    },
    setSelectedFeature(selected) {
        set(() => ({ selectedFeature: selected }))
    },
    async createFeature(feature) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return console.log('not H');
        ;

        const formData = new FormData();

        if (!(feature.name = feature.name?.trim())) return console.log('not name');
        if (!(['components', 'number', 'text', 'email', 'website', 'date', 'time', 'phone'].includes(feature.view = feature.view?.trim()))) return console.log('not View');
        if (!(feature.icon || feature.new_icon)) return console.log('not icon');
        if (!feature.product_id) return console.log('product_id must be defined')

        formData.append('product_id', feature.product_id);

        formData.append('name', feature.name);
        formData.append('view', feature.view);
        formData.append('icon_0', feature.new_icon);
        formData.append('icon', JSON.stringify(['icon_0']))

        for (const k of ['required', 'placeholder', 'case', 'match', 'min', 'max', 'max_size']) {
            feature[k] != undefined && formData.append(k, feature[k]);
        }

        (feature.components as Component[])?.forEach((c) => {
            if ((c.images?.[0] && c.images as any as string[] | Blob[] | undefined)?.[0] instanceof Blob) {
                formData.append(c.name+':images_0', c.images?.[0] as any);
                (c as any).images = JSON.stringify([c.name+':images_0']);
                (c as any).distinct = c.name;
            }
        })
        feature.components && formData.append('components', JSON.stringify(feature.components));

        const response = await fetch(`${Host}/create_feature`, {
            body: formData,
            headers: h.headers,
            method: 'POST'
        })
        try {
            const json = await response.json();
            if (!json?.id) return console.log('not ID');
            return json
        } catch (error) {
            console.log(error);
        }
    },
    async updateFeature(feature) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return console.log('not H');
        ;

        const formData = new FormData();

        if (!(feature.name = feature.name?.trim())) return console.log('not name');
        if (!(['components', 'number', 'text', 'email', 'website', 'date', 'time', 'phone'].includes(feature.view = feature.view?.trim()))) return console.log('not View');
        if (!(feature.icon || feature.new_icon)) return console.log('not icon');

        feature.product_id && formData.append('product_id', feature.product_id);
        formData.append('feature_id', feature.id);
        formData.append('store_id', h.store.id);
        formData.append('name', feature.name);
        formData.append('view', feature.view);
        feature.new_icon && formData.append('icon_0', feature.new_icon);
        formData.append('icon', JSON.stringify(feature.new_icon ? ['icon_0'] : feature.icon))

        for (const k of ['required', 'placeholder', 'case', 'match', 'min', 'max', 'max_size']) {
            feature[k] != undefined && formData.append(k, feature[k]);
        }

        (feature.components as Component[])?.forEach((c) => {
            if ((c.images as any as string[] | Blob[] | undefined)?.[0] instanceof Blob) {
                formData.append(c.name+':images_0', c.images?.[0] as any);
                (c as any).images = JSON.stringify([c.name+':images_0']);
                (c as any).distinct = c.name;
            }else{
                (c as any).images = JSON.stringify(c.images)
            }
        })
        feature.components && formData.append('components', JSON.stringify(feature.components));

        const response = await fetch(`${Host}/update_feature`, {
            body: formData,
            headers: h.headers,
            method: 'PUT'
        })
        try {
            const json = await response.json();
            if (!json?.id) return console.log('not ID');



            console.log(json);


            set(({ features }) => ({ selectedFeature: json, features: features && { ...features, list: features.list.map(f => f.id == json.id ? json : f) } }))
            return json
        } catch (error) {
        }
    },
    async fetchFeatures(filter, noSave) {
        const query: any = {};
        if (filter?.page) query.page = Number(filter.page);
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.sortBy) query.order_by = filter.sortBy;
        if (filter?.query?.text) query.text = filter.query?.text;
        if (filter?.feature_id) query.feature_id = filter.feature_id;
        query.store_id = useRegisterStore.getState().store?.id
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_features/?${searchParams.toString()}`);
        const json = (await response.json()) as ListType<Feature>;
        if (!json || !json.list) return undefined
        if (!noSave) set(() => ({ features: json }));
        console.log(json);
        return json
    },
}));
