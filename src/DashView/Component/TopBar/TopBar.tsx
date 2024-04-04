// import React from 'react'
import { useWindowSize } from '../../../Hooks'
import { useDashRoute } from '../../dashStore'
import './TopBar.css'

export function TopBar (){

    const  { check } = useDashRoute()
    const size = useWindowSize()
    return null&&(size.width < 1500 )&&(
        <div className="top-bar">
            
        </div>
    )
}

