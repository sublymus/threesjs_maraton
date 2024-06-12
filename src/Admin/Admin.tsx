
import '../DashView/index.css'
import '../DashView/Dash.css'
import { useAdminRoute, useAdminStore } from "./AdminStore";
import { useEffect } from 'react';
import { PageInfo } from "./Layouts/Store/PageInfo/PageInfo";
import { NavBar } from './Components/NavBar/NavBar'
import { StorePage } from "./Layouts/Store/StorePage";
import { PageAuth } from './Layouts/PageAuth/PageAuth';
import { useRegisterStore } from './Layouts/PageAuth/RegisterStore';
import { PageUser } from './Layouts/Users/PageUser'
import { PageModerator } from "./Layouts/Moderators/PageModerator";
import { PageRole } from "./Layouts/Roles/PageRole";
import { PageChat } from "./Layouts/Chat/PageChat";
const PathMap = {
    stores: 'Stores',
    store_info: 'Store Info',
    roles: 'Roles',
    edit_role: 'Edit Role',
    create_role: 'Create Role',
    users: 'Users',
    user_profile: 'User Profile',
    chat: 'Chat',
    discussions: 'Discussions',
    groups: 'Groups',
    surveys: 'Surveys',
    interface: 'Interfaces',
    statistic: 'Statistic',
    action: 'Action',
    moderators: 'Moderators',
    moderator_profile: 'Moderator Profile'
}
export function Admin() {

    const { currentChild, blur, openChild, T, setT, back_color } = useAdminStore();
    const { authenticateUser, user } = useRegisterStore();
    const { pathList, setAbsPath, } = useAdminRoute()
    const paths: string[] = []

    pathList.forEach((p) => {
        //@ts-ignore
        if (PathMap[p]) paths.push(PathMap[p])
    })

    useEffect(() => {
        authenticateUser();
        window.addEventListener('blur', () => {
            openChild(undefined)
        })
    }, []);

    return (
        <div className={'dash ' + (T ? 'sombre-mode-variable' : '')} >
            <NavBar blur={blur} />
            {!user && <PageAuth />}
            <div className={"dash-ctn " + (user ? (blur ? 'blur' : '') : 'blur')}>
                <div className="center">
                    <div className="center-top">
                        <div className="nav-min" onClick={() => {
                            openChild(<NavBar blur={blur} />, undefined, '#345')
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

                        <div className="top-right">
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
                        <StorePage />
                        <PageInfo />
                        <PageUser />
                        <PageModerator />
                        <PageRole />
                        <PageChat />
                    </div>
                </div>
            </div>
            {currentChild && <div className="child-viewer" onContextMenu={(e) => {
                e.preventDefault();
                openChild(undefined)
            }} >
                <div className="child-viewer-ctn" style={{ background: back_color }} onClick={() => {
                    openChild(undefined);
                }} onContextMenu={(e) => {
                    e.preventDefault();
                    openChild(undefined)
                }}>
                    {currentChild}
                </div>
            </div>
            }
        </div>
    )
}








