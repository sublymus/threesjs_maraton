import { Products } from './Components/Products/Products'
import { Editer } from './Components/Editer/Editer'
import { WorldView } from './Components/WorldView/WorldView'
import { Catalogue } from './Components/Catalogue/Catalogue'
import { TopBar } from './Components/TopBar/TopBar'
import { Profile } from './Layout/PageProfile/Profile'
import { CatalogueOnglet } from './Components/CatalogueOnglet/CatalogueOnglet'
import { CatalogueDescription } from './Components/CatalogueDescription/CatalogueDescription'
import { Summary } from "./Components/Summary/Summary";
import VirtualScroll from "virtual-scroll";

import { useEffect, useRef } from 'react'
import { useRegisterStore } from './Layout/PageRegister/RegisterStore'
import { useAppStore } from './AppStore'

const root = document.getElementById('root')!;

export function App() {
    const { authenticateUser } = useRegisterStore();
    const { openChild, currentChild, back_color } = useAppStore();
    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        authenticateUser();
        window.addEventListener('blur', () => {
            openChild(undefined)
        })
    }, []);
    useEffect(() => {
        if (ref.current) {
            const scroller = new VirtualScroll({
                
            })
            scroller.on(event => {
                // wrapper.style.transform = `translateY(${event.y}px)`
                console.log(event);

            })
        }
    }, [ref])
    return (<div className='app' style={{ width: '100%', height: '100%' }} ref={ref}>
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
        <Products />
        <Editer />
        <Summary />
        <WorldView root={root} />
        <TopBar />
        <Profile />
        <CatalogueOnglet />
        <CatalogueDescription />
        <Catalogue />
    </div>)
}