
import './index.css'
import './Dash.css'
import { NavBar } from './Component/NavBar/NavBar'
import { PageProduct } from './Layout/PageProduct/PageProduct'
import { PageUser } from './Layout/PageUser/PageUser'
import { PageChat } from './Layout/PageChat/PageChat'
import { PageInterface } from './Layout/PageInterface/PageInterface'
import { useDashStore, useDashRoute } from './dashStore';
// import React from 'react'

const PathMap = {
    store: 'Store',
    products: 'Products',
    dash_product: 'Dashboard',
    preview: 'Preview',
    statistic: 'Statistic',
    action: 'Action',
    new_product: 'New Product',
}


export function Dash() {
    const { currentChild , openChild } = useDashStore();
    const { pathList, setAbsPath } = useDashRoute()
    console.log(currentChild);
    
    const paths: string[] = []
    pathList.forEach((p) => {
        //@ts-ignore
        if (PathMap[p]) paths.push(PathMap[p]) 
    })
    return (
        <div className='dash'>
            <NavBar />
            <div className="dash-ctn">
                <div className="center">
                    <div className="center-top">
                        <div className="page-path">
                            {paths.map((p, i) => (
                                <div className='path' key={i}>
                                    <div className="label" onClick={() => {
                                       const a = pathList.slice(1, i + 2);
                                       setAbsPath(a as any)
                                    }}>{p}<span></span></div>
                                    {paths[i + 1] ? <div className="icon"></div> : undefined}
                                </div>
                            ))}
                        </div>
                        <div className="top-right">
                            <div className="search"></div>
                            <div className="notf"> <span></span></div>
                        </div>
                    </div>
                    <div className="center-ctn">
                    <PageProduct />
                    <PageUser />
                    <PageChat />
                    <PageInterface />
                    </div>
                </div>
            </div>
            <div className="child-viewer"  style={{display:currentChild?'flex':'none'}}>
                <div className="child-viewer-ctn" onClick={(e)=>{
                // if(e.currentTarget == e.target) 
                openChild(undefined);
            }}>
                {currentChild}
            </div>
            </div>
        </div>
    )
}








