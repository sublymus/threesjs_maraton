import { create } from "zustand";
import { ListType, UserInterface, UserStore } from "../../../DataBase";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface ModeratorState {
    moderators: ListType<UserInterface & UserStore> | undefined;
    selectedModerator: (UserInterface & UserStore) | undefined;
    // fetchModeratorCommands(filter?: { status?: string, no_status?: string, user_id?: string, product_id?: string, limit?: number, page?: number }): Promise<void>;
    // fetchModeratorVisites(filter: { after_date?: string, before_date?: string, moderator_id?: string, product_id?: string, limit?: number, page?: number }): Promise<void>;
    fetchModerators(filter?: Record<string, any>): Promise<ListType<UserInterface & UserStore> | undefined>;
    change_moderator_role(data: { new_role_id: string, moderator_id: string }): Promise<any>
    addModerator(d: { email: string, role_id: string }): Promise<UserInterface & UserStore | undefined>
    setModeratorById(moderator_id: string): void,
    setSelectedModerator(selected: (UserInterface & UserStore) | undefined): Promise<void>;
    banModerator(product_id: string): Promise<string | undefined>
}

export const useModeratorStore = create<ModeratorState>((set) => ({
    moderators: undefined,
    selectedModerator: undefined,
    async change_moderator_role(data) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();
        formData.append('new_role_id', data.new_role_id);
        formData.append('moderator_id', data.moderator_id);

        const response = await fetch(`${Host}/change_moderator_role`, {
            method: 'PUT',
            body: formData,
            headers: h.headers,
        });
        const json = await response.json();
        if (!json || !json.id) {
            return
        }
    },
    async addModerator(data) {
        console.log(data);
        let h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();
        if(!data.email || !data.role_id) return
        formData.append('email', data.email);
        formData.append('role_id', data.role_id);

        const response = await fetch(`${Host}/add_moderator`, {
            method: 'POST',
            body: formData,
            headers: h.headers,
        });
        const json = await response.json();
        if (!json || !json.id) {
            return
        }
        set(() => ({ moderators: json }));
        return json as UserInterface & UserStore
    },
    async setModeratorById(id) {
        const list = useModeratorStore.getState().moderators;
        const c = list?.list.find((l) => l.id == id);
        if (c) {
            set(() => ({ selectedModerator: c }))
        } else {
            const ls = await useModeratorStore.getState().fetchModerators({
                query: { user_id: id }
            })
            set(() => ({ selectedModerator: ls?.list.find((l) => l.id == id) }))
        }

    },
    async setSelectedModerator(selected) {
        set(() => ({ selectedModerator: selected }))
    },
    async fetchModerators(filter) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        
        const query: any = {};
        if (filter?.page) query.page = Number(filter.page);
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.sortBy) query.order_by = filter.sortBy;
        if (filter?.query?.text) query.text = filter.query?.text;
        if (filter?.query?.user_id) query.user_id = filter.query?.user_id;
        if (filter?.query?.phone) query.phone = filter.query?.phone;
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        console.log(filter,query);
        const response = await fetch(`${Host}/get_moderators/?${searchParams.toString()}`, {
            headers: h.headers
        });
        const json = await response.json() as ListType<UserInterface & UserStore>;

        console.log('moderators', json);
        if (!json || !json.list) return;
        set(() => ({ moderators: json }))
        return json;
    },
    async banModerator() {
        return undefined
    },
}));
