import { useEffect, useState } from 'react'
import { useAdminRoute } from '../../AdminStore'
import './PageChat.css';
// import { SessionNav } from "./Session/SessionNav/SessionNav";
import { DiscussionsNav } from "./Discussion/DiscussionNav/DiscussionNav";
import { DiscussionsCenter } from "./Discussion/DiscussionCenter/DiscussionCenter";
import { ServiceNav } from "./Discussion/ServiceNav/ServiceNav";
import { useRegisterStore } from '../PageAuth/RegisterStore'
import { Host } from '../../../Config'
import { Click } from '../../../Tools/StringFormater';
// import { SessionsCenter } from './Session/SessionCenter/SessionCenter'
// import React from 'react'

export function PageChat() {
    const { check, setAbsPath, pathList } = useAdminRoute();
    const { user } = useRegisterStore();
    const [activePage, setActivePage] = useState(pathList?.[2] || 'discussions')
    const [navSize, setNavSize] = useState('max')
    useEffect(() => {
        setActivePage(pathList[2] || 'discussions')
    }, [pathList])

    const navs: any = {
        discussions: <DiscussionsNav />,
        groups: <DiscussionsNav />,
        services: <ServiceNav />,
        surveys: <DiscussionsNav />,
    }
    const centers: any = {
        discussions: <DiscussionsCenter />,
        groups: <DiscussionsCenter />,
        services: <DiscussionsCenter/>,
        surveys: <DiscussionsCenter />,
    }
    
    return check('chat') && user && (
        <div className='page-chat'>
            <div className="back-close nav" style={{ display: (navSize == 'min') ? 'none' : '' }} onClick={e => {
                if (e.currentTarget == e.target) {
                    setNavSize('min');
                }
            }}></div>
            <div className={"chat-nav " + navSize}>
                <div className="top">
                    <div className={"nav-size " + navSize} onClick={(e) => {
                        Click(0.4)(e)
                        setNavSize(navSize == 'min' ? 'max' : 'min');
                    }}></div>
                    <div className={"icon discussions-icon " + (activePage == 'discussions' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        setAbsPath(['chat', 'discussions'])
                        setActivePage('discussions')
                    }}></div>
                    {/* <div className={"icon groups " + (activePage == 'groups' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        setAbsPath(['chat', 'groups'])
                        setActivePage('groups')
                    }}></div> */}
                    <div className={"icon services " + (activePage == 'services' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        setAbsPath(['chat', 'services'])
                        setActivePage('services')
                    }}></div>
                    {/* <div className={"icon surveys " + (activePage == 'surveys' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        setAbsPath(['chat', 'surveys'])
                        setActivePage('surveys')
                    }}></div> */}
                    <div className="icon profile" style={{ background: `no-repeat center/cover url(${user.photos[0].startsWith('/') ? Host : ''}${user.photos[0]})` }} onClick={() => {
                        // setAbsPath(['profile'])
                        // setActivePage('profile')
                    }}></div>
                </div>
                {
                    (navSize == 'max') && <div className="nav-ctn">
                        {navs[activePage]}
                    </div>
                }
            </div>
            <div className="chat-center">
                {
                    centers[activePage]
                }
            </div>
            {/* <div className="chat-info">

            </div> */}

        </div>
    )
}



















