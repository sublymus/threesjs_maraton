import { useState } from 'react'
import './ChoiseOption.css'
import { useRoleStore } from '../../Layout/PageRole/RoleStore';
export function ChoiseOptions({onChange , isNew  }:{isNew ?:boolean ,onChange?:(ids:string[])=>any}) {
    const { selectedRole, json_roles } = useRoleStore();
    const listRole = Object.keys(json_roles || {});
    const  options = isNew?[] : listRole.filter(f=> (selectedRole as any)[f])
    const [selected, setSelected] = useState(options);
    const [open, setOpen] = useState('');
    
    return (
        <div className="choise-options">
            <div className="choise-ctn" onClick={()=>{
                setOpen(open?'':'open');
            }}>
                <div className="back">
                    <div className="icon"></div>
                </div>
                <div className="text">
                    <div className="label">Options</div>
                    <div className="name">{selected?.length||0} Selected</div>
                </div>
                <div className="choise-icon" style={{transform:open?`rotate(180deg)`:''}}></div>
            </div>
            <div className={"list-options "+open} style={{height:open?`${45*(listRole?.length||0)}px`:'0px'}}>
                {
                    listRole?.map((k,i) => (
                        <div  key={k+i}  className={"item "+ ( selected?.find(f=>f ==k) ?'selected':'')} onClick={()=>{
                            const s = selected?.find(f=>f ==k)?selected.filter(f=>f!==k):[...(selected||[]),k];
                            setSelected(s);
                            onChange?.(s);
                        }}>
                            <div className="label">{k}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}