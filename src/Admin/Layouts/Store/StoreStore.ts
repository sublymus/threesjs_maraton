import { create } from "zustand";
import { StoreInterface, type ListType } from '../../../DataBase'
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";
interface StoreState {
    store:StoreInterface|undefined,
    stores: ListType<StoreInterface> | undefined,
    setStore(store:StoreInterface|undefined):void,
    fetchStores(filter: {
        page?: number,
        limit?: number,
        order_by?: string,
        text?:string,
        // email?:string,
        // name?:string,
        // owner_name?:string,
        // id?:string,
        // owner_email?:string
    }, no_save?:boolean):Promise<ListType<StoreInterface>|undefined>
    setStoreById(store_id:string):any
}

export const useStoreStore = create<StoreState>((set) => ({
    stores: undefined,
    store:undefined,
    setStore(store) {
        set(()=>({store}));
    },
    async setStoreById(store_id) {
        const store = useStoreStore.getState().stores?.list.find(s=>s.id==store_id) as StoreInterface 
        if(store){
            return set(()=>({store:store}));
        }else{
            const store = (await useStoreStore.getState().fetchStores({text:'#'+store_id},true))?.list[0] as StoreInterface;
            if(store){
                return set(()=>({store:store}));
            }
        }
    },
    async fetchStores(filter, no_save) {
        const h = useRegisterStore.getState().getHeaders()
        const searchParams = new URLSearchParams({});
            for (const key in filter) {
                const value = (filter as any)[key];
                searchParams.set(key, value);
            }
        const response = await  fetch(`${Host}/get_stores/?${searchParams}`,{
            headers:h?.headers
        })
        const json = await response.json();
        if(!json?.list) return 
       if(!no_save) set(()=>({stores:json}))
        return json
    },
}));
