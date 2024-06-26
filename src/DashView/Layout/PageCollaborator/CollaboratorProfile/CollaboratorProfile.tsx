import './CollaboratorProfile.css'
import { useDashRoute } from '../../../dashStore'
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { ImageViewer } from '../../../Component/ImageViewer/ImageViewer';
import { InputText } from '../../../Component/Form/Input';
import { useCollaboratorStore } from '../../PageCollaborator/CollaboratorStore';
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
import { ChoiseRole } from '../../../Component/ChoiseRole/ChoiseRole';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
import { ChoiseStatusUser } from '../../../Component/ChoiseStatus/ChoiseStatusUser';
import { OpenChat } from '../../../Component/OpenChat/OpenChat';
import { useRoleStore } from '../../PageRole/RoleStore';
import { Local } from '../../../../Config';
export function CollaboratorProfile() {

    const { current, json } = useDashRoute();
    const { selectedCollaborator, setCollaboratorById, removeCollaborator, updateCollaborator, change_collaborator_role } = useCollaboratorStore();
    const [isCheckRequired] = useState(false);
    const { roles, fetchRoles } = useRoleStore()
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';
    const { store, user } = useRegisterStore()

    useEffect(() => {
        if (json?.collaborator_id) {
            setCollaboratorById(json?.collaborator_id)
        }
    }, [json])
    useEffect(() => {
        fetchRoles({})
    }, [user])
console.log({roles});

    return current('collaborator_profile') && (!selectedCollaborator ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="collaborator-profile" ref={bindToParentScroll}>
            <EditorTopBar title='Collaborator Information' mode='delete' deteleKey={selectedCollaborator.id} onDelete={() => {
                console.log(selectedCollaborator.id);
                removeCollaborator(selectedCollaborator.id);
            }} />
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <ImageViewer name='collaborator_profile' images={selectedCollaborator.photos || []} cannotEdit/*={selectedCollaborator.id!=user?.id}*/ />
                    <InputText label='Name' value={selectedCollaborator?.name} />
                    <InputText label='Email' value={selectedCollaborator?.email} />
                    <InputText label='created At' value={selectedCollaborator?.created_at} />
                    <InputText label='Join Store At' value={selectedCollaborator?.join_at} />
                </div>
                <div className="left-side">
                    <InputText label='Store Name' value={store?.name || 'pppp'} />

                    <InputText label='Store Id' value={store?.id} />
                    <InputText isCheckRequired={isCheckRequired} label={selectedCollaborator?.s_type + ' Id'} value={(selectedCollaborator?.id || '')} />
                    {
                        user?.id != selectedCollaborator.id&&  <div className="chat-btn-ctn">
                        <OpenChat user={selectedCollaborator} channel='discussions' />
                        {
                            window.location.pathname.split('/')[3] == 'admin' && <div className="btn-chat-admin" onClick={()=>{
                                store && window.open(
                                    `${Local}/admin#chat/discussions={"store_id":"${store.id}","collaborator_id":"${selectedCollaborator.id}"}`
                                );
                            }}>
                                Open as Admin
                            </div>
                        }
                    </div>
                    }
                    <ChoiseStatusUser status={selectedCollaborator?.status as any || 'NEW'} onChange={(value) => {
                        updateCollaborator({
                            product_id: selectedCollaborator.id,
                            status: value
                        })
                    }} />
                    <ChoiseRole roles={roles?.list || []} canChange={() => true} role_id={selectedCollaborator.role_id} onChange={(value) => {
                        change_collaborator_role({
                            new_role_id: value,
                            collaborator_id: selectedCollaborator.id
                        })
                    }} />
                    <ActionsCard />
                </div>
            </section>
        </div>
    ))
}