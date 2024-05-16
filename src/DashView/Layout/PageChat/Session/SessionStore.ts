import { create } from "zustand";
import { useRegisterStore } from "../../PageAuth/RegisterStore";
import { Host } from "../../../../Config";
import { ListType, UserInterface } from "../../../../DataBase";
import { transmit } from "../../../../Tools/Transmit";
import type {  Message } from "../../../../DataBase";
import { useMessageStore } from "../MessageStore";

type Session = {
    id:string,
    other:UserInterface,

}
const NEW_SESSION_STR = 'new_session'
interface SessionState {
    session: Session | undefined,
    sessions: Session[] | undefined,
    messages: ListType<Message> | undefined
    setSession(session: Session | undefined): void
    fetchSessions(open?: 'no' | 'only' | 'all'): Promise<void>
    fetchCreateSession(user_id: string): Promise<Session | undefined>
    addSession(collabo: UserInterface): void
    closeSession(session: Session): void
    asReadSession(session: Session): void
    deleteSession(session: Session): void
    openSessionMessages(session_id:string):void
}

const channels: string[] = []
export const useSessionStore = create<SessionState>((set) => ({
    session: undefined,
    sessions: undefined,
    messages: undefined,
    setSession(session) {
        set(() => ({ session }));
    },
    async openSessionMessages(session_id) {
        const messages = await useMessageStore.getState().fetchMessages(session_id);
        set(()=>({messages}))
    },
    async closeSession(session) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/unblock_session/${session.id}`, {
            method: 'PUT',
            headers: h.headers
        });
        try {
            const json = await response.json();
            console.log('unblock_session ', json);
            if (!json?.id) {
                return;
            }

            useSessionStore.getState().fetchSessions();
        } catch (error) {
            console.log(error);
        }
    },
    async asReadSession(session) {

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
            console.log('deleteSession',json);
            
            if (!json.deleted) return
            set(() => ({ session: undefined }))
            useSessionStore.getState().fetchSessions();
        } catch (error) {
            console.log(error);
        }
    },
    async fetchCreateSession(user_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();

        formData.append('receiver_id', user_id);
        formData.append('store_id', h.store.id);
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
           const messages = await  useMessageStore.getState().fetchMessages(exist.id)
            return set(()=>({messages}))
        }
        const user = useRegisterStore.getState().user;
        if (!user) return
        const session = {
            "id": NEW_SESSION_STR + Date.now(),
            "creator_id": user.id,
            "receiver_id": client.id,
            "deleted": null,
            "blocked": null,
            "unchecked_count": 0,// calculer
            "creator_opened_at": "2024-05-09 12:30:15",
            "receiver_opened_at": null,
            "created_at": null,
            "updated_at": "2024-05-09 13:46:04",
            "other": client,
        }
        set(({ sessions }) => ({ messages: { list: [],limit:25, page: 1, total: 0 }, session, sessions: [...(sessions || []), session] }));
    },
    async fetchSessions(open = 'all') {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/get_sessions?store_id=${h.store.id}&open=${open}`, {
            headers: h.headers,
        });
        const json = await response.json() as Session[];
        console.log('session', json);

        if (!Array.isArray(json)) {
            return;
        }
        
        json.forEach(async (s) => {
            if (channels.includes(s.id)) return
            channels.push(s.id);
            const subscription = transmit.subscription(s.id);
            await subscription.create();
            subscription.onMessage<{ context_id: string , reloadMessage:boolean}>(async(data) => {
                console.log('data_session_id', data);
                if (data.context_id) {
                    const sessions = useSessionStore.getState().sessions;
                    const response = await fetch(`${Host}/get_sessions?session_id=${data.context_id}&store_id=${h.store.id}&blocked=all`, {
                        headers: h.headers,
                    });
                    const Sjson = await response.json() as Session[];
                    console.log('reload Session ___________ ', Sjson);
                    if(!Sjson?.[0]) return 
            
                    const newSession = [...sessions?.map((_s) => {
                        if (_s.id == data.context_id) {
                            return Sjson?.[0]
                        }
                        return _s
                    }) || []];
                    set(() => ({ sessions: newSession }));
                }
                if (data.reloadMessage) {
                    const currentSession = useSessionStore.getState().session;
                    if(currentSession?.id == s.id){
                        console.log('reload Message___________current Session : ' ,currentSession);
                        const messages = await  useMessageStore.getState().fetchMessages(s.id)
                        return set(()=>({messages}))
                    }
                }
            })
        })
        set(() => ({
            sessions: json
        }));
    },
}))