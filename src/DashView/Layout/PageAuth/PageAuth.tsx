import { useState } from 'react';
import './PageAuth.css'
import { useRegisterStore } from './RegisterStore';

export function PageAuth() {
    
    const store_name = localStorage.getItem('store_name');
    const {getAccess , openAuth}  = useRegisterStore();
    return openAuth&&(
        <div className="page-auth" >
            <div className="auth-ctn">
                <div className="image">
                </div>
                <div className="form">
                    <h1 className="auth-title">{store_name?.toUpperCase()} DASHBOARD</h1>
                    <h5 className="auth-prompt">{ 'Read more ?'} <span onClick={() => {
                    //    setOpenAuth(openAuth == 'login' ? 'signup' : 'login')
                    }}>{'Click here'}</span></h5>
                    <div className="google" onClick={()=>{
                        getAccess();
                    }}>
                        <div className="icon"></div>
                        <div className="label">Connexion</div>
                    </div>
                    <p>Google connexion is required to get access to sublymus Dash board service.</p>
                </div>
            </div>
        </div>
    );
}