import { useAppRouter} from '../../AppStore'
import './PageRegister.css';
import { useRegisterStore } from '../PageRegister/RegisterStore';

export function PageRegister({login, create}:{login?:boolean, create?:boolean}) {
    const { getAccess} = useRegisterStore();
    const { check } = useAppRouter();
   const canCreate = create||check('create');
    const canLogin = login||check('login');
    

    const onGoogleConnexion = () => {
        getAccess()
    }

    return (canCreate || canLogin) && (

        <div className="page-register">
           
            <div className="social">
                <a  className="google" onClick={onGoogleConnexion}><span></span>GOOGLE</a>
            </div>
        </div>

    )
}


