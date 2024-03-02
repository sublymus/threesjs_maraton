import { useState } from 'react'
import { VerticalProducts } from "./VerticalProducts";
import { HorizontalProducts } from "./HorizontalProducts";
import { useWindowSize } from "../Hooks";

export function Products() {
    const a = (<div></div>);
    type E = typeof a;
    const [state] = useState({
        vertical: undefined as E| undefined,
        horizontal:  undefined as E| undefined,
        current:  undefined as E| undefined
    });
    const size = useWindowSize()
    const isVertical = window.innerWidth > window.innerHeight;
     
     state.current = isVertical?(state.vertical?state.vertical:(state.vertical=<VerticalProducts/>)):(state.horizontal?state.horizontal:(state.horizontal= <HorizontalProducts/>))
    return (
        <>
        { state.current}
        {size.width}px / {size.height}px
        </>
    )
}

