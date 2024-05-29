import { create } from "zustand";
import { CommandInterface, ListType, ProductInterface } from "../../../DataBase";
import { Host } from '../../../Config'
import type { ImageViewerMapper } from "../../Component/ImageViewer/ImageViewer";
import { useDashStore } from "../../dashStore";
import { useRegisterStore } from "../PageAuth/RegisterStore";

interface ProductState {
    products: ListType<ProductInterface> | undefined;
    selectedProduct: ProductInterface | undefined;
    fetchProducts(filter?: Record<string, any>): Promise<ListType<ProductInterface> | undefined>;
    setSelectedProduct(selected: ProductInterface | undefined): Promise<void>;
    updateProduct(product: Record<string, any>): Promise<void>;
    createProduct(product: Record<string, any>): Promise<string[] | undefined>;
    removeProduct(product_id: string): Promise<string | undefined>
    setProductById(product_id: string): void,
    fectProductCommands(data :{status?:string, no_status?:string,user_id?:string,product_id?: string, limit?:number, page?:number}): Promise<ListType<CommandInterface> | undefined>
}

export const useProductStore = create<ProductState>((set) => ({
    products: undefined,
    selectedProduct: undefined,
    async fectProductCommands({limit, page, status, no_status, user_id, product_id }) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const query: any = {};
        query.user_id = true;
        query.store_id = h.store.id;
        query.product_id = product_id||'';
        query.limit = limit||25;
        query.page = page||1;
        query.user_id = user_id||'';
        query.status = status||'';
        query.no_status = no_status||'';
        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_commands/?${searchParams.toString()}`, {
            headers: h.headers
        });
        const json = await response.json() as ListType<CommandInterface>;
        if (!json || !json.list) return;
        return json
    },
    async setProductById(id) {
        const list = useProductStore.getState().products;
        const c = list?.list.find((l) => l.id == id);
        if (c) {
            set(() => ({ selectedProduct: c }))
        } else {
            const store = useRegisterStore.getState().store;
            if (!store) {
                const startTime = Date.now();
                const intervalId = setInterval(async () => {
                    if (Date.now() - startTime > 10 * 1000) {
                        clearInterval(intervalId);
                    }
                    const s = useRegisterStore.getState().store;
                    if (s) {
                        clearInterval(intervalId);
                        const ls = await useProductStore.getState().fetchProducts({
                            query: { product_id: id }
                        })
                        set(() => ({ selectedProduct: ls?.list.find((l) => l.id == id) }))
                    }
                }, 100)

            } else {
                const ls = await useProductStore.getState().fetchProducts({
                    query: { product_id: id }
                })
                set(() => ({ selectedProduct: ls?.list.find((l) => l.id == id) }))
            }
        }
    },
    async removeProduct(product_id) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/delete_product/${product_id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        const json = await response.json();
        useDashStore.getState().fetchStoreVar();
        return json?.isDeleted;
    },
    async createProduct(product) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return

        product.index = product.index || 0;
        product.is_dynamic_price = product.is_dynamic_price || true;
        const formData = new FormData();
        const error: string[] = [];
        ['images', 'model_images'].forEach(p => {
            const d = product[p] as ImageViewerMapper | undefined
            if (d && Object.keys(d).length > 0) {
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
            } else {
                return error.push(p + ' is not defined');
            }
        });
        ['title', 'description', 'stock', 'category_id', 'index', 'price', 'is_dynamic_price'].forEach(p => {
            if (product[p] != undefined) {
                formData.append(p, product[p]);
            } else {
                return error.push(p + ' is not defined');
            }
        });
        if (error.length == 0) {
            const response = await fetch(`${Host}/create_product`, {
                method: 'POST',
                body: formData,
                headers: h.headers
            });
            const json = await response.json();
            if (!json || !json.id) {
                error.push('Server Error, Try Later');
                return error
            }
            set(() => ({ selectedProduct: json }));
            useDashStore.getState().fetchStoreVar();
        } else {
            return error;
        }
    },
    async updateProduct(product) {
        if (!product.product_id) return console.log('Product_id required');

        const h = useRegisterStore.getState().getHeaders();
        if (!h) return

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
        ['title', 'description', 'stock', 'category_id', 'status', 'index', 'price', 'is_dynamic_price'].forEach(p => {
            if (product[p]) {
                formData.append(p, product[p]);
                send = true
            }
        });

        let newProduct: any = null
        if (send) {
            newProduct = await fetch(`${Host}/update_product`, {
                method: 'PUT',
                body: formData,
                headers: h.headers
            });
        }
        if (product.scene_dir) {
            const f = new FormData();
            f.append('scene_dir', product.scene_dir);
            f.append('product_id', product.product_id);
            newProduct = await fetch(`${Host}/update_view_product`, {
                method: 'PUT',
                body: f,
                headers: h.headers
            })
        }
        if (newProduct) {
            newProduct = await newProduct.json();
            console.log('newProduct', newProduct);

            set(() => ({ selectedProduct: newProduct }))
        }
    },
    async fetchProducts(filter) {
        // , category_id, catalog_id,  text, 
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const query: any = {};
        if (filter?.page) query.page = Number(filter.page);
        if (filter?.limit) query.limit = Number(filter.limit);
        if (filter?.sortBy) query.order_by = filter.sortBy;
        if (filter?.query.text) query.text = filter.query.text;
        if (filter?.query.price) query.price_min = filter.query.price[0];
        if (filter?.query.price) query.price_max = filter.query.price[1];
        if (filter?.query.stock) query.stock_min = filter.query.stock[0];
        if (filter?.query.stock) query.stock_max = filter.query.stock[1];
        if (filter?.query.product_id) query.product_id = filter.query.product_id;

        // query.is_features_required = true;
        query.all_status = true;
        query.store_id = h.store.id;


        const searchParams = new URLSearchParams({});
        for (const key in query) {
            const value = query[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_products/?${searchParams.toString()}`, { headers: h.headers });
        const json = await response.json() as ListType<ProductInterface>;
        if (!json || !json.list) return;
        set(() => ({ products: json }));
        return json;
    },
    async setSelectedProduct(selected) {
        set(() => ({ selectedProduct: selected }))
    },
}));
