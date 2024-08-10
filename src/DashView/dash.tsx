
import './index.css'
import './Dash.css'
// import '../css.css'
import './Component/NavBar/NavBar.css'
import { NavBar } from './Component/NavBar/NavBar'
import { PageProduct } from './Layout/PageProduct/PageProduct'
import { PageClient } from './Layout/PageClient/PageClient'
import { PageChat } from './Layout/PageChat/PageChat'
import { PageInterface } from './Layout/PageInterface/PageInterface'
import { useDashStore, useDashRoute } from './dashStore';
import { PageCategory } from "./Layout/PageCategory/PageCategory";
import { PageCatalog } from './Layout/PageCatalog/PageCatalog'
import { PageAuth } from './Layout/PageAuth/PageAuth'
import { useEffect, useState } from 'react'
import { useRegisterStore } from './Layout/PageAuth/RegisterStore'
import { PageModerator } from "./Layout/PageModerator/pageModerator";
import { PageRole } from './Layout/PageRole/PageRole'
import { PageCollaborator } from './Layout/PageCollaborator/PageCollaborator'
import { useRoleStore } from './Layout/PageRole/RoleStore'
// import { TopBar } from '../Web/Component/TopBar/TopBar'
// import { NavBar } from '../Admin/Components/NavBar/NavBar'
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
    chat: 'Chat',
    interface: 'Interface',
    sessions: 'Sessions',
    discussions: 'Discussions',
    moderators: 'Moderators',
    moderator_profile: 'Moderator Profile'
}

export function Dash() {

    const { currentChild,overlay, blur, openChild, fetchUsersVar, fetchStoreVar, T, setT, back_color } = useDashStore();
    const { authenticateUser, user, store } = useRegisterStore();
    const { pathList, setAbsPath, } = useDashRoute()
    const { fetchRolesJson } = useRoleStore()
    const paths: string[] = []

    pathList.forEach((p) => {
        //@ts-ignore
        if (PathMap[p]) paths.push(PathMap[p])
    })
    useEffect(()=>{
        openChild(undefined)
    },[pathList])
    const [s] = useState<any>({})
    s.overlay = overlay;
    useEffect(() => {
        authenticateUser();
        window.addEventListener('blur', () => {
            // !s.overlay && openChild(undefined)
        })
    }, []);

    useEffect(() => {
        if (store) {
            fetchStoreVar();
            fetchRolesJson();
            fetchUsersVar();
        }
    }, [store]);

    return (
        <div className={'dash ' + (T ? 'sombre-mode-variable' : '')} >
            <NavBar blur={blur} />
            <div className={"dash-ctn " + (user ? (blur ? 'blur' : '') : 'blur')}>
                <div className="center">
                    <div className="center-top">
                        <div className="nav-min" onClick={() => {
                            openChild(( <NavBar className={'max'} blur={blur} />), true, '#345b');
                        }}> <span></span></div>
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

                        <div className="dash-top-right">
                            <div className={"dark-mode " + T} onClick={() => {
                                setT(T ? '' : 'active');
                            }}><span className="dark-mode-btn"></span> <span className="dark-white-btn"> </span></div>
                            <div className="notf"> <span></span></div>
                        </div>
                    </div>
                    <div className="center-ctn" ref={ref => {
                        if (!ref) return;
                        if (ref.dataset.init) return;
                        ref.dataset.init = 'true';
                        const resize = () => {
                            const centerTop = document.querySelector('.dash .center .center-top')!
                            ref.style.height = `calc(100% - ${centerTop.getBoundingClientRect().height}px)`
                        }
                        window.addEventListener('resize', resize)
                        resize()
                    }}>
                        <PageProduct />
                        <PageCategory />
                        <PageCatalog />
                        <PageClient />
                        <PageModerator />
                        <PageCollaborator />
                        <PageRole />

                        <PageChat />
                        <PageInterface />
                    </div>
                </div>
            </div>
            {(!user) && <PageAuth />}
            {currentChild && <div className="child-viewer" onContextMenu={(e) => {
                e.preventDefault();
                !s.overlay &&openChild(undefined)
            }} >
                <div className="child-viewer-ctn" style={{ background: back_color }} onClick={() => {
                    !s.overlay &&openChild(undefined);
                }} onContextMenu={(e) => {
                    e.preventDefault();
                    !s.overlay &&openChild(undefined)
                }}>
                    {currentChild}
                </div>
            </div>
            }
        </div>
    )
}








