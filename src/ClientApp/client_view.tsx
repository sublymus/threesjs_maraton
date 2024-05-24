import './index.css'
import React from 'react'
import { App } from "./App";

const getClientView = (children: React.ReactNode) => {
    return children
}

export const ClientView = getClientView(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

