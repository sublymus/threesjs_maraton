import { useState } from 'react'
import './ChoiseStatus.css'
import { MapperJSX } from '../GenericList/type'
export const StatusElement: MapperJSX = {
    getView(label, value, e, setRef) {
        return <div key={e.id+label} ref={setRef}>
            <div className={"use-status active "+ (value||'').toLocaleLowerCase()}>{value}</div>
        </div>
    },
    option:{size:150}
}

const statusLsit = ['PAUSE','VISIBLE','TRASH'] as const 
type StatusType = typeof statusLsit[number];
export function ChoiseStatus({onChange , status}:{status?:StatusType, onChange?:(status:string)=>any}) {
    const [selected, setSelected] = useState<string|undefined>(status);
    return (
        <div className="choise-status" >
            <div className="ctn">
                {
                    statusLsit.map((s)=>(
                        <div key={s} className={"use-status "+ s.toLocaleLowerCase()+' '+(selected == s?'active':'')} onClick={()=>{
                            setSelected(s);
                            onChange?.(s)
                        }}>
                           {s} 
                        </div>
                    ))
                }
            </div>
        </div>
    )
}