import { useAdminRoute } from '../../AdminStore'
import '../../../DashView/Layout/PageChat/PageChat.css';
import './PageChat.css';
import { DiscussionsNav } from "./Discussion/DiscussionNav/DiscussionNav";
import { DiscussionsCenter } from "./Discussion/DiscussionCenter/DiscussionCenter";
import { ServiceNav } from "./Discussion/ServiceNav/ServiceNav";
import { useRegisterStore } from '../PageAuth/RegisterStore'
import { Host } from '../../../Config'
import { Click } from '../../../Tools/StringFormater';
// import { SessionsCenter } from './Session/SessionCenter/SessionCenter'
// import React from 'react'

export function PageChat() {
    const { check, qs, json, pathList } = useAdminRoute();
    const { user } = useRegisterStore();
    const navs: any = {
        discussions: <DiscussionsNav />,
        groups: <DiscussionsNav />,
        services: <ServiceNav />,
        surveys: <DiscussionsNav />,
    }
    const centers: any = {
        discussions: <DiscussionsCenter />,
        groups: <DiscussionsCenter />,
        services: <DiscussionsCenter />,
        surveys: <DiscussionsCenter />,
    }
    const activePage = pathList?.[2] || 'discussions'
    const navSize = json?.nav||'max'
    
    return check('chat') && user && (
        <div className='page-chat'>
            <div className="back-close nav" style={{ display: (navSize == 'min') ? 'none' : '' }} onClick={e => {
                if (e.currentTarget == e.target) {
                    qs({ ...json, nav: 'min' }).apply()
                }
            }}></div>
            <div className={"chat-nav " + navSize}>
                <div className="top">
                    <div className={"nav-size " + navSize} onClick={(e) => {
                        Click(0.4)(e)
                        qs({ ...json, nav: navSize == 'min' ? 'max' : 'min' }).apply()
                    }}></div>
                    <div className={"icon discussions-icon " + (activePage == 'discussions' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        qs({nav:navSize}).setAbsPath(['chat', 'discussions'])
                    }}></div>
                    {/* <div className={"icon groups " + (activePage == 'groups' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        qs({nav:navSize}).setAbsPath(['chat', 'groups'])
                        setActivePage('groups')
                    }}></div> */}
                    <div className={"icon services " + (activePage == 'services' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        qs({nav:navSize}).setAbsPath(['chat', 'services'])
                    }}></div>
                    {/* <div className={"icon surveys " + (activePage == 'surveys' ? 'active' : '')} onClick={(e) => {
                        Click(0.4)(e)
                        qs({nav:navSize}).setAbsPath(['chat', 'surveys'])
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



















