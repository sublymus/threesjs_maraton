import './PageProfile.css'
import { useAppRouter } from "../../AppStore";
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { getImg } from '../../../Tools/StringFormater';
import { toFilter } from '../../../Tools/FilterColor';
import { useEffect, useState } from 'react';
import { PageCommand } from '../PageCommand/PageCommand';
import { PageEdit } from './PageEdit/PageEdit'
const mapTitle: any = {
    edit: 'Edit Profile',
    command: 'Orders',
    messages: 'Messages',
    setting: 'Setting',
}

export function PageProfile() {
    const { check, json } = useAppRouter();
    const { user, disconnection,  getAccess } = useRegisterStore()
    const [isOpen, setIsOpen] = useState(true);
    const [page, setPage] = useState('');
    useEffect(() => {
        check('profile') && setPage(json?.page || '')
    }, [json])
    const mapPage: any = {
        command: <PageCommand />,
        edit : <PageEdit/>
    }
    return check('profile') && <div className='page-profile'>
        <div className={"nav " + (isOpen ? 'open' : 'close')} onClick={()=>{
            setIsOpen(false)
        }}>
            <div className="nav-ctn" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <div className="top">
                    <div className="close" onClick={() => {
                        setIsOpen(false)
                    }}></div>
                    {
                        !user ? <div className="login" onClick={() => {
                            getAccess()
                        }}>
                            <div className="icon"
                                style={{
                                    //filter:/* alert/error */toFilter('#0f2336').result.filter 
                                }}
                            ></div>
                            <h3 className="label">Login</h3>
                            <span className='next'></span>
                        </div> : <>
                            <div className="cover-image"></div>
                            <div className="photo"
                                style={{ background: user?.photos[0] && getImg(user?.photos[0]) }}
                            ></div>
                        </>
                    }

                </div>
                <h1 className="name">{user?.name}</h1>
                {user && <div className="email _limit-text">{user?.email}</div>}
                <ul>
                    <li className={"edit " + (page == 'edit' ? 'active' : '') + ' ' + (user ? '' : 'hide')} onClick={() => {
                        setIsOpen(false)
                        setPage('edit')
                    }}> <span className='icon' style={{ filter:/* contrast */toFilter('#123').result.filter }}></span>Edit Profile<span className='next'></span></li>
                    <li className={"command " + (page == 'command' ? 'active' : '') + ' ' + (user ? '' : 'hide')} onClick={() => {
                        setIsOpen(false)
                        setPage('command')
                    }}> <span className='icon' style={{ filter:/* contrast */toFilter('#123').result.filter }}></span>My Orders<span className='next'></span></li>
                    <li className={"messages " + (page == 'messages' ? 'active' : '') + ' ' + (user ? '' : 'hide')} onClick={() => {
                        setIsOpen(false)
                        setPage('messages')
                    }}> <span className='icon' style={{ filter:/* contrast */toFilter('#123').result.filter }}></span>messages<span className='next'></span></li>
                    <li className={"setting " + (page == 'setting' ? 'active' : '') + ' ' + (user ? '' : 'hide')} onClick={() => {
                        setIsOpen(false)
                        setPage('setting')
                    }}> <span className='icon' style={{ filter:/* contrast */toFilter('#123').result.filter }}></span>setting<span className='next'></span></li>
                    {/* <li className={"language"}> <span className='icon' style={{ filter:toFilter('#123').result.filter }}></span>Language : {'english'}<span className='next'></span></li> */}
                    <li className={"about " + (page == 'about' ? 'active' : '')} onClick={() => {
                        setIsOpen(false)
                        setPage('about')
                    }}> <span className='icon' style={{ filter:/* contrast */toFilter('#123').result.filter }}></span>about<span className='next'></span></li>
                </ul>
                <div className="version">By Sublymus Studio v:1.0.1</div>
                {
                    user && <div className="disconnect" onClick={() => {
                        disconnection()
                    }}>
                        <span className='icon' style={{ filter:/* alert/error */toFilter('#c43d4c').result.filter }}></span>
                        Log out
                    </div>
                }
            </div>
        </div>
        <div className="ctn">
            <div className="title" >
                <span className='option-nav' onClick={() => {
                    setIsOpen(true)
                }}></span>
                <h1> {mapTitle[page]||mapTitle['edit']}</h1>
            </div>
            {user ? (mapPage[page]||mapPage['edit']):mapPage['about']}
        </div>
    </div>
}
