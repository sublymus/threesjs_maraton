
import './index.css'
import React from 'react'
import { Web } from './Web'

 const getClientView = (children: React.ReactNode) => {
    return children
}

export const WebView = getClientView(
    <React.StrictMode>
        <Web />
    </React.StrictMode>,
)

