import { create } from "zustand";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
import { Host } from "../../../../Config";
import { ListType, UserInterface } from "../../../../DataBase";

const ds = [
    {
        "id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
        "creator_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
        "receiver_id": "00867d5b-7916-4426-ac6c-f5ba8eda629c",
        "deleted": null,
        "blocked": null,
        "unchedked_count": 2,// calculer
        "last_message": {
            "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
            "table_name": "discussions",
            "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
            "text": "opas",
            "files": [],
            "rating_id": null,
            "survey_id": null,
            "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
            "created_at": "2024-05-09 14:04:52",
            "updated_at": "2024-05-09 14:04:52"
        },
        "creator_opened_at": "2024-05-09 12:30:15",
        "receiver_opened_at": null,
        "created_at": null,
        "updated_at": "2024-05-09 13:46:04",
        "receiver": {
            "id": "00867d5b-7916-4426-ac6c-f5ba8eda629c",
            "name": "Opus Opus",
            "email": "sublymus@gmail.com",
            "photos": [
                "https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"
            ],
            "type": null,
            "status": null,
            "created_at": "2024-05-09 12:08:34",
            "updated_at": "2024-05-09 12:08:34"
        },
        "creator": {
            "id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
            "name": "opas opas",
            "email": "sablymus@gmail.com",
            "photos": [
                "https://lh3.googleusercontent.com/a/ACg8ocIEZZjZmlzj7KRhH7VOqo501Eh4eAnFvFMRSnsmQI0TSzH4q50=s96-c"
            ],
            "type": null,
            "status": null,
            "created_at": "2024-05-09 12:10:01",
            "updated_at": "2024-05-09 12:10:01"
        },
        other: 'receiver' as 'receiver' | 'creator',
        me: 'creator' as 'receiver' | 'creator',
    }
];
const messages = [{
    "id": "39ee11ff-2775-437f-9d96-49d92a01d631",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "Lorem ipsum dolor sit",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "97f0b4b3-acdf-474b-b054-02307df159d1",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d632",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "amet consectetur, ",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d634",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "adipisicing elit. Consequatur placeat adipisci ratione nihil a voluptas cum vitae provident delectus, possimus officiis accusamus",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "97f0b4b3-acdf-474b-b054-02307df159d1",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d635",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": " pariatur ex voluptatum doloremque error impedit, nisi at?",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "97f0b4b3-acdf-474b-b054-02307df159d1",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
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
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d632",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "adipisicing elit. Consequatur placeat adipisci ratione nihil a voluptas cum vitae provident delectus, possimus officiis accusamus",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "adipisicing elit. Consequatur placeat",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d634",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "97f0b4b3-acdf-474b-b054-02307df159d1",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d635",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "97f0b4b3-acdf-474b-b054-02307df159d1",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
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
}, {
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
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d632",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
    "table_name": "discussions",
    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
    "text": "opas",
    "files": [],
    "rating_id": null,
    "survey_id": null,
    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
    "created_at": "2024-05-09 14:04:52",
    "updated_at": "2024-05-09 14:04:52"
}, {
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
}, {
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
}]
type Discussion = typeof ds[0];
type Message = typeof messages[0];
interface DiscussionState {
    discussion: Discussion | undefined,
    discussions: Discussion[] | undefined,
    messages: ListType<Message> | undefined
    setDiscussion(discussion: Discussion | undefined): void
    fetchDiscussion(blocked?: 'no' | 'only'): Promise<void>
    fetchSendMessage(data: {
        discussion_id: string,
        files?:  FileList,
        text?: string
    }): Promise<void>
    fetchMessages(discussion_id: string): Promise<void>
    addDiscussion(collabo:UserInterface):void
}

export const useDiscussionStore = create<DiscussionState>((set) => ({
    discussion: undefined,
    discussions: undefined,
    messages: undefined,
    setDiscussion(discussion) {
        set(() => ({ discussion }));
    },
    addDiscussion(collabo) {
        const user = useRegisterStore.getState().user;
        if(!user) return
        const discussion = {
            "id": 'new_discussion'+Date.now(),
            "creator_id": user.id,
            "receiver_id": collabo.id,
            "deleted": null,
            "blocked": null,
            "unchedked_count": 0,// calculer
            "last_message": {
                "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
                "table_name": "discussions",
                "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
                "text": "New Discussion",
                "files": [],
                "rating_id": null,
                "survey_id": null,
                "user_id": user.id,
                "created_at": "2024-05-09 14:04:52",
                "updated_at": "2024-05-09 14:04:52"
            },
            "creator_opened_at": "2024-05-09 12:30:15",
            "receiver_opened_at": null,
            "created_at": null,
            "updated_at": "2024-05-09 13:46:04",
            "receiver": collabo,
            "creator": user,
            other: 'receiver' as 'receiver' | 'creator',
            me: 'creator' as 'receiver' | 'creator',
        }
        //@ts-ignore
        set(({discussions}) => ({ discussion ,discussions: [...(discussions||[]),discussion] }));
    },
    async fetchSendMessage({ discussion_id, files, text }) {
        let user = useRegisterStore.getState().user;
        if (!user) return
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user?.token}`);
        const formData = new FormData();
        if(!text && (!files)) return;
        if(files){
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append('files_'+i,file);   
            }
        }
        formData.append('discussion_id',discussion_id);
        text && formData.append('text',text)
        const response = await fetch(`${Host}/send_message`, {
            headers: myHeaders,
            body:formData,
            method:'POST'
        });
        try {
            const json = await response.json();
            if (!json?.list) {
                return;
            }
            set(() => ({ messages: json }))
        } catch (error) {

        }
    },
    async fetchMessages(discussion_id) {
        let user = useRegisterStore.getState().user;
        if (!user) return
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user?.token}`);
        console.log(discussion_id);
        
        const response = await fetch(`${Host}/get_messages/?discussion_id=${discussion_id}`, {
            headers: myHeaders,
        });
        try {
            const json = await response.json();
            if (!json?.list) {
                return;
            }
            set(() => ({ messages: json }))
        } catch (error) {

        }
    },
    async fetchDiscussion(blocked) {
        let user = useRegisterStore.getState().user;
        if (!user) return
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user?.token}`);
        const response = await fetch(`${Host}/get_discussions?blocked=${blocked || ''}`, {
            headers: myHeaders,
        });
        const json = await response.json() as Discussion[];

        if (!Array.isArray(json)) {
            return;
        }
        set(() => ({
            discussions: json.map(m => ({
                ...m,
                last_message: {
                    "id": "39ee11ff-2775-437f-9d96-49d92a01d636",
                    "table_name": "discussions",
                    "table_id": "fc8f3ca1-2f85-4e08-b80a-c0f8518f6a23",
                    "text": "opas",
                    "files": [],
                    "rating_id": null,
                    "survey_id": null,
                    "user_id": "f3c33d6d-8d76-49a2-bbd8-cfc2a7c85fc4",
                    "created_at": "2024-05-09 14:04:52",
                    "updated_at": "2024-05-09 14:04:52"
                }
            }))
        }));
    },
}))