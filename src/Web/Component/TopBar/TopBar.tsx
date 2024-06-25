import { useEffect, useState } from 'react'
import './TopBar.css'
import { useWebRoute, useWebStore } from '../../WebStore';
import { Host, Local } from '../../../Config';
import { useWindowSize } from '../../../Hooks';
import { getImg } from '../../../Tools/StringFormater';

const navs = [{
    u: 'home',
    n: 'Home',
    i: '/src/res/application.png'
}, {
    u: 'store_list',
    n: 'Stores',
    i: '/src/res/store.png'
}, {
    u: 'tutorial',
    n: 'Tutorial',
    i: '/src/res/catalog.png'
}, {
    u: 'pricing',
    n: 'Pricing',
    i: '/src/res/shopping-cart.png'
}, {
    u: 'contact',
    n: 'Contact us',
    i: '/src/res/services.png'
}, {
    u: 'updates',
    n: 'Updates',
    i: '/src/res/jigsaw.png'
}, {
    u: 'forum',
    n: 'Forum',
    i: '/src/res/multiple-users-silhouette.png'
}]

export function TopBar() {

    const { setAbsPath, pathList } = useWebRoute();
    const [active, setActive] = useState(pathList[1] as string || 'home');
    const [liteMode, setLiteMode] = useState(false);
    const [openMoreNavs, setOpenMoreNavs ] = useState(false);
    const { owner, createOwner } = useWebStore();
    const size = useWindowSize();
    const update = (active: any) => {
        setAbsPath([active])
        setActive(active)
    }
    useEffect(() => {
        setActive((pathList[1]) || 'home')
    }, [pathList])
    useEffect(() => {
        window.addEventListener('click',()=>{
            const c = document.querySelector('.top-bar .more-navs ul')
            if(c?.className == '') setOpenMoreNavs(false)   
        })
    }, [])

    return (
        <div className="top-bar">
            <div className="left">
                <div className="options" onClick={() => {

                }}>
                </div>
                <a href={`${Local}/web#home`} className="logo-ctn" onClick={() => {
                    update('home');
                }}>
                    <div className="icon"></div>
                </a>
            </div>
            <ul className='top-bar-center'>
                {
                    navs.map((d, i) => i * 150 < size.width - 500 ? (
                        <li className={active == d.u ? 'active' : ''} onClick={() => update(d.u)}><span style={{ background: getImg(d.i, '80%') }}></span>{d.n}</li>
                    ) : <></>)
                }
            </ul>
            <div className='more-navs' onClick={(e)=>{
                 e.preventDefault();
                 e.stopPropagation();
            }}>
                <div className="ctn-icon" onClick={()=>setOpenMoreNavs(!openMoreNavs)}>
                    <div className="icon"></div>
                </div>
                <ul className={openMoreNavs ?'':'close'}>
                    {
                        navs.map((d, i) => i * 150 >= size.width - 500 ? (
                            <li className={active == d.u ? 'active' : ''} onClick={() => update(d.u)}><span style={{ background: getImg(d.i, '80%') }}></span>{d.n}</li>
                        ) : <></>)
                    }
                    <li className={active == 'mode-lite' ? 'active' : ''} onClick={e => {
                        setLiteMode(!liteMode)
                    }}><span style={{ background: getImg('/src/res/mark.png', '70%') }} ></span>{liteMode ? 'Lite mode off' : 'Lite mode on'}</li>
                </ul>
            </div>
            {owner ? (
                <div className="profile-ctn" onClick={() => {
                    // openDisco(!disco);
                }}>

                    <div className="profile" style={{ background: `no-repeat center/cover url(${owner?.photos[0]?.startsWith('/') ? Host : ''}${owner?.photos}),#bbb` }}>
                    </div>
                </div>
            ) : <div className="login" onClick={() => createOwner()}>Se connecter</div>}
        </div>
    )
}
document.querySelector