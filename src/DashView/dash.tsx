
import './index.css'
import './Dash.css'
import { NavBar } from './Component/NavBar/NavBar'
import { PageProduct } from './Layout/PageProduct/PageProduct'
import { PageUser } from './Layout/PageUser/PageUser'
import { PageChat } from './Layout/PageChat/PageChat'
import { PageInterface } from './Layout/PageInterface/PageInterface'
import { useDashStore, useDashRoute } from './dashStore';
import { PageCategory } from "./Layout/PageCategory/PageCategory";
import { PageFeature } from "./Layout/PageFeature/PageFeature";
import { PageCatalog } from './Layout/PageCatalog/PageCatalog'
import { useState } from 'react'
// import React from 'react'

const PathMap = {
    store: 'Store',
    products: 'Products',
    categories: 'Categories',
    features: 'Features',
    catalogs: 'Catalogs',
    dash_product: 'Editor',
    dash_categories:'Editor',
    dash_features:'Editor',
    dash_catalogs:'Editor',
    preview: 'Preview',
    statistic: 'Statistic',
    action: 'Action',
    new_product: 'New Product',
    product_preview:'Product Preview'
}

export function Dash() {
    const { currentChild, openChild } = useDashStore();
    const { pathList, setAbsPath } = useDashRoute()
    const [active, setActive] = useState('')
    const paths: string[] = []
    pathList.forEach((p) => {
        //@ts-ignore
        if (PathMap[p]) paths.push(PathMap[p])
    })
    return (
        <div className={'dash ' + (active ? 'sombre-mode-variable' : '')}>
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
                        <div className="top-right material-symbols-outlined">
                            <div className={"dark-mode " + active} onClick={() => {
                                setActive(active ? '' : 'active');
                            }}><span className="dark-mode-btn">dark_mode</span><span className=''></span> <span className="dark-white-btn material-symbols-outlined">light_mode </span></div>
                            <div className="notf"> <span></span></div>
                        </div>
                    </div>
                    <div className="center-ctn">
                        <PageProduct />
                        <PageCategory />
                        <PageCatalog />
                        <PageFeature />
                        <PageUser />
                        <PageChat />
                        <PageInterface />
                    </div>
                </div>
            </div>
            {currentChild && <div className="child-viewer" >
                <div className="child-viewer-ctn" onClick={(e) => {
                    // if(e.currentTarget == e.target) 
                    openChild(undefined);
                }}>
                    {currentChild}
                </div>
            </div>
            }
        </div>
    )
}








