// import React from "react";
import './Logo.css'
import { useAppStore  } from "../../AppStore";
import { useWindowSize } from '../Hooks';

export function Logo() {
    const {page , isAllowed,setPage} = useAppStore();
    const size = useWindowSize();
    return (
       <div className="catalogue-logo" onClick={()=>{
        setPage(page=='catalogue'?'product':'catalogue')
       }}>SUBLYMUS {page} --- {size.width} / {size.height}</div>
    )
} 
