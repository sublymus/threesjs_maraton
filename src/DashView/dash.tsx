
import './index.css'
import './Dash.css'
import { NavBar } from './Component/NavBar/NavBar'
import { PageProduct } from './Layout/PageProduct/PageProduct'
import { PageClient } from './Layout/PageClient/PageClient'
import { PageChat } from './Layout/PageChat/PageChat'
import { PageInterface } from './Layout/PageInterface/PageInterface'
import { useDashStore, useDashRoute } from './dashStore';
import { PageCategory } from "./Layout/PageCategory/PageCategory";
import { PageFeature } from "./Layout/PageFeature/PageFeature";
import { PageCatalog } from './Layout/PageCatalog/PageCatalog'
import { PageAuth } from './Layout/PageAuth/PageAuth'
import { useEffect } from 'react'
import { useRegisterStore } from './Layout/PageAuth/RegisterStore'

import { PageRole } from './Layout/PageRole/PageRole'
import { PageCollaborator } from './Layout/PageCollaborator/PageCollaborator'
import { useRoleStore } from './Layout/PageRole/RoleStore'
// import React from 'react'

const PathMap = {
    store: 'Store',
    products: 'Products',
    categories: 'Categories',
    features: 'Features',
    catalogs: 'Catalogs',
    dash_product: 'Edit Product',
    dash_categories: 'Edit Category',
    dash_features: 'Edit Feature',
    dash_catalogs: 'Edit Catalog',
    preview: 'Preview',
    statistic: 'Statistic',
    action: 'Action',
    new_product: 'New Product',
    new_category: 'New Category',
    product_preview: 'Product Preview',
    user: 'Users',
    clients: 'clients',
    collaborators: 'Collaborator',
    client_profile: 'Profile',
    collaborator_profile: 'Profile',
    roles: 'Roles',
    create_role: 'New Role',
    edit_role: 'Editor',
    new_collaborator: 'New Collaborator',
    chat:'Chat'

}


export function Dash() {
    const { currentChild, openChild, fetchUsersVar, fetchStoreVar, T , setT ,back_color } = useDashStore();
    const { authenticateUser, user } = useRegisterStore();
    const { pathList, setAbsPath } = useDashRoute()
    const { fetchRolesJson } = useRoleStore()
    const paths: string[] = []
    pathList.forEach((p) => {
        //@ts-ignore
        if (PathMap[p]) paths.push(PathMap[p])
    })

    useEffect(() => {
        authenticateUser().then(()=>{
            console.log('####### after auth #########');
            fetchStoreVar();
            fetchRolesJson();
            fetchUsersVar();
        });
        
    }, []);

    return (
        <div className={'dash ' + (T ? 'sombre-mode-variable' : '')}>
            <NavBar blur={!!currentChild} />
            {(!user) && <PageAuth />}
            <div className={"dash-ctn " + (user ? (currentChild? 'blur':'') : 'blur')}>
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
                            <div className={"dark-mode " + T} onClick={() => {
                                setT(T ? '' : 'active');
                            }}><span className="dark-mode-btn"></span> <span className="dark-white-btn"> </span></div>
                            <div className="notf"> <span></span></div>
                        </div>
                    </div>
                    <div className="center-ctn">
                        <PageProduct />
                        <PageCategory /> 
                        <PageCatalog />
                        <PageFeature />

                        <PageClient />
                        <PageCollaborator />
                        <PageRole />

                        <PageChat />
                        <PageInterface />
                    </div>
                </div>
            </div>
            {currentChild && <div className="child-viewer" >
                <div className="child-viewer-ctn"style={{background:back_color}} onClick={() => {
                    openChild(undefined);
                }}>
                    {currentChild}
                </div>
            </div>
            }
        </div>
    )
}








