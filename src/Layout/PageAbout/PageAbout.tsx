import './PageAbout.css'
import { useAppStore } from "../../AppStore";
import React from 'react';

export function PageAbout() {
    const { page, isAllowed ,setPage} = useAppStore();
    return isAllowed(page, 'page-about') && (
        <div className="page-about" onClick={()=>{
            setPage('catalogue')
        }}>
            <div className="about-background"></div>
            <div className="ctn-about">
            <h1>ABOUT</h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita soluta voluptates atque assumenda? Dolorum atque, natus maiores, eos quam quas facilis ipsam odio impedit labore doloremque et molestias excepturi officia!
            </div>
        </div>
    )
} 