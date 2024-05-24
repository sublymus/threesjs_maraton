import './PageAbout.css'
import { useAppRouter } from "../../AppStore";
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { getImg } from '../../../Tools/StringFormater';

export function PageAbout() {
    const { check } = useAppRouter();
    const { store } = useRegisterStore();
    
    return check('about') && (
        <div className="page-about" >
            <div className="banner" style={{background:getImg(store?.banners[0]||'')}}></div>
            <div className='structure'>
                <div className='name-ctn'>
                    <div className="name">{store?.name}</div>
                    <div className="text">{store?.description}</div>
                </div>
                <div className="location">
                    <div className="info">
                        <div className="adress">
                            <div className="icon"></div>
                            <a href='https://www.google.com/search?q=Ulitsa+Petrozhitskogo%2C+8%2C+Rostov%2C+Rostovskaya+oblast%27%2C+344111&oq=Ulitsa+Petrozhitskogo%2C+8%2C+Rostov%2C+Rostovskaya+oblast%27%2C+344111&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzI4MmowajSoAgCwAgA&sourceid=chrome&ie=UTF-8'
                                className="label">{store?.website}
                            </a>
                        </div>
                        <div className="site">
                            <div className="icon"></div>
                            <a href='#sublymus' className="label">{store?.website}</a>
                        </div>
                        <div className="phone">
                            <div className="icon"></div>
                            <a href='#ok' className="label">{store?.phone}</a>
                        </div>
                    </div>
                    <div className="map"></div>
                </div>
            </div>
        </div>
    )
} 