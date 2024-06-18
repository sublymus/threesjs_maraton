import { useAppRouter, useAppStore } from '../../AppStore';
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

export function Profile() {
    const { setAbsPath, check, current } = useAppRouter();
    const { openNav, setOpenNav } = useAppStore()
    const { openPhoto, photo: bigPhoto, lastPath } = useProfileStore();
    const { user, updateUser, disconnection } = useRegisterStore()
    const updateProfilePhoto = (photos: FileList | null) => {
        if (user && photos) updateUser({ id: user.id, photos })
    }
    return check('profile') && (
        <div className={"page-profile " + openNav} onClick={() => {
            bigPhoto && openPhoto('');
            lastPath == 1 ? setAbsPath(['product']) : setAbsPath(['catalogue'])
        }}>
            <div className="profile-background" ></div>
            <div className="ctn-profile" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation()
            }}>
                <div className="nav-back" onClick={() => {
                    setOpenNav(openNav == 'max' ? 'min' : 'max')
                }}></div>

                <div className="profile-back" onClick={()=>{
                    setOpenNav('min')
                }}></div>
                <div className="close" onClick={() => {
                    bigPhoto && openPhoto('');
                    lastPath == 1 ? setAbsPath(['product']) : setAbsPath(['catalogue'])
                }}></div>
                <div className='profile-nav' >

                    <ProfilePhoto photo={user?.photos[0]} canEdit={!!user} canOpen onChange={updateProfilePhoto} onOpen={(photo) => openPhoto(photo)} />
                    <div className="info">
                        {user?.name}
                    </div>
                    <div className="img"></div>
                    <ul>
                        <li className={(current('profile') || check('user') || check('login') || check('create')) && 'active'} onClick={() => {
                            setOpenNav('min');
                            setAbsPath(['profile', 'user'])
                        }}><span className='profile'></span> Profile</li>
                        <li className={check('command') && 'active'} onClick={() => {
                            setOpenNav('min');
                            setAbsPath(['profile', 'command'])
                        }}><span className='command'></span> Command</li>
                        <li className={check('cart') && 'active'} onClick={() => {
                            setOpenNav('min');
                            setAbsPath(['profile', 'cart'])
                        }}><span className='cart'></span> Cart</li>
                        <li className={check('service') && 'active'} onClick={() => {
                            setOpenNav('min');
                            setAbsPath(['profile', 'service'])
                        }}><span className='service'></span> Customer service</li>
                        <li className={check('about') && 'active'} onClick={() => {
                            setOpenNav('min');
                            setAbsPath(['profile', 'about'])
                        }}><span className='about'></span> About us</li>
                    </ul>
                    {
                        user && <div className='logout' onClick={() => {
                            disconnection().then(() => {
                                setOpenNav('min');
                                setAbsPath(['profile', 'user'])
                            })
                        }}><span className='about'></span> Logout</div>
                    }
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