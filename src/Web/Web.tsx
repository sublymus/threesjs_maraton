import './Web.css';
import { PageHome } from "./Layout/PageHome/PageHome";
import { PageNewStore } from "./Layout/PageNewStore/PageNewStore";
import { StorePage } from "./Layout/PageStoreList/StorePage";
import { TopBar } from './Component/TopBar/TopBar'
import { useWebRoute, useWebStore } from './WebStore';
import { useEffect } from 'react';

export function Web() {
    const { tryToken, blur, currentChild, openChild, back_color } = useWebStore();
    const {pathList} = useWebRoute();
    useEffect(()=>{
        openChild(undefined)
    },[pathList])
    useEffect(() => {
        tryToken();
    }, [])

 
    return (
        <div className="web">
            <div className="web-ctn" style={{filter :blur ? `blur(10px)`:''}}>
                <div className="background"></div>
                <TopBar />
                <div className="page-ctn">
                    <PageHome />
                    <PageNewStore />
                    <StorePage />
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