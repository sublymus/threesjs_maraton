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
export function CollaboratorProfile() {

    const { current, setAbsPath, } = useDashRoute();
    const { collaborators, selectedCollaborator,  removeCollaborator , updateCollaborator ,setSelectedCollaborator } = useCollaboratorStore();

    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    const { store } = useRegisterStore()
    useEffect(() => {
        // if (selectedCategory)
        //     fetchCategoryProducts({
        //         category_id: selectedCategory.id
        //     });
    }, []);

    return current('collaborator_profile') && (!selectedCollaborator ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="collaborator-profile" ref={bindToParentScroll}>
            <EditorTopBar title='Collaborator Information' mode='delete' deteleKey={selectedCollaborator.id} onDelete={()=>{
              console.log(selectedCollaborator.id);
              removeCollaborator(selectedCollaborator.id);
            }}/>
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <ImageViewer name='collaborator_profile' images={selectedCollaborator.photos || []} cannotEdit />
                    <InputText  label='Name'  value={selectedCollaborator?.name} />
                    <InputText label='Email' value={selectedCollaborator?.email} />
                    <InputText label='created At' value={selectedCollaborator?.created_at} />
                    <InputText label='Join Store At' value={selectedCollaborator?.join_at} />
                </div>
                <div className="left-side">
                    <InputText label='Store Name' value={store?.name || 'pppp'} />
                    
                    <InputText label='Store Id' value={store?.id} />
                    <InputText isCheckRequired={isCheckRequired} label='Collaborator Id' value={(selectedCollaborator?.id || '')} />
                    <ChoiseStatusUser status={selectedCollaborator?.status as any||'PAUSE'} onChange={(value)=>{
                            updateCollaborator({
                                product_id: selectedCollaborator.id,
                                status: value
                            })
                        }}/>
                    <ChoiseRole role_id={selectedCollaborator.role_id} onChange={(value) => {
                        //collected['role_id'] = value
                    }} />
                    <ActionsCard />
                </div>
            </section>
        </div>
    ))
}