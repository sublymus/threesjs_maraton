// import React from 'react'
import { useEffect, useState } from 'react';
import { useDashRoute } from '../../dashStore'
import './NavBar.css'
import { useRegisterStore } from '../../Layout/PageAuth/RegisterStore';
import { Host } from '../../../Config';

export function NavBar ({blur}:{blur:boolean}){
    const { setAbsPath , pathList} = useDashRoute();
    const [active , setActive] = useState(pathList[1]||'products');
    const { user , store , disconnection } = useRegisterStore();
    
    useEffect(()=>{
        setActive(pathList[1]||'products')
    },[pathList])
    
    return (
        <div className={"nav-bar "+(user?(blur?'blur':''):'blur')}>
                <div className="nav-logo">
                    <div className="logo" style={{backgroundImage:`url(${`${Host}${store?.banners[0]}`})`}}></div>
                    <div className="label">{store?.name}</div>
                </div>
                <div className="nav-link">
                    <ul>
                        <li className={((active=='products'||active=='features'||active=='categories'||active=='catalogs')?'active':'no')} onClick={()=>{ 
                            setActive('products')
                            setAbsPath(['products'])
                        }}><span className='product'></span><label>{'STORE'}</label></li>
                        <li className={((active=='clients'||active=='collaborators'||active=='roles')?'active':'no')} onClick={()=>{
                            setActive('clients')
                            setAbsPath(['clients'])
                        }}><span className='users'></span><label>{'USERS'}</label></li>
                        <li className={((active=='chat')?'active':'no')} onClick={()=>{
                            setActive('chat')
                            setAbsPath(['chat'])
                        }}><span className='chat'></span><label>{'CHAT'}</label></li>
                        <li className={((active=='interface')?'active':'no')} onClick={()=>{
                            setActive('interface')
                            setAbsPath(['interface'])
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

