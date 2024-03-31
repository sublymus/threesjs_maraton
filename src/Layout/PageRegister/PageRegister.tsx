import { useState } from 'react';
import { Host, useAppStore  , DefaultImage} from '../../AppStore'
import { useRegisterStore } from './RegisterStore'
import { ProfilePhoto } from "../../Components/ProfilePhoto/ProfilePhoto";
import './PageRegister.css';
import { useProfileStore } from "../PageProfile/ProfileStore";
import React from "react";

export function PageRegister() {
    const { create_user, connexion, google_connexion} = useRegisterStore();
    const { openPhoto}= useProfileStore();
    const { check, setPath } = useAppStore();
    const [] = useState(false);
    const [photoFile, setPhotoFile] = useState<HTMLInputElement['files']>(null);
    const [email, setEmail] = useState('b@b.bb');
    const [emailError, setEmailError] = useState('');
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [password, setPassword] = useState('bbbbbbbb');
    const [passwordError, setPasswordError] = useState('');
    const [canSee, setCanSee] = useState(false);

    const canCreate = check('create');
    const canLogin = check('login');
    
    const onSend = () => {
        if (password.length < 8) {
            setPasswordError('Minimum 8 character is required');
        } else {
            setPasswordError('');
        }
        if (canCreate && fullName.length < 3) {
            setFullNameError('Minimum 3 character is required');
        } else {
            setFullNameError('');
        }

        const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g')
        if (!regexp.test(email)) {
            setEmailError('invalid Email');
        } else {
            setEmailError('');
        }
        const data = {
            full_name: fullName,
            email,
            password,
            photos: photoFile
        }
        canCreate ? create_user(data) : connexion(data);
    }
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 50) {
            e.target.value = e.target.value.slice(0, 50)
            return setEmailError('Max length is 50');
        }
        setEmailError('');
        setEmail(e.target.value);
    }
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 50) {
            e.target.value = e.target.value.slice(0, 50)
            return setPasswordError('Max length is 50');
        }
        setPasswordError('');
        setPassword(e.target.value);
    }
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 50) {
            e.target.value = e.target.value.slice(0, 50)
            return setFullNameError('Max length is 50');
        }
        const v = e.target.value;
        if (v.length > 0) {
            const s = v.charAt(v.length - 1);
            e.target.value = v.trim() + (s === ' ' ? ' ' : '')
        }
        setFullNameError('');
        setFullName(e.target.value);
    }

    const onGoogleConnexion = () => {
        google_connexion()
    }

    return (canCreate || canLogin) && (

        <div className="page-register">
            
            <ProfilePhoto photo={photoFile?URL.createObjectURL(photoFile[0]):DefaultImage} canEdit={!!canCreate} canOpen onOpen={(photo)=> openPhoto(photo)} onChange={setPhotoFile} />
            <div className="ctn-name" style={{ display: canLogin ? 'none' : 'initial' }}>
                <h3>Full Name</h3>
                <input type="text" onChange={onNameChange} />
                <div className="promt">
                    <p className='error'>{fullNameError}</p>
                    <p className='count'>{fullName.length}/20</p>
                </div>
            </div>
            <div className="ctn-email">
                <h3>Email</h3>
                <input type="email" value={email} onChange={onEmailChange} />
                <div className="promt">
                    <p className='error'>{emailError}</p>
                    <p className='count'>{email.length}/50</p>
                </div>
            </div>
            <div className="ctn-passworld">
                <h3>Password</h3>
                <div className="ctn-password">
                    <input type={canSee ? 'text' : "password"} onChange={onPassChange} />
                    <div className={"eye " + (canSee ? '' : 'off')} onClick={() => {
                        setCanSee(!canSee);
                    }}></div>
                </div>
                <div className="promt">
                    <p className='error'>{passwordError}</p>
                    <p className='count'>{password.length}/50</p>
                </div>
            </div>
            <div className="btn">
                <div className="send" onClick={onSend}>{canLogin ? 'Connexion' : 'Create account'}</div>
                <a onClick={() => {
                    setPath(canLogin ? 'create' : 'login')
                }}>{canLogin ? 'Create account' : 'Connexion'}</a>
            </div>
            <div className="separator">
                <div></div>
                <span>OR</span>
                <div></div>
            </div>
            <div className="social">
                <a href={`${Host}/google_connexion`} className="google" onClick={onGoogleConnexion}><span></span>GOOGLE</a>
            </div>
        </div>

    )
}


