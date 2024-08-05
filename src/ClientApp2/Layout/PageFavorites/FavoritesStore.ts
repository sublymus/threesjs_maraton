import { create } from "zustand";
import { ListType , FavoritesInterface } from "../../../DataBase";

import { useRegisterStore } from "../PageRegister/RegisterStore";
import { Host } from "../../../Config";

interface FavoritesState {
    favorites:ListType<FavoritesInterface>&{labels?:string[]}|undefined,
    setFavorites(favorites:ListType<FavoritesInterface>|undefined):void,
    fetchFavorites(filter?:{
        favorite_id?:string,
        page?:number, 
        limit?:number,
        order_by?:string,
        parent_id?:string, 
        label?:string, 
        store_id?:string,
        user_id?:string,
        no_save?:boolean
        add_labels?:boolean 
    }):Promise<ListType<FavoritesInterface>|undefined>
    addFavorite(data:{
        label?:string,
        product_id?:string,
    }): Promise<FavoritesInterface | undefined>
    deleteFavorite(favorite_id: string): Promise<boolean>
}

export const useFavoritesStore = create<FavoritesState>((set, get)=>({
    favorites:undefined,
    setFavorites(favorites) {
        set(()=>({favorites}))
    },
    async deleteFavorite(favorite_id) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h?.user) return false
        const response = await fetch(`${Host}/delete_favorite/${favorite_id}`, {
            headers: h.headers,
            method:'DELETE'
        });
        const res = (await response.json())
        if(res.deleted){
            const c = get().favorites;
            set(() => ({
                favorites: {
                    limit: c?.limit || 25,
                    page: c?.page || 1,
                    total: c?.total || 0,
                    list: ([...(c?.list)|| []] ).filter(f => f.id != favorite_id).map(p=>({...p}))
                }
            }));
            return true
        }
        return false
    }, 
    async addFavorite(data) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h?.user) return
        if(!data.product_id) return
        const fromData = new FormData();
        const query: any = {};
        fromData.append('product_id', data.product_id);
        data.label && fromData.append('label', data.label);
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/add_favorite`, {
            method: 'POST',
            headers: h.headers,
            body:fromData
        });
        const cart = (await response.json()) as FavoritesInterface
        if (!cart.id) return;
        const c = get().favorites;
        set(() => ({
            favorites: {
                limit: c?.limit || 25,
                page: c?.page || 1,
                total: c?.total || 0,
                list: [...(c?.list || []).map(f => f.id == cart.id ? cart : f)]
            }
        }));

        return cart
    },
    async fetchFavorites(filter) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h?.user) return
        const query: any = { ...filter };

        query.store_id =h.store.id;
        query.add_product = true;
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            value &&  searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_favorites/?${searchParams.toString()}`,{
            headers: h.headers,
        });
        const favorites = (await response.json()) as ListType<FavoritesInterface>
        if(!favorites?.list) return
        if (!filter?.no_save) {
            set(() => ({ favorites }))
        }
        
        return {
            ...favorites,
        }
    },
}))