import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
// import { useRegisterStore } from "./Layout/PageAuth/RegisterStore";
/*
default path,
desable copmonent,
current('page')
*/

const Pages = {
    '/': {
        stores:{
            store_info:{}
        },
        roles:{
            edit_role:{},
            create_role:{}
        },
        users:{
            user_profile:{}
        },
        chat: {
            discussions: {
                discussions_all:{},
                discussions_new:{},
                discussions_blocked:{}
            },
            groups: {},
            surveys: {}
        },
        interfaces: {},
        statistic: {},
        // roles: {
        //     //list
        //     create_role: {},
        //     edit_role: {}
        // },
        moderators:{
            moderator_profile:{},
            new_moderator:{}
        }
    }
}

interface AdminState {
    back_color: string;
    blur:boolean,
    T: string | undefined | null,
    setT(T: string | undefined): void,
    currentChild: JSX.Element | undefined,
    openChild: (child: JSX.Element | undefined, blur?:boolean,back_color?: string) => any,
}

export const useAdminStore = create<AdminState>((set) => ({
    T: localStorage.getItem('theme'),
    back_color: '',
    blur:false,
    setT(T) {
        T && localStorage.setItem('theme', T);
        set(() => ({ T }))
    },
    currentChild: undefined,
    openChild(child , blur,back_color) {
        set(() => ({ currentChild: child,blur ,back_color: child ?(back_color || ''):'' }))
    },
}));

export const useAdminRoute = (new SRouter(Pages, ['/', 'chat'])).getStore();
