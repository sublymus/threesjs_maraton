import { create } from "zustand";
import { useRegisterStore } from "../../Layout/PageRegister/RegisterStore";
import { Host } from "../../../Config";
import { ListType, UserInterface } from "../../../DataBase";
import { transmit } from "../../../Tools/Transmit";
import type { Message, Session } from "../../../DataBase";
import { useMessageStore } from "./MessageStore";

const NEW_SESSION_STR = 'new_session'
interface SessionState {
    session: Session | undefined,
    sessions: Session[] | undefined,
    messages: ListType<Message> | undefined
    isNavOpen:boolean,
    openNav(open:boolean):void,
    setSession(session: Session | undefined): void
    fetchSessions(open?: 'no' | 'only' | 'all'): Promise<void>
    fetchCreateSession(user_id: string, title:string): Promise<Session | undefined>
    addSession(collabo: UserInterface): void
    closeSession(session: Session): void
    openSession(session: Session): void
    asReadSession(session: Session): void
    deleteSession(session: Session): void
    openSessionMessages(session_id: string): void
    setSessionById(session_id:string):void
}

type setType = ((cb: (data: SessionState) => Partial<SessionState>) => any)
let disSet: setType | undefined;

const channels: string[] = []
export const useSessionStore = create<SessionState>((set) => ({
    session: undefined,
    sessions: undefined,
    messages: undefined,
    isNavOpen:true,
    openNav(open) {
        set(()=>({isNavOpen:open}))
    },
    setSession(session) {
        set(() => ({ session }));
    },
    async setSessionById(client_id) {
        setTimeout(async () => {
            // const list = useSessionStore.getState().sessions;
            // const currentSession = list?.find((l) => l.other.id == client_id);

            // console.log('current Session', currentSession);

            // if (currentSession) {
            //     const ms = await useMessageStore.getState().fetchMessages(currentSession.id,'sessions');
            //     set(() => ({ session: currentSession, messages: ms }));
            // } else {
            //     const h = useRegisterStore.getState().getHeaders();
            //     if (!h) return
            //     const response = await fetch(`${Host}/get_sessions?collaborator_id=${client_id}&store_id=${h.store.id}`, {
            //         headers: h.headers,
            //     });
            //     const existSession  = (await response.json() as Session[])[0];
                
            //     if (existSession) {
            //         const ms = await useMessageStore.getState().fetchMessages(existSession.id,'sessions');
            //         set(() => ({ session: existSession, messages: ms }));
            //     } else {
            //         const collabo = useClientStore.getState().clients?.list.find((c)=>c.id ==client_id)|| (await useClientStore.getState().fetchClients({ query: { user_id: client_id } }))?.list[0]
            //         console.log('collabo', collabo);
            //         collabo && useSessionStore.getState().addSession(collabo)
            //     }
            // }
        }, 400);
    },
    async openSessionMessages(session_id) {
        const messages = await useMessageStore.getState().fetchMessages(session_id,'sessions');
        set(() => ({ messages }))
    },
    async openSession(session) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/open_session/${session.id}`, {
            method: 'PUT',
            headers: h.headers
        });
        try {
            const json = await response.json();
            console.log('open_session ', json);
            if (!json?.id) {
                return;
            }

            // useSessionStore.getState().fetchSessions();
        } catch (error) {
            console.log(error);
        }
    },
    async closeSession(session) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/close_session/${session.id}`, {
            method: 'PUT',
            headers: h.headers
        });
        try {
            const json = await response.json();
            console.log('close_session ', json);
            if (!json?.id) {
                return;
            }

            // useSessionStore.getState().fetchSessions();
        } catch (error) {
            console.log(error);
        }
    },
    async asReadSession(_session) {

    },
    async deleteSession(session) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/delete_session/${session.id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        try {
            const json = await response.json();
            console.log('deleteSession', json);

            if (!json.deleted) return
            set(() => ({ session: undefined }))
            useSessionStore.getState().fetchSessions();
        } catch (error) {
            console.log(error);
        }
    },
    async fetchCreateSession(user_id, title) {
        if(!title) return;
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();

        formData.append('receiver_id', user_id);
        formData.append('store_id', h.store.id);
        formData.append('title', title);
        const response = await fetch(`${Host}/create_session`, {
            headers: h.headers,
            body: formData,
            method: 'POST'
        });
        try {
            const json = await response.json();
            console.log('fetchCreateSession', json);
            if (!json?.id) {
                return;
            }

            useSessionStore.getState().fetchSessions();
            set(() => ({ session: json }))
            return json
        } catch (error) {
            console.log(error);
        }
    },
    async addSession(client) {
        const exist: any = useSessionStore.getState().sessions?.find(s => s.other.id == client.id);

        if (exist) {
            //@ts-ignore
            set(() => ({ session: exist }));
            const messages = await useMessageStore.getState().fetchMessages(exist.id,'sessions')
            return set(() => ({ messages }))
        }
        const user = useRegisterStore.getState().user;
        if (!user) return
        const session = {
            "id": NEW_SESSION_STR + Date.now(),
            "creator_id": user.id,
            "title": '',
            "receiver_id": client.id,
            "deleted": '',
            // last_message:'',
            other_att: 'creator',
            closed:'',
            "blocked": '',
            unchecked_count: 0,// calculer
            "creator_opened_at": "2024-05-09 12:30:15",
            "receiver_opened_at": '',
            "created_at": '',
            "updated_at": "2024-05-09 13:46:04",
            other: client,
        } as Session
        set(({ sessions }) => ({ messages: { list: [], limit: 25, page: 1, total: 0 }, session, sessions: [...(sessions || []), session] }));
    },
    async fetchSessions(open = 'all') {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        console.log(h.store.id);
        
        const response = await fetch(`${Host}/get_sessions?store_id=${h.store.id}&open=${open}`, {
            headers: h.headers,
        });
        const json = await response.json() as Session[];
        console.log('session', json);

        if (!Array.isArray(json)) {
            return;
        }

       
        disSet = set;
        json.forEach(async (d) => {
            ListenSession(d)
        })
        set(() => ({
            sessions: json
        }));
        if (!channels.includes(h.user.id)) {
            channels.push(h.user.id);
            const subscription = transmit.subscription(h.user.id);
            await subscription.create();
            subscription.onMessage<{ new_session?: Session & { receiver: UserInterface, creator: UserInterface }, reload_session?: boolean }>(async (data) => {
                if (data.new_session) {
                    ListenSession(data.new_session)
                    const a = data.new_session
                    const other_att = a.receiver.id != h.user.id ? 'receiver' as const : 'creator' as const;
                    a.other_att = other_att;
                    a.other = a[other_att];
                    const ds = useSessionStore.getState().sessions?.filter(_d => _d.id != a?.id)
                    set(() => ({ sessions: [...(ds || []), (a)] }))
                }
                if (data.reload_session) {
                    useSessionStore.getState().fetchSessions();
                }
            })
        }
    },
}))

