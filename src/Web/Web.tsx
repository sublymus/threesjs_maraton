import './Web.css';
import { PageHome } from "./Layout/PageHome/PageHome";
import { PageNewStore } from "./Layout/PageNewStore/PageNewStore";
import { PageStoreList } from './Layout/PageStoreList/PageStoreList'
import { TopBar } from './Component/TopBar/TopBar'
import { useWebStore } from './WebStore';
import { useEffect } from 'react';

export function Web() {   
    const { tryToken ,  owner , owner_stores} = useWebStore();
   
    useEffect(()=>{
        tryToken();
    },[])

    useEffect(()=>{
        owner_stores();
    },[owner])

    return (
        <div className="web">
            <div className="background"></div>
            <TopBar/>
            <div className="page-ctn">
                <PageHome />
                <PageNewStore/>
                <PageStoreList/>
            </div>
        </div>
    )
}