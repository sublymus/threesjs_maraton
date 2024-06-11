import { create } from "zustand";
import { StoreInterface, type ListType } from '../../../DataBase'
import { Host } from "../../../Config";
import { useWebStore } from "../../WebStore";
interface StoreState {
    stores: ListType<StoreInterface> | undefined,
    fetchStores(filter: {
        page?: number,
        limit?: number,
        order_by?: string,
        text?: string,
        // email?:string,
        // name?:string,
        // owner_name?:string,
        // id?:string,
        // owner_email?:string
    }): Promise<ListType<StoreInterface> | undefined>
}

export const useStoreStore = create<StoreState>((set) => ({
    stores: undefined,
    async fetchStores(filter) {
        const owner = useWebStore.getState().owner
        if (!owner) return
        //@ts-ignore
        filter.owner_id = owner.id
        console.log({filter});
        
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = (filter as any)[key];
            searchParams.set(key, value);
        }
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${owner.token}`);
        const response = await fetch(`${Host}/get_stores/?owner_id=${owner.id}&${searchParams}`, {
            headers
        })
        const json = await response.json();
        if (!json?.list) return
        set(() => ({ stores: json }))
        return json
    },
}));
