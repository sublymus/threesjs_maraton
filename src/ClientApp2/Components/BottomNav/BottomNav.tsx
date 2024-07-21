import { useEffect, useState } from 'react'
import './BottomNav.css'


export function BottomNav() {
    
    const [text, setText] = useState('')
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setText(`${window.innerWidth} / ${window.innerHeight}`)
        })
        setText(`${window.innerWidth} / ${window.innerHeight} / ${window.devicePixelRatio} `)
    },[])
    return <div className="bottom-nav">
    <ul>
        <li className='home'>home</li>
        <li className='categories'>categories</li>
        <li className='favorites'>favorites</li>
        <li className='cart'>cart</li>
        <li className='profile'>profile</li>
        {text}
    </ul>
</div>
}