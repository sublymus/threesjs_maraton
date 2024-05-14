import { create } from "zustand";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
import { Host } from "../../../../Config";
import { ListType, UserInterface } from "../../../../DataBase";
import { transmit } from "../../../../Tools/Transmit";
import type { Discussion, Message } from "../../../../DataBase";

const NEW_DISCUSSION_STR = 'new_discussion'
interface DiscussionState {
    discussion: Discussion | undefined,
    discussions: Discussion[] | undefined,
    messages: ListType<Message> | undefined
    setDiscussion(discussion: Discussion | undefined): void
    fetchDiscussions(blocked?: 'no' | 'only' | 'all'): Promise<void>
    fetchCreateDiscussion(user_id: string): Promise<Discussion | undefined>
    addDiscussion(collabo: UserInterface): void
    unBlockDiscussion(discussion: Discussion): void
    blockDiscussion(discussion: Discussion): void
    asReadDiscussion(discussion: Discussion): void
    deleteDiscussion(discussion: Discussion): void
    fetchSendMessage(data: {
        discussion: Discussion,
        files?: File[] | null,
        text?: string
    }): Promise<void>
    fetchMessages(discussion_id: string): Promise<void>
    fetchDeleteMessageBoth(message_id: string): Promise<void>
    fetchDeleteMessageMe(message_id: string): Promise<void>
    fetchEditMessage(data: { message_id: string, text: string }): Promise<void>
}

