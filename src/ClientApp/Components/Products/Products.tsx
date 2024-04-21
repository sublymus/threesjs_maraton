import { useState } from 'react'
import { VerticalProducts } from "./VerticalProducts";
import { HorizontalProducts } from "./HorizontalProducts";
import { useWindowSize } from "../../../Hooks";
import { useAppRouter  } from "../../AppStore";

export function Products() {
    const {check} = useAppRouter();
   
    const [state] = useState({
        vertical: undefined as JSX.Element| undefined,
        horizontal:  undefined as JSX.Element| undefined,
        current:  undefined as JSX.Element| undefined
    });
    const size = useWindowSize()
    
    let isVertical = (size.width||0) >=( size.height||0);
     if(!isVertical)isVertical = size.width > 1200 ? true:false
     state.current = isVertical?(state.vertical?state.vertical:(state.vertical=<VerticalProducts/>)):(state.horizontal?state.horizontal:(state.horizontal= <HorizontalProducts/>))
    
     return (
        <>
        { check('products')&&state.current}
        </>
    )
}
