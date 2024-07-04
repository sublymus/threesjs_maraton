import './Web.css';
import './index.css'
import { PageHome } from "./Layout/PageHome/PageHome";
import { PageEditStore } from "./Layout/PageEditStore/PageEditStore";
import { PageTutorial } from "./Layout/PageTutorial/PageTutorial";
import { /* Footer, */ Footer, TopBar } from './Component/TopBar/TopBar'
import { PageNewStore } from "./Layout/PageNewStore/PageNewStore";
import { useWebRoute, useWebStore } from './WebStore';
import { useEffect, useState } from 'react';

export function Web() {
    const { tryToken, blur, currentChild, openChild, back_color } = useWebStore();
    const { pathList } = useWebRoute();
    useEffect(() => {
        openChild(undefined)
    }, [pathList])
    const [canGo, setCanGo] = useState(false)
    useEffect(() => {
        tryToken();
    }, [])
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
        <div className="web unselectable" ref={ref => {
            setWeb(ref);
            if (!ref) return;
            if (ref.dataset.init) return;
            ref.dataset.init = 'init'
            ref.addEventListener('scroll', () => {
                ref
                console.log(ref.scrollTop);
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
                    <PageNewStore/>
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