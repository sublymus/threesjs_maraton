import { create } from 'zustand'
//@ts-ignore
import { Host  , DefaultImage, useAppStore} from '../../AppStore';

interface UserInterface {
    id: string;
    full_name: string;
    email: string;
    photos: string[];
    token?: string;
    created_at: string;
    updated_at: string;
}
interface RegisterStore {
    user: UserInterface | undefined,
    connexion(data:{email: string, password: string}):Promise<void>;
    google_connexion(): Promise<void>,
    create_user(data: { full_name: string, email: string, password: string, photos: HTMLInputElement['files'] }): Promise<void>,
    tryToken(): Promise<void>,
    disconnection(): Promise<void>,
    me(): Promise<void>,
}
export const useRegisterStore = create<RegisterStore>((set) => ({
    user: undefined,
    async connexion({email,password}){
        const response = await fetch(`${Host}/connexion?email=${email}&password=${password}`);
        const user = await response.json();
        set(()=>({user , RegisterPage:'Register'}));
        localStorage.setItem('user',JSON.stringify(user));
        useAppStore.getState().setAbsPath(['profile','user']);
    },
    async google_connexion() {
       
       const response =  await fetch(`${Host}/google_connexion`,{
            //redirect :'follow'
        });
        console.log('json',await response.json());
        console.log('redirected', response.redirected);
        console.log('headers', response.headers);
        console.log('url', response.url);
        

        const user = await response.json();
        set(()=>({user , RegisterPage:'Register'}));
        localStorage.setItem('user',JSON.stringify(user));
    },
    async create_user({ email, full_name, password, photos }) {
        
        const fromData = new FormData();
        fromData.append('email',email);
        fromData.append('full_name',full_name);
        fromData.append('password',password);
        if(photos?.[0]){
            fromData.append('photos_0',photos[0]);
        }else{
            const response = await (fetch(DefaultImage));
            const defaultImage = await response.blob();
            fromData.append('photos_0',defaultImage);
        }
        const response = await fetch(`${Host}/create_client`,{
            method:'POST',
            body:fromData,
        });

        const user = await response.json();
        set(()=>({user}));
        useAppStore.getState().setAbsPath(['profile','user']);
        localStorage.setItem('user',JSON.stringify(user));
    },
    async tryToken() {

    },
    async disconnection() {

    },
    async me() {

    },
   
}));









