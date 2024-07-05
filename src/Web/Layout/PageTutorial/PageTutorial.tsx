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

let i = 0;

export function PageTutorial() {
    const [count, setCount] = useState(1);
    const [id, setId] = useState<number | undefined>();
    const { qs, json, check } = useWebRoute();
    useEffect(() => {
        if (!id) {
            setId(
                setInterval(() => {
                    setCount((i++) % 4 + 1)
                }, 3000)
            )
            return () => {
                clearInterval(id)
            }
        }
    }, [id]);
    useEffect(() => {
        !json?.open && setOpened('');
    }, [json])
    const [opened, setOpened] = useState('');
    const [openInfo, setOpenInfo] = useState(0);

    return check('tutorial') && <div className="tutorial">

        {
            opened && <div className="close-cadre" onClick={() => {
                setOpened('');
                qs({}).apply()
            }}></div>
        }
        <div className="prettier">
            <CardFlyer
                onClick={() => {
                    setOpened('products');
                    qs({ open: true }).apply()
                    // setTopBarFollow(false);
                }}
                id='home/products'
                icon="/src/res/add-product.png"
                infos={[{
                    icon: '/src/res/add-product.png',
                    text: 'add product 3D file'
                }, {
                    icon: '/src/res/add-product.png',
                    text: 'catalog, category, product, feature'
                },]}
                text="make your products accessible online, for your customers."
                title="Add new Products"
            // link="products"
            />
            <div className={"cadre " + ((opened == 'products' && json?.open) ? 'open' : '')}>
                <Producd3d />
            </div>
        </div>
        <div className="prettier">
            <CardFlyer
                onClick={() => {
                    setOpened('commands')
                    qs({ open: true }).apply()
                }}
                id='home/commands'
                icon="/src/res/shopping-bag.png"
                infos={[{
                    icon: '/src/res/shopping-bag.png',
                    text: 'auto or manual validation'
                }, {
                    icon: '/src/res/shopping-bag.png',
                    text: 'cart, cancel, deliver, on_the_way, return '
                },]}
                text="view orders, track and adjust order status"
                title="Manage customer orders"
            // link="products"
            />
            <div className={"cadre " + ((opened == 'commands' && json?.open) ? 'open' : '')} style={{ alignItems: 'center', justifyContent: 'center' }}>
                order management
            </div>
        </div>
        <div className="prettier">
            <CardFlyer
                onClick={() => {
                    setOpened('users')
                    qs({ open: true }).apply()
                }}
                id='home/users'
                icon="/src/res/customer.png"
                infos={[{
                    icon: '/src/res/customer.png',
                    text: 'chose the role of collaborator'
                }, {
                    icon: '/src/res/customer.png',
                    text: 'client, owner, collaborator, moderator'
                }]}
                text="follow your customers, add chat collaborators with everyone, organize your team"
                title="Store user types"
            // link="products"
            />
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
        </div>
        <div className="prettier">
            <CardFlyer
                onClick={() => {
                    setOpened('interfaces')
                    qs({ open: true }).apply()
                }}
                id='home/interfaces'
                icon="/src/res/software-testing.png"
                infos={[{
                    icon: '/src/res/software-testing.png',
                    text: 'automatically updates store information'
                }, {
                    icon: '/src/res/software-testing.png',
                    text: 'compatibility with all stores'
                },]}
                text="the platform has several interfaces to best meet your needs"
                title="Change your store interface"
            // link="products"
            />
            <div className={"cadre " + ((opened == 'interfaces' && json?.open) ? 'open' : '')}>
                <InterfaceChange />
            </div>
        </div>
        <div className="prettier">
            <CardFlyer
                onClick={() => {
                    setOpened('statistics')
                    qs({ open: true }).apply()
                }}
                id='home/statistics'
                icon="/src/res/stats.png"
                infos={[{
                    icon: '/src/res/stats.png',
                    text: 'Statistical analysis of data'
                }, {
                    icon: '/src/res/stats.png',
                    text: 'visit, command, yield, period'
                },]}
                text="increase your sales using statistical data from your store"
                title="Statistical table"
            // link="products"
            />
            <div className={"cadre " + ((opened == 'statistics' && json?.open) ? 'open' : '')}>
                <BarChart />
            </div>
        </div>
    </div>
}

export function TutorialCard() {


    return <div className="tutorial-card">
        <div className="anim-card">
            <div className="card-c5">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/stats.png')+',#fffb' }}></div>
            </div>
            <div className="card-c4">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/software-testing.png')+',#fffb' }}></div>
            </div>
            <div className="card-c3">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/customer.png')+',#fffb' }}></div>
            </div>
            <div className="card-c2">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/shopping-bag.png')+',#fffb' }}></div>
            </div>
            <div className="card-c1">
                <div className="title">PRODUCTS</div>
                <div className="icon" style={{ background: getImg('/src/res/add-product.png')+',#fffb' }}></div>
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