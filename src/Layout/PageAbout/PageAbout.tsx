import './PageAbout.css'
import { useAppStore } from "../../AppStore";
// import React from 'react';

export function PageAbout() {
    const { check } = useAppStore();
    return check('about') && (
        <div className="page-about" >
            <div className="banner"></div>
            <div className='structure'>
                <div className='name-ctn'>
                    <div className="name">Sublymus</div>
                    <div className="text">Each workspace description provides information about the workspace such as the purpose and a list of views in the workspace.</div>
                </div>
                <div className="location">
                    <div className="info">
                        <div className="adress">
                            <div className="icon"></div>
                            <a href='https://www.google.com/search?q=Ulitsa+Petrozhitskogo%2C+8%2C+Rostov%2C+Rostovskaya+oblast%27%2C+344111&oq=Ulitsa+Petrozhitskogo%2C+8%2C+Rostov%2C+Rostovskaya+oblast%27%2C+344111&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzI4MmowajSoAgCwAgA&sourceid=chrome&ie=UTF-8'
                                className="label">Ulitsa Petrozhitskogo, 8, Rostov, Rostovskaya oblast', 344111
                            </a>
                        </div>
                        <div className="site">
                            <div className="icon"></div>
                            <a href='#sublymus' className="label">https://github.com/sublymus</a>
                        </div>
                        <div className="phone">
                            <div className="icon"></div>
                            <a href='#ok' className="label">+7(999)xxx-xx-xx</a>
                        </div>
                    </div>
                    <div className="map"></div>
                </div>
            </div>
        </div>
    )
} 