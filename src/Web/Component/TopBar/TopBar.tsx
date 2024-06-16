import { useEffect, useState } from 'react'
import './TopBar.css'
import { useWebRoute, useWebStore } from '../../WebStore';
import { Host } from '../../../Config';

export function TopBar() {

    const { setAbsPath, pathList } = useWebRoute();
    const [active, setActive] = useState(pathList[1] || 'home');
    const [disco, openDisco] = useState(false);
    const { owner, createOwner, disconnection, openChild } = useWebStore();
    const update = (active: any) => {
        setAbsPath([active])
        setActive(active)
    }
    useEffect(() => {
        setActive(pathList[1] || 'home')
    }, [pathList])

    return (
        <div className="top-bar">
            <div className="left">
                <div className="options" onClick={() => {
                    openChild(<ul className='vert-nav'>
                        <li className={active == 'home' ? 'active' : ''} onClick={() => update('home')}>HOME<span></span></li>
                        <li className={(active == 'store_list' || active == 'edit_store' || active == 'new_store') ? 'active' : ''} onClick={() => update('store_list')}>STORES <span></span></li>
                        <li className={active == 'about' ? 'active' : ''} onClick={() => update('about')}>ABOUT US <span></span></li>
                        <li className={active == 'contact' ? 'active' : ''} onClick={() => update('contact')}>CONTACT US <span></span></li>
                    </ul>, true, '#1129')
                }}>
                </div>
                <div className="logo-ctn" onClick={() => {
                    update('home');
                }}>
                </div>
            </div>
            <ul className='top-bar-center'>
                <li className={active == 'home' ? 'active' : ''} onClick={() => update('home')}>HOME <span></span></li>
                <li className={(active == 'store_list' || active == 'edit_store' || active == 'new_store') ? 'active' : ''} onClick={() => update('store_list')}>STORES <span></span></li>
                <li className={active == 'about' ? 'active' : ''} onClick={() => update('about')}>ABOUT US <span></span></li>
                <li className={active == 'contact' ? 'active' : ''} onClick={() => update('contact')}>CONTACT US <span></span></li>
            </ul>
            {owner ? (
                <div className="profile-ctn" onClick={() => {
                    openDisco(!disco);
                }}>
                    <div className="user-name">
                        {owner.name}
                    </div>
                    <div className="profile" style={{ background: `no-repeat center/cover url(${owner?.photos[0]?.startsWith('/') ? Host : ''}${owner?.photos}),#bbb` }}>
                        {disco && <div className="disco" onClick={() => {
                            disconnection();
                            update('home')
                        }}> Disconnection</div>}
                    </div>
                </div>
            ) : <div className="login" onClick={() => createOwner()}>Se connecter</div>}
        </div>
    )
}