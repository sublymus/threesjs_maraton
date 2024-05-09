import { create } from "zustand";
import { ListType, ProductInterface } from "../../../DataBase";
import { Host } from '../../../Config'
import type { ImageViewerMapper } from "../../Component/ImageViewer/ImageViewer";
import { useDashStore } from "../../dashStore";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface ProductState {
    products: ListType<ProductInterface> | undefined;
    selectedProduct: ProductInterface | undefined;
    fetchProducts(filter?: Record<string, any>): Promise<void>;
    setSelectedProduct(selected: ProductInterface|undefined): Promise<void>;
    updateProduct(product: Record<string, any>): Promise<void>;
    createProduct(product: Record<string, any>): Promise<string[]|undefined>;
    removeProduct(product_id: string):Promise<string|undefined>
}

export const useProductStore = create<ProductState>((set) => ({
    products: undefined,
    selectedProduct: undefined,
    async removeProduct(product_id) {
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        const response = await fetch(`${Host}/delete_product/${product_id}`, {
            method: 'DELETE',
            headers: myHeaders
        });
        const json  = await  response.json();
        useDashStore.getState().fetchStoreVar();
        return json?.isDeleted;
    },
    async createProduct(product) {
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return

        product.index = product.index ||0;
        product.is_dynamic_price = product.is_dynamic_price||true; 
        const formData = new FormData();
        const error :string[]= [];
        ['images', 'model_images'].forEach(p => {
            const d = product[p] as ImageViewerMapper | undefined
            if (d && Object.keys(d).length>0) {
                const list: string[] = [];
                Object.keys(d).sort((a, b) => {
                    return (d[a]?.index || 0) - (d[b]?.index || 0)
                }).forEach((k, i) => {
                    list.push(k);
                    if (d[k].isLocal) {
                        formData.append(k, d[k].file as Blob);
                    }
                });
                formData.append(p, JSON.stringify(list));
            }else{
                return error.push(p+' is not defined');
            }
        });
        ['title', 'description', 'stock', 'category_id','index', 'price', 'is_dynamic_price'].forEach(p => {
            if (product[p]!=undefined) {
                formData.append(p, product[p]);
            }else{
                return error.push(p+' is not defined');
            }
        });
        if (error.length==0) {
            const response =await fetch(`${Host}/create_product`, {
                method: 'POST',
                body: formData,
                headers:myHeaders
            });
            const json = await response.json();
            if(!json || !json.id){ 
                error.push('Server Error, Try Later');
                return  error
            }
            set(()=>({selectedProduct:json}));
            useDashStore.getState().fetchStoreVar();
        }else{
            return error;
        }
    },
    async updateProduct(product) {
        if(!product.product_id) return console.log('Product_id required');
        
        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        
        const formData = new FormData();
        let send = false;
        ['images', 'model_images'].forEach(p => {
            const d = product[p] as ImageViewerMapper | undefined
            if (d && Object.keys(d)) {
                send = true;
                const list: string[] = [];
                Object.keys(d).sort((a, b) => {
                    return (d[a]?.index || 0) - (d[b]?.index || 0)
                }).forEach((k) => {
                    list.push(k);
                    if (d[k].isLocal) {
                        formData.append(k, d[k].file as Blob);
                    }
                });
                formData.append(p, JSON.stringify(list));
            }
        });
        formData.append('product_id', product.product_id);
        ['title', 'description', 'stock', 'category_id',  'status' ,'index', 'price', 'is_dynamic_price'].forEach(p => {
            if (product[p]) {
                formData.append(p, product[p]);
                send = true
            }
        });

        let newProduct:any = null
        if (send) {
            newProduct = await fetch(`${Host}/update_product`, {
                method: 'PUT',
                body: formData,
                headers: myHeaders
            });
        }
        if (product.scene_dir) {
            const f = new FormData();
            f.append('scene_dir', product.scene_dir);
            f.append('product_id', product.product_id);
            newProduct = await fetch(`${Host}/update_view_product`, {
                method: 'PUT',
                body: f,
                headers:myHeaders
            })
        }
        if(newProduct){
            newProduct = await newProduct.json();
            console.log('newProduct', newProduct);
            
            set(()=>({selectedProduct: newProduct}))
        }
    },
    async fetchProducts(filter) {
        // , category_id, catalog_id,  text, 
        const query: any = {};
        if (filter?.page) query.page = Number(filter.page); 
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.sortBy) query.order_by = filter.sortBy;
        if (filter?.query.text) query.text = filter.query.text;
        if (filter?.query.price) query.price_min = filter.query.price[0];
        if (filter?.query.price) query.price_max = filter.query.price[1];
        if (filter?.query.stock) query.stock_min = filter.query.stock[0];
        if (filter?.query.stock) query.stock_max = filter.query.stock[1];
       
        // query.is_features_required = true;
        query.all_status = true;  
        query.store_id = useRegisterStore.getState().store?.id;

        const myHeaders = useRegisterStore.getState().getHeaders();
        if (!myHeaders) return
        
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`, {headers:myHeaders});
        const json = await response.json() as ListType<ProductInterface>;
        if (!json || !json.list) return;
        set(() => ({ products: json }))
    },
    async setSelectedProduct(selected) {
        set(() => ({ selectedProduct: selected }))
    },
}));
