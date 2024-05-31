import './Web.css';
import { PageHome } from "./Layout/PageHome/PageHome";
import { PageNewStore } from "./Layout/PageNewStore/PageNewStore";
import { StorePage } from "./Layout/PageStoreList/StorePage";
import { TopBar } from './Component/TopBar/TopBar'
import { useWebStore } from './WebStore';
import { useEffect } from 'react';

export function Web() {
    const { tryToken, owner, owner_stores,blur, currentChild, openChild, back_color } = useWebStore();

    useEffect(() => {
        tryToken();
    }, [])

    useEffect(() => {
        owner_stores({});
    }, [owner])

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