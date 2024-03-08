// import React from "react";
import './Logo.css'
import { useAppStore } from "../../AppStore";
import { useWindowSize } from '../Hooks';

export function Logo() {
    const { page, isAllowed, setPage } = useAppStore();
    const size = useWindowSize();
    return (
        <div className="catalogue-logo" style={{right:page == 'product'?'20px':'initial',left:page == 'product'?'initial':'20px'}} onClick={() => {
            setPage(page == 'catalogue' ? 'product' : 'catalogue')
        }}>SUBLYMUS</div>
    )
} 
