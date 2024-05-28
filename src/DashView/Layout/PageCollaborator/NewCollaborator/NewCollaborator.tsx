import './NewCollaborator.css'
import { useDashRoute } from '../../../dashStore'
import { useCollaboratorStore } from '../CollaboratorStore';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { ChoiseRole } from "../../../Component/ChoiseRole/ChoiseRole";
import { InputText } from '../../../Component/Form/Input';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
export function NewCollaborator() {


    const { current } = useDashRoute();
    const { addCollaborator } = useCollaboratorStore();
    const { store } = useRegisterStore()
    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';
    const [collected] =  useState<Record<string, any>>({});
    useEffect(() => {
        // if (selectedCategory)
        //     fetchCategoryProducts({
        //         category_id: selectedCategory.id
        //     });
    }, []);
    
    return current('new_collaborator') && (
        <div className="collaborator-profile" ref={bindToParentScroll}>
            <EditorTopBar terme='white'  mode={ 'create'} title='Collaborator Information' onCreate={() => {
                addCollaborator(collected).then((error) => {
                   console.log(error);
                   
                })
            }} />
            <section className={"editor " + wrap}>
                <div className="left-right">
                <InputText   label='Store Name'  value={store?.name} />
                <InputText   label='Store Id' value={store?.id} />
                <InputText editable prompt='Collaborator Email' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Email' placeholder='Catalog Label' value={''} onChange={(e)=>{
                    collected['email'] = e
                }}/>
                </div>
                <div className="left-side">
                    <ChoiseRole onChange={(value)=>{
                        collected['role_id'] = value
                    }} />
                </div>
            </section>

        </div>
    )
}
