import { create } from 'zustand'
import { CommandInterface, ListType } from "../../../DataBase";
import { useRegisterStore } from "../../Layout/PageRegister/RegisterStore";
import { Host } from '../../../Config';

interface CommandStore {
    carts: ListType<CommandInterface> | undefined,
    commands: ListType<CommandInterface> | undefined,
    fetchCarts(filter: Record<string, any>): Promise<ListType<CommandInterface> | undefined>,
    fetchCommands(filter: Record<string, any>): Promise<ListType<CommandInterface> | undefined>,
    updateCommand(command_id: string, quantity?: number, collected?: Record<string, any>): Promise<CommandInterface | undefined>
    confirmCommand(): Promise<boolean>
    deleteCommand(command_id: string): Promise<boolean>
    addProductToCart(product_id: string, quantity: number, collected: Record<string, any>): Promise<void>
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
    async updateCommand(command_id, quantity, collected) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return
        const fromData = new FormData();
        const query: any = {};
        fromData.append('command_id', command_id);
        quantity && fromData.append('quantity', `${quantity}`);
        collected && fromData.append('collectedFeatures', JSON.stringify(collected));
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/update_command/?${searchParams.toString()}`, {
            method: 'PUT',
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
    async addProductToCart(product_id, quantity = 1, collected) {

    },
    async confirmCommand() {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return false
        const response = await fetch(`${Host}/client_confirm_command`, {
            headers: h.headers,
            method:'PUT'
        });
        const res = (await response.json())
        if(!res.success) return false
        useCommandStore.getState().fetchCarts({});
        useCommandStore.getState().fetchCommands({});
        return true
    },
    async fetchCarts(filter) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return
        const query: any = {};
        query.store_id = h.store.id;
        query.status = 'CART';
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
    async fetchCommands(filter) {
        const h = useRegisterStore.getState().getHeaders()
        if (!h) return
        const query: any = {};
        query.store_id = h.store.id;
        query.no_status = 'CART';
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
        return commands
    },
}));



