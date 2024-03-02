import { useState } from 'react'
import { TopEditer } from "./TopEditer";
import { BottomEditer } from "./BottomEditer";
import { useWindowSize } from "../Hooks";
import React from 'react';

export function Editer() {
    
    const [state] = useState({
        bottom: undefined as JSX.Element| undefined,
        top:  undefined as JSX.Element| undefined,
        current:  undefined as JSX.Element| undefined
    });
    const size = useWindowSize()
    
    const isTop = (size.width||0) <=( size.height||0);
     
     state.current = isTop?(state.top?state.top:(state.top=<TopEditer/>)):(state.bottom?state.bottom:(state.bottom= <BottomEditer/>))
    return (
        <>
        { state.current}
        </>
    )
}