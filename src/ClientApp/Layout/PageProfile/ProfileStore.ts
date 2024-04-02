import { create } from 'zustand'

interface ProfileStore {
    photo:string,
    openPhoto(photo:string):void, 
}
export const useProfileStore = create<ProfileStore>((set) => ({
    photo:'',
    openPhoto(photo) {
        set(()=>({photo}))
    },
    
}));









