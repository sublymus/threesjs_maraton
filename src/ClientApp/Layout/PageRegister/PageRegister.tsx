import { useState } from 'react';
import { useAppRouter  , DefaultImage} from '../../AppStore'
import { ProfilePhoto } from "../../Components/ProfilePhoto/ProfilePhoto";
import './PageRegister.css';
import { useProfileStore } from "../PageProfile/ProfileStore";
import React from "react";
import { Host } from '../../../Config';
import { useRegisterStore } from '../PageRegister/RegisterStore';

export function PageRegister({login, create}:{login?:boolean, create?:boolean}) {
    const { getAccess} = useRegisterStore();
    const { openPhoto}= useProfileStore(); 
    const { check, setPath } = useAppRouter();
   const canCreate = create||check('create');
    const canLogin = login||check('login');
    

    const onGoogleConnexion = () => {
        getAccess()
    }

    return (canCreate || canLogin) && (

        <div className="page-register">
           
            <div className="social">
                <a  className="google" onClick={onGoogleConnexion}><span></span>GOOGLE</a>
            </div>
        </div>

    )
}


