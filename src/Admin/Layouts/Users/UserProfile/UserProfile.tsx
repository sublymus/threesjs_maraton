import './UserProfile.css'
import { useAdminRoute } from '../../../AdminStore'
import { useUserStore } from '../UserStore';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { InputText } from '../../../../DashView/Component/Form/Input';
import { ImageViewer } from '../../../../DashView/Component/ImageViewer/ImageViewer';
import { OpenChat } from "../../../../DashView/Component/OpenChat/OpenChat";
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
export function UserProfile() {

    const { current, json } = useAdminRoute();
    const { selectedUser, setUserById } = useUserStore();
    const {user} = useRegisterStore();
    const [isCheckRequired] = useState(false);
    const size = useWindowSize();  
    const wrap = size.width < 1000 ? 'wrap' : '';
 
    useEffect(() => {
        current('user_profile') && json?.user_id && user&& setUserById(json?.user_id)
    }, [json, user])
 
    return current('user_profile') && (!selectedUser ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="user-profile" ref={bindToParentScroll}>
            <h1>User Information</h1>
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <ImageViewer name='user_profile' images={selectedUser.photos || []} cannotEdit />
                </div>
                <div className="left-side">
                    <InputText isCheckRequired={isCheckRequired} label='User Id' value={(selectedUser?.id || '')} />
                    <InputText prompt='User Name' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Name' placeholder='Catalog Label' value={selectedUser?.name} />
                    <InputText prompt='User Email' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Email' placeholder='Catalog Label' value={selectedUser?.email} />
                    <InputText label='created At' value={selectedUser?.created_at} />
                    <InputText label='Join Store At' value={selectedUser?.join_at} />
                    <OpenChat user={selectedUser} channel='sessions' />
                </div>
            </section>
        </div>
    ))
}
