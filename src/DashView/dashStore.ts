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
                    //creation de products
                    preview:{},
                }
            },
            categories:{
                //list des categories
                dash_categories:{
                    preview:{},
                    action:{}
                },
                new_category:{
                    // creation de categories
                    preview:{},
                }
            },
            features:{
                //list des features
                dash_features:{
                    preview:{},
                    action:{}
                },
                new_feature:{
                    // creation de features
                    preview:{},
                }
            },
            catalogs:{
                //list des catalogs
                dash_catalogs:{
                    preview:{},
                    action:{}
                },
                new_catalog:{
                    // creation de catalogs
                    preview:{},
                }
            }
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
