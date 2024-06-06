import { create } from "zustand";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
import { useMessageStore } from "../ChatMessage/MessageStore";
import { Host } from "../../../../Config";
import { ListType, UserInterface } from "../../../../DataBase";
import { transmit } from "../../../../Tools/Transmit";
import type { Discussion, Message } from "../../../../DataBase";
import { useModeratorStore } from "../../Moderators/ModeratorStore";

const NEW_DISCUSSION_STR = 'new_discussion'
interface DiscussionState {
    discussion: Discussion | undefined,
    discussions: Discussion[] | undefined,
    messages: ListType<Message> | undefined
    setDiscussion(discussion: Discussion | undefined): void
    fetchDiscussions(blocked?: 'no' | 'only' | 'all', context_name?: 'm_m' | 'm_c'): Promise<void>
    fetchCreateDiscussion(user_id: string, isM_C?: boolean): Promise<Discussion | undefined>
    addDiscussion(collabo: UserInterface): void
    unBlockDiscussion(discussion: Discussion): void
    blockDiscussion(discussion: Discussion): void
    asReadDiscussion(discussion: Discussion): void
    deleteDiscussion(discussion: Discussion): void
    openDiscussionMessages(discussion_id: string): Promise<void>
    setDiscussionByModeratorId(collabo_id: string): void
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
    async setDiscussionByModeratorId(collabo_id) {
        setTimeout(async () => {
            const list = useDiscussionStore.getState().discussions;
            const currentDiscussion = list?.find((l) => l.other.id == collabo_id);

            console.log('current Discussion', currentDiscussion);

            if (currentDiscussion) {
                const ms = await useMessageStore.getState().fetchMessages(currentDiscussion.id, 'discussions');
                set(() => ({ discussion: currentDiscussion, messages: ms }));
            } else {
                const h = useRegisterStore.getState().getHeaders();
                if (!h) return
                const response = await fetch(`${Host}/get_discussions?collaborator_id=${collabo_id}`, {
                    headers: h.headers,
                });
                const existDiscussion = (await response.json() as Discussion[])[0];
                console.log('exist Discussion', existDiscussion);

                if (existDiscussion) {
                    const ms = await useMessageStore.getState().fetchMessages(existDiscussion.id, 'discussions');
                    set(() => ({ discussion: existDiscussion, messages: ms }));
                } else {
                    const collabo = useModeratorStore.getState().moderators?.list.find((c) => c.id == collabo_id) || (await useModeratorStore.getState().fetchModerators({ query: { user_id: collabo_id } }))?.list[0]
                    console.log('collabo', collabo);
                    collabo && useDiscussionStore.getState().addDiscussion(collabo)
                }
            }
        }, 200);
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
            const json = await response.json();
            console.log('unblock_discussion ', json);
            if (!json?.id) {
                return;
            }
            useDiscussionStore.getState().fetchDiscussions();
        } catch (error) {
            console.log(error);
        }
    },
    async asReadDiscussion(_discussion) {

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
            console.log('blockDiscussion ', json);
            if (!json?.id) {
                return;
            }

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
            console.log('deleteDiscussion', json);

            if (!json.deleted) return
            set(() => ({ discussion: undefined }))
            useDiscussionStore.getState().fetchDiscussions();
        } catch (error) {
            console.log(error);
        }
    },
    async fetchCreateDiscussion(user_id, isM_C) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();

        formData.append('receiver_id', user_id);
        if (isM_C) formData.append('context_name', 'm_c');
        else formData.append('context_name', 'm_m');
        const response = await fetch(`${Host}/create_discussion`, {
            headers: h.headers,
            body: formData,
            method: 'POST'
        });
        try {
            const json = await response.json();
            console.log('fetchCreateDiscussion', json);
            if (!json?.id) {
                return;
            }

            useDiscussionStore.getState().fetchDiscussions();
            set(() => ({ discussion: json }))
            return json
        } catch (error) {
            console.log(error);
        }
    },
    async addDiscussion(collabo) {
        const exist: any = useDiscussionStore.getState().discussions?.find(d => d.other.id == collabo.id);
        if (exist) {
            //@ts-ignore
            set(() => ({ discussion: exist }));
            const messages = await useMessageStore.getState().fetchMessages(exist.id, 'discussions');
            set(() => ({ messages }))
            return
        }
        const user = useRegisterStore.getState().user;
        if (!user) return
        const discussion = {
            "id": NEW_DISCUSSION_STR + Date.now(),
            "creator_id": user.id,
            "receiver_id": collabo.id,
            "deleted": '',
            "blocked": '',
            "unchecked_count": 0,// calculer
            "creator_opened_at": "2024-05-09 12:30:15",
            "receiver_opened_at": '',
            "created_at": '',
            "updated_at": "2024-05-09 13:46:04",
            "other": collabo,
            last_message: undefined,
            other_att: 'creator'
        } as Discussion
        console.log('addDiscussion', { collabo });
        set(({ discussions }) => ({ messages: { list: [], limit: 25, page: 1, total: 0 }, discussion, discussions: [...(discussions || []), discussion] }));
    },
    async fetchDiscussions(blocked = 'all', context_name = 'm_m') {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/get_discussions?blocked=${blocked || ''}&context_name=${'m_c,m_m'}`, {
            headers: h.headers,
        });
        const json = await response.json() as Discussion[];
        console.log('discussion', json);

        if (!Array.isArray(json)) {
            return;
        }

        disSet = set;
        json.forEach(async (d) => {
            ListenDiscussion(d)
        })
        set(() => ({
            discussions: json
        }));
        if (!channels.includes(h.user.id)) {
            channels.push(h.user.id);
            const subscription = transmit.subscription(h.user.id);
            await subscription.create();
            subscription.onMessage<{ new_discussion?: Discussion & { receiver: UserInterface, creator: UserInterface }, reload_discussion?: boolean }>(async (data) => {
                if (data.new_discussion) {
                    ListenDiscussion(data.new_discussion)
                    const a = data.new_discussion
                    const other_att = a.receiver.id != h.user.id ? 'receiver' as const : 'creator' as const;
                    a.other_att = other_att;
                    a.other = a[other_att];
                    const ds = useDiscussionStore.getState().discussions?.filter(_d => _d.id != a?.id)
                    set(() => ({ discussions: [...(ds || []), (a)] }))
                }
                if (data.reload_discussion) {
                    useDiscussionStore.getState().fetchDiscussions();
                }
            })
        }
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
            const ds = useDiscussionStore.getState().discussions;
            const response = await fetch(`${Host}/get_discussions?context_name=${'m_c,m_m'}&discussion_id=${d.id}&blocked=all`, {
                headers: h.headers,
            });
            const djson = await response.json() as Discussion[];
            console.log('reload Discussion ___________ ', djson.length);
            if (!djson?.[0].id) return


            const newDs = [...ds?.map((_d, i) => {
                console.log(i, _d.id);
                if (_d.id == d.id) {

                    return djson?.[0]
                }
                return _d
            }) || []];
            console.log({ newDs, ds, d, djson });

            disSet(() => ({ discussions: newDs }));
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