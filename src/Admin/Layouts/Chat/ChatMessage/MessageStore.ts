import { create } from "zustand";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
import { Host } from "../../../../Config";
import { ListType } from "../../../../DataBase";
import type { Discussion, Message, UserInterface } from "../../../../DataBase";
import {useDiscussionStore } from "../Discussion/DiscussionStore";
// import { useSessionStore } from "../Session/SessionStore";
const NEW_DISCUSSION_STR = 'new_discussion'
const NEW_DISTORE_STR = 'new_distore'

type ContextName = 'discussions'|'groups';
export type ContextType =Discussion& Record<string, any> ;
interface DiscussionState {
    fetchSendMessage(data: {
        context_name: ContextName,
        context: ContextType,
        files?: File[] | null,
        text?: string
    }): Promise<Message | undefined>
    fetchMessages(context_id: string, context_name:ContextName): Promise<ListType<Message> | undefined>
    fetchDeleteMessageBoth(message_id: string): Promise<boolean>
    fetchDeleteMessageMe(message_id: string): Promise<boolean>
    fetchEditMessage(data: { message_id: string, text: string }): Promise<Message | undefined>
}
export const useMessageStore = create<DiscussionState>((_set) => ({
    async fetchEditMessage(data) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();

        formData.append('message_id', data.message_id);
        formData.append('text', data.text);
        const response = await fetch(`${Host}/edit_message`, {
            method: 'PUT',
            headers: h.headers,
            body: formData
        });
        try {
            const json = await response.json();
            console.log('edit_message ', json);
            if (!json?.id) return;
            return json as Message;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchDeleteMessageBoth(message_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        console.log('$$$$$$$$');
        const response = await fetch(`${Host}/delete_message/${message_id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        try {
            const json = await response.json();
            console.log('fetchDeleteMessageBoth', json);
            return json?.deleted
        } catch (error) {
            console.log(error);
        }
    },
    async fetchDeleteMessageMe(message_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/delete_message/${message_id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        try {
            const json = await response.json();
            console.log('fetchDeleteMessageMe', json);
            return json?.deleted
        } catch (error) {
            console.log(error);
        }
    },
    async fetchSendMessage({ context, context_name, files, text }) {
        if (!context || !context.id) return;
        if (context.id.startsWith(NEW_DISCUSSION_STR)) {
            const d = await useDiscussionStore.getState().createDiscussion({
                other_id: context.other.id,
                store_id: context.to_id
            });
            console.log('D');
            if (!d || !d.id) return
            context = d;
            // useDiscussionStore.getState().fetchDiscussions()
            useDiscussionStore.getState().setDiscussion(d)
        } else if (context.id.startsWith(NEW_DISTORE_STR)) {
            // const s = await useSessionStore.getState().fetchCreateSession(context.other.id,text||'');
            // console.log('S', s);
            // if (!s) return
            // context = s;
            // // useSessionStore.getState().fetchSessions();
            // useSessionStore.getState().setSession(s);
        }
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();
        if (!text && (!files)) return;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append('files_' + i, file);
            }
        }
        formData.append('context_id', context.id);
        formData.append('context_name', context_name);
        text && formData.append('text', text)
        if (files) {
            for (let i = 0; i < files.length; ++i) {
                const file = files[i];
                formData.append('files_' + i, file);
            }
        }
        const response = await fetch(`${Host}/send_message`, {
            headers: h.headers,
            body: formData,
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
    async fetchMessages(context_id,context_name) {
        if (context_id.toLowerCase().startsWith('new_')) return;
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/get_messages/?context_id=${context_id}&context_name=${context_name}`, {
            headers: h.headers,
        });
        try {
            const json = await response.json();
            if (!json?.list) return;
            return json;
        } catch (error) {

        }
    }
}))