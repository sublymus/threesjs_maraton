import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
import { Host } from "../Config";
import { StoreInterface, UserInterface } from "../DataBase";

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
    owner: UserInterface | undefined,
    stores: StoreInterface[] | undefined,
    selectedStore: StoreInterface | undefined,
    setSelectedStore(store: StoreInterface | undefined): void
    owner_stores(): Promise<void>
    createStore(data: Record<string, any>): Promise<StoreInterface | undefined>
    editStore(data: Record<string, any>): Promise<StoreInterface | undefined>
    createOwner(): Promise<void>
    tryToken(): Promise<void>
    disconnection(): Promise<void>
    deleteStore(store_id: string): Promise<boolean>
}

export const useWebStore = create<WebState>((set) => ({
    owner: undefined,
    stores: [],
    selectedStore: undefined,
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
            useWebStore.getState().owner_stores();
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
        if (!js?.id) return localStorage.setItem('user', '');
        useWebStore.getState().owner_stores();
        js = { token: owner.token, ...js }

        set(() => ({ owner: js }))
        localStorage.setItem('user', JSON.stringify(js));
    },
    async owner_stores() {
        const owner = useWebStore.getState().owner
        if (!owner) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        let js2: any = []
        try {
            const response2 = await fetch(`${Host}/owner_stores`, requestOptions)
            const list = await response2.json();
            if (Array.isArray(list)) js2 = list
        } catch (error) { }
        console.log('listOwner', { stores: js2 })

        set(() => ({ stores: js2 }))
    },
    async editStore(data) {

        const owner = useWebStore.getState().owner;
        if (!owner) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const form = new FormData();

        Object.keys(data).forEach(k => {
            if (k == 'banners') {
                if (data.file?.file) {
                    console.log('new File', data.file);
                    form.append(k, JSON.stringify(['banners_0']));
                    form.append('banners_0', data.file.file)
                } else {
                    form.append(k, JSON.stringify(data[k]));
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
            useWebStore.getState().owner_stores()
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
            if (k == 'banners') {
                console.log('###########');

                form.append(k, JSON.stringify(['banners_0']));
                form.append('banners_0', data.banners.file)
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
            useWebStore.getState().owner_stores()
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
                useWebStore.getState().owner_stores();
                useWebRoute.getState().setAbsPath(['store_list']);
            }
        }, 100);

    },
}));

export const useWebRoute = (new SRouter(Pages, ['/', 'home'])).getStore();
