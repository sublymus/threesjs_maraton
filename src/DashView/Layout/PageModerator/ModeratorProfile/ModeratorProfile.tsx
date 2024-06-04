import './ModeratorProfile.css'
import { useDashRoute } from '../../../dashStore'
import { useModeratorStore } from '../ModeratorStore';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { InputText } from '../../../Component/Form/Input';
import { ImageViewer } from '../../../Component/ImageViewer/ImageViewer';
import { GenericList } from '../../../Component/GenericList/GenericList';
import { Host } from '../../../../Config';
import { StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
import { OpenChat } from "../../../Component/OpenChat/OpenChat";
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
export function ModeratorProfile() {

    const { current, setAbsPath, json } = useDashRoute();
    const { selectedModerator ,setModeratorById  } = useModeratorStore();
    const {store} = useRegisterStore()
    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(()=>{
            json?.moderator_id && store && setModeratorById(json.moderator_id)
        },[json, store])
        
    return current('moderator_profile') && (!selectedModerator ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="moderator-profile" ref={bindToParentScroll}>
            <h1>Moderator Information</h1>
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
                    <OpenChat user={selectedModerator} channel='sessions'/>
                </div>
            </section>
           
        </div>
    ))
}
