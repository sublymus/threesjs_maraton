import { useState } from 'react';
import { useAppStore } from '../../AppStore'
import { CreateAccount } from './PageCreateAccount'
import './Profile.css'
import { useProfileStore } from './ProfileStore';
export function Profile() {
    const { page, setPage, isAllowed, } = useAppStore();
    const [isOpen, setIsOpen] = useState(false);
    const { user  } = useProfileStore();
    return isAllowed(page, 'page-profile') && (
        <div className="page-profile">
            <div className="profile-background" onClick={() => {
                isOpen ? setIsOpen(false) : setPage('catalogue');
            }}></div>
            <div className="ctn-profile">
                <div className="close" onClick={() => {
                    isOpen ? setIsOpen(false) : setPage('catalogue');
                }}></div>
                <CreateAccount />
                {user && JSON.stringify(user)}
            </div>
        </div>
    )
}