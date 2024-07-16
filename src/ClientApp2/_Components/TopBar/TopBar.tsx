//@ts-nocheck
import './TopBar.css'
import { useAppRouter } from "../../AppStore";
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { getImg } from '../../../Tools/StringFormater';
import { useProfileStore } from '../../Layout/PageProfile/ProfileStore';

export function TopBar() {
    const { setAbsPath, check } = useAppRouter();
    const { store } = useRegisterStore();
    const { setLastPath } = useProfileStore()
    // const [openNav, setOpenNav] = useState();

    return check('top_bar') && (
        <div className="top-bar">
            <div className="top-bar-ctn">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='options' onClick={() => {
                        setAbsPath([check('profile')?'catalogue':'profile'])

                        navigator.permissions.query({
                            name: 'notifications'
                        })
                    }}></div>
                    <div className="logo" onClick={() => {
                        setAbsPath(['catalogue'])
                    }}>
                        <div className="img" style={{ background: getImg(store?.logo[0] || '') }}></div>
                        <div className="name">{store?.name}</div>
                    </div>
                </div>

                <div className="research" onClick={() => {
                   
                }}>
                    <div className="icon-research"></div>
                </div>
                <div className='right' >
                    <div className="cart" onClick={() => {
                        check('product') && setLastPath(1);
                        check('catalogue') && setLastPath(0);
                        setAbsPath(['profile', 'cart']);
                    }}></div>
                    <div className="myprofile" onClick={() => {
                        check('product') && setLastPath(1);
                        check('catalogue') && setLastPath(0);
                        setAbsPath(['profile', 'user']);
                    }}>
                    </div>
                </div>

            </div>
        </div>
    )
} 