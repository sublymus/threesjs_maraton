import { useState } from 'react'
import './TopBar.css'

export function TopBar({}:{page?:string, onChange?:(page:string)=>any}) {

    const [active, setActive] = useState('home');

    return (
        <div className="top-bar">
            <div className="logo-ctn">

            </div>
            <ul className='top-bar-center'>
                <li className={active == 'home' ? 'active' : ''} onClick={() => { setActive('home') }}>HOME <span></span></li>
                <li className={active == 'about' ? 'active' : ''} onClick={() => { setActive('about') }}>ABOUT US <span></span></li>
                <li className={active == 'portfolio' ? 'active' : ''} onClick={() => { setActive('portfolio') }}>PORTFOLIO <span></span></li>
                <li className={active == 'contact' ? 'active' : ''} onClick={() => { setActive('contact') }}>CONTACT US <span></span></li>
            </ul>
            <div className="login">LOGIN</div>
        </div>
    )
}