import { create } from "zustand";
import { SRouter } from "../Tools/SRouter";
import { Host } from "../Config";
type Theme= Record<string,{prim:string,secd:string,fird:string,canl:string,save:string,back:string,shad:string}>;
/*
default path,
desable copmonent,
*/
const Pages = {
    '/':{
        
    }
}

interface WebState{

}

export const useWebStore = create<WebState>((set)=>({

}));

export const useWebRoute = (new SRouter(Pages,['/'])).getStore();