const channels: string[] = []
export const useDiscussionStore = create<DiscussionState>((set) => ({
    discussion: undefined,
    discussions: undefined,
    messages: undefined,
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
            if (!json?.id) {
                return;
            }
            console.log('edit_message ', json);

            const d = useDiscussionStore.getState().discussion
            d && useDiscussionStore.getState().fetchMessages(d.id)
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
            console.log('EEEEEEE', json);

            if (!json?.deleted) {
                return;
            }
            const d = useDiscussionStore.getState().discussion
            d && useDiscussionStore.getState().fetchMessages(d.id)
        } catch (error) {
            console.log(error);
        }
    },
    async fetchDeleteMessageMe(message_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        console.log('$$$$$$$$');
        const response = await fetch(`${Host}/delete_message/${message_id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        try {
            const json = await response.json();
            console.log('EEEEEEE', json);

            if (!json?.deleted) {
                return;
            }
            const d = useDiscussionStore.getState().discussion
            d && useDiscussionStore.getState().fetchMessages(d.id)
        } catch (error) {
            console.log(error);
        }
    },
    setDiscussion(discussion) {
        set(() => ({ discussion }));
    },
    async unBlockDiscussion(discussion) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/unblock_discussion/${discussion.id}`, {
            method: 'PUT',
            headers: h.headers
        });
        try {
            const json = await response.json();
            if (!json?.id) {
                return;
            }
            console.log('unblock_discussion ', json);

            useDiscussionStore.getState().fetchDiscussions();
        } catch (error) {
            console.log(error);
        }
    },
    async asReadDiscussion(discussion) {

    },
    async blockDiscussion(discussion) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/block_discussion/${discussion.id}`, {
            method: 'PUT',
            headers: h.headers
        });
        try {
            const json = await response.json();
            if (!json?.id) {
                return;
            }
            console.log('block_discussion ', json);

            useDiscussionStore.getState().fetchDiscussions();
        } catch (error) {
            console.log(error);
        }
    },
    async deleteDiscussion(discussion) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/delete_discussion/${discussion.id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        try {
            const json = await response.json();
            if (!json.deleted) return
            set(() => ({ discussion: undefined }))
            useDiscussionStore.getState().fetchDiscussions();
        } catch (error) {
            console.log(error);
        }
    },
    async fetchCreateDiscussion(user_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();

        formData.append('receiver_id', user_id);
        formData.append('store_id', h.store.id);
        const response = await fetch(`${Host}/create_discussion`, {
            headers: h.headers,
            body: formData,
            method: 'POST'
        });
        try {
            const json = await response.json();
            if (!json?.id) {
                return;
            }
            console.log('new Discussion ', json);

            useDiscussionStore.getState().fetchDiscussions();
            set(() => ({ discussion: json }))
            return json
        } catch (error) {
            console.log(error);
        }
    },
    addDiscussion(collabo) {
        const exist: any = useDiscussionStore.getState().discussions?.find(d => d.other.id == collabo.id);

        console.log({ exist });

        if (exist) {
            //@ts-ignore
            set(() => ({ discussion: exist }));
            useDiscussionStore.getState().fetchMessages(exist.id)
            return
        }
        const user = useRegisterStore.getState().user;
        if (!user) return
        const discussion = {
            "id": NEW_DISCUSSION_STR + Date.now(),
            "creator_id": user.id,
            "receiver_id": collabo.id,
            "deleted": null,
            "blocked": null,
            "unchedked_count": 0,// calculer
            "creator_opened_at": "2024-05-09 12:30:15",
            "receiver_opened_at": null,
            "created_at": null,
            "updated_at": "2024-05-09 13:46:04",
            "other": collabo,
        }
        //@ts-ignore
        set(({ discussions }) => ({ messages: { list: [], page: 1, total: 0 }, discussion, discussions: [...(discussions || []), discussion] }));
    },
    async fetchSendMessage({ discussion, files, text }) {
        if (discussion.id.startsWith(NEW_DISCUSSION_STR)) {
            const d = await useDiscussionStore.getState().fetchCreateDiscussion(discussion.other.id);
            console.log('D', d);
            if (!d) return
            discussion = d;
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
        formData.append('discussion_id', discussion.id);
        text && formData.append('text', text)
        if (files) {
            for (let i = 0; i < files.length; ++i) {
                const file = files[i];
                formData.append('files_' + i, file);
            }
        }
        console.log({ formData });

        const response = await fetch(`${Host}/send_message`, {
            headers: h.headers,
            body: formData,
            method: 'POST'
        });
        try {
            const json = await response.json();
            if (!json?.id) {
                return;
            }
            useDiscussionStore.getState().fetchDiscussions();
            useDiscussionStore.getState().fetchMessages(discussion.id);
        } catch (error) {
            console.log(error);

        }
    },
    async fetchMessages(discussion_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/get_messages/?discussion_id=${discussion_id}`, {
            headers: h.headers,
        });
        try {
            const json = await response.json();
            console.log('Messages', json);

            if (!json?.list) {
                return;
            }
            set(() => ({ messages: json }))
        } catch (error) {

        }
    },
    async fetchDiscussions(blocked = 'all') {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/get_discussions?store_id=${h.store.id}&blocked=${blocked || ''}`, {
            headers: h.headers,
        });
        const json = await response.json() as Discussion[];
        console.log('discussion', json);

        if (!Array.isArray(json)) {
            return;
        }
        json.forEach(async (d) => {
            if (channels.includes(d.channel)) return
            channels.push(d.channel);

            const subscription = transmit.subscription(d.id);
            await subscription.create();
            subscription.onMessage<{ discussion_id: string , last_message:Message}>(async(data) => {
                console.log('data_discussion', data);
                if (data.discussion_id) {
                    const ds = useDiscussionStore.getState().discussions;
                    const currentD = useDiscussionStore.getState().discussion;
                    const response = await fetch(`${Host}/get_discussions?discussion_id=${data.discussion_id}&store_id=${h.store.id}&blocked=${blocked || ''}`, {
                        headers: h.headers,
                    });
                    const djson = await response.json() as Discussion[];
                    if(!djson?.[0]) return 
                    console.log('djson __ ', djson);
            
                    const newDs = [...ds?.map((d) => {
                        if (d.id == data.discussion_id) {
                            return djson?.[0]
                        }
                        return d
                    }) || []];
                    set(() => ({ discussions: newDs }));
                    if(currentD?.id == data.discussion_id){
                        // useDiscussionStore.getState().fetchMessages(data.discussion_id)
                    }
                }
                if (data.last_message) {
                    console.log('%%%%%%%', data.last_message);
                    
                }
            })
        })
        set(() => ({
            discussions: json
        }));
    },
}))