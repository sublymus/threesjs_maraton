import './PageCategories.css'
import { useAppRouter } from "../../AppStore";

export function PageCategories() {
    
    const { check } = useAppRouter()

    return check('categories') && <div className='page-categories'>

    </div>
}