export async function ListenSession(d: Session) {
    const h = useRegisterStore.getState().getHeaders();
    if (!h) return
    if (channels.includes(d.id)) return
    channels.push(d.id);
    const subscription = transmit.subscription(d.id);
    await subscription.create();
    subscription.onMessage<{ reload: boolean, reloadMessage: boolean }>(async (data) => {
        if (!disSet) return;
        console.log('data_session', data);
        const currentD = useSessionStore.getState().session;
        if (data.reload) {
            const ds = useSessionStore.getState().sessions;
            const response = await fetch(`${Host}/get_sessions?session_id=${d.id}&store_id=${h.store.id}&blocked=all`, {
                headers: h.headers,
            });
            const djson = await response.json() as Session[];
            console.log('reload Session ___________ ', djson.length);
            if (!djson?.[0]) return

            const newDs = [...ds?.map((_d) => {
                if (_d.id == d.id) {
                    return djson?.[0]
                }
                return _d
            }) || []];
            disSet(() => ({ sessions: newDs }));
            if (currentD?.id == djson?.[0].id) {
                disSet(() => ({ session: { ...djson?.[0] } }))
            }
        }
        if (data.reloadMessage) {
            if (currentD?.id == d.id) {
                console.log('reload Message___________', currentD);
                const messages = await useMessageStore.getState().fetchMessages(d.id,'sessions');
                disSet(() => ({ messages ,session: { ...d } }))
            }
        }
    })
}