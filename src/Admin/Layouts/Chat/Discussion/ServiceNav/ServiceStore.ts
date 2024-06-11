import { create } from "zustand";
import { Discussion, ListType, StoreInterface, UserInterface } from "../../../../../DataBase";
import { useDiscussionStore } from "../DiscussionStore";
import { useStoreStore } from "../../../Store/StoreStore";
// import { Host } from "../../../../../Config";
// import { useRegisterStore } from "../../../PageAuth/RegisterStore";
// import { useAdminRoute } from "../../../../AdminStore";

interface ServiceState {
    serviceStore: StoreInterface | undefined,
    serviceStores: ListType<StoreInterface> | undefined,
    serviceDiscussion: Discussion | undefined
    serviceDiscussions: ListType<Discussion> | undefined
    fetchServiceStores(filter: { limit?: number, order_by?: string, page?: number, text?: string }): Promise<ListType<StoreInterface> | undefined>
    fetchServiceDiscussions(filter: {
        blocked?: 'no' | 'only' | 'all',
        discussion_id?: string,
        other_id?: string,
        store_id?: string
    }): Promise<ListType<Discussion> | undefined>
    setServiceStore(store: StoreInterface): void
    setServiceStoreById(store_id: string): Promise<any>
    setServiceDiscussionById(data: {
        findOther:(other_id:string)=>Promise<UserInterface|undefined>,
        other_id:string,
        store_id:string
    }): Promise<any>
}

export const useServiveStore = create<ServiceState>((set) => ({
    serviceStore: undefined,
    serviceStores: undefined,
    serviceDiscussions: undefined,
    serviceDiscussion: undefined,
    async fetchServiceDiscussions(filter) {
        const discussions = await useDiscussionStore.getState().fetchDiscussions({ ...filter, no_save: true })
        set(() => ({ serviceDiscussions: discussions }))
        return discussions
    },
    async fetchServiceStores(filter) {
        const stores = await useStoreStore.getState().fetchStores(filter, true)
        set(() => ({ serviceStores: stores }))
        return stores
    },
    async setServiceStore(store) {
        set(() => ({ serviceStore: store }))
    },
    async setServiceDiscussionById(data) {
        /*const discussion = */useDiscussionStore.getState().setDiscussionByOtherId(data,set)
    },
    async setServiceStoreById(store_id) {
        const existStore = useServiveStore.getState().serviceStores?.list.find(s => s.id == store_id);
        if (existStore) {
            set(() => ({ serviceStore: existStore }));
        } else {
            const store = await useStoreStore.getState().fetchStores({
                text: `#${store_id}`,
            }, true)
            set(() => ({ serviceStore: store?.list[0] }))
        }
    },
}));
