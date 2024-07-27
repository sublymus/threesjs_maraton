import './BottomNav.css'
import { appNavs, useAppRouter } from '../../AppStore'

export function BottomNav() {
    const { check , setAbsPath } = useAppRouter()
    return <div className="bottom-nav">
        <ul>
            {
                appNavs.map((d, i) => (
                    
                        <li key={i} className={d.u + ' '+ (check(d.u as any) ? 'active' : '')} onClick={() => setAbsPath([d.u as any])}><span className='label'>{d.n}</span><span className={'icon '+d.u}></span></li>
                ))
            }
        </ul>
    </div>
} 