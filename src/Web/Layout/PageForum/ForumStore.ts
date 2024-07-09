import { create } from "zustand";
import { useWebStore } from "../../WebStore";
import { Host } from "../../../Config";
interface SubjectInterface {

}
interface ForumSate {
    create_store(data: {
        title: string,
        targs: {
            name: string,
            targs?: {
                name: string,
                icon: string
            }
        }[],
        isPrivate: boolean,
        notif: boolean,
        message: string
    }): Promise<SubjectInterface | undefined>
}
export const useForumStore = create<ForumSate>((set) => ({
    async create_store(data) {
        try {
            const owner = useWebStore.getState().owner;
            if (!owner) return;
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${owner.token}`);

            const form = new FormData();
            
            form.append('title', data.title)
            form.append('targs', JSON.stringify(data.targs))
            form.append('message', data.message)
            form.append('user_id', owner.id)
            data.notif && form.append('notif', '1')
            data.isPrivate && form.append('isPrivate', '1')
           
            const requestOptions = {
                method: "POST",
                body: form,
                headers: myHeaders,
            };

            return console.log(data);
            
            const response = await fetch(`${Host}/create_subject`, requestOptions)
            const store = await response.json();
            useWebStore.getState().fetchStores({})
            return store
        } catch (error) {
            return error
        }
    },
}))