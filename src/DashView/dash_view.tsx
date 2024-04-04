
import './index.css'
import React from 'react'
import { Dash } from './dash'

 const getClientView = (children: React.ReactNode) => {
    return children
}

export const DashView = getClientView(
    <React.StrictMode>
        <Dash />
    </React.StrictMode>,
)

