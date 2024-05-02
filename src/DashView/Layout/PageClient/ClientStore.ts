import { create } from "zustand";
import { ListType, UserInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface ClientCommands{

}

interface ClientVisites{

}

interface ClientState {
    clients: ListType<UserInterface> | undefined;
    selectedClient: UserInterface | undefined;
    clientCommands: ListType<ClientCommands> | undefined,
     clientVisites: ListType<ClientVisites> | undefined,
     fetchClientCommands(filter?: Record<string, any>): Promise<void>;
     fetchClientVisites(filter?: Record<string, any>): Promise<void>;
     fetchClients(filter?: Record<string, any>): Promise<void>;
    setSelectedClient(selected: UserInterface|undefined): Promise<void>;
    banClient(product_id: string):Promise<string|undefined>
}

export const useClientStore = create<ClientState>((set) => ({
    clients:undefined,
    selectedClient:undefined,
    clientCommands:undefined,
    clientVisites:undefined,
    async fetchClientCommands(filter) {
        
    },
    async fetchClientVisites(filter) {
        
    },
    async setSelectedClient(selected) {
        set(()=>({selectedClient:selected}))
    },
    async fetchClients(filter) {
        const query: any = {};
        if (filter?.page) query.page = Number(filter.page);
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.order_by) query.order_by = filter.order_by;
        if (filter?.query.text) query.text = filter.query.text;
        if (filter?.query.user_id) query.user_id = filter.query.user_id;
        if (filter?.query.phone) query.phone = filter.query.phone;
        query.store_id = useRegisterStore.getState().store?.id
        if(!query.store_id) return
        console.log('lol');
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        
        const response = await fetch(`${Host}/get_store_clients/?${searchParams.toString()}`);
        const json = await response.json() as ListType<UserInterface>;
        
        console.log('clients', json);
        if (!json || !json.list) return;
        set(() => ({ clients: json }))
    },
    async banClient(product_id) {
        return undefined
    },
}));
