import { create } from 'zustand'
//@ts-ignore
import { Host, DefaultImage, useAppRouter } from '../../AppStore';

interface UserInterface {
    id: string;
    full_name: string;
    email: string;
    photos: string[];
    token?: string;
    createdAt: string;
    updatedAt: string;
}
interface RegisterStore {
    user: UserInterface | undefined,
    connexion(data: { email: string, password: string }): Promise<void>;
    google_connexion(): Promise<void>,
    create_user(data: { full_name: string, email: string, password: string, photos: HTMLInputElement['files'] }): Promise<void>,
    tryToken(): Promise<void>,
    updateUser(user: { id: string, full_name?: string, photos?: FileList }): Promise<void>,
    disconnection(): Promise<void>,
    me(): Promise<void>,
    autentificate(): Promise<void>
}
const isUser = (user: any): user is UserInterface => {
    if (!user) return false;
    if (!user.id) return false;
    if (!user.email) return false;
    if (!user.full_name) return false;
    if (!user.token) return false;
    if (!user.photos) return false;
    if (!user.createdAt) return false;
    return true;
}
export const useRegisterStore = create<RegisterStore>((set) => ({
    user: undefined,
    async autentificate() {
        let json: UserInterface | null = useAppRouter.getState().json as UserInterface;
        console.log(' user URL', json);

        if (!isUser(json)) {
            try {
                json = JSON.parse(localStorage.getItem('user') || '') as UserInterface | null;
                console.log(' user Local ', json);
            } catch (error) { }
            if (!isUser(json)) return;
        }
        console.log(' user selected ', json);
        set(() => ({
            user: {
                ...json!,
                photos: json!.photos.map((p: string) => p.startsWith('http') ? `${p}` : `${Host}${p}`)
            }
        }));
        localStorage.setItem('user', JSON.stringify(json));
    },
    async connexion({ email, password }) {
        const response = await fetch(`${Host}/connexion?email=${email}&password=${password}`);
        const user = await response.json();
        if (!user.id) return
        set(() => ({
            user: {
                ...user,
                photos: user.photos.map((p: string) => `${Host}${p}`)
            }
        }));
        localStorage.setItem('user', JSON.stringify(user));
        useAppRouter.getState().setAbsPath(['profile', 'user']);
    },
    async updateUser({ full_name, photos, id }) {

        console.log({ photos });

        const fromData = new FormData();
        if (full_name) fromData.append('full_name', full_name);
        if (photos?.[0]) {
            fromData.append('photos_0', photos[0]);
        } else {
            return
        }
        fromData.append('id', id);
        fromData.append('photos', '["photos_0"]');
        const response = await fetch(`${Host}/edit_me`, {
            method: 'POST',
            body: fromData,
        });
        const user = await response.json();
        console.log({ user });

        if (!user.id) return
        set(() => ({
            user: {
                ...user,
                photos: user.photos.map((p: string) => `${Host}${p}`)
            }
        }));
        localStorage.setItem('user', JSON.stringify(user));
    },
    async google_connexion() {

        const response = await fetch(`${Host}/google_connexion`, {
            //redirect :'follow'
        });

        localStorage.setItem('json', await response.json());
        localStorage.setItem('redirected', response.redirected+'');
        localStorage.setItem('headers', response.headers+'');
        localStorage.setItem('url', response.url+'');


        const user = await response.json();
        set(() => ({
            user: {
                ...user,
                photos: user.photos.map((p: string) => `${Host}${p}`)
            }
        }));
        localStorage.setItem('user', JSON.stringify(user));
        console.log('localStorage' , localStorage.getItem('user'));
        
    },
    async create_user({ email, full_name, password, photos }) {

        const fromData = new FormData();
        fromData.append('email', email);
        fromData.append('full_name', full_name);
        fromData.append('password', password);
        if (photos?.[0]) {
            fromData.append('photos_0', photos[0]);
        } else {
            const response = await (fetch(DefaultImage));
            const defaultImage = await response.blob();
            fromData.append('photos_0', defaultImage);
        }
        const response = await fetch(`${Host}/create_client`, {
            method: 'POST',
            body: fromData,
        });

        const user = await response.json();
        set(() => ({
            user: {
                ...user,
                photos: user.photos.map((p: string) => `${Host}${p}`)
            }
        }));
        useAppRouter.getState().setAbsPath(['profile', 'user']);
        localStorage.setItem('user', JSON.stringify(user));
    },
    async tryToken() {

    },
    async disconnection() {

    },
    async me() {

    },

}));









