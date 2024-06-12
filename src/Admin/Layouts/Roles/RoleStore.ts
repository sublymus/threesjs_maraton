import { create } from "zustand";
import { ListType, Role } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";
import { useAdminRoute } from "../../AdminStore";

interface RoleState {
    json_roles: Record<string, boolean> | undefined;
    selectedRole: Role | undefined;
    roles: ListType<Role> | undefined,
    fetchRolesJson(): Promise<void>
    fetchRoles(filter?: Record<string, any>): Promise<ListType<Role> | undefined>;
    newRole(data: any): Promise<any>,
    deleteRole(role_id: string): Promise<any>,
    updateRole(data: any): Promise<void>,
    setSelectedRole(selected: Role | undefined): Promise<void>;
    setRoleById(role_id: string): void;
}

export const useRoleStore = create<RoleState>((set) => ({
    json_roles: undefined,
    roles: undefined,
    selectedRole: undefined,
    async setSelectedRole(selected) {
        set(() => ({ selectedRole: selected }))
    },
    async setRoleById(id) {
        const list = useRoleStore.getState().roles;
        const c = list?.list.find((l) => l.id == id);
        if (c) {
            set(() => ({ selectedRole: c }))
        } else {

            const ls = await useRoleStore.getState().fetchRoles({
                role_id: id
            })
            set(() => ({ selectedRole: ls?.list.find((l) => l.id == id) }))
        }
    },
    async newRole(data) {
        if (!data.name) return console.log('Name required');
        if (!data.options || data.options.length == 0) return;
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return

        const formData = new FormData();
        formData.append('name', data.name);

        data.options?.forEach((o: string) => {
            formData.append(o, '1');
        });

        const response = await fetch(`${Host}/create_moderator_role`, {
            method: 'POST',
            body: formData,
            headers: h.headers,
        });
        const json = await response.json();
        if (!json || !json.id) {
            return
        }
        console.log('new role', json);
        set(() => ({ selectedRole: json }));
        useAdminRoute.getState().setAbsPath(['roles', 'edit_role']);
    },
    async updateRole(data) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return
        const role = useRoleStore.getState().selectedRole;
        if (!role) return
        if ((!data.name && !data.options)) return console.log('data', data);

        const formData = new FormData();
        formData.append('role_id', role.id);
        if (data.name) formData.append('name', data.name);
        if (data.options?.length > 0) formData.append('newOptions', 'ok');

        data.options?.forEach((o: string) => {
            formData.append(o, '1');
        });

        const response = await fetch(`${Host}/update_role`, {
            method: 'PUT',
            body: formData,
            headers: h.headers,
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

        let user = useRegisterStore.getState().user;
        if (!user) return
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        const formData = new FormData();
        formData.append('role_id', role_id)

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: formData
        };
        const response = await fetch(`${Host}/delete_role`, requestOptions);
        const json = await response.json()
        if (json.deleted) set(() => ({ selectedRole: undefined }));
        // useAdminStore.getState().fetchUsersVar();
    },
    async fetchRolesJson() {
        
        const response = await fetch(`${Host}/get_roles_json/?type=moderator`);
        const json = await response.json();
        // console.log(json);
        if (!json) return
        set(() => ({ json_roles: json }))
    },
    async fetchRoles(filter = {}) {
        let h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const requestOptions = {
            method: "GET",
            headers: h.headers,
        };
        const searchParams = new URLSearchParams({});
        filter.type = 'moderator'
        for (const key in filter) {
            const value = filter[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_store_roles/?${searchParams.toString()}`, requestOptions);
        const json = await response.json() as ListType<Role>;
        if (!json || !json.list) return;
        set(() => ({ roles: json }))
        return json
    },

}));
