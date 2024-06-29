import "./PageHome.css";
import { useWebRoute } from '../../WebStore'
import { getImg } from "../../../Tools/StringFormater";
import { CardFlyer } from "../../Component/CardFlyer/CardFlyer";
import { useEffect, useState } from "react";
import { SolarySystem } from "./Solary_system";
import { ClientChat } from "./ClientChat";
import { InterfaceChange } from './InterfaceChange'
import { BarChart } from "../../Component/BarChart/BarChart";
const subjects = [{
    u: 'products',
    i: '/src/res/add-product.png'
}, {
    u: 'commands',
    i: '/src/res/shopping-bag.png'
}, {
    u: 'users',
    i: '/src/res/customer.png'
}, {
    u: 'interfaces',
    i: '/src/res/software-testing.png'
}, {
    u: 'statistics',
    i: '/src/res/stats.png'
},]
// `Do you want to offer your customers an immersive and modern online shopping experience? Transform your store into a virtual storefront with interactive 3D product presentations! Allow your customers to discover and explore every detail of your products as if they were in-store. Contact us today to learn more about creating your 3D virtual store and providing your customers with a unique, cutting-edge experience`
// .split(' ').map((m,i)=>(
//     <span key={i}>{m+' '}</span>
// ))
let i = 0;
export function PageHome() {

    const [count, setCount] = useState(1);
    const [id, setId] = useState<number | undefined>();
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

    const { check } = useWebRoute();
    return check('home') && (
        <div className="page-home">
            <div className="back-home"></div>
            <div className="page-text">
                <div className="text-top">
                    <div className="stores-count">{34} Stores</div>
                    <div className="title">Discover the <span className="shopping">Shopping</span> Revolution in <span className="c-3d">3D</span></div>
                    <div className="sub-title">Create, Personalize and Sell your Products presented in 3D and offer your customers a unique interactive experience.</div>
                </div>
                <div className="right">
                    <div className="subjects">
                        {
                            subjects.map(s => <a href={`#home/${s.u}`} style={{ background: getImg(s.i) }} />)
                        }
                    </div>
                    <label htmlFor="home-search" className="search">
                        <div className="icon"></div>
                        <input id="home-search" type="text" placeholder="Search" />
                    </label>
                </div>
            </div>
            <div className="prettier">
                <CardFlyer
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
                <div className="cadre">

                </div>
            </div>
            <div className="prettier">
                <CardFlyer
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
                <div className="cadre">

                </div>
            </div>
            <div className="prettier">
                <CardFlyer
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
                <div className="cadre">
                    <div className="p-access">
                        <div className="ctn-threejs"></div>
                        <div className="infos">
                            <div className="title">accessibility</div>
                            <div className={"info " + (count == 1 ? 'open' : '')}>
                                <div className="count">1</div>
                                <div className="text">
                                    <h3>compatibility with all stores</h3>
                                    <p>follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores</p>
                                </div>
                            </div>
                            <div className={"info " + (count == 2 ? 'open' : '')}>
                                <div className="count">2</div>
                                <div className="text">
                                    <h3>compatibility with all stores</h3>
                                    <p>follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores</p>
                                </div>
                            </div>
                            <div className={"info " + (count == 3 ? 'open' : '')}>
                                <div className="count">3</div>
                                <div className="text">
                                    <h3>compatibility with all stores</h3>
                                    <p>follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores</p>
                                </div>
                            </div>
                            <div className={"info " + (count == 4 ? 'open' : '')}>
                                <div className="count">4</div>
                                <div className="text">
                                    <h3>compatibility with all stores</h3>
                                    <p>follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores</p>
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
                <div className="cadre">
                    <InterfaceChange />
                </div>
            </div>
            <div className="prettier">
                <CardFlyer
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
                <div className="cadre">
                    <BarChart/>
                </div>
            </div>
        </div>
    )
}
// {/* chat with client text in the session and with your collaborators in the discussion or in a group */}