//RegisterStore
import { create } from "zustand";
import { Host } from "../../../Config";
import { StoreInterface, UserInterface, UserStore } from "../../../DataBase";

interface RegisterState {
    user:UserInterface|undefined;
    store:StoreInterface |undefined,
    userStore:UserStore|undefined,
    openAuth:boolean;
    disconnection():Promise<void>;
    authenticateUser(): Promise<void>;
    getAccess():Promise<void>;
}

export const useRegisterStore = create<RegisterState>((set) => ({
    user:undefined,
    store:undefined,
    userStore:undefined,
    openAuth:false,
    async disconnection() {
        let user = useRegisterStore.getState().user;
        if (user) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };
            await fetch(`${Host}/disconnection`, requestOptions)
        }
        localStorage.removeItem('user');
        localStorage.removeItem('store_name');
        set(() => ({ user: undefined, store: undefined, userStore: undefined , openAuth:true }));
    },
    async getAccess(){
        window.open(
            `${Host}/google_connexion`,
            undefined,
            "popup"
        );
        const id = setInterval(() => {
            const userJson = localStorage.getItem('user');
            const user = userJson && JSON.parse(userJson);
            if (user) {
                console.log('getAccess',{token:user.token});
                
                set(() => ({ user: user }))
                clearInterval(id);
               useRegisterStore.getState().authenticateUser()
            }
        }, 100);
    },
    async authenticateUser() {
        
        let userJson = localStorage.getItem('user');
        const store_name = localStorage.getItem('store_name')|| window.location.pathname.split('/')[1];
        
        if (userJson) {
            const user = JSON.parse(userJson);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.token}`);
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };

            const response = await fetch(`${Host}/can_manage_store/${store_name}`, requestOptions)
            
            let js = await response.json();
            if(!js?.user) {
                localStorage.removeItem('user');
                localStorage.removeItem('store');
                set(() => ({ user: undefined, userStore:undefined , store:undefined , openAuth:true }));
                return
            }
            const _user = {...user, ...js.user};
            set(() => ({ user: _user, userStore:js.userStore , store:js.store , openAuth:false }))
            
            localStorage.setItem('user', JSON.stringify(_user));
        }else{
            localStorage.removeItem('user');
            localStorage.removeItem('store');
            set(() => ({ user: undefined, userStore:undefined , store:undefined , openAuth:true }))
        }
    }
}));
