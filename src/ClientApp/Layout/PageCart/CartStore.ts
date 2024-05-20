import { create } from 'zustand'
import { ListType, CartInterface } from '../../../DataBase'
interface CartStore {
    cart: CartInterface | undefined,
    carts: ListType<CartInterface> | undefined
    fetchCarts(filter: {
        limit?: number,
        page?: number,
        order_by?: string,
        product_id?: string,
        cart_id?: string
    }): Promise<ListType<CartInterface> | undefined>
}
export const useCartStore = create<CartStore>((set) => ({
    cart: undefined,
    carts: undefined,
    async fetchCarts(filter) {
        return {
            limit:1,
            page:1,
            total:0,
            list:[]
        }
        // set(()=>({photo}))
    },

}));






