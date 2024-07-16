import './App.css'
import { useEffect, useRef } from 'react'
import { useRegisterStore } from './Layout/PageRegister/RegisterStore'
import { useAppRouter, useAppStore } from './AppStore'
import { PageProducts } from "./Layout/PageProducts/PageProducts";

export function App() {
    const { authenticateUser } = useRegisterStore();
    const { openChild, currentChild, back_color, blur } = useAppStore();
    const ref = useRef<HTMLDivElement | null>(null)
    const {pathList} = useAppRouter()
    
    useEffect(()=>{
        openChild(undefined);
        // const t = document.querySelector('.tactil') as HTMLDivElement;
        // if(t)  {
        //      t.style.display = check('profile') ? 'none':''
        // }
    },[pathList])

    useEffect(() => {
        authenticateUser()
        window.addEventListener('blur', () => {
            openChild(undefined)
        })
        // if (WorldManager.worldManager) return;
        // const w = document.getElementById('world')!
        // root.prepend(w);
        // const world = new WorldManager(w);
        // world.animus(0);
    }, []);
    
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
           <PageProducts/>
           {/* <DetailProduct/> */}
        </div>
    </div>)
}