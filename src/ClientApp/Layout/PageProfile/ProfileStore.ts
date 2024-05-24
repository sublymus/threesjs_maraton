import { create } from 'zustand'

interface ProfileStore {
    photo:string,
    lastPath:number|undefined,
    setLastPath(link:number|undefined):void
    openPhoto(photo:string):void, 
}
export const useProfileStore = create<ProfileStore>((set) => ({
    photo:'',
    lastPath:undefined,
    setLastPath(link) {
        set(()=>({lastPath:link}))
    },
    openPhoto(photo) {
        set(()=>({photo}))
    }
}));