// import React from 'react'
import { useEffect, useState } from 'react';
import { useAdminRoute } from '../../AdminStore'
import '../../../DashView/Component/NavBar/NavBar.css'
import './NavBar.css'
import { useRegisterStore } from '../../Layouts/PageAuth/RegisterStore';
import { Host } from '../../../Config';

const sublymus = {
    name:'Sublymus',
    logo:['/src/res/img/img3.svg']
}

export function NavBar ({blur, className}:{blur:boolean, className?:string}){
    const { setAbsPath , pathList} = useAdminRoute();
    const [active , setActive] = useState(pathList[1]||'products');
    const { user, disconnection } = useRegisterStore();
    useEffect(()=>{
        setActive(pathList[1]||'products')
    },[pathList])
    
    return (
        <div className={"nav-bar "+(className||'min')+' '+(user?(blur?'blur':''):'blur')}>
                <div className="nav-logo">
                    <div className="logo" style={{backgroundImage:`url(${`${sublymus?.logo[0]}`})`}}></div>
                    {<div className="label">{sublymus?.name}</div>}
                </div>
                <div className="nav-link">
                    <ul>
                    <li className={((active=='stores')?'active':'no')} onClick={()=>{
                            setActive('stores')
                            setAbsPath(['stores'])
                        }}><span className='stores'></span><label>{'STORE'}</label></li>
                       <li className={((active=='users' || active=='moderators'||active=='roles')?'active':'no')} onClick={()=>{
                            setActive('users')
                            setAbsPath(['users'])
                        }}><span className='users'></span><label>{'USERS'}</label></li>
                         <li className={((active=='chat')?'active':'no')} onClick={()=>{
                            setActive('chat')
                            setAbsPath(['chat'])
                        }}><span className='chat'></span><label>{'CHAT'}</label></li>
                        <li className={((active=='interfaces')?'active':'no')} onClick={()=>{
                            setActive('interfaces')
                            setAbsPath(['interfaces'])
                        }}><span className='interface'></span><label>{'INTERFACE'}</label></li>
                        <li className={((active=='statistic')?'active':'no')} onClick={()=>{
                            setActive('statistic')
                            setAbsPath(['statistic'])
                        }}><span className='state'></span><label>{'STATISTIC'}</label></li>
                    </ul>
                </div>
                <div className="nav-profile">
                    <div className="img" style={{background :`no-repeat center/cover url(${user?.photos[0].startsWith('/')?Host:''}${user?.photos[0]})`}}></div>
                    <div className="name">{user?.name}</div>
                    <div className="logout" onClick={()=>{
                        disconnection()
                    }}>logout</div>
                </div>
                <div className="logut-icon" onClick={()=>{
                    disconnection()
                }}></div>
        </div>
    )
}

