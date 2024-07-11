import './Web.css';
import './index.css'
import { PageHome } from "./Layout/PageHome/PageHome";
import { PageEditStore } from "./Layout/PageEditStore/PageEditStore";
import { PageTutorial } from "./Layout/PageTutorial/PageTutorial";
import { /* Footer, */ Footer, TopBar } from './Component/TopBar/TopBar'
import { PageNewStore } from "./Layout/PageNewStore/PageNewStore";
import { StorePage } from "./Layout/PageStoreList/StorePage";
import { useWebRoute, useWebStore } from './WebStore';
import { useEffect, useState } from 'react';
import { PagePricing } from "./Layout/PagePricing/PagePricing";
import { PageForum } from "./Layout/PageForum/PageForum";
import { NewSubject } from "./Layout/PageForum/NewSubject";
import { notifPermission } from '../Hooks';
import { sendNotificationData } from '../Tools/Notification';


export function Web() {
    const { tryToken, blur, currentChild, openChild, back_color,owner } = useWebStore();
    const { pathList } = useWebRoute();
    useEffect(() => {
        openChild(undefined)
    }, [pathList])
    const [canGo, setCanGo] = useState(false)
    useEffect(() => {
        tryToken();
    }, [])
   const permission =  notifPermission()
    useEffect(()=>{
        console.log(permission);
        
        (owner && permission =='granted') && sendNotificationData(owner);
    },[permission,owner])
    const [web, setWeb] = useState<HTMLDivElement | null>(null)
    // useEffect(()=>{
    //     if (ref.current?.requestFullscreen) {
    //         ref.current?.requestFullscreen();
    //         //@ts-ignore
    //     } else if (ref.current?.webkitRequestFullscreen) { /* Safari */
    //         //@ts-ignore
    //         ref.current?.webkitRequestFullscreen?.();
    //         //@ts-ignore
    //     } else if (ref.current?.msRequestFullscreen) { /* IE11 */
    //         //@ts-ignore
    //         ref.current?.msRequestFullscreen?.();
    //     }
    // },[pathList])
    return (
        <div className="web sombre-mode-variable" /*  */ref={ref => {
            setWeb(ref);
            if (!ref) return;
            if (ref.dataset.init) return;
            ref.dataset.init = 'init'
            ref.addEventListener('scroll', () => {
                setCanGo((ref.scrollTop || 0) > 200)
            })
        }}>
            {canGo && <div className="go-top" onClick={() => {
                web && (web.scrollTop = 0)
            }}>
                <div className="icon"></div>
            </div>}
            <div className="web-ctn" style={{ filter: blur ? `blur(10px)` : '' }}>
                <div className="background">
                </div>
                <TopBar />
                <div className="page-ctn">
                    <PageHome />
                    <PageEditStore />
                    <PageTutorial />
                    <StorePage/>
                    <PageNewStore/>
                    <PagePricing/>
                    <PageForum/>
                    <NewSubject/>
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

            <Footer />
        </div>
    )
}