// import React from "react";
import './Logo.css'
import { useAppStore  } from "../../AppStore";

export function Logo() {
    const {page , isAllowed,setPage} = useAppStore();
    
    return (
       <div className="catalogue-logo" onClick={()=>{
        setPage(page=='catalogue'?'product':'catalogue')
       }}>SUBLYMUS {page}</div>
    )
} 
