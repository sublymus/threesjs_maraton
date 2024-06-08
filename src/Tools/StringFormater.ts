import { Host } from "../Config";
import { Discussion } from "../DataBase";

export const  toDate = (date: string) => {
    let a: any = new Date(date).toLocaleTimeString();
    a = a.split(':');
    return `${a[0]}:${a[1]}`
}
export const  limit = (text: string, max: number) => {
    return text?.length > max ? text.substring(0, max) + '..' : (text||'')
}
export const  getImg = (img: string,size='cover',addHost?:boolean) => {
    return `no-repeat center/${size} url(${addHost===true?Host :addHost===false?'':(img.startsWith('/') ? Host : '')}${img})`
}

export const Click = (n=0.5 )=>{
    return (e:any)=>{
        const div = e.currentTarget;
        div.style.opacity = String(n);
        setTimeout(() => {
            div.style.opacity = '';
        },100);
    }
}

export function getSeconContext(context: string|undefined, d: Discussion) {
    return ((d.from_id||null)=== (context||null) ? d.to_id : d.from_id)||null
}