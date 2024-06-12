import { Products } from './Components/Products/Products'
import { Editer } from './Components/Editer/Editer'
import { Catalogue } from './Components/Catalogue/Catalogue'
import { TopBar } from './Components/TopBar/TopBar'
import { Profile } from './Layout/PageProfile/Profile'
import { CatalogueOnglet } from './Components/CatalogueOnglet/CatalogueOnglet'
import { CatalogueDescription } from './Components/CatalogueDescription/CatalogueDescription'
import { Summary } from "./Components/Summary/Summary";
import './App.css'
import { useEffect, useRef } from 'react'
import { useRegisterStore } from './Layout/PageRegister/RegisterStore'
import { useAppStore } from './AppStore'
import { WorldManager } from '../World/WorldManager'

const root = document.getElementById('root')!;

export function App() {
    const { authenticateUser } = useRegisterStore();
    const { openChild, currentChild, back_color, blur } = useAppStore();
    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        authenticateUser().then(() => {
            ref.current?.appendChild(WorldManager.tactil.getView())
        });
        window.addEventListener('blur', () => {
            openChild(undefined)
        })
        if (WorldManager.worldManager) return;
        const w = document.getElementById('world')!
        root.prepend(w);
        const world = new WorldManager(w);
        world.animus(0);
    }, []);
    useEffect(() => {
        if (ref.current) {
            // const scroller = new VirtualScroll({

            // })
            // scroller.on(event => {
            //     // wrapper.style.transform = `translateY(${event.y}px)`
            //     console.log(event);
            // })
            ref.current.appendChild(WorldManager.tactil.getView())
        }
    }, [ref])

    return (<div className='app' style={{ width: '100%', height: '100%' }} ref={_ => {
        // if (!ref) return;
        // console.log(document.fullscreenEnabled);
        
        // if (document.body.requestFullscreen) {
        //     document.body.requestFullscreen().then(()=>console.log('ok')).catch(()=>console.log('lol'));
        //     //@ts-ignore
        // } else if (document.body.webkitRequestFullscreen) { /* Safari */
        //     //@ts-ignore
        //     document.body.webkitRequestFullscreen();
        //     //@ts-ignore
        // } else if (document.body.msRequestFullscreen) { /* IE11 */
        //     //@ts-ignore
        //     document.body.msRequestFullscreen();
        // }
    }} >
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

        <div ref={ref} className="app-ctn" style={{ filter: blur ? 'blur(10px)' : '' }}>
            <Products />
            <Editer />
            <Summary />
            <TopBar />
            <Profile />
            <CatalogueOnglet />
            <CatalogueDescription />
            <Catalogue />
        </div>
    </div>)
}