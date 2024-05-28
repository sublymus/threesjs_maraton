import { useEffect } from 'react';
import { useAppRouter } from '../../AppStore';
import { PageRegister } from '../PageRegister/PageRegister';
import { PageUser } from '../PageUser/PageUser';
import './Profile.css';
import { ProfilePhoto } from '../../Components/ProfilePhoto/ProfilePhoto';
import { useProfileStore } from './ProfileStore';

import { PageAbout } from "../../Layout/PageAbout/PageAbout";
import { PageService } from "../Session/PageService";
import { PageCommand } from "../../Layout/PageCommand/PageCommand";
import { PageCart } from "../../Layout/PageCart/PageCart";
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { Host } from '../../../Config';
import { WorldManager } from '../../../World/WorldManager';

export function Profile() {
    const { setPath, check, pathList } = useAppRouter();
    const { openPhoto, photo: bigPhoto, lastPath } = useProfileStore();
    // const [isMin, setIsMin] = useState(true);
    const { user, updateUser, disconnection } = useRegisterStore()
    const updateProfilePhoto = (photos: FileList | null) => {
        if (user && photos) updateUser({ id: user.id, photos })
    }

    useEffect(()=>{
        check('profile') ? (
            WorldManager.tactil.getView().style.display = 'none'
        ) : WorldManager.tactil.getView().style.display = ''
    },[pathList])

    return check('profile') && (
        <div className="page-profile"onClick={() => {
            bigPhoto && openPhoto('');
            lastPath == 1 ? setPath('../','product'):setPath('../','catalogue')
        }}>
            <div className="profile-background" ></div>
            <div className="ctn-profile" onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation()
            }}>
                {/* <div ref={bubbleCtnRef} className='back-profile-nav'></div> */}

                <div className="show-photo" style={{ display: bigPhoto ? 'block' : 'none' }}>
                    <div className="back" onClick={() => {
                        openPhoto('')
                    }}>
                        <div className="photo" style={{ backgroundImage: `url('${bigPhoto.startsWith('/') ? Host : ''}${bigPhoto}')` }}></div>
                    </div>
                </div>
                {/* <div className="profile-top">
                    <div className={'resizer ' + (isMin ? 'min' : '')} onClick={() => {
                        setIsMin(!isMin);
                    }}></div>
                    <div className="page-title">{'Profile'}</div>
                </div> */}
                <div className="close" onClick={() => {
                     bigPhoto && openPhoto('');
                     lastPath == 1 ? setPath('../','product'):setPath('../','catalogue')
                }}></div>
                <div className='profile-nav'>
                    <ProfilePhoto photo={user?.photos[0]} canEdit={!!user} canOpen onChange={updateProfilePhoto} onOpen={(photo) => openPhoto(photo)} />
                    <div className="info">
                        {user?.name}
                    </div>
                    <div className="img"></div>
                    <ul>
                        <li className={(check('user') || check('login') || check('create')) && 'active'} onClick={() => {
                            // setIsMin(true)
                            setPath('user')
                        }}><span className='profile'></span> Profile</li>
                        <li className={check('command') && 'active'} onClick={() => {
                            // setIsMin(true)
                            setPath('command')
                        }}><span className='command'></span> Command</li>
                        <li className={check('cart') && 'active'} onClick={() => {
                            // setIsMin(true)
                            setPath('cart')
                        }}><span className='cart'></span> Cart</li>
                        <li className={check('service') && 'active'} onClick={() => {
                            // setIsMin(true)
                            setPath('service')
                        }}><span className='service'></span> Customer service</li>
                        <li className={check('about') && 'active'} onClick={() => {
                            // setIsMin(true)
                            setPath('about')
                        }}><span className='about'></span> About us</li>
                    </ul>
                    <div className='logout' onClick={() => {
                        disconnection().then(() => {
                            // setIsMin(true)
                            setPath('user')
                        })
                    }}><span className='about'></span> Logout</div>
                </div>
                <div className="ctn-pages">
                    {(check('user') && !user) ? <PageRegister login /> : (
                        <>
                            <PageRegister />
                            <PageUser />
                            <PageAbout />
                            <PageService />
                            <PageCommand />
                            <PageCart />
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}