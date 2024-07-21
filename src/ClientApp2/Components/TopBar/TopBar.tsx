import { useEffect, useState } from 'react'
import './TopBar.css'
import { useAppRouter } from '../../AppStore';
import { Host } from '../../../Config';
import { useWindowSize } from '../../../Hooks';
import { getImg } from '../../../Tools/StringFormater';
import { bindTopToParentScroll } from '../../../Tools/BindToParentScroll';
import { disableNotifications } from '../../../Tools/Notification';
import { useRegisterStore } from "../../Layout/PageRegister/RegisterStore";
const navs = [{
    u: 'products',
    n: 'Home',
    i: '/src/res/application.png'
}, {
    u: 'categories',
    n: 'Categories',
    i: '/src/res/catalog.png'
}, {
    u: 'favorites',
    n: 'Favorites',
    i: '/src/res/shopping-cart.png'
}, {
    u: 'cart',
    n: 'Cart',
    i: '/src/res/chat.png'
}, {
    u: 'profile',
    n: 'Prolife',
    i: '/src/res/chat.png'
}
]

export function Footer() {

    const { setAbsPath } = useAppRouter();
    return (
        <footer className="footer">
            <ul className='links'>
                {
                    navs.map((d, i) => (
                        <li key={i} style={{ pointerEvents: 'initial' }} onClick={() => setAbsPath([d.u as any])}>
                            <span style={{ background: getImg(d.i, '60%') }}></span>{d.n}
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

    const { setAbsPath, pathList } = useAppRouter();
    const [active, setActive] = useState(pathList[1] as string || 'home');
    const [liteMode, setLiteMode] = useState(false);
    const [openMoreNavs, setOpenMoreNavs] = useState(false);
    // const { user , } = useAppStore();

    const { user, getAccess } = useRegisterStore()
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
    }, []);

    return (
        <div className="top-bar" ref={bindTopToParentScroll(80, '.web')}>
            <div className="top-bar-ctn">
                <div className="left">
                    <a href={`#products`} className="logo-ctn" onClick={(e) => {
                        e.preventDefault();e.stopPropagation()
                        update('products');
                    }}>
                        <div className="icon"></div>
                    </a>
                </div>
                <ul className='top-bar-center'>
                    {
                        navs.map((d, i) => i * 150 < size.width - 400 ? (
                            <li key={i} className={active == d.u ? 'active' : ''} onClick={() => {
                                update(d.u);
                            }}><span></span>{d.n}</li>
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
                    {user ? (
                        <div className="profile" style={{ background: `no-repeat center/cover url(${user?.photos[0]?.startsWith('/') ? Host : ''}${user?.photos}),#bbb` }}
                            onClick={() => disableNotifications({
                                user: user,
                                target: 'all'
                                // user_browser_id:'e8e34d4f-3e3e-4dc4-9ecd-7cf8d2f16922'
                            }).then(res => {
                                console.log(res);

                            })}>
                        </div>
                    ) : <div className="login" onClick={() => getAccess()}>Se connecter</div>}
                </div>
            </div>
            <div className='more-navs' onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <ul className={openMoreNavs ? '' : 'close'}>
                    {
                        navs.map((d, i) => i * 150 >= size.width - 400 ? (
                            <li key={i} className={active == d.u ? 'active' : ''} onClick={() => {
                                update(d.u)
                                setOpenMoreNavs(!openMoreNavs);
                            }}><span style={{ background: getImg(d.i, '60%') }}></span>{d.n}</li>
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