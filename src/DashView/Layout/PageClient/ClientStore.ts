import { create } from "zustand";
import { ListType, UserInterface, UserStore } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface ClientCommands{

}

interface ClientVisites{

}

interface ClientState {
    clients: ListType<UserInterface& UserStore> | undefined;
    selectedClient:( UserInterface& UserStore )| undefined;
    clientCommands: ListType<ClientCommands> | undefined,
     clientVisites: ListType<ClientVisites> | undefined,
     fetchClientCommands(filter?: Record<string, any>): Promise<void>;
     fetchClientVisites(filter?: Record<string, any>): Promise<void>;
     fetchClients(filter?: Record<string, any>): Promise<ListType<UserInterface& UserStore>|undefined>;
     setClientById(client_id:string):void,
    setSelectedClient(selected: (UserInterface& UserStore)|undefined): Promise<void>;
    banClient(product_id: string):Promise<string|undefined>
}

export const useClientStore = create<ClientState>((set) => ({
    clients:undefined,
    selectedClient:undefined,
    clientCommands:undefined,
    clientVisites:undefined,
    async setClientById(id) {
        const list = useClientStore.getState().clients;
        const c = list?.list.find((l)=>l.id == id);
        if(c){
            set(()=>({selectedClient:c}))
        }else{
            const store = useRegisterStore.getState().store;
            if(!store){
                const startTime = Date.now();
                const intervalId = setInterval(async ()=>{
                    if(Date.now() - startTime > 10 * 1000){
                        clearInterval(intervalId);
                    }
                    const s = useRegisterStore.getState().store;
                    if(s){
                        clearInterval(intervalId);
                        const ls = await useClientStore.getState().fetchClients({
                            query:{user_id:id}
                        })
                        set(()=>({selectedClient: ls?.list.find((l)=>l.id == id)}))
                    }
                },100)
                
            }else{
                const ls = await useClientStore.getState().fetchClients({
                    query:{user_id:id}
                })
                set(()=>({selectedClient: ls?.list.find((l)=>l.id == id)}))
            }
        }
    },
    async fetchClientCommands(filter) {
        
    },
    async fetchClientVisites(filter) {
        
    },
    async setSelectedClient(selected) {
        set(()=>({selectedClient:selected}))
    },
    async fetchClients(filter) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        
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
        
        const response = await fetch(`${Host}/get_store_clients/?${searchParams.toString()}`,{
            headers:h.headers
        });
        const json = await response.json() as ListType<UserInterface& UserStore>;
        
        console.log('clients', json);
        if (!json || !json.list) return;
        set(() => ({ clients: json }))
        return json;
    },
    async banClient(product_id) {
        return undefined
    },
}));
