// import React from 'react'
import { useState } from 'react';
import { useWindowSize } from '../../../Hooks';
import { useDashRoute } from '../../dashStore'
import './NavBar.css'

export function NavBar (){
    const { check , setAbsPath  , setPath} = useDashRoute();
    const [active , setActive] = useState('product')
    const size = useWindowSize();
    const width = size.width>=1500?'large':'small'
    return check('/')&&(size.width >=1500 )&&(
        <div className={"nav-bar "+ width}>
                <div className="nav-logo">
                    <div className="logo" style={{backgroundImage:`url(${'/src/res/img/logo2.png'})`}}></div>
                    <div className="label">SUBLYMUS</div>
                </div>
                <div className="nav-link">
                    <ul>
                        <li className={active=='product'?'active':'no'} onClick={()=>{ 
                            setActive('product')
                            setAbsPath(['product','list_product'])
                        }}><span className='product'></span> PRODUCT</li>
                        <li className={active=='users'?'active':'no'} onClick={()=>{
                            setActive('users')
                            setAbsPath(['product','dash_product'])
                        }}><span className='users'></span>USERS</li>
                        <li className={active=='chat'?'active':'no'} onClick={()=>{
                            setActive('chat')
                            setPath('../')
                        }}><span className='chat'></span>CHAT</li>
                        <li className={active=='interface'?'active':'no'} onClick={()=>{
                            setActive('interface')
                            setAbsPath(['product','list_product'])
                        }}><span className='interface'></span>INTERFACE</li>
                        <li className={active=='state'?'active':'no'} onClick={()=>{
                            setActive('state')
                            setAbsPath(['product','list_product'])
                        }}><span className='state'></span>STATISTIC</li>
                    </ul>
                </div>
                <div className="nav-profile">
                    <div className="img"></div>
                    <div className="name">Kouassi Noga</div>
                    <div className="logout">logout</div>
                </div>
        </div>
    )
}

