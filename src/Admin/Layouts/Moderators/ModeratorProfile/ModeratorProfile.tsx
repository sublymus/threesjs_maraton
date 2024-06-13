import { useAdminRoute } from '../../../AdminStore'
import { useModeratorStore } from '../ModeratorStore';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { InputText } from '../../../../DashView/Component/Form/Input';
import { ImageViewer } from '../../../../DashView/Component/ImageViewer/ImageViewer';
import { OpenChat } from "../../../../DashView/Component/OpenChat/OpenChat";
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
import { EditorTopBar } from '../../../../DashView/Component/EditorTopBar/EditorTopBar';
export function ModeratorProfile() {

    const { current, json } = useAdminRoute();
    const { selectedModerator, setModeratorById, removeModerator } = useModeratorStore();
    const {user} = useRegisterStore()
    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(() => {
        current('moderator_profile') && json?.moderator_id && setModeratorById(json?.moderator_id)
    }, [json, user])

    return current('moderator_profile') && (!selectedModerator ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="moderator-profile" ref={bindToParentScroll}>
            <EditorTopBar title='Moderator Information' mode='delete' deteleKey={selectedModerator.id} onDelete={() => {
                removeModerator(selectedModerator.id);
            }} />
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <ImageViewer name='moderator_profile' images={selectedModerator.photos || []} cannotEdit />
                </div>
                <div className="left-side">
                    <InputText isCheckRequired={isCheckRequired} label='Moderator Id' value={(selectedModerator?.id || '')} />
                    <InputText prompt='Moderator Name' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Name' placeholder='Catalog Label' value={selectedModerator?.name} />
                    <InputText prompt='Moderator Email' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Email' placeholder='Catalog Label' value={selectedModerator?.email} />
                    <InputText label='created At' value={selectedModerator?.created_at} />
                    <InputText label='Join Store At' value={selectedModerator?.join_at} />
                    <OpenChat user={selectedModerator} channel='sessions' />
                </div>
            </section>
           
        </div>
    ))
}
