//RegisterStore
import { create } from "zustand";
import { Host } from "../../../Config";
import { StoreInterface, UserInterface, UserStore } from "../../../DataBase";

interface RegisterState {
    user: UserInterface | undefined;
    store: StoreInterface | undefined,
    userStore: UserStore | undefined,
    openAuth: boolean;
    disconnection(): Promise<void>;
    authenticateUser(): Promise<void>;
    getAccess(): Promise<void>;
    getStore(): Promise<void>
    updateUser(data: Record<string, any>): Promise<void>;
    getHeaders(): {store:StoreInterface,user:UserInterface, headers:Headers} | undefined
}
export const useRegisterStore = create<RegisterState>((set) => ({
    user: undefined,
    store: undefined,
    userStore: undefined,
    openAuth: false,
    async updateUser({ name, photos, id }) {

        const fromData = new FormData();
        if (name) fromData.append('name', name);
        if (photos?.[0]) {
            fromData.append('photos_0', photos[0]);
        } else {
            return
        }
        fromData.append('id', id);
        fromData.append('photos', '["photos_0"]');

        const h = useRegisterStore.getState().getHeaders();
        if (!h) return

        const response = await fetch(`${Host}/edit_me`, {
            method: 'PUT',
            body: fromData,
            headers: h.headers,
        });
        const user = await response.json();
        console.log({ user });

        if (!user.id) return
        set(() => ({
            user: {
                ...user,
                photos: user.photos.map((p: string) => `${Host}${p}`)
            }
        }));
        localStorage.setItem('user', JSON.stringify(user));
    },
    async disconnection() {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return

        const requestOptions = {
            method: "GET",
            headers: h.headers,
        };
        await fetch(`${Host}/disconnection`, requestOptions)

        localStorage.removeItem('user');
        localStorage.removeItem('store_name');
        set(() => ({ user: undefined, store: undefined, userStore: undefined, openAuth: true }));
    },
    async getAccess() {
        window.open(
            `${Host}/google_connexion`,
            undefined,
            "popup"
        );
        const id = setInterval(() => {
            const userJson = localStorage.getItem('user');
            const user = userJson && JSON.parse(userJson);
            if (user) {
                console.log('getAccess', { token: user.token });
                 set(() => ({ user: user }))
                clearInterval(id);
                useRegisterStore.getState().authenticateUser()
            }
        }, 100);
    },
    async authenticateUser() {

        let userJson = localStorage.getItem('user');
        const store_name = localStorage.getItem('store_name') || window.location.pathname.split('/')[2];
        
        if (userJson) {
            const user = JSON.parse(userJson);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.token}`);
            
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };
            
            const response = await fetch(`${Host}/can_use_store/${store_name}`, requestOptions)
            let js: any
            // const clear = () => {
            //     localStorage.removeItem('user');
            //     set(() => ({ user: undefined, userStore: undefined, openAuth: true }));
            // }
            try {
                js = await response.json();
                if (!js.user) return //clear()
            } catch (error) {
                return //clear();
            }
            const _user = { ...user, ...js.user };
            set(() => ({ user: _user, userStore: js.userStore, store: js.store, openAuth: false}))

            localStorage.setItem('user', JSON.stringify(_user));
        }
        else{
            await useRegisterStore.getState().getStore()
        }
    },
    async getStore() {

        const store_name = localStorage.getItem('store_name') || window.location.pathname.split('/')[1];


        if (store_name) {

            const response = await fetch(`${Host}/get_store_by_name/${store_name}`)

            try {
                let js = await response.json();
                set(() => ({ store: js}));
            } catch (error) {

            }
        }
    },
    getHeaders() {
        const store = useRegisterStore.getState().store as StoreInterface;
        if (!store) return;
        let user = useRegisterStore.getState().user as UserInterface;
        if (!user) return
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${user.token}`);
        return {
            store,
            headers,
            user
        }
    }
}));
