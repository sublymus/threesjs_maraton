import { useState } from 'react'
import { TopEditer } from "./TopEditer";
import { BottomEditer } from "./BottomEditer";
import { useWindowSize } from "../Hooks";
import React from 'react';

export function Editer() {
    const a = (<div></div>);
    type E = typeof a;
    const [state] = useState({
        bottom: undefined as E| undefined,
        top:  undefined as E| undefined,
        current:  undefined as E| undefined
    });
    const size = useWindowSize()
    const isTop = window.innerWidth > window.innerHeight;
     
     state.current = isTop?(state.top?state.top:(state.top=<TopEditer/>)):(state.bottom?state.bottom:(state.bottom= <BottomEditer/>))
    return (
        <>
        { state.current}
        </>
    )
}