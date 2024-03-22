
import { create } from 'zustand'

export const Host = 'http://localhost:3333';

const Pages = {
    loading:[
        'loading'
    ],
    catalogue: [
        'catalogue_description',
        'catalogue_onglet',
        'top-bar',
    ],
    product:[
        'editer',
        'products',
        'summary',
        'filter'
    ],
    profile:[
        'page-profile',
        'top-bar',
    ],
    customer_service:[
        'customer-service',
        'top-bar',
    ],
    about:[
        'page-about',
        'top-bar',
    ],
    blog:[
        'page-blog',
        'top-bar',
    ],
    service:[
        'page-service',
        'top-bar',
    ],
} as const;

type navQS = (qs:Record<string,any>)=>Record<string,any>

interface AppState {
    page: keyof typeof Pages,
    qs:Record<string,any>,
    Pages:typeof Pages,
    pageList:string[],
    navNext(qs:navQS|undefined):void,
    navBack(qs:navQS|undefined):void,
    setPage(page :keyof typeof Pages):void,
    isAllowed<T extends keyof typeof Pages, C extends typeof Pages[T][number]  >(page:T,component:C):true|null;
}
export const useAppStore = create<AppState>((set) => ({
    page:'catalogue',
    Pages,
    qs:{},
    pageList:[],
    navNext(){

    },
    navBack(){

    },
    setPage(page) {
        set(()=>({page}))
    },
    isAllowed(page,component) {
        //@ts-ignore
        return Pages[page].includes(component)||null
    },
}))
