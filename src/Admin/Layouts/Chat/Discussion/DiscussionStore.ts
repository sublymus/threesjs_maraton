import { create } from "zustand";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
import { useMessageStore } from "../ChatMessage/MessageStore";
import { Host } from "../../../../Config";
import { ListType, UserInterface } from "../../../../DataBase";
import { transmit } from "../../../../Tools/Transmit";
import type { Discussion, Message } from "../../../../DataBase";
import { getSeconContext } from "../../../../Tools/StringFormater";

const NEW_DISCUSSION_STR = 'new_discussion'
interface DiscussionState {
    discussion: Discussion | undefined,

    discussions: ListType<Discussion> | undefined,

    messages: ListType<Message> | undefined

    setDiscussion(discussion: Discussion | undefined): void

    fetchDiscussions(filter: {
        blocked?: 'no' | 'only' | 'all',
        store_id?:string,
        no_save?: boolean,
        discussion_id?: string,
        other_id?: string
    }): Promise<ListType<Discussion> | undefined>

    createDiscussion(data: {
        other_id: string,
        store_id?: string
    }): Promise<Discussion | undefined>

    unBlockDiscussion(discussion: Discussion): Promise<Discussion | undefined>

    blockDiscussion(discussion: Discussion): Promise<Discussion | undefined>

    // asReadDiscussion(discussion: Discussion): Promise<Discussion | undefined>

    deleteDiscussion(discussion: Discussion): Promise<boolean | undefined>

    openDiscussionMessages(discussion_id: string): Promise<void>

    addDiscussion(data: {
        other: UserInterface,
        store_id?:string,
    }): Promise<Discussion | undefined>

