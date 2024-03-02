import { useState } from 'react'
import { VerticalProducts } from "./VerticalProducts";
import { HorizontalProducts } from "./HorizontalProducts";
import { useWindowSize } from "../Hooks";

export function Products() {
    const [state] = useState({
        vertical: undefined as JSX.Element| undefined,
        horizontal:  undefined as JSX.Element| undefined,
        current:  undefined as JSX.Element| undefined
    });
    const size = useWindowSize()
    
    const isVertical = (size.width||0) >=( size.height||0);
     
     state.current = isVertical?(state.vertical?state.vertical:(state.vertical=<VerticalProducts/>)):(state.horizontal?state.horizontal:(state.horizontal= <HorizontalProducts/>))
    
     return (
        <>
        { state.current}
        </>
    )
}

