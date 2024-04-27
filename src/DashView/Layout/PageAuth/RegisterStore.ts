//RegisterStore
import { create } from "zustand";
import { Host } from "../../../Config";
import { UserInterface } from "../../../DataBase";

interface RegisterState {
    user:UserInterface|undefined
    authenticateUser(): Promise<void>;
}

export const useRegisterStore = create<RegisterState>((set) => ({
    user:undefined,
    async authenticateUser() {
        
        let userJson = localStorage.getItem('user');
        const store = localStorage.getItem('store');
        if (userJson) {
            const user = JSON.parse(userJson);
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.token}`);
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
            };

            const response = await fetch(`${Host}/can_manage_store`, requestOptions)
            let js = await response.json();
            if (!js?.id) return localStorage.setItem('user', '');
            js = { token: user.token, ...js }

            set(() => ({ user: js }))
            localStorage.setItem('owner', JSON.stringify(js));
        }
    }
}));
