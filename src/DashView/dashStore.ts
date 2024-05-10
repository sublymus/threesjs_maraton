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
        chat:{
            discussions:{},
            groups:{},
            sessions:{},
            surveys:{}
        },
        interface:{},
        statistic:{},
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
                action: {}
            },
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
        features: {
            //list des features
            dash_features: {
                preview: {},
                action: {}
            },
            new_feature: {
                // creation de features
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
    back_color:string;
    T: string | undefined|null,
    setT(T: string|undefined): void,
    storeVar: StoreVar | undefined,
    usersVar: StoreVar | undefined,
    currentChild: JSX.Element | undefined,
    openChild: (child: JSX.Element | undefined, back_color?:string) => any,
    fetchStoreVar(): Promise<void>;
    fetchUsersVar(): Promise<void>;
}

export const useDashStore = create<DashState>((set) => ({
    T: localStorage.getItem('theme'),
    storeVar: undefined,
    usersVar: undefined,
    back_color:'',
    async fetchStoreVar() {
        const response = await fetch(`${Host}/get_store_var`);
        const json = await response.json();
        if (!json) return;
        set(() => ({ storeVar: json }));

    },
    async fetchUsersVar() {
        const store = useRegisterStore.getState().store;
        if(!store) return
        const response = await fetch(`${Host}/get_users_var?store_id=${store.id}`);
        const json = await response.json();
        if (!json) return;
        set(() => ({ usersVar: json }));

    },
    setT(T) {
        T && localStorage.setItem('theme',T);
        set(()=>({T}))
    },
    currentChild: undefined,
    openChild(child, back_color) {
        set(() => ({ currentChild: child , back_color:back_color||'' }))
    },
}));

export const useDashRoute = (new SRouter(Pages, ['/','products'])).getStore();
