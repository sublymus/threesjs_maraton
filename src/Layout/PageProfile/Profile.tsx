import { useState } from 'react';
import { useAppStore } from '../../AppStore';
import { PageRegister } from './PageRegister';
import { PageUser } from './PageUser';
import './Profile.css';
import { useProfileStore } from './ProfileStore';
export function Profile() {
    const {  setPath, check , navBack} = useAppStore();
    const [isOpen, setIsOpen] = useState(false);
    const { user  } = useProfileStore();
    return check('profile') && (
        <div className="page-profile">
            <div className="profile-background" onClick={() => {
               navBack()
            }}></div>
            <div className="ctn-profile">
                <div className="close" onClick={() => {
                      navBack()
                }}></div>
                
                {check('profile-nav')&&<div className='profile-nav'>
                    <ul>
                        <li onClick={()=>{
                            setPath('user')
                        }}>Profile</li>
                        <li onClick={()=>{
                            setPath('command')
                        }}>Command</li>
                        <li onClick={()=>{
                            setPath('card')
                        }}>Card</li>
                        <li onClick={()=>{
                            setPath('favorites')
                        }}>Favorites</li>
                        <li onClick={()=>{
                            setPath('visited')
                        }}>Visited</li>
                        <li onClick={()=>{
                            setPath('../','service')
                        }}>Customer service</li>
                        <li onClick={()=>{
                            setPath('../','blog')
                        }}>Blog</li>
                        <li onClick={()=>{
                            setPath('../','about')
                        }}>About us</li>
                    </ul>
                </div>}
                <PageRegister />
                <PageUser/>
            </div>
        </div>
    )
}

//{check('user')&&(user && JSON.stringify(user))}