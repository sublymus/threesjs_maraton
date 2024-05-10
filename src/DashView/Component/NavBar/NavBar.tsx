// import React from 'react'
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../Hooks';
import { useDashRoute } from '../../dashStore'
import './NavBar.css'
import { useRegisterStore } from '../../Layout/PageAuth/RegisterStore';
import { Host } from '../../../Config';

export function NavBar ({blur}:{blur:boolean}){
    const { setAbsPath , pathList} = useDashRoute();
    const [active , setActive] = useState(pathList[1]||'products');
    const { user , store , disconnection } = useRegisterStore();
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
                    <div className="logo" style={{backgroundImage:`url(${`${Host}${store?.banners[0]}`})`}}></div>
                    {showText&&<div className="label">{store?.name}</div>}
                </div>
                <div className="nav-link">
                    <ul>
                        <li className={width+' '+((active=='products'||active=='features'||active=='categories'||active=='catalogs')?'active':'no')} onClick={()=>{ 
                            setActive('products')
                            setAbsPath(['products'])
                        }}><span className='product'></span>{ showText&&'STORE'}</li>
                        <li className={width+' '+((active=='clients'||active=='collaborators'||active=='roles')?'active':'no')} onClick={()=>{
                            setActive('clients')
                            setAbsPath(['clients'])
                        }}><span className='users'></span>{showText&&'USERS'}</li>
                        <li className={width+' '+((active=='chat')?'active':'no')} onClick={()=>{
                            setActive('chat')
                            setAbsPath(['chat'])
                        }}><span className='chat'></span>{showText&&'CHAT'}</li>
                        <li className={width+' '+((active=='interface')?'active':'no')} onClick={()=>{
                            setActive('interface')
                            setAbsPath(['interface'])
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

