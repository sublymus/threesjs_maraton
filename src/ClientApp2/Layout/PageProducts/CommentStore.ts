import { CommentIndex, ListType, ProductCommentInterface } from "../../../DataBase";
import { create } from 'zustand'
import { useRegisterStore } from "../../Layout/PageRegister/RegisterStore";
import { Host } from "../../../Config";



export interface CommentState {
    index:{
        comment:ProductCommentInterface,
        relative?:number
    }|undefined,
    lastPage:string|undefined,
    setLastPage(lastPage:string|undefined):void
    setIndex(c:{
        comment:ProductCommentInterface,
        relative?:number
    }|undefined):void
    comments:ListType<ProductCommentInterface>|undefined,
    userComment:ProductCommentInterface | undefined,
    fetcheditCommentText(data:{
        comment_id:number,
        text:string,
    }):Promise<ProductCommentInterface | undefined>
    sendCommentResponse(data:{
        comment_id:number,
        response:string,
    }):Promise<ProductCommentInterface | undefined>
    create_product_comment(data:{
        product_id:string,
        text:string,
        photos:File[],
        videos:File[],
        note:number,
    }):Promise<ProductCommentInterface | undefined>
    fetchUserComment(produc_id?:string):Promise<ProductCommentInterface|undefined>
    deleteComment(c:ProductCommentInterface, delay?:number):Promise<{deleted?:boolean}|undefined>
    fetchProductComments(filter?:{
        order_by?:string,
        with_photo?:boolean,
        with_vidieo?:boolean,
        with_photo_or_video?:boolean,
        user_id?:string,
        product_id?:string,
        page?:number,
        first_index?:boolean,
        limit?:number,
        no_save?:boolean
    }):Promise<ListType<ProductCommentInterface>|undefined>
    getCommentIndex(dat:{
        comment_id?:number, 
        product_id:string, 
        move?:'back'|'next'
    }):Promise<CommentIndex>
}

export const useCommentStore = create<CommentState>((set) => ({
    comments:undefined,
    index:undefined,
    lastPage:undefined,
    setLastPage(lastPage) {
        set(()=>({lastPage}))
    },
    setIndex(c) {
        set(()=>({index:c}))
    },
    userComment:undefined,
    async getCommentIndex(data) {
        
        const searchParams = new URLSearchParams({});
        
        for (const key in data) {
            const value = (data  as any)[key];
            value != undefined && searchParams.set(key, value);
        }

        const response = await fetch(`${Host}/get_comment_index/?${searchParams}`);
        const json = await response.json();
        return json
    },
    async sendCommentResponse(data){
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();
        formData.append('product_comment_id',data.comment_id.toString());
        formData.append('response',data.response);
        const response = await fetch(`${Host}/set_product_comment_response`,{
            method:'PUT',
            body:formData,
            headers:h.headers
        });
        const json = await response.json();
        if(!json?.id) return
        set(({comments})=>({comments:comments && {...comments, list:comments.list.map(f=>f.id == data.comment_id ? json :f)}}))
        return json
    },
    async fetcheditCommentText(data){
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();
        formData.append('product_comment_id',data.comment_id.toString());
        formData.append('text',data.text);
        const response = await fetch(`${Host}/edit_product_comment_text`,{
            method:'PUT',
            body:formData,
            headers:h.headers
        });
        const json = await response.json();
        if(!json?.id) return
        set(({comments})=>({comments:comments && {...comments, list:comments.list.map(f=>f.id == data.comment_id ? json :f)}}))
        return json
    },
    async deleteComment(c, delay) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${Host}/delete_product_comment/${c.id}`,{
            method:'DELETE',
            headers:h.headers
        });
        const json = await response.json();
        if(!json?.deleted) return
        if(delay){
            setTimeout(() => {
                set(({comments})=>({comments:comments && {...comments, list:comments.list.filter(f=>f.id != c.id)}}))
            }, delay);
        }
        return json
    },
    async fetchProductComments(filter) {
        const store = useRegisterStore.getState().store;
        if (!store) return;
        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = (filter  as any)[key];
            searchParams.set(key, value);
        }
        const response = await fetch(`${Host}/get_product_comments/?${searchParams.toString()}`);
        const comments = (await response.json()) as ListType<ProductCommentInterface>
        if (!filter?.no_save) {
            set(() => ({ comments }))
        }
       return comments
    },
    async fetchUserComment() {
        return undefined
    },

    async create_product_comment( data ) {
        const h = useRegisterStore.getState().getHeaders();
        if (!h) return
        const formData = new FormData();
        formData.append('product_id', data.product_id);
        formData.append('note', data.note+'');
        formData.append('text', data.text);
        for (let i = 0; i < data.photos.length; i++) {
            formData.append('photos_'+i,data.photos[i]);
        }
        for (let i = 0; i < data.videos.length; i++) {
            formData.append('videos_'+i,data.videos[i]);
        }
       console.log(data);
       
        const response = await fetch(`${Host}/create_product_comment`,{
            method:'POST',
            body:formData,
            headers:h.headers
        });
        const json = await response.json();
        if(!json?.id) return
        return json
    },
    
}))