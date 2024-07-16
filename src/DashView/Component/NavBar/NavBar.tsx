//@ts-nocheck
import { useDashRoute, useDashStore } from '../../dashStore'
import './NavBar.css'
import { useRegisterStore } from '../../Layout/PageAuth/RegisterStore';
import { Host } from '../../../Config';

export function NavBar({ blur, className }: { blur: boolean, className?: string }) {
    const { pathList, setAbsPath } = useDashRoute();
    const { user, store, disconnection } = useRegisterStore();
    const {T , setT} = useDashStore();
    const active = pathList[1] || 'products';
    return (
        <div className={"nav-bar " + (className || 'min') + ' ' + (user ? (blur ? 'blur' : '') : 'blur')}>
            <div className="nav-logo">
                <div className="logo" style={{ backgroundImage: `url(${`${Host}${store?.banners[0]}`})` }}></div>
                <div className="label">{store?.name}</div>
            </div>
            <div className="dash-top-right">
                <div className={"dark-mode " + T} onClick={() => {
                    setT(T ? '' : 'active');
                }}><span className="dark-mode-btn"></span> <span className="dark-white-btn"> </span></div>
                <div className="notf"> <span></span></div>
            </div>
            <div className="nav-link">
                <ul>
                    <li className={((active == 'products' || active == 'features' || active == 'categories' || active == 'catalogs') ? 'active' : 'no')} onClick={() => {
                        setAbsPath(['products'])
                    }}><span className='product'></span><label>{'STORE'}</label></li>
                    <li className={((active == 'clients' || active == 'collaborators' || active == 'roles') ? 'active' : 'no')} onClick={() => {
                        setAbsPath(['clients'])
                    }}><span className='users'></span><label>{'USERS'}</label></li>
                    <li className={((active == 'chat') ? 'active' : 'no')} onClick={() => {
                        setAbsPath(['chat'])
                    }}><span className='chat'></span><label>{'CHAT'}</label></li>
                    {/* <li className={((active == 'interface') ? 'active' : 'no')} onClick={() => {
                        setAbsPath(['interface'])
                    }}><span className='interface'></span><label>{'INTERFACE'}</label></li>
                    <li className={((active == 'statistic') ? 'active' : 'no')} onClick={() => {
                        setAbsPath(['statistic'])
                    }}><span className='state'></span><label>{'STATISTIC'}</label></li> */}
                </ul>
            </div>
            <div className="nav-profile">
                <div className="img" style={{ background: `no-repeat center/cover url(${user?.photos[0].startsWith('/') ? Host : ''}${user?.photos[0]})` }}></div>
                <div className="name">{user?.name}</div>
                <div className="logout" onClick={() => {
                    disconnection()
                }}>logout</div>
            </div>
            <div className="logut-icon" onClick={() => {
                disconnection()
            }}></div>

        </div>
    )
}

