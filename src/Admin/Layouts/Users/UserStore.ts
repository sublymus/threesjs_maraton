import { create } from "zustand";
import { ListType, UserInterface, UserStore } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";




interface UserState {
    users: ListType<UserInterface & UserStore> | undefined;
    selectedUser: (UserInterface & UserStore) | undefined;
    fetchUsers(filter?: Record<string, any>): Promise<ListType<UserInterface & UserStore> | undefined>;
    setUserById(user_id: string): void,
    setSelectedUser(selected: (UserInterface & UserStore) | undefined): Promise<void>;
    banUser(product_id: string): Promise<string | undefined>
}

export const useUserStore = create<UserState>((set) => ({
    users: undefined,
    selectedUser: undefined,
    async setUserById(id) {
        const list = useUserStore.getState().users;
        const c = list?.list.find((l) => l.id == id);
        if (c) {
            set(() => ({ selectedUser: c }))
        } else {
            const ls = await useUserStore.getState().fetchUsers({
                query: { user_id: id }
            })
            set(() => ({ selectedUser: ls?.list.find((l) => l.id == id) }))
        }

    },
    // async fetchUserCommands(filter) {
    //     if (!filter?.user_id) return;
    //     const command = await useProductStore.getState().fectProductCommands({
    //         ...filter,
    //     })
    //     console.log(command);
    //     if (!command?.list) return set(() => ({ userCommands: undefined }))
    //     set(() => ({ userCommands: command }))
    // },
    // async fetchUserVisites({ after_date, before_date, user_id, product_id, limit, page }) {
    //     const h = useRegisterStore.getState().getHeaders();
    //     if (!h) return
    //     const query: any = {};
    //     // query.store_id = h.store.id;
    //     query.product_id = product_id || '';
    //     query.user_id = user_id || '';
    //     query.limit = limit || 25;
    //     query.page = page || 1;
    //     query.after_date = after_date||'';
    //     query.before_date = before_date || '';
    //     query.from_dash = true;
    //     const searchParams = new URLSearchParams({});
    //     for (const key in query) {
    //         const value = query[key];
    //         searchParams.set(key, value);
    //     }
    //     const response = await fetch(`${Host}/get_user_visited/?${searchParams.toString()}`, {
    //         headers: h.headers
    //     });
    //     const json = await response.json() as ListType<UserVisites>;
    //     if (!json || !json.list) return;
    //    set(()=>({userVisites:json}))
    // },
    async setSelectedUser(selected) {
        set(() => ({ selectedUser: selected }))
    },
    async fetchUsers(filter) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return

        const query: any = {};
        if (filter?.page) query.page = Number(filter.page);
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.order_by) query.order_by = filter.order_by;
        if (filter?.query.text) query.text = filter.query.text;
        if (filter?.query.user_id) query.user_id = filter.query.user_id;
        if (filter?.query.phone) query.phone = filter.query.phone;
        // query.store_id = h.store.id
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_users/?${searchParams.toString()}`, {
            headers: h.headers
        });
        const json = await response.json() as ListType<UserInterface & UserStore>;

        console.log('users', json);
        if (!json || !json.list) return;
        set(() => ({ users: json }))
        return json;
    },
    async banUser() {
        return undefined
    },
}));
