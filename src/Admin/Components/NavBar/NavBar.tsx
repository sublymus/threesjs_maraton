// import React from 'react'
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../Hooks';
import { useAdminRoute } from '../../AdminStore'
import './NavBar.css'
import { useRegisterStore } from '../../Layouts/PageAuth/RegisterStore';
import { Host } from '../../../Config';

const sublymus = {
    name:'Sublymus',
    logo:['/src/res/img/img3.svg']
}

export function NavBar ({blur}:{blur:boolean}){
    const { setAbsPath , pathList} = useAdminRoute();
    const [active , setActive] = useState(pathList[1]||'products');
    const { user, disconnection } = useRegisterStore();
    const size = useWindowSize();
    let width = size.width>=1300?'large':'small'
    const showText = width == 'large';
    width += size.width<1180?' option ':''
    useEffect(()=>{
        setActive(pathList[1]||'products')
    },[pathList])
    
    return (
        <div className={"nav-bar "+ width +" "+(user?(blur?'blur':''):'blur')}>
                <div className="nav-logo">
                    <div className="logo" style={{backgroundImage:`url(${`${sublymus?.logo[0]}`})`}}></div>
                    {showText&&<div className="label">{sublymus?.name}</div>}
                </div>
                <div className="nav-link">
                    <ul>
                    <li className={width+' '+((active=='stores')?'active':'no')} onClick={()=>{
                            setActive('stores')
                            setAbsPath(['stores'])
                        }}><span className='stores'></span>{showText&&'STORE'}</li>
                       <li className={width+' '+((active=='users' || active=='moderators'||active=='roles')?'active':'no')} onClick={()=>{
                            setActive('users')
                            setAbsPath(['users'])
                        }}><span className='users'></span>{showText&&'USERS'}</li>
                         <li className={width+' '+((active=='chat')?'active':'no')} onClick={()=>{
                            setActive('chat')
                            setAbsPath(['chat'])
                        }}><span className='chat'></span>{showText&&'CHAT'}</li>
                        <li className={width+' '+((active=='interfaces')?'active':'no')} onClick={()=>{
                            setActive('interfaces')
                            setAbsPath(['interfaces'])
                        }}><span className='interface'></span>{showText&&'INTERFACE'}</li>
                        <li className={width+' '+((active=='statistic')?'active':'no')} onClick={()=>{
                            setActive('statistic')
                            setAbsPath(['statistic'])
                        }}><span className='state'></span>{showText&&'STATISTIC'}</li>
                    </ul>
                </div>
                {showText?<div className="nav-profile">
                    <div className="img" style={{background :`no-repeat center/cover url(${user?.photos[0].startsWith('/')?Host:''}${user?.photos[0]})`}}></div>
                    <div className="name">{user?.name}</div>
                    <div className="logout" onClick={()=>{
                        disconnection()
                    }}>logout</div>
                </div>: <div className="logut-icon" onClick={()=>{
                    disconnection()
                }}></div>
                }
        </div>
    )
}

