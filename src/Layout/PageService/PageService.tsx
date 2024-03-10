import './PageService.css'
import { useAppStore } from "../../AppStore";
import React from 'react';

export function PageService() {
    const { page, isAllowed ,setPage} = useAppStore();
    return isAllowed(page, 'page-service') && (
        <div className="page-service">
            <div className="service-background" onClick={()=>{
            setPage('catalogue')
        }}></div>
            <div className="ctn-service">
                <h1>SERVICE</h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita soluta voluptates atque assumenda? Dolorum atque, natus maiores, eos quam quas facilis ipsam odio impedit labore doloremque et molestias excepturi officia!
            </div>
        </div>
    )
}