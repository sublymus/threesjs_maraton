import { create } from "zustand";
import { useWebStore } from "../../WebStore";
import { Host } from "../../../Config";
import { ListType, Message, UserInterface } from "../../../DataBase";
import { transmit } from "../../../Tools/Transmit";

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
    count?: number
}
export interface ForumSate {
    subjects: ListType<SubjectInterface> | undefined,
    subject: SubjectInterface | undefined,
    messages: ListType<Message> | undefined,
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
        close?: number,
        no_save?: boolean
    }): Promise<ListType<SubjectInterface> | undefined>,
    setSubjectById(subject_id: string): Promise<SubjectInterface | undefined>
    send_message(data: {
        context_id: string,
        context_name: string,
        text: string,
        reply_id?: string,
    }): Promise<Message | undefined>
    fetchMessages(data: {
        context_id: string,
        context_name: string,
        page?: number,
        limit?: number,
        order_by?: string
        no_save?: boolean
    }): Promise<ListType<Message> | undefined>
}

type setType = ((cb: (data: ForumSate) => Partial<ForumSate>) => any)
let disSet: setType | undefined;
const channels: string[] = []

export const useForumStore = create<ForumSate>((set, get) => ({
    subject: undefined,
    subjects: undefined,
    messages: undefined,
    async fetchMessages(data) {
        const searchParams = new URLSearchParams({});
        if (!data.order_by) data.order_by = 'created_at_asc';
        for (const key in data) {
            const value = (data as any)[key];
            searchParams.set(key, value);
        }

        const response = await fetch(`${Host}/get_messages/?${searchParams}`);
        try {
            const json = await response.json();
            if (!json?.list) return;
            set(() => ({ messages: json }))

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
    async setSubjectById(subject_id) {
        const subject = get().subjects?.list.find(s => s.id == subject_id);
        if (subject) {
            set(() => ({ subject: subject }))
            return subject
        }
        else {
            const s = await get().fetchSubjects({ subject_id })
            set(() => ({ subject: s?.list[0] }))
            return s?.list[0]
        }
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
    async fetchSubjects(filter) {
        // const owner = useWebStore.getState().owner
        // if (!owner) return
        filter = { ...filter }
        if (!filter.limit) filter.limit = 10;
        if (!filter.order_by) filter.order_by = 'created_at_desc';
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = (filter as any)[key];
            searchParams.set(key, value);
        }
        // const headers = new Headers();
        // headers.append("Authorization", `Bearer ${owner.token}`);
        const response = await fetch(`${Host}/get_subjects/?${searchParams}`)
        const json = await response.json();
        if (!json?.list) return
        if (!filter.no_save) {
            set(() => ({ subjects: json }))
        }
        disSet = set;
        for (const s of json.list) {
            ListenDiscussion(s)
        }
        return json
    },
}))

export async function ListenDiscussion(s: SubjectInterface) {
    if (channels.includes(s.id)) return
    channels.push(s.id);
    const subscription = transmit.subscription(s.id);
    await subscription.create();
    subscription.onMessage<{ reload: string, reloadMessage: boolean }>(async (data) => {
        if (!disSet) return;
        console.log('===>>>>2', { data });
        const currentSubject = useForumStore.getState().subject;
        if (data.reload || data.reloadMessage) {
            //Reload Subjects
            if (currentSubject?.id == s.id) {
                const listSubject = useForumStore.getState().subjects?.list;
                const sjson = (await useForumStore.getState().fetchSubjects({
                    subject_id: s.id,
                    no_save: true,
                }))?.list;
                if (sjson?.[0].id != s.id) return
                const newList = [...listSubject?.map((list_s) => {
                    if (list_s.id == s.id) {
                        return sjson[0]
                    }
                    return list_s
                }) || []];
                disSet(({ subjects }) => ({ subjects: subjects && { ...subjects, list: newList } }));
                if (currentSubject?.id == s.id) {
                    disSet(() => ({ subject: { ...sjson?.[0] } }))
                }
            }
            //Reload Messages
            if (currentSubject?.id == s.id) {
                const messages = useForumStore.getState().messages
                const newMessages = await useForumStore.getState().fetchMessages({
                    context_id: s.id,
                    context_name: 'subjects',
                    limit: messages ? messages.limit : 25,
                    page: messages ? messages.page : 1
                });
                disSet(() => ({ messages: newMessages, subject: { ...s } }))
            }
        }
    })
}
