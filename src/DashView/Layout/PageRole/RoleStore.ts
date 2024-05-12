import { create } from "zustand";
import { ListType, Role, UserInterface } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";
import { useDashRoute, useDashStore } from "../../dashStore";

interface RoleState {
    json_roles: Record<string, boolean> | undefined;
    selectedRole: Role | undefined;
    roles: ListType<Role> | undefined,
    fetchRolesJson(): Promise<void>
    deleteRole(role_id: string): Promise<any>,
    updateRole(data: any): Promise<void>,
    newRole(data: any): Promise<any>,
    fetchRoles(filter?: Record<string, any>): Promise<void>;
    setSelectedRole(selected: Role | undefined): Promise<void>;
    banRole(role_id: string): Promise<string | undefined>
}

export const useRoleStore = create<RoleState>((set) => ({
    json_roles: undefined,
    roles: undefined,
    selectedRole: undefined,
    async setSelectedRole(selected) {
        set(() => ({ selectedRole: selected }))
    },
    async newRole(data) {
        if (!data.name) return console.log('Name required');
        ;
        if (!data.options || data.options.length == 0) return console.log('Option Is required');

        const store = useRegisterStore.getState().store;
        if (!store) return;
        let user = useRegisterStore.getState().user;
        if (!user) return

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('store_id', store.id)

        data.options?.forEach((o: string) => {
            formData.append(o, '1');
        });

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        const response = await fetch(`${Host}/create_collaborator_role`, {
            method: 'POST',
            body: formData,
            headers: myHeaders,
        });
        const json = await response.json();
        if (!json || !json.id) {
            //error.push('Server Error, Try Later');
            return
        }
        console.log('new role', json);

        set(() => ({ selectedRole: json }));
        useDashStore.getState().fetchUsersVar();
        useDashRoute.getState().setAbsPath(['roles', 'edit_role']);
    },
    async updateRole(data) {
        console.log('data', data);

        const role = useRoleStore.getState().selectedRole;
        if (!role) return
        if ((!data.name && !data.options)) return console.log('data', data);

        const store = useRegisterStore.getState().store;
        if (!store) return;
        let user = useRegisterStore.getState().user;
        if (!user) return

        const formData = new FormData();
        formData.append('role_id', role.id);
        if (data.name) formData.append('name', data.name);
        if (data.options?.length > 0) formData.append('newOptions', 'ok');

        data.options?.forEach((o: string) => {
            formData.append(o, '1');
        });

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        const response = await fetch(`${Host}/update_role`, {
            method: 'PUT',
            body: formData,
            headers: myHeaders,
        });
        const json = await response.json();
        if (!json || !json.id) {
            //       error.push('Server Error, Try Later');
            return
        }
        set(() => ({ selectedRole: json }));
    },
    async deleteRole(role_id) {
        console.log(role_id);

        const store = useRegisterStore.getState().store;
        if (!store) return;
        let user = useRegisterStore.getState().user;
        if (!user) return
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        const formData = new FormData();
        formData.append('store_id', store.id);
        formData.append('role_id', role_id)

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: formData
        };
        const response = await fetch(`${Host}/delete_role`, requestOptions);
        const json = await response.json()
        if (json.deleted) set(() => ({ selectedRole: undefined }));
        useDashStore.getState().fetchUsersVar();
    },
    async fetchRolesJson() {
        const response = await fetch(`${Host}/get_roles_json`);
        const json = await response.json();
        if (!json) return
        set(() => ({ json_roles: json }))
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
        filter.store_id = store.id;
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = filter[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_store_roles/?${searchParams.toString()}`, requestOptions);
        const json = await response.json() as ListType<Role>;
        console.log('roles', json);

        if (!json || !json.list) return;
        set(() => ({ roles: json }))
    },
    async banRole(role_id) {
        return undefined
    },
}));
