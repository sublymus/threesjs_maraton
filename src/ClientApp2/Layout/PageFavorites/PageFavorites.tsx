import './PageFavorites.css'
import { useAppRouter } from "../../AppStore";
import { PageAuth } from '../PageRegister/PageAuth';
import { useRegisterStore } from '../PageRegister/RegisterStore';

export function PageFavorites() {
    const { check } = useAppRouter();
    const {user} = useRegisterStore()
    return check('favorites') && (!user ? <div className='page-favorites'>
        <PageAuth detail='Google connexion is required to access your favorites'/>
    </div>:<></>)
}