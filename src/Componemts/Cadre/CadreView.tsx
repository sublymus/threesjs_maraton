import React, { useRef } from "react";
import { Product } from "../Product/ProductStore";
import { Cadre } from "./Card";


export class CadreView extends React.Component{
    // ref:React.MutableRefObject<HTMLDivElement | null>;
    // cadre :Cadre
    constructor(protected product:Product){
        super(product)
        // this.ref = useRef<HTMLDivElement | null>(null);
        // this.cadre = new Cadre(this.ref);
    }
    render(){
        
        return (
            <div
            key={this.product.uuid}
            // ref={this.ref}
            className='product'
            style={{ backgroundImage: `url(${this.product.image_url})` }}
          ></div>
        )
    }
}