import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
import { Host } from "../Config";
import {  UserInterface, StoreInterface, type ListType } from '../DataBase'

const Pages = {
    '/': {
        new_store: {},
        edit_store: {},
        home: {},
        about: {},
        stores: {},
        contact: {},
        store_list: {}
    }
}

interface WebState {
    back_color: string;
    blur: boolean,
    currentChild: JSX.Element | undefined,
    openChild: (child: JSX.Element | undefined, blur?: boolean, back_color?: string) => any,
    owner: UserInterface | undefined,
    stores: ListType<StoreInterface> | undefined,
    selectedStore: StoreInterface | undefined,
    setSelectedStore(store: StoreInterface | undefined): void
    owner_stores(filter: {
        page?: number,
        limit?: number,
        order_by?: string,
        text?: string,
    }): Promise<ListType<StoreInterface> | undefined>
    createStore(data: Record<string, any>): Promise<StoreInterface | undefined>
    editStore(data: Record<string, any>): Promise<StoreInterface | undefined>
    createOwner(): Promise<void>
    tryToken(): Promise<void>
    disconnection(): Promise<void>
    setStoreById(store_id:string):any,
    deleteStore(store_id: string): Promise<boolean>
    fetchStores(filter: {
        page?: number,
        limit?: number,
        order_by?: string,
        text?: string,
    }): Promise<ListType<StoreInterface> | undefined>
    exist(store_id:string):Promise<boolean>|undefined
}

export const useWebStore = create<WebState>((set) => ({
    owner: undefined,
    stores: undefined,
    selectedStore: undefined,
    currentChild: undefined,
    back_color: '',
    blur:false,
    async exist(store_name) {
        const response = await fetch(`${Host}/check_store/?store_name=${store_name}`);
        const json = await response.json();
        return json.exist == true ? true :false;
    },
    async setStoreById(store_id) {
        const store = useWebStore.getState().stores?.list.find(s=>s.id==store_id) as StoreInterface 
        if(store){
            return set(()=>({selectedStore:store}));
        }else{
            const store = (await useWebStore.getState().fetchStores({text:'#'+store_id}))?.list[0] as StoreInterface;
            if(store){
                return set(()=>({selectedStore:store}));
            }
        }
    },
    async fetchStores(filter) {
        const owner = useWebStore.getState().owner
        if (!owner) return
        //@ts-ignore
        filter.owner_id = owner.id
        console.log({filter});
        
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = (filter as any)[key];
            searchParams.set(key, value);
        }
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${owner.token}`);
        const response = await fetch(`${Host}/get_stores/?${searchParams}`, {
            headers
        })
        const json = await response.json();
        if (!json?.list) return
        set(() => ({ stores: json }))
        return json
    },
    openChild(child, blur, back_color) {
        set(() => ({ currentChild: child, blur, back_color: child ? (back_color || '') : '' }))
    },
    async deleteStore(store_id) {
        const owner = useWebStore.getState().owner
        if (!owner) return false;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
        };
        const response = await fetch(`${Host}/delete_store/${store_id}`, requestOptions);
        try {
            const json = await response.json();
            useWebStore.getState().owner_stores({});
            return json?.deleted;
        } catch (error) {
            return false;
        }
    },
    setSelectedStore(store) {
        set(() => ({ selectedStore: store }))
    },
    async disconnection() {
        const owner = useWebStore.getState().owner
        if (owner) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${owner.token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };
            await fetch(`${Host}/disconnection`, requestOptions)
        }
        localStorage.removeItem('user');
        set(() => ({ owner: undefined, stores: undefined, selectedStore: undefined }));
    },
    async tryToken() {
        const json = localStorage.getItem('user');
        if (!json) return;
        const owner = JSON.parse(json);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        const response = await fetch(`${Host}/me`, requestOptions);
        let js = await response.json();
        if (!js?.id) return localStorage.removeItem('user');
        useWebStore.getState().owner_stores({});
        js = { token: owner.token, ...js }

        set(() => ({ owner: js }))
        localStorage.setItem('user', JSON.stringify(js));
    },
    async owner_stores(filter) {
        const owner = useWebStore.getState().owner
        if (!owner) return
        //@ts-ignore
        filter.owner_id =owner.id
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = (filter as any)[key];
            searchParams.set(key, value);
        }
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${owner.token}`);
        const response = await fetch(`${Host}/get_stores/?${searchParams}`, {
            headers
        })
        const json = await response.json();
        if (!json?.list) return
        console.log(json.list);
        set(() => ({ stores: json }))
        return json
    },
    async editStore(data) {

        const owner = useWebStore.getState().owner;
        if (!owner) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const form = new FormData();

        Object.keys(data).forEach((k, i) => {
            console.log('data', i, k, data[k]);

            if (k == 'banners') {
                if (data[k].file) {
                    console.log('new File', data[k].file);
                    form.append(k, JSON.stringify(['banners_0']));
                    form.append('banners_0', data[k].file)
                } else if (data[k].url) {
                    form.append(k, JSON.stringify([data[k].url]));
                    console.log('keep same', JSON.stringify(data[k]));
                }
            } else if (k == 'logo') {
                if (data[k].file) {
                    console.log('new File', data[k].file);
                    form.append(k, JSON.stringify(['logo_0']));
                    form.append('logo_0', data[k].file)
                } else if (data[k].url) {
                    form.append(k, JSON.stringify([data[k].url]));
                    console.log('keep same', JSON.stringify(data[k]));
                }
            }
            else {
                form.append(k, data[k])
            };
        })
        const requestOptions = {
            method: "PUT",
            body: form,
            headers: myHeaders,
        };

        const response = await fetch(`${Host}/update_store`, requestOptions)

        try {
            const store = await response.json();
            useWebStore.getState().owner_stores({})
            return store
        } catch (error: any) {
            console.log(error.message);
            return
        }
    },
    async createStore(data) {

        const owner = useWebStore.getState().owner;
        if (!owner) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const form = new FormData();
        console.log(data);

        Object.keys(data).forEach(k => {
            if (k == 'logo') {
                form.append(k, JSON.stringify(['logo_0']));
                form.append('logo_0', data[k].file);
            }
            if (k == 'banners') {
                form.append(k, JSON.stringify(['banners_0']));
                form.append('banners_0', data[k].file);
            }
            else {
                form.append(k, data[k])
            };
        })
        const requestOptions = {
            method: "POST",
            body: form,
            headers: myHeaders,
        };

        const response = await fetch(`${Host}/create_store`, requestOptions)
        try {
            const store = await response.json();
            useWebStore.getState().owner_stores({})
            return store
        } catch (error: any) {
            console.log(error.message);
            return
        }
    },
    async createOwner() {
        window.open(
            `${Host}/google_connexion`,
            undefined,
            "popup"
        );
        const id = setInterval(() => {
            const userJson = localStorage.getItem('user');
            const user = userJson && JSON.parse(userJson);
            if (user) {
                set(() => ({ owner: user }))
                clearInterval(id);
                useWebStore.getState().owner_stores({});
                useWebRoute.getState().setAbsPath(['store_list']);
            }
            // console.log(new Date().getMilliseconds());
            
        }, 100);

    },
}));

export const useWebRoute = (new SRouter(Pages, ['/', 'home'])).getStore();
