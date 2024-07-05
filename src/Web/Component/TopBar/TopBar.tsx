import { useEffect, useState } from 'react'
import './TopBar.css'
import { useWebRoute, useWebStore } from '../../WebStore';
import { Host, Local } from '../../../Config';
import { useWindowSize } from '../../../Hooks';
import { getImg } from '../../../Tools/StringFormater';
import { bindTopToParentScroll } from '../../../Tools/BindToParentScroll';

const navs = [{
    u: 'home',
    n: 'Home',
    i: '/src/res/application.png'
}
    //     ,
    // {
    //     u: 'store_list',
    //     n: 'Stores',
    //     i: '/src/res/store.png'
    // }
    , {
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
}
]

export function Footer() {

    const { setAbsPath } = useWebRoute();
    return (
        <footer className="footer">
            <ul className='links'>
                {
                    navs.map((d, i) => (
                        <li key={i} style={{ pointerEvents: 'initial' }} onClick={() => setAbsPath([d.u as any])}>
                            <span style={{ background: getImg(d.i, '80%') }}></span>{d.n}
                        </li>
                    ))
                }
            </ul>
            <div className="more-info">
                <div> <p>Site to create your own customizable store online. </p><a href="/#tutorial"> Learn how</a>.</div>

                <div><p>Sublymus © 2024</p></div>

                <div><a href="/#about">Terms of Service</a> - <a href="/#about">Privacy Policy</a></div>
                <div><p>Need help?</p> <a href="/#contact">Contact Us</a></div>
            </div>
        </footer>
    )
}

export function TopBar() {

    const { setAbsPath, pathList } = useWebRoute();
    const [active, setActive] = useState(pathList[1] as string || 'home');
    const [liteMode, setLiteMode] = useState(false);
    const [openMoreNavs, setOpenMoreNavs] = useState(false);
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
        window.addEventListener('click', () => {
            const c = document.querySelector('.top-bar .more-navs ul')
            if (c?.className == '') setOpenMoreNavs(false)
        })
    }, [])

    return (
        <div className="top-bar" ref={bindTopToParentScroll(80, '.web')}>
            <div className="top-bar-ctn">
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
                        navs.map((d, i) => i * 200 < size.width - 400 ? (
                            <li key={i} className={active == d.u ? 'active' : ''} onClick={() => update(d.u)}><span style={{ background: getImg(d.i, '80%') }}></span>{d.n}</li>
                        ) : null)
                    }
                </ul>

                <div className="right">
                    <div className="ctn-icon" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenMoreNavs(!openMoreNavs)
                    }}>
                        <div className="icon"></div>
                    </div>
                    {owner ? (
                        <div className="profile" style={{ background: `no-repeat center/cover url(${owner?.photos[0]?.startsWith('/') ? Host : ''}${owner?.photos}),#bbb` }}>
                        </div>
                    ) : <div className="login" onClick={() => createOwner()}>Se connecter</div>}
                </div>
            </div>
            <div className='more-navs' onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <ul className={openMoreNavs ? '' : 'close'}>
                    {
                        navs.map((d, i) => i * 200 >= size.width - 400 ? (
                            <li key={i} className={active == d.u ? 'active' : ''} onClick={() => update(d.u)}><span style={{ background: getImg(d.i, '80%') }}></span>{d.n}</li>
                        ) : null)
                    }
                    <li className={active == 'mode-lite' ? 'active' : ''} onClick={() => {
                        setLiteMode(!liteMode)
                    }}><span style={{ background: getImg('/src/res/mark.png', '70%') }} ></span>{liteMode ? 'Lite mode off' : 'Lite mode on'}</li>
                </ul>
            </div>
        </div>
    )
}
document.querySelector