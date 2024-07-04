import { useWebRoute } from '../../WebStore'
import './PageNewStore.css'


export function PageNewStore() {
    
    const { current } = useWebRoute();

    return current('new_store') && <div className="page-new-store">
        
    </div>
}