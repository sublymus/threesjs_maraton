import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
import { Host } from "../Config";
import { useRegisterStore } from "./Layout/PageAuth/RegisterStore";
/*
default path,
desable copmonent,
current('page')
*/

const Pages = {
    '/': {
        chat: {
            discussions: {
                discussions_all: {},
                discussions_new: {},
                discussions_blocked: {},
                discussions_admin: {}
            },
            groups: {},
            sessions: {
                sessions_new: {},
                sessions_opened: {},
                sessions_closed: {},
            },
            surveys: {}
        },
        interface: {},
        statistic: {},
        command: {},
        roles: {
            //list
            create_role: {},
            edit_role: {}
        },
        clients: {
            //list
            client_profile: {},
        },
        moderators: {
            moderator_profile: {}
        },
        collaborators: {
            //list
            collaborator_profile: {},
            new_collaborator: {},
        },
        profile: {},
        component: null,
        products: {
            // list des products
            dash_product: {
                // edition de product (avec data) <EditProduct/>
                product_preview: {},
                product_statistic: {},
                action: {},
            },
            dash_features: {},
            new_feature: {},
            new_product: {
                //creation de products
                preview: {},
            }
        },
        categories: {
            //list des categories
            dash_categories: {
                preview: {},
                action: {}
            },
            new_category: {
                // creation de categories
                preview: {},
            }
        },
        catalogs: {
            //list des catalogs
            dash_catalogs: {
                preview: {},
                action: {}
            },
            new_catalog: {
                // creation de catalogs
                preview: {},
            }
        }
    }
}

interface StoreVar {
    products: number,
    categories: number,
    catalogs: number,
    features: number
}

interface DashState {
    back_color: string;
    blur: boolean,
    T: string | undefined | null,
    setT(T: string | undefined): void,
    storeVar: StoreVar | undefined,
    usersVar: StoreVar | undefined,
    currentChild: JSX.Element[] | JSX.Element | undefined,
    openChild(child: JSX.Element | undefined, blur?: boolean, back_color?: string, option?: {
        overlay: boolean
    }): any,
    overlay: boolean | undefined,
    fetchStoreVar(): Promise<void>;
    fetchUsersVar(): Promise<void>;
}

export const useDashStore = create<DashState>((set) => ({
    T: localStorage.getItem('theme'),
    storeVar: undefined,
    usersVar: undefined,
    back_color: '',
    blur: false,
    overlay: undefined,
    async fetchStoreVar() {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return

        const response = await fetch(`${Host}/get_store_var?store_id=${h.store.id}`, { headers: h.headers });
        const json = await response.json();
        if (!json) return;
        set(() => ({ storeVar: json }));

    },
    async fetchUsersVar() {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/get_users_var?store_id=${h.store.id}`, { headers: h.headers });
        const json = await response.json();
        if (!json) return;
        set(() => ({ usersVar: json }));

    },
    setT(T) {
        localStorage.setItem('theme', T || '');
        set(() => ({ T }))
    },
    currentChild: undefined,
    openChild(child, blur, back_color, options) {
        if (options?.overlay) {
            const chidren = useDashStore.getState().currentChild;
            if (chidren) {
                if (Array.isArray(chidren)) {
                    child = [...chidren, child] as any;
                } else {
                    child = [chidren, child] as any;
                }
            }
        }
        set(() => ({ overlay: options?.overlay, currentChild: child, blur: child ? blur || useDashStore.getState().blur : undefined, back_color: child ? (back_color || useDashStore.getState().back_color) : '' }))
    },
}));

export const useDashRoute = (new SRouter(Pages, ['/', 'products'])).getStore();
