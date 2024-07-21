import { SRouter } from "../Tools/SRouter";
export const DefaultImage = '/src/res/photo2.png';

const Pages = {
    '/': {
        loading: {},
        products: {
            detail: {
                comments: {},
                images: {}
            },
        },
        categories: {},
        favorites: {},
        cart: {},
        payment: {},
        command: {},
        profile: {}
    }
}

import { create } from "zustand";
interface AppState {
    back_color: string;
    blur: boolean,
    T: string | undefined | null,
    openNav: 'max' | 'min',
    setOpenNav(nav: 'max' | 'min'): void
    setT(T: string | undefined): void,
    currentChild: JSX.Element | undefined,
    openChild: (child: JSX.Element | undefined, blur?: boolean, back_color?: string) => any,
}

export const useAppStore = create<AppState>((set) => ({
    T: localStorage.getItem('theme'),
    storeVar: undefined,
    usersVar: undefined,
    back_color: '',
    blur: false,
    openNav: 'max',
    setOpenNav(nav) {
        set(() => ({ openNav: nav }))
    },
    setT(T) {
        T && localStorage.setItem('theme', T);
        set(() => ({ T }))
    },
    currentChild: undefined,
    openChild(child, blur, back_color) {
        set(() => ({ currentChild: child, blur, back_color: child ? (back_color || '') : '' }))
    },
}));

export const useAppRouter = new SRouter(Pages, ['/', 'products']).getStore()