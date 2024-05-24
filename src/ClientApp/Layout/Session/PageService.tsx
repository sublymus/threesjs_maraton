import './PageService.css'
import { useAppRouter } from "../../AppStore";
import { SessionsCenter } from "./SessionCenter/SessionCenter";
import { SessionNav } from "./SessionNav/SessionNav";
import { useSessionStore } from './SessionStore';
import { useEffect } from 'react';

export function PageService() {
    const { check } = useAppRouter();
    const { isNavOpen, openNav , session} = useSessionStore()
    useEffect(()=>{
        if(!session){
            openNav(true)
        }
    },[session, isNavOpen])
    return check('service') && (
        <div className="page-service">
            <div className={"service-left "+ (isNavOpen?'':'close')} onClick={()=>{
                openNav(false)
            }}>
                <SessionNav />
            </div>
            <div className="service-center">
                <SessionsCenter />
            </div>
        </div>
    )
}