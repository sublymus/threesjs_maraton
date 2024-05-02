import { create } from "zustand";
import { ListType, Role, UserInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface RoleState {
    json_roles: Record<string, boolean> | undefined;
    selectedRole: UserInterface | undefined;
    roles: ListType<Role> | undefined,
    fetchRolesJson():Promise<void>
    fetchRoles(filter?: Record<string, any>): Promise<void>;
    setSelectedRole(selected: UserInterface | undefined): Promise<void>;
    banRole(role_id: string): Promise<string | undefined>
}

export const useRoleStore = create<RoleState>((set) => ({
    json_roles: undefined,
    roles: undefined,
    selectedRole: undefined,
    async setSelectedRole(selected) {
        set(() => ({ selectedRole: selected }))
    },
    async fetchRolesJson() {
        const response = await fetch(`${Host}/get_roles_json`);
        const json = await response.json() ;
        if(!json) return
        set(()=>({json_roles:json}))
    }, 
    async fetchRoles(filter = {}) {
       
        const store = useRegisterStore.getState().store;
        if (!store) return;
        let user = useRegisterStore.getState().user;
        if (!user) return
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        console.log('store', store);
        
        filter.context_id = store.id;
        
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = filter[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_store_roles/?${searchParams.toString()}`,requestOptions);
        const json = await response.json() as ListType<Role>;
        console.log('roles', json);

        if (!json || !json.list) return;
        set(() => ({ roles: json }))
        console.log('roles', json);

    },
    async banRole(role_id) {
        return undefined
    },
}));
