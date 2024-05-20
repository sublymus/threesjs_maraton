import { useState } from 'react'
import './Choiser.css'

export function Choiser({onChange , list , canEdit, select, color}:{color?:string,canEdit?:boolean ,list:string[], select?:string,onChange?:(status:string)=>any}) {
    const [selected, setSelected] = useState<string|undefined>(select ||'');
    return (
        <div className="choise-status" >
            <div className="ctn">
                {
                    list.map((s)=>(
                        <div key={s} className={"one-choise "+ s.toLocaleLowerCase()+' '+(selected == s?'active':'')} style={{background:selected == s?(color||''):''}}onClick={()=>{
                            canEdit && setSelected(selected==s?'':s);
                            canEdit && onChange?.(selected==s?'':s);
                        }}>
                           {s} 
                        </div>
                    ))
                }
            </div>
        </div>
    )
}