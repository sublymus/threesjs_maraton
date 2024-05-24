import { SRouter } from "../Tools/SRouter";
export const DefaultImage = '/src/res/photo2.png';

const Pages = {
    '/': {
        loading: {},
        catalogue: {
            catalogue_description: null,
            catalogue_onglet: null,
            top_bar: null,
        },
        product: {
            editer: null,
            products: null,
            summary: null,
            filter: null,
            top_bar: null,
        },
        profile: {
            login: {},
            create: {},
            error: {},
            user: {},
            command: {},
            cart: {},
            favorites: {},
            visited: {},
            about: {},
            blog: {},
            service: {
            },
            profile_nav: null,
            top_bar: null,
        },
    }
} 

import { create } from "zustand";
interface AppState{
    back_color: string;
    blur:boolean,
    T: string | undefined | null,
    setT(T: string | undefined): void,
    currentChild: JSX.Element | undefined,
    openChild: (child: JSX.Element | undefined, blur?:boolean,back_color?: string) => any,
}

export const useAppStore = create<AppState>((set)=>({
    T: localStorage.getItem('theme'),
    storeVar: undefined,
    usersVar: undefined,
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

export const useAppRouter  = new SRouter(Pages,['/','catalogue']).getStore()