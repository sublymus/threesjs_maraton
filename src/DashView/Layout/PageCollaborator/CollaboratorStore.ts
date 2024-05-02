import { create } from "zustand";
import { ListType, Role, UserInterface, UserStore } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface CollaboratorState {
    collaborators: ListType<UserInterface& UserStore> | undefined;
    selectedCollaborator: UserInterface& UserStore | undefined;
    updateCollaborator(data:Record<string, any>):Promise<any>
    fetchCollaborators(filter?: Record<string, any>): Promise<void>;
    setSelectedCollaborator(selected: UserInterface& UserStore |undefined): Promise<void>;
    banCollaborator(collaborator_id: string):Promise<string|undefined>
    addCollaborator(data: Record<string,any>):Promise<string[]|undefined>,
    removeCollaborator(collaborator_id:string):Promise<void>;
}

export const useCollaboratorStore = create<CollaboratorState>((set) => ({
    collaborators:undefined,
    selectedCollaborator:undefined,
    async updateCollaborator(data) {
        console.log({data});
        
    },
    async addCollaborator(data){
        console.log(data);
        const store = useRegisterStore.getState().store;
        if (!store) return;
        let user = useRegisterStore.getState().user;
        if (!user) return
        data.store_id = store.id 
        const formData = new FormData();
        const error :string[]= [];
       
        ['store_id','role_id', 'email'].forEach(p => {
            if (data[p]!=undefined) {
                formData.append(p, data[p]);
            }else{
                return error.push(p+' is not defined');
            }
        }); 
        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        if (true||error.length==0) {
            const response =await fetch(`${Host}/add_collaborator`, {
                method: 'POST',
                body: formData,
                headers: myHeaders,
            });
            const json = await response.json();
            if(!json || !json.id){ 
                error.push('Server Error, Try Later');
                return  error
            }
            set(()=>({selectedCollaborator:json}));
        }else{
            return error;
        }
    },
    async setSelectedCollaborator(selected) {
        set(()=>({selectedCollaborator:selected}))
    },
    async removeCollaborator(collaborator_id) {
        console.log(collaborator_id);
        
        const store = useRegisterStore.getState().store;
        if (!store) return;
        let user = useRegisterStore.getState().user;
        if (!user) return
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        const formData = new FormData();
        formData.append('store_id',store.id);
        formData.append('collaborator_id',collaborator_id)
       
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body:formData
        };
        console.log({
          s:store.id,
          collaborator_id  
        });
        
        const response = await fetch(`${Host}/remove_collaborator`,requestOptions);
        const json = await response.json() 
        if(json.deleted) set(()=>({selectedCollaborator:undefined}));
    },
    async fetchCollaborators(filter) {
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
        
        const response = await fetch(`${Host}/get_store_collaborators/?${searchParams.toString()}`);
        const json = await response.json() as ListType<UserInterface & UserStore>;
        
        console.log('collaborators', json);
        if (!json || !json.list) return;
        set(() => ({ collaborators: json }))
    },
    async banCollaborator(collaborator_id) {
        return undefined
    },
}));
