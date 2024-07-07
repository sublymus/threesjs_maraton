import './PagePricing.css'
import { useWebRoute } from "../../WebStore";
import { useState } from 'react';
import { CardFlyer } from '../../Component/CardFlyer/CardFlyer';

export function PagePricing() {
    const { current , setAbsPath} = useWebRoute();
    const [period, setPeriod] = useState('month');
    return current('pricing') && <div className="page-pricing">
        <div className="top-ctn">
            <h1 className="title">Pricing Plans </h1>
            <div className="sub-title">The platform is currently being designed. You can use it for free before the official opening.</div>
            <div className={"period " + period} onClick={() => {
                setPeriod(period == 'month' ? 'year' : 'month');
            }}>
                <div className="ctn">
                    <span></span>
                    <p className='m'>Monthly</p>
                    <p className='y'>Annual</p>
                </div>
            </div>
        </div>
        <div className="center">
            <div className="pricies">
                <CardFlyer id='pricing-price1' infos={[{
                    icon: '/src/res/read.png',
                    text: 'Client Store'
                }, {
                    icon: '/src/res/read.png',
                    text: 'Owner Dashboard'
                }, {
                    icon: '/src/res/read.png',
                    text: 'mise a jour automatique'
                }]}
                    title='FREE '
                    text='you can try for free' />
            </div>

            <div className="infos">
                <h1>Free for how long ?</h1>
                <p>The Sublymus Platform is currently being created. Its official launch is planned for December 2024, hence its use remains FREE.</p>
                
                <div className="btn-stores">
                    <div className="add-new-store" onClick={() => {
                        setAbsPath(['new_store'])
                    }}>
                        <div className="icon"></div>
                        <div className="label"> ADD NEW STORE</div>

                    </div>
                </div>
            </div>

        </div>
    </div>
} 
