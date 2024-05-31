
import './index.css'
import React from 'react'
import { Admin } from './Admin'

 const getClientView = (children: React.ReactNode) => {
    return children
}

export const AdminView = getClientView(
    <React.StrictMode>
        <Admin />
    </React.StrictMode>,
)
