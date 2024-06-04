import {  useState } from 'react'
import './ChoiseRole.css'
import { Role } from '../../../DataBase';

export function ChoiseRole({  onChange, role_id ,roles,canChange:ch}: { canChange:()=>boolean,roles:Role[], role_id?: string, onChange?: (id: string) => any }) {
    const [selected, setSelected] = useState(role_id);
    const [open, setOpen] = useState('');
    const canChange = ch();
    return (
        <div className="choise-roles">
            <div className="choise-ctn" onClick={() => {
                canChange && setOpen(open ? '' : 'open');
            }}>
                <div className="back">
                    <div className="icon"></div>
                </div>
                <div className="text">
                    <div className="label">Roles</div>
                    <div className="name">{roles.find((r => r.id == role_id))?.name} Selected</div>
                </div>
               { canChange && <div className="choise-icon" style={{ transform: open ? `rotate(180deg)` : '' }}></div>}
            </div>
            <div className={"list-roles " + open} style={{ height: open ? `${45 * (roles.length || 0)}px` : '0px' }}>
                {
                    roles.map((r) => (
                        <div key={r.id} className={"item " + (selected == r.id ? 'selected' : '')} onClick={() => {
                            onChange?.(r.id);
                            setSelected(r.id)
                        }}>
                            <div className="label">{r.name}</div>
                            <div className="id">#{r.id.split('-')[0]}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}