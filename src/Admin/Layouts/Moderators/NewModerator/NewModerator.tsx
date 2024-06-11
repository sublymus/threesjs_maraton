import './NewModerator.css'
import { useAdminRoute } from '../../../AdminStore'
import { useModeratorStore } from '../ModeratorStore';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { ChoiseRole } from "../../../../DashView/Component/ChoiseRole/ChoiseRole";
import { InputText } from '../../../../DashView/Component/Form/Input';
import { EditorTopBar } from '../../../../DashView/Component/EditorTopBar/EditorTopBar';
import { useRoleStore } from '../../Roles/RoleStore';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
export function NewModerator() {


    const { current, setAbsPath} = useAdminRoute();
    // const {}
    const { addModerator,setSelectedModerator } = useModeratorStore();
    const { roles, fetchRoles, } = useRoleStore();
    const { user } = useRegisterStore()
    // const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';
    const [collected] = useState<Record<string, any>>({});

    useEffect(() => {
        fetchRoles();
    }, [user]);

    return current('new_moderator') && (
        <div className="moderator-profile" ref={bindToParentScroll}>
            <EditorTopBar terme='white' mode={'create'} title='Collaborator Information' onCreate={() => {
                addModerator({
                    email: collected.email,
                    role_id: collected.role_id
                }).then((res) => {
                    if(res?.id){
                        setSelectedModerator(res);
                        setAbsPath(['moderators','moderator_profile'])
                    }

                })
            }} />
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <InputText editable prompt='Collaborator Email' min={3} check='auto' max={50} label='Email' placeholder='Catalog Label' value={''} onChange={(e) => {
                        collected['email'] = e
                    }} />
                </div>
                <div className="left-side">
                    <ChoiseRole roles={roles?.list || []} onChange={(value) => {
                        collected['role_id'] = value
                    }} canChange={() => {

                        // let canChange =!! (roles.find(r=> r.id == userStore?.role_id)?.ban_collaborator);

                        // if(!canChange &&  userStore?.type  == 'OWNER'){
                        //     canChange = true;
                        // }
                        // if(canChange && selectedCollaborator?.id == user?.id ){
                        //     canChange = false;
                        // }
                        // if(canChange && selectedCollaborator?.s_type == 'OWNER' ){
                        //     canChange = false;
                        // }
                        return true
                    }} />
                </div>
            </section>

        </div>
    )
}
