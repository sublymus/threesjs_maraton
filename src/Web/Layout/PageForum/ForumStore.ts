import { create } from "zustand";
import { useWebStore } from "../../WebStore";
import { Host } from "../../../Config";
import { ListType, Message, UserInterface } from "../../../DataBase";

export interface SubjectInterface {
    created_at: string,
    files: []
    id: string,
    message: string,
    targs: {
        name: string,
        icon?: string
        targ?: {
            name: string,
            icon: string
        }
    }[],
    title: string,
    updatedAt: string,
    user_id: string,
    user: UserInterface,
    comment_count?: number
}
export interface ForumSate {
    subjects: ListType<SubjectInterface> | undefined,
    create_subject(data: {
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
        message: string,
    }): Promise<SubjectInterface | undefined>,
    fetchSubjects(data: {
        page?: number,
        limit?: number,
        order_by?: string,
        title?: string,
        user_id?: string
        isPrivate?: boolean,
        message?: string,
        text?: string,
        subject_id?: string,
        targ_name?: string,
        close?: number
    }): Promise<ListType<SubjectInterface> | undefined>,
    getSubjectById(subject_id: string): Promise<SubjectInterface | undefined>
    send_message(data: {
        context_id: string,
        context_name: string,
        text: string,
        reply_id?: string,
    }): Promise<Message | undefined>
    fetchMessage(data: {
        context_id:string,
        context_name: string,
        page?: number,
        limit?: number,
    }): Promise<ListType<Message> | undefined>
}

export const useForumStore = create<ForumSate>((set, get) => ({
    subjects: undefined,
    async fetchMessage(data) {
        const searchParams = new URLSearchParams({});
        for (const key in data) {
            const value = (data as any)[key];
            searchParams.set(key, value);
        }

        const response = await fetch(`${Host}/get_messages/?${searchParams}`);
        try {
            const json = await response.json();
            console.log(json);
            
            if (!json?.list) return;
            return json;
        } catch (error) {

        }
    },
    async send_message(data) {
        const owner = useWebStore.getState().owner;
        if (!owner) return;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${owner.token}`);

        const form = new FormData();
        form.append('context_id', data.context_id);
        form.append('context_name', data.context_name);
        form.append('text', data.text)
        if (data.reply_id) form.append('reply_id', data.reply_id)
        const response = await fetch(`${Host}/send_message`, {
            headers: myHeaders,
            body: form,
            method: 'POST'
        });
        try {
            const json = await response.json();
            console.log('fetchSendMessage', json);

            if (!json?.id) return;
            return json
        } catch (error) {
            console.log(error);
        }
    },
    async getSubjectById(subject_id) {
        const subject = get().subjects?.list.find(s => s.id == subject_id);
        if (subject) return subject;
        else {
            const s = await get().fetchSubjects({ subject_id })
            return s?.list[0]
        }
    },
    async fetchSubjects(filter) {
        // const owner = useWebStore.getState().owner
        // if (!owner) return
        filter = { ...filter }
        if (!filter.limit) filter.limit = 2;
        if (!filter.order_by) filter.order_by = 'created_at_desc';
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = (filter as any)[key];
            searchParams.set(key, value);
        }
        // const headers = new Headers();
        // headers.append("Authorization", `Bearer ${owner.token}`);
        const response = await fetch(`${Host}/get_subjects/?${searchParams}`, {
            // headers
        })
        const json = await response.json();
        if (!json?.list) return
        set(() => ({ subjects: json }))
        return json
    },
    async create_subject(data) {
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
            const response = await fetch(`${Host}/create_subject`, requestOptions)
            const subject = await response.json();

            return subject
        } catch (error) {
            return error
        }
    },
}))