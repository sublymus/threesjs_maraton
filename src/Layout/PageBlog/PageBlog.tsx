import './PageBlog.css'
import { useAppStore } from "../../AppStore";
import React from 'react';

export function PageBlog() {
    const { page, isAllowed ,setPage} = useAppStore();
    return isAllowed(page, 'page-blog') && (
        <div className="page-blog" onClick={()=>{
            setPage('catalogue')
        }}>
            <div className="blog-background"></div>
            <div className="ctn-blog">
            <h1>BLOG</h1>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita soluta voluptates atque assumenda? Dolorum atque, natus maiores, eos quam quas facilis ipsam odio impedit labore doloremque et molestias excepturi officia!
            </div>
        </div>
    )
}