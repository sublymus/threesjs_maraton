import { useState } from 'react';
import { useAppStore } from '../../AppStore'
import { useProfileStore } from './ProfileStore'
import './Profile.css'
import React from "react";

export function CreateAccount() {
    const { user, create_user, profilePage, setProfilePage ,connexion , google_connexion  } = useProfileStore();
    const { page, setPage, isAllowed, } = useAppStore();
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);
    const [photo, setPhoto] = useState('/src/res//photo2.png');
    const [photoFile, setPhotoFile] = useState<HTMLInputElement['files']>(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [canSee, setCanSee] = useState(false);

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setPhotoFile(event.target.files)
            setPhoto(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onSend = () => {
        let hasError = false;
        if (password.length < 8) {
            setPasswordError('Minimum 8 character is required');
            hasError = true;
        } else {
            setPasswordError('');
        }
        if (profilePage=='register' && fullName.length < 3) {
            setFullNameError('Minimum 3 character is required');
            hasError = true;
        } else {
            setFullNameError('');
        }

        const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g')
        if (!regexp.test(email)) {
            setEmailError('invalid Email');
            hasError = true;
        } else {
            setEmailError('');
        }
        const data = {
            full_name: fullName,
            email,
            password,
            photos: photoFile
        }
        profilePage=='register'?create_user(data):connexion(data);
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

    const onGoogleConnexion = ()=>{
        google_connexion()
    }

    return (profilePage == 'register' || profilePage=='login') && (

        <div className="create-account">
            <div className="show-photo" style={{ display: isPhotoOpen ? 'block' : 'none' }}>
                <div className="back" onClick={() => {
                    isPhotoOpen ? setIsPhotoOpen(false) : setPage('catalogue');
                }}>
                    <div className="photo" style={{ backgroundImage: `url('${photo}')` }}></div>
                </div>
            </div>
            <div className="photo" style={{ backgroundImage: `url('${profilePage=='login'?'/src/res/photo2.png':photo}')` }}>
                <div className="open" style={{display:profilePage=='login'?'none':'block'}} onClick={() => {
                    setIsPhotoOpen(true);
                }}></div>
                <input  id='register-photo' type='file' onChange={onImageChange} />
                <label className="edit" style={{display:profilePage=='login'?'none':'initial'}} htmlFor='register-photo'></label>
            </div>
            <div  className="ctn-name" style={{display:profilePage=='login'?'none':'initial'}}>
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
                <div className="send" onClick={onSend}>{profilePage=='login'?'Connexion':'Create account'}</div>
                <a onClick={() => {
                   setProfilePage(profilePage=='login'?'register':'login')
                }}>{profilePage=='login'?'Create account':'Connexion'}</a>
            </div>
            <div className="separator">
                <div></div>
                <span>OR</span>
                <div></div>
            </div>
            <div className="social">
                <div className="google" onClick={onGoogleConnexion}><span></span>GOOGLE</div>
            </div>
        </div>

    )
}