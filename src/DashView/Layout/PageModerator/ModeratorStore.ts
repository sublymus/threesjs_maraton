import { create } from "zustand";
import { ListType, UserInterface, UserStore } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface ModeratorCommands{

}

interface ModeratorVisites{

}

interface ModeratorState {
    moderators: ListType<UserInterface& UserStore> | undefined;
    selectedModerator:( UserInterface& UserStore )| undefined;
    moderatorCommands: ListType<ModeratorCommands> | undefined,
     moderatorVisites: ListType<ModeratorVisites> | undefined,
     fetchModeratorCommands(filter?: Record<string, any>): Promise<void>;
     fetchModeratorVisites(filter?: Record<string, any>): Promise<void>;
     fetchModerators(filter?: Record<string, any>): Promise<ListType<UserInterface& UserStore>|undefined>;
     setModeratorById(moderator_id:string):void,
    setSelectedModerator(selected: (UserInterface& UserStore)|undefined): Promise<void>;
    banModerator(product_id: string):Promise<string|undefined>
}

export const useModeratorStore = create<ModeratorState>((set) => ({
    moderators:undefined,
    selectedModerator:undefined,
    moderatorCommands:undefined,
    moderatorVisites:undefined,
    async setModeratorById(id) {
        const list = useModeratorStore.getState().moderators;
        const c = list?.list.find((l)=>l.id == id);
        if(c){
            set(()=>({selectedModerator:c}))
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
                        const ls = await useModeratorStore.getState().fetchModerators({
                            query:{user_id:id}
                        })
                        set(()=>({selectedModerator: ls?.list.find((l)=>l.id == id)}))
                    }
                },100)
                
            }else{
                const ls = await useModeratorStore.getState().fetchModerators({
                    query:{user_id:id}
                })
                set(()=>({selectedModerator: ls?.list.find((l)=>l.id == id)}))
            }
        }
    },
    async fetchModeratorCommands(filter) {
        
    },
    async fetchModeratorVisites(filter) {
        
    },
    async setSelectedModerator(selected) {
        set(()=>({selectedModerator:selected}))
    },
    async fetchModerators(filter) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        
        const query: any = {};
        if (filter?.page) query.page = Number(filter.page);
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.order_by) query.order_by = filter.order_by;
        if (filter?.query.text) query.text = filter.query.text;
        if (filter?.query.user_id) query.user_id = filter.query.user_id;
        if (filter?.query.phone) query.phone = filter.query.phone;
        query.store_id = h.store.id
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        
        const response = await fetch(`${Host}/get_store_moderators/?${searchParams.toString()}`,{
            headers:h.headers
        });
        const json = await response.json() as ListType<UserInterface& UserStore>;
        
        console.log('moderators', json);
        if (!json || !json.list) return;
        set(() => ({ moderators: json }))
        return json;
    },
    async banModerator(product_id) {
        return undefined
    },
}));
