import { create } from 'zustand'
import { CommandInterface, ListType } from "../../../DataBase";
import { useRegisterStore } from "../../Layout/PageRegister/RegisterStore";
import { Host } from '../../../Config';

interface CommandStore {
    carts: ListType<CommandInterface> | undefined,
    commands: ListType<CommandInterface> | undefined,
    fetchCarts(filter: Record<string, any>): Promise<ListType<CommandInterface> | undefined>,
    fetchCommands(filter: Record<string, any>): Promise<ListType<CommandInterface> | undefined>,
    addProductToCart(data:{
        quantity?: number, 
        collected_features?: Record<string, any>,
        command_id?: string,
        product_id?:string,
        add_favorite?:boolean
    }): Promise<CommandInterface | undefined>
    confirmCommand(data?:{
        list:string[]
    }): Promise<boolean>
    deleteCommand(command_id: string): Promise<boolean>
}
export const useCommandStore = create<CommandStore>((set) => ({
    commands: undefined,
    carts: undefined,
    async deleteCommand(command_id) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return false
        const response = await fetch(`${Host}/delete_command/${command_id}`, {
            headers: h.headers,
            method:'DELETE'
        });
        const res = (await response.json())
        if(res.deleted){
            const c = useCommandStore.getState().carts;
            set(() => ({
                carts: {
                    limit: c?.limit || 25,
                    page: c?.page || 1,
                    total: c?.total || 0,
                    list: (c?.list || []).filter(f => f.id != command_id)
                }
            }));
            return true
        }
        return false
    }, 
    async addProductToCart(data) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return
        if(!(data.product_id || data.command_id)) return
        const fromData = new FormData();
        const query: any = {};
        fromData.append('store_id', h.store.id);
        data.product_id && fromData.append('product_id', data.product_id+'');
        data.command_id && fromData.append('command_id', data.command_id+'');
        data.quantity && fromData.append('quantity', (data.quantity)+'');
        data.collected_features&&fromData.append('collected_features', JSON.stringify(data.collected_features));
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/add_command`, {
            method: 'POST',
            headers: h.headers,
            body:fromData
        });
        const cart = (await response.json()) as CommandInterface
        if (!cart.id) return;
        const c = useCommandStore.getState().carts;
        set(() => ({
            carts: {
                limit: c?.limit || 25,
                page: c?.page || 1,
                total: c?.total || 0,
                list: [...(c?.list || []).map(f => f.id == cart.id ? cart : f)]
            }
        }));
        return cart
    },
    async confirmCommand(data) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return false
        const formData = new FormData()

        data?.list &&formData.append('list',JSON.stringify(data.list))
        const response = await fetch(`${Host}/client_confirm_command`, {
            headers: h.headers,
            method:'PUT',
            body:formData
        });
        const res = (await response.json())
        if(!res.success) return false
        useCommandStore.getState().fetchCarts({});
        useCommandStore.getState().fetchCommands({});
        return true
    },
    async fetchCarts() {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return
        const query: any = {};
        query.store_id = h.store.id;
        query.status = 'CART';
        query.add_favorite = true;

        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_commands/?${searchParams.toString()}`, {
            headers: h.headers
        });
        const carts = (await response.json()) as ListType<CommandInterface>
        set(() => ({ carts }));

        return carts
    },
    async fetchCommands() {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return
        const query: any = {};
        query.store_id = h.store.id;
        query.no_status = 'CART';
        query.add_favorite = true;
        
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_commands/?${searchParams.toString()}`, {
            headers: h.headers
        });
        const commands = (await response.json()) as ListType<CommandInterface>
        set(() => ({ commands }));
        console.log(commands);
        
        return commands
    },
}));



