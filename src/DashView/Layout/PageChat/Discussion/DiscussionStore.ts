import { create } from "zustand";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
import { Host } from "../../../../Config";
import { ListType, UserInterface } from "../../../../DataBase";

const ds = [
    {
        "id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
        "creator_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
        "receiver_id": "00867d5b-7916-4426-ac6c-f5ba8eda629c",
        "deleted": '',
        "blocked": '',
        "other_att": 'creator' as 'creator' | 'receiver',// calculer
        "unchedked_count": 2,// calculer
        "last_message": {
            "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
            "table_name": "discussions",
            "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
            "text": "opas",
            "files": [],
            "rating_id": '',
            "survey_id": '',
            "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
            "created_at": "2024-05-09 14:04:52",
            "updated_at": "2024-05-09 14:04:52"
        },
        "creator_opened_at": "2024-05-09 12:30:15",
        "receiver_opened_at": '',
        "created_at": '',
        "updated_at": "2024-05-09 13:46:04",
        "other": {
            "id": "00867d5b-7916-4426-ac6c-f5ba8eda629c",
            "name": "Opus Opus",
            "email": "sublymus@gmail.com",
            "photos": [
                "https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"
            ],
            "type": '',
            "status": '',
            "created_at": "2024-05-09 12:08:34",
            "updated_at": "2024-05-09 12:08:34"
        },
    }
];
const message = {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "97f0b4b3-acdf-474b-b054-02307df159d1",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}
type Discussion = typeof ds[0];
type Message = typeof message;
const NEW_DISCUSSION_STR = 'new_discussion'
interface DiscussionState {
    discussion: Discussion | undefined,
    discussions: Discussion[] | undefined,
    messages: ListType<Message> | undefined
    setDiscussion(discussion: Discussion | undefined): void
    fetchDiscussions(blocked?: 'no' | 'only' | 'all'): Promise<void>
    fetchCreateDiscussion(user_id: string): Promise<Discussion | undefined>
    fetchSendMessage(data: {
        discussion: Discussion,
        files?: FileList,
        text?: string
    }): Promise<void>
    fetchMessages(discussion_id: string): Promise<void>
    addDiscussion(collabo: UserInterface): void
    unBlockDiscussion(discussion: Discussion): void
    blockDiscussion(discussion: Discussion): void
    asReadDiscussion(discussion: Discussion): void
    deleteDiscussion(discussion: Discussion): void
}

export const useDiscussionStore = create<DiscussionState>((set) => ({
    discussion: undefined,
    discussions: undefined,
    messages: undefined,
    setDiscussion(discussion) {
        set(() => ({ discussion }));
    },
    async unBlockDiscussion(discussion) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/unblock_discussion/${discussion.id}`,{
            method:'PUT',
            headers:h.headers
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
        const response = await fetch(`${Host}/block_discussion/${discussion.id}`,{
            method:'PUT',
            headers:h.headers
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
        const response = await fetch(`${Host}/delete_discussion/${discussion.id}`,{
            method:'DELETE',
            headers:h.headers
        });
        try {
            const json = await response.json();
            if(!json.deleted) return
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
        if (exist) {
            //@ts-ignore
            return set(() => ({ discussion: exist }))
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
        set(() => ({
            discussions: json
        }));
    },
}))