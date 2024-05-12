import { useEffect, useState } from 'react'
import './ChoiseRole.css'
import { useRoleStore } from '../../Layout/PageRole/RoleStore';
import { useCollaboratorStore } from '../../Layout/PageCollaborator/CollaboratorStore';
import { useRegisterStore } from '../../Layout/PageAuth/RegisterStore';

export function ChoiseRole({  onChange, role_id}: { role_id?: string, onChange?: (id: string) => any }) {
    const { selectedCollaborator} = useCollaboratorStore();
    const {user, userStore} = useRegisterStore();
    const { roles, fetchRoles } = useRoleStore();
    const [selected, setSelected] = useState(role_id);
    const [open, setOpen] = useState('');
    
    useEffect(() => {
        fetchRoles();
    }, []);
    let canChange =!! (roles?.list.find(r=> r.id == userStore?.role_id)?.ban_collaborator);

    if(!canChange &&  userStore?.type  == 'OWNER'){
        canChange = true;
    }
    if(canChange && selectedCollaborator?.id == user?.id ){
        canChange = false;
    }
    if(canChange && selectedCollaborator?.s_type == 'OWNER' ){
        canChange = false;
    }
    
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
                    <div className="name">{roles?.list.find((r => r.id == role_id))?.name} Selected</div>
                </div>
               { canChange && <div className="choise-icon" style={{ transform: open ? `rotate(180deg)` : '' }}></div>}
            </div>
            <div className={"list-roles " + open} style={{ height: open ? `${45 * (roles?.list.length || 0)}px` : '0px' }}>
                {
                    roles?.list.map((r) => (
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