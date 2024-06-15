import { useState } from "react";
import './LoaderImage.css'

//TODO remplacer par un explorateur de fichier
let i=0;
export function FileLoader({onChange ,  icon , ext , label, file_name}:{file_name?:string,icon?:string,label?:string, ext?:string[],onChange:(file:File)=>any}) {
    const [id] = useState((Math.random() + (i++)).toString());
    const [name,setName] = useState(file_name||'');
    
    return ( 
        <div className="loader-img">
             <input type="file" style={{ display: 'none' }} accept="application/zip" name="img" id={id} onChange={(e)=>{
                 const f = e.target.files?.[0];
                 if (!f) return
                 const n = f.name.toLowerCase();
                 const lastIndex = n.lastIndexOf('.');
                 const _ext = n.substring(lastIndex+1,n.length);
                 if(ext && !ext.includes(_ext)) return console.log({_ext, ext, n});
                 ;
                 setName(f.name)
                 onChange(f);
             }} />
            <label htmlFor={id} className="loader-img-ctn">
                <div className="back">
                    <div className="icon" style={{background:icon?`no-repeat center/50% url(${icon})`:''}}></div>
                </div>
                <div className="text">
                    <div className="label">{label??'Upload file'}</div>
                    <div className="prompt">{name&&( name.length>25?(name.substring(0,10)+'...'+name.substring(name.length-10,name.length)):name)||'Add new File'}</div>
                </div>
                <div className="load-icon"></div>
            </label>
        </div>
    )
}