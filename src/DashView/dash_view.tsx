

import React, { useEffect } from 'react'
import { useDashStore } from './dashStore';

// const _root = document.getElementById('root')!;

 const getClientView = (children: React.ReactNode) => {
    return children
}

export const DashView = getClientView(
    <React.StrictMode>
        <Dash />
    </React.StrictMode>,
)


function Dash() {
    const {  } = useDashStore();
    useEffect(() => {
        // let  list  = pathList.filter(f => f!=='/')
        // if(list.length <= 0) list = ['catalogue']
        // init()
        // window.location.hash = list.join('/');
    }, []);
    return (<></>)
}