    setDiscussionByOtherId(data: {
        other_id: string,
        store_id?: string
        findOther(other_id: string, store_id?: string): Promise<UserInterface | undefined>
    }): void
}
type setType = ((cb: (data: DiscussionState) => Partial<DiscussionState>) => any)
let disSet: setType | undefined;
const channels: string[] = []
export const useDiscussionStore = create<DiscussionState>((set) => ({
    discussion: undefined,
    discussions: undefined,
    messages: undefined,
    setDiscussion(discussion) {
        set(() => ({ discussion }));
    },
    async setDiscussionByOtherId({ other_id, store_id, findOther }) {
        
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        if(other_id == h.user.id) return
        const list = useDiscussionStore.getState().discussions?.list;
        const currentDiscussion = list?.find((l) => (l.other.id == other_id) && (store_id ? !!getSeconContext(undefined, l) : !getSeconContext(undefined, l)));
 
        if (currentDiscussion) {
            const ms = await useMessageStore.getState().fetchMessages(currentDiscussion.id, 'discussions');
            set(() => ({ discussion: currentDiscussion, messages: ms }));
            return
        }

        const existDiscussion = (await useDiscussionStore.getState().fetchDiscussions({
            no_save: true,
            other_id,
            store_id
        }))?.list[0]
        
        if (existDiscussion) {
            const ms = await useMessageStore.getState().fetchMessages(existDiscussion.id, 'discussions');
            set(() => ({ discussion: existDiscussion, messages: ms }));
            return
        }
        
        const other = await findOther(other_id, store_id);
        
        other && useDiscussionStore.getState().addDiscussion({ other, store_id })
    },
    async openDiscussionMessages(discussion_id) {
        const messages = await useMessageStore.getState().fetchMessages(discussion_id, 'discussions');
        set(() => ({ messages }))
    },
    async unBlockDiscussion(discussion) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/unblock_discussion/${discussion.id}`, {
            method: 'PUT',
            headers: h.headers
        });
        try {
            const json = await response.json() as Discussion | undefined;
            console.log('unblock_discussion ', json);
            if (!json?.id) {
                return;
            }
            set(({ discussions }) => ({
                discussions: discussions && { ...discussions, list: (discussions?.list || []).map((d) => d.id == json.id ? {...d,...json} : d) }
            }))
            return json;
        } catch (error) {
            console.log(error);
        }
    },
    // async asReadDiscussion(_discussion) {

    // },
    async blockDiscussion(discussion) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/block_discussion/${discussion.id}`, {
            method: 'PUT',
            headers: h.headers
        });
        try {
            const json = await response.json() as Discussion | undefined;
            console.log('unblock_discussion ', json);
            if (!json?.id) {
                return;
            }
            set(({ discussions }) => ({
                discussions: discussions && { ...discussions, list: (discussions?.list || []).map((d) => d.id == json.id ? {...d,...json} : d) }
            }))
            return json;
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
            const json = await response.json() as Discussion | undefined;
            console.log('deleteDiscussion ', json);
            if (!json?.deleted) {
                return;
            }
            set(({ discussions, messages, discussion: dsc }) => ({
                discussions: discussions && { ...discussions, list: (discussions?.list || []).filter((d) => d.id !== discussion.id) },
                messages: dsc?.id == discussion.id ? undefined : messages
            }))
            return true
        } catch (error) {
            console.log(error);
        }
    },
    async createDiscussion({other_id,store_id}) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();

        formData.append('receiver_id', other_id);
        store_id &&formData.append('to_id',store_id)
        const response = await fetch(`${Host}/create_discussion`, {
            headers: h.headers,
            body: formData,
            method: 'POST'
        });
        try {
            const json = await response.json() as Discussion | undefined;
            console.log('createDiscussion', json);
            if (!json?.id) {
                return;
            }

            // set(({ discussions }) => ({
            //     discussions: discussions && { ...discussions, list: [json, ...discussions.list] },
            //     discussion: json
            // }))
            return json
        } catch (error) {
            console.log(error);
        }
    },
    async addDiscussion({other,store_id}) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        if(other.id == h.user.id) return
        const list = useDiscussionStore.getState().discussions?.list;
        //TODO
        const exist = list?.find((l) => (l.other.id == other.id) && (store_id ? !getSeconContext(undefined, l) : !!getSeconContext(undefined, l))) as Discussion;
        console.log('addDiscussion', { exist });

        if (exist) {
            //@ts-ignore
            const messages = await useMessageStore.getState().fetchMessages(exist.id, 'discussions');
            set(() => ({ discussion: exist, messages }))
            return exist
        }

        const sameNewExist =  useDiscussionStore.getState().discussions?.list.filter(_d => _d.id.startsWith(NEW_DISCUSSION_STR)?((_d.receiver_id == other.id||_d.creator_id==other.id) && (getSeconContext(undefined,_d)===(store_id||null))):false)
        if(sameNewExist?.[0]){
            set(({discussions})=>({discussions:discussions&&{...discussions}}));
            return     
        } 
        const discussion = {
            "id": NEW_DISCUSSION_STR + Date.now(),
            "creator_id": h.user.id,
            "receiver_id": other.id,
            "deleted": '',
            "blocked": '',
            "unchecked_count": 0,// calculer
            "creator_opened_at": "2024-05-09 12:30:15",
            "receiver_opened_at": '',
            "created_at": '',
            "updated_at": "2024-05-09 13:46:04",
            "other": other,
            from_id: undefined,
            to_id: store_id,
            last_message: undefined,
            other_att: 'creator'
        } as Discussion
        set(({ discussions }) => ({
            messages: {
                list: [],
                limit: 25,
                page: 1,
                total: 0
            },
            discussion,
            discussions: discussions && {
                ...discussions, list: [discussion,...discussions.list]
            }
        }));
        console.log('NEW DISCUSSION', discussion);
        
        return discussion
    },
    async fetchDiscussions({discussion_id,no_save,other_id,store_id }) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        
        const searchParams = new URLSearchParams({});
        searchParams.set('to_id',store_id||'');
        if(store_id){
            searchParams.set('add_store','true');
        }
        // searchParams.set('to_id','');
        //TODO
        discussion_id &&searchParams.set('discussion_id',discussion_id);
        other_id && searchParams.set('other_id',other_id);
        
        const response = await fetch(`${Host}/get_discussions?${searchParams}`, {
            headers: h.headers,
        });

        const json = (await response.json()) as ListType<Discussion>;
        console.log('fetch Dic', json);

        if (!json) {
            return;
        }

        disSet = set;
        json.list.forEach(async (d) => {
            ListenDiscussion(d)
        })
        
        if (!channels.includes(h.user.id)) {
            channels.push(h.user.id);
            const subscription = transmit.subscription(h.user.id);
            await subscription.create();
            subscription.onMessage<{ new_discussion?: Discussion & { receiver: UserInterface, creator: UserInterface }, reload_discussion?: boolean }>(async (data) => {
                if (data.new_discussion) {
                    // if(data.new_discussion.creator_id==h.user.id) return
                    ListenDiscussion(data.new_discussion)
                    const a = data.new_discussion
                    const other_att = a.receiver.id != h.user.id ? 'receiver' as const : 'creator' as const;
                    a.other_att = other_att;
                    a.other = a[other_att];
                    //TODO
                    const ds = useDiscussionStore.getState().discussions?.list.filter(_d => _d.id.startsWith(NEW_DISCUSSION_STR)?!((_d.receiver_id == a.receiver_id||_d.creator_id==a.receiver_id) && (_d.from_id||null)==(a.from_id||null) && (_d.to_id||null)==(a.to_id||null)):true)
                    console.log('########',ds);
                    
                    set(({ discussions }) => ({ discussions: discussions && { ...discussions, list: [a, ...(ds || [])] } }))
                }
                if (data.reload_discussion) {
                    useDiscussionStore.getState().fetchDiscussions({});
                }
            })
        }
        if (!no_save) {
            set(({discussions}) => ({
                discussions:  {...json,list:[...(discussions?.list||[]).filter(d=>d.id.startsWith('new_')),...json.list]}
            }));
        }
        return json
    },
}))

export async function ListenDiscussion(d: Discussion) {
    const h = useRegisterStore.getState().getHeaders();
    if (!h) return
    if (channels.includes(d.id)) return
    channels.push(d.id);
    const subscription = transmit.subscription(d.id);
    await subscription.create();
    subscription.onMessage<{ reload: string, reloadMessage: boolean }>(async (data) => {
        if (!disSet) return;
        console.log('data_discussion', data);
        const currentD = useDiscussionStore.getState().discussion;
        if (data.reload) {
            const ds = useDiscussionStore.getState().discussions?.list;
            const djson = (await useDiscussionStore.getState().fetchDiscussions({ discussion_id: d.id, no_save: true }))?.list;
            console.log('reload Discussion ___________ ', djson?.length);
            if (!djson?.[0].id) return


            const newDs = [...ds?.map((_d) => {
                if (_d.id == d.id) {
                    return djson?.[0]
                }
                return _d
            }) || []];
            disSet(({ discussions }) => ({ discussions: discussions && { ...discussions, list: newDs } }));
            if (currentD?.id == djson?.[0].id) {
                disSet(() => ({ discussion: { ...djson?.[0] } }))
            }
        }
        if (data.reloadMessage) {
            if (currentD?.id == d.id) {
                console.log('reload Message___________', currentD);
                const messages = await useMessageStore.getState().fetchMessages(d.id, 'discussions');
                disSet(() => ({ messages, discussion: { ...d } }))
            }
        }
    })
}