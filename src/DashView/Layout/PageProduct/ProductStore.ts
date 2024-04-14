import { create } from "zustand";
import { ProductInterface } from "../../../DataBase";
import { Host} from '../../../Config'

interface ProductState{
    products:ProductInterface[]|undefined;
    fetchProducts(filter:any):Promise<void>;
    selectedProduct:ProductInterface|undefined;
    setSelectedProduct(selected:ProductInterface):Promise<void>;
}

export const useProductStore = create<ProductState>((set)=>({
    products:undefined,
    selectedProduct:undefined,
    async fetchProducts(filter) {
        // page, limit, category_id, catalog_id, price_min, price_max, text, order_by, stock_min, stock_max,is_features_required 
        filter = {...filter, is_features_required:true}
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = filter[key];
            searchParams.set(key, value);
        }
        console.log('filter', searchParams.toString() , filter);
        const response  = await fetch(`${Host}/get_products/?${searchParams.toString()}`);
        const json =await  response.json();
        if(!Array.isArray(json)) return;
        set(()=>({products:json}))
    }, 
    async setSelectedProduct(selected) {
        console.log('selected', selected);
        
        set(()=>({selectedProduct:selected}))
    },  
}));
