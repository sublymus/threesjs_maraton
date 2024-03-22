import { create } from 'zustand'
//@ts-ignore
import photo from "../../res/photo2.png";
import { Host } from '../../AppStore';

type PageType = 'login'|'register'|'profile'|'commande'|'cart';
interface UserInterface {
    id: string;
    full_name: string;
    email: string;
    photos: string[];
    token?: string;
    created_at: string;
    updated_at: string;
}
interface ProfileStore {
    user: UserInterface | undefined,
    profilePage: PageType,
    setProfilePage(page:PageType):void,
    connexion(data:{email: string, password: string}):Promise<void>;
    google_connexion(): Promise<void>,
    create_user(data: { full_name: string, email: string, password: string, photos: HTMLInputElement['files'] }): Promise<void>,
    tryToken(): Promise<void>,
    disconnection(): Promise<void>,
    me(): Promise<void>
}
export const useProfileStore = create<ProfileStore>((set) => ({

    user: undefined,
    profilePage: 'register',
    async connexion({email,password}){
        const response = await fetch(`${Host}/connexion?email=${email}&password=${password}`);
        const user = await response.json();
        set(()=>({user , profilePage:'profile'}));
        localStorage.setItem('user',JSON.stringify(user));
    },
    async google_connexion() {
        
    },
    async create_user({ email, full_name, password, photos }) {
        
        const fromData = new FormData();
        fromData.append('email',email);
        fromData.append('full_name',full_name);
        fromData.append('password',password);
        if(photos?.[0]){
            fromData.append('photos_0',photos[0]);
        }else{
            const response = await (fetch(photo));
            const defaultImage = await response.blob();
            
            fromData.append('photos_0',defaultImage);
        }
        const response = await fetch(`${Host}/create_client`,{
            method:'POST',
            body:fromData,
        });

        const user = await response.json();
        set(()=>({user , profilePage:'profile'}));
        localStorage.setItem('user',JSON.stringify(user));
    },
    async tryToken() {

    },
    async disconnection() {

    },
    async me() {

    },
    setProfilePage(page) {
        if(page != 'login' && page != 'register' ){
            if(!this.user){
                return set(()=>({profilePage:'login'}));
            }
        }
        set(()=>({profilePage:page}));
    },
}));









