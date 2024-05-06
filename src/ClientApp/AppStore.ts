import { SRouter } from "../Tools/SRouter";
export const DefaultImage = 'src/res/photo2.png';

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

}

export const useAppStore = create<AppState>((_set)=>({
   
}));

export const useAppRouter  = new SRouter(Pages,['/','catalogue']).getStore()