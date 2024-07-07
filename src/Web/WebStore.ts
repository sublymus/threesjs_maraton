import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
import { Host } from "../Config";
import { UserInterface, StoreInterface, type ListType } from '../DataBase'

const Pages = {
    '/': {
        home: {},
        store_list: {},
        new_store: {},
        edit_store: {},
        about: {},
        pricing: {},
        tutorial: {
            product_tuto:{},
            command_tuto:{},
            users_tuto:{},
            interface_tuto:{},
            statistic_tuto:{},
        },
        forum: {
            subject:{}
        },
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
    // topBarFollow:true,
    // setTopBarFollow(follow:boolean):void
    setSelectedStore(store: StoreInterface | undefined): void
    createStore(data: Record<string, any>): Promise<StoreInterface | undefined>
    editStore(data: Record<string, any>): Promise<StoreInterface | undefined>
    createOwner(): Promise<void>
    tryToken(): Promise<void>
    disconnection(): Promise<void>
    setStoreById(store_id: string): any,
    deleteStore(store_id: string): Promise<boolean>
    fetchStores(filter: {
        page?: number,
        limit?: number,
        order_by?: string,
        text?: string,
        name?: string, email?: string,
        description?: string,
        only_owner?: boolean,
        phone?: string,
    }): Promise<ListType<StoreInterface> | undefined>
    exist(store_id: string): Promise<boolean> | undefined
}

export const useWebStore = create<WebState>((set) => ({
    owner: undefined,
    stores: undefined,
    selectedStore: undefined,
    currentChild: undefined,
    back_color: '',
    blur: false,
    // topBarFollow:true,
    // setTopBarFollow(follow:boolean){

    // },
    async exist(store_name) {
        const response = await fetch(`${Host}/check_store/?store_name=${store_name}`);
        const json = await response.json();
        return json.exist == true ? true : false;
    },
    async setStoreById(store_id) {
        const store = useWebStore.getState().stores?.list.find(s => s.id == store_id) as StoreInterface
        if (store) {
            return set(() => ({ selectedStore: store }));
        } else {
            const store = (await useWebStore.getState().fetchStores({ text: '#' + store_id }))?.list[0] as StoreInterface;
            if (store) {
                return set(() => ({ selectedStore: store }));
            }
        }
    },
    async fetchStores(filter) {
        const owner = useWebStore.getState().owner
        if (!owner) return
        //@ts-ignore
        if (filter.only_owner) filter.owner_id = owner.id
        console.log({ filter });

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
            useWebStore.getState().fetchStores({});
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
        useWebStore.getState().fetchStores({});
        js = { token: owner.token, ...js }

        set(() => ({ owner: js }))
        localStorage.setItem('user', JSON.stringify(js));
    },
    async editStore(data) {

        const owner = useWebStore.getState().owner;
        if (!owner) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const form = new FormData();

        Object.keys(data).forEach((k, i) => {
            console.log('data', i, k, data[k]);

            if (k == 'banners' || k == 'banner') {
                if (data['banners'] instanceof Blob) {
                    form.append('banners', JSON.stringify(['banners_0']));
                    form.append('banners_0', data['banner'])
                } else if (data['banners']) {
                    form.append('banners', JSON.stringify([data['banner']]));
                }
            } else if (k == 'logo') {
                if (data[k] instanceof Blob) {
                    form.append(k, JSON.stringify(['logo_0']));
                    form.append('logo_0', data[k])
                } else if (data[k].url) {
                    form.append(k, JSON.stringify([data[k]]));
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
            useWebStore.getState().fetchStores({})
            return store
        } catch (error: any) {
            console.log(error.message);
            return
        }
    },
    async createStore(data) {
        try {
            const owner = useWebStore.getState().owner;
            if (!owner) return;
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${owner.token}`);

            const form = new FormData();
            console.log(data);

            Object.keys(data).forEach(k => {
                if (k == 'logo') {
                    form.append(k, JSON.stringify(['logo_0']));
                    form.append('logo_0', data[k]);
                }
                if (k == 'banners' || k == 'banner') {
                    form.append('banners', JSON.stringify(['banners_0']));
                    form.append('banners_0', data['banner']);
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
            const store = await response.json();
            useWebStore.getState().fetchStores({})
            return store
        } catch (error) {
            return error
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
                useWebStore.getState().fetchStores({});
                useWebRoute.getState().setAbsPath(['store_list']);
            }
            // console.log(new Date().getMilliseconds());

        }, 100);

    },
}));

export const useWebRoute = (new SRouter(Pages, ['/', 'home'])).getStore();
