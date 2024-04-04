import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
type Theme= Record<string,{prim:string,secd:string,fird:string,canl:string,save:string,back:string,shad:string}>;

const Pages = {
    '/':{
        product:{
            list_product:{
                // top_product:null,
            },
            dash_product:{
                top_product:null,
            },
            preview:{},
            stat_product:{},
            action:{},
            detail_product:null,
        },
        
    }
}

const DEFAULT_PAGE = ['/','product',''];


interface DashState{
    T:Theme|undefined,
    setT(T:Theme):void
}

export const useDashStore = create<DashState>((_set)=>({
    T:undefined,
    setT(_T){
    }
}));

export const useDashRoute = (new SRouter(Pages,DEFAULT_PAGE)).getStore();
