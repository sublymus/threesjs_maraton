
import { create } from 'zustand'

const Pages = {
    loading:[
        'loading'
    ],
    catalogue: [
        'catalogue_description',
        'catalogue_onglet',
        'profile_image',
        'nav_link',
        'research_bar',
        'card',
        'nav_option',
        'logo'
    ],
    product:[
        'editer',
        'products',
        'summary',
        'filter'
    ],
    profile:[
        'profile'
    ],
    customer_service:[
        'customer service'
    ],
    about:[
        'about'
    ],
} as const
interface AppState {
    page: keyof typeof Pages,
    Pages:typeof Pages,
    setPage(page :keyof typeof Pages):void,
    isAllowed<T extends keyof typeof Pages, C extends typeof Pages[T][number]  >(page:T,component:C):true|null;
}
export const useAppStore = create<AppState>((set) => ({
    page:'catalogue',
    Pages,
    setPage(page) {
        set(()=>({page}))
    },
    isAllowed(page,component) {
        //@ts-ignore
        return Pages[page].includes(component)||null
    },
}))
