// import React from 'react'
import { useState } from 'react';
import { useWindowSize } from '../../../Hooks';
import { useDashRoute } from '../../dashStore'
import './NavBar.css'

export function NavBar (){
    const { check , setAbsPath  , setPath} = useDashRoute();
    const [active , setActive] = useState('product')
    const size = useWindowSize();
    let width = size.width>=1300?'large':'small'
    const showText = width == 'large';
    width += size.width<1180?' option ':''
    return check('/')&&(
        <div className={"nav-bar "+ width}>
                <div className="nav-logo">
                    <div className="logo" style={{backgroundImage:`url(${'/src/res/img/logo2.png'})`}}></div>
                    {showText&&<div className="label">SUBLYMUS</div>}
                </div>
                <div className="nav-link">
                    <ul>
                        <li className={width+' '+active=='product'?'active':'no'} onClick={()=>{ 
                            setActive('product')
                            setAbsPath(['store','list_product'])
                        }}><span className='product'></span>{ showText&&'STORE'}</li>
                        <li className={width+' '+active=='users'?'active':'no'} onClick={()=>{
                            setActive('users')
                            setAbsPath(['store','dash_product'])
                        }}><span className='users'></span>{showText&&'USERS'}</li>
                        <li className={width+' '+active=='chat'?'active':'no'} onClick={()=>{
                            setActive('chat')
                            setPath('../')
                        }}><span className='chat'></span>{showText&&'CHAT'}</li>
                        <li className={width+' '+active=='interface'?'active':'no'} onClick={()=>{
                            setActive('interface')
                            setAbsPath(['store','list_product'])
                        }}><span className='interface'></span>{showText&&'INTERFACE'}</li>
                        <li className={width+' '+active=='state'?'active':'no'} onClick={()=>{
                            setActive('state')
                            setAbsPath(['store','list_product'])
                        }}><span className='state'></span>{showText&&'STATISTIC'}</li>
                    </ul>
                </div>
                {showText&&<div className="nav-profile">
                    <div className="img"></div>
                    <div className="name">Kouassi Noga</div>
                    <div className="logout">logout</div>
                </div>}
        </div>
    )
}

