
import './index.css'
import './Admin.css'
import { useAdminRoute ,useAdminStore } from "./AdminStore";
import { useEffect } from 'react';
import { NavBar } from './Components/NavBar/NavBar'
import { StorePage } from "./Layouts/Store/StorePage";
import { PageAuth } from './Layouts/PageAuth/PageAuth';
import { useRegisterStore } from './Layouts/PageAuth/RegisterStore';
const PathMap ={
    stores: 'Stores',
    statistic: 'Statistic',
    action: 'Action',
    users: 'Users',
    chat:'Chat',
    discussions:'Discussions'
}
export function Admin() {
    
    const { currentChild, blur ,openChild,  T , setT ,back_color } = useAdminStore();
    const { authenticateUser, user } = useRegisterStore();
    const { pathList, setAbsPath ,} = useAdminRoute()
    const paths: string[] = []

    pathList.forEach((p) => {
        //@ts-ignore
        if (PathMap[p]) paths.push(PathMap[p])
    })

    useEffect(() => {
        authenticateUser();
        window.addEventListener('blur',()=>{
            openChild(undefined)
        }) 
    }, []);
    
    return (
        <div className={'admin ' + (T ? 'sombre-mode-variable' : '')} >
            <NavBar blur={blur} />
            {!user &&  <PageAuth/>}
            <div className={"admin-ctn " + (user ? (blur? 'blur':'') : 'blur') }>
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
                            <div className={"dark-mode " + T} onClick={() => {
                                setT(T ? '' : 'active');
                            }}><span className="dark-mode-btn"></span> <span className="dark-white-btn"> </span></div>
                            <div className="notf"> <span></span></div>
                        </div>
                    </div>
                    <div className="center-ctn">
                        <StorePage/>
                        
                    </div>
                </div>
            </div>
            {currentChild && <div className="child-viewer"  onContextMenu={(e)=>{
                            e.preventDefault();
                            openChild(undefined)
                        }} >
                <div className="child-viewer-ctn"style={{background:back_color}} onClick={() => {
                    openChild(undefined);
                }} onContextMenu={(e)=>{
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








