import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
type Theme= Record<string,{prim:string,secd:string,fird:string,canl:string,save:string,back:string,shad:string}>;
/*
default path,
desable copmonent,
current('page')
*/
const Pages = {
    '/':{
        store:{
            // le store // list products create product
            products:{
                // list des products
                dash_product:{
                    // edition de product (avec data) <EditProduct/>
                    preview:{},
                    statistic:{},
                    action:{}
                },
                new_product:{
                    // edition de product ( sans data )<CreateProduct}/>
                    preview:{},
                }
            },
        }
    }
}

interface DashState{
    T:Theme|undefined,
    setT(T:Theme):void,
    currentChild:JSX.Element|undefined,
    openChild:(child:JSX.Element|undefined)=>any,
}

export const useDashStore = create<DashState>((set)=>({
    T:undefined,
    setT(_T){
    },
    currentChild:undefined,
    openChild(child) {
        set(()=>({currentChild:child}))
    },
}));

export const useDashRoute = (new SRouter(Pages,['/','store','products'])).getStore();
