
import './index.css'
import './Dash.css'
import { NavBar } from './Component/NavBar/NavBar'
import { TopBar } from './Component/TopBar/TopBar'
import { DetailProduct } from './Component/DetailProduct/DetailProduct'
import { DetailUser } from './Component/DetailUser/DetailUser'
import { DetailChat } from './Component/DetailChat/DetailChat'
import { PageProduct } from './Layout/PageProduct/PageProduct'
import { PageUser } from './Layout/PageUser/PageUser'
import { PageChat } from './Layout/PageChat/PageChat'
import { PageInterface } from './Layout/PageInterface/PageInterface'
import { useDashStore, useDashRoute } from './dashStore';
import { useEffect } from 'react'
// import React from 'react'

const PathMap = {
    product: 'Products',
    list_product: 'List',
    dash_product: 'Dash',
    preview: 'Preview',
    stat_product: 'Statistique',
    action: 'Action',
}


export function Dash() {
    const { } = useDashStore();
    const { pathList, check, Pages} = useDashRoute()

    const paths: string[] = []
    pathList.forEach((p) => {
        //@ts-ignore
        if (PathMap[p]) paths.push(PathMap[p])
    })
    return (
        <div className='dash'>
            <TopBar />
            <div className="dash-ctn">
                <NavBar />
                <div className="center">

                    <div className="center-ctn">
                        {
                            check('center_top') && <div className="center-top">

                                <div className="page-path">
                                    {paths.map((p, i) => (
                                        <div className='path' key={i}>
                                            <div className="label">{p}</div>
                                            {paths[i + 1] ? <div className="icon"></div> : undefined}
                                        </div>
                                    ))}
                                </div>
                                <div className="top-right">
                                    <div className="search"></div>
                                    <div className="notf"> <span></span></div>
                                </div>
                            </div>
                        }
                        <PageProduct />
                        <PageUser />
                        <PageChat />
                        <PageInterface />

                    </div>
                </div>
                {(!pathList.find(p=>p.includes('list')))&&(<div className="detail">
                    <DetailProduct />
                    <DetailUser />
                    <DetailChat />
                </div>)}
            </div>

        </div>
    )
}








