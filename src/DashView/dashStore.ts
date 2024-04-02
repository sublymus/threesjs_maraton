import { create } from "zustand";
type Theme= Record<string,{prim:string,secd:string,fird:string,canl:string,save:string,back:string,shad:string}>;
interface DashState{
    T:Theme|undefined,
    setT(T:Theme):void
}

export const useDashStore = create<DashState>((_set)=>({
    T:undefined,
    setT(_T){
    }
}));