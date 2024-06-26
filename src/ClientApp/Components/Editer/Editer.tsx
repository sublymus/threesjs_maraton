import { useState } from 'react'
import { TopEditer } from "./TopEditer";
import { BottomEditer } from "./BottomEditer";
import { useWindowSize } from "../../../Hooks";
import { useAppRouter  } from "../../AppStore";
import { useProductStore } from '../Products/ProductStore';

export function Editer() {
    const { check} = useAppRouter();
    useProductStore()
    const [state] = useState({
        bottom: undefined as JSX.Element| undefined,
        top:  undefined as JSX.Element| undefined,
        current:  undefined as JSX.Element| undefined
    });
    const size = useWindowSize()
    
    let isTop = (size.width||0) <=( size.height||0);
    if(isTop) isTop = (size.width>1200)? false:true
     state.current = isTop?(state.top?state.top:(state.top=<TopEditer/>)):(state.bottom?state.bottom:(state.bottom= <BottomEditer/>)) 
     
     return check('editer')&&state.current
}