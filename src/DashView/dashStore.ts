import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
import { Host } from "../Config";
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
                    product_preview:{},
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

interface StoreVar{
    products:number,
    categories:number,
    catalogs:number,
    features:number
}

interface DashState{
    T:Theme|undefined,
    setT(T:Theme):void,
    storeVar:StoreVar|undefined,
    currentChild:JSX.Element|undefined,
    openChild:(child:JSX.Element|undefined)=>any,
    fetchStoreVar():Promise<void>;
}

export const useDashStore = create<DashState>((set)=>({
    T:undefined,
    storeVar:undefined,
    async fetchStoreVar() {
        const response =  await  fetch(`${Host}/get_store_var`);
        const json = await response.json();
        if(!json) return;
        set(()=>({storeVar:json}));
        console.log({json});
        
    },
    setT(_T){
    },
    currentChild:undefined,
    openChild(child) {
        set(()=>({currentChild:child}))
    },
}));

export const useDashRoute = (new SRouter(Pages,['/','store','products'])).getStore();
