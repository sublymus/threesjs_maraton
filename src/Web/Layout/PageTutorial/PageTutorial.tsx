import { useEffect, useState } from 'react';
import { BarChart } from '../../Component/BarChart/BarChart';
import { CardFlyer } from '../../Component/CardFlyer/CardFlyer';
import { ClientChat } from '../PageHome/ClientChat';
import { InterfaceChange } from '../PageHome/InterfaceChange';
import { Producd3d } from '../PageHome/Producd3d';
import { SolarySystem } from '../PageHome/Solary_system';
import './PageTutorial.css'
import { useWebRoute } from '../../WebStore';
import { getImg } from '../../../Tools/StringFormater';

import { ProductTuto } from "./ProductTuto";

export function PageTutorial() {
    const { qs, check, current } = useWebRoute();
   // const [id, setId] = useState<number | undefined>();
    // const [count, setCount] = useState(1);
    // useEffect(() => {
    //     if (!id) {
    //         setId(
    //             setInterval(() => {
    //                 setCount((i++) % 4 + 1)
    //             }, 3000)
    //         )
    //         return () => {
    //             clearInterval(id)
    //         }
    //     }
    // }, [id]);
    
    return check('tutorial') &&( current('tutorial') ? <div className="page-tutorial">

        {
             
        }
       
    </div> : <>
        <ProductTuto/>
    </>)
}

export function TutorialCard() {
    return <div className="tutorial-card">
        <div className="anim-card">
            <div className="card-c5">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/stats.png') + ',#fffb' }}></div>
            </div>
            <div className="card-c4">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/software-testing.png') + ',#fffb' }}></div>
            </div>
            <div className="card-c3">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/customer.png') + ',#fffb' }}></div>
            </div>
            <div className="card-c2">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/shopping-bag.png') + ',#fffb' }}></div>
            </div>
            <div className="card-c1">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/add-product.png') + ',#fffb' }}></div>
            </div>
        </div>
        <div className="info">
            <h1 className="title">Go to tutorial</h1>
            <p>We have provided you with a list of videos and illustrations as a tutorial.
                We invite you to <a href="/#contact">contact us</a> if you need assistance.</p>
            <a href='/#tutorial' className='tuto-btn'><span></span>Start tutorial now</a>
        </div>
    </div>
}

/* 

<div className={"cadre " + ((opened == 'products' && json?.open) ? 'open' : '')}>
                <Producd3d />
            </div>

            <div className={"cadre " + ((opened == 'commands' && json?.open) ? 'open' : '')} style={{ alignItems: 'center', justifyContent: 'center' }}>
                order management
            </div>
<div className={"cadre " + ((opened == 'users' && json?.open) ? 'open' : '')}>
                <div className="p-access">
                    <div className="ctn-threejs"></div>
                    <div className="infos">
                        <div className="title">accessibility</div>
                        <div className={"info " + (openInfo == 1 ? 'open' : ((count == 1 && !openInfo) ? 'open' : ''))} onClick={() => {
                            if (openInfo == 1) { setOpenInfo(0); setCount(0) }
                            else setOpenInfo(1)
                        }}>
                            <div className="count">1</div>
                            <div className="text">
                                <h3>Accessible all over the world 24/7</h3>
                                <p>You and your customers will be able to access the content of your store at any time.</p>
                            </div>
                        </div>
                        <div className={"info " + (openInfo == 2 ? 'open' : ((count == 2 && !openInfo) ? 'open' : ''))} onClick={() => {
                            if (openInfo == 2) { setOpenInfo(0); setCount(0) }
                            else setOpenInfo(2)
                        }}>
                            <div className="count">2</div>
                            <div className="text">
                                <h3>Mobile or desktop</h3>
                                <p>The Sublymus platform is available on the web in Mobile, tablet and desktop versions</p>
                            </div>
                        </div>
                        <div className={"info " + (openInfo == 3 ? 'open' : ((count == 3 && !openInfo) ? 'open' : ''))} onClick={() => {
                            if (openInfo == 3) { setOpenInfo(0); setCount(0) }
                            else setOpenInfo(3)
                        }}>
                            <div className="count">3</div>
                            <div className="text">
                                <h3>report issues to customer service</h3>
                                <p>to help us improve the platform, report any problems you encounter.</p>
                            </div>
                        </div>
                        <div className={"info " + (openInfo == 4 ? 'open' : ((count == 4 && !openInfo) ? 'open' : ''))} onClick={() => {
                            if (openInfo == 4) { setOpenInfo(0); setCount(0) }
                            else setOpenInfo(4)
                        }}>
                            <div className="count">4</div>
                            <div className="text">
                                <h3>quick correction and maintenance</h3>
                                <p>We are attentive to your comments and we are working to correct or improve them as quickly as possible.</p>
                            </div>
                        </div>

                    </div>
                    <div className="access-world">
                        <SolarySystem />
                    </div>
                </div>
                <div className="p-users">
                    <ClientChat />
                </div>
            </div>
         <div className={"cadre " + ((opened == 'interfaces' && json?.open) ? 'open' : '')}>
                <InterfaceChange />
            </div>
            <div className={"cadre " + ((opened == 'statistics' && json?.open) ? 'open' : '')}>
                <BarChart />
            </div>
*/