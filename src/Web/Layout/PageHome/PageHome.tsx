import "./PageHome.css";
import { useWebRoute, useWebStore } from '../../WebStore'

const icons: string[] = ['img1.png', 'img2.png', 'img3.svg', 'img4.png', 'img5.svg'].map(m=> '/src/res/img/'+m);

export function PageHome() {

    const { current, setAbsPath } = useWebRoute();
    const {owner} = useWebStore();
    return current('home')&&(
        <div className="page-home">
            <div className="center-content">
                <div className="center-left">
                    <div className="title">
                        <div className="top">Upgrade </div>
                        <div className="btm">Business</div>
                    </div>
                    <p>
                    {
                        `Do you want to offer your customers an immersive and modern online shopping experience? Transform your store into a virtual storefront with interactive 3D product presentations! Allow your customers to discover and explore every detail of your products as if they were in-store. Contact us today to learn more about creating your 3D virtual store and providing your customers with a unique, cutting-edge experience`
                        .split(' ').map((m,i)=>(
                            <span key={i}>{m+' '}</span>
                        ))
                    }    
                    </p>
                    <div className="btn-ctn">
                        <div className="manage no-selectable" onClick={()=>owner?setAbsPath(['store_list']):setAbsPath(['store_list'])}>MANAGE YOUR STORES</div>
                    </div>
                </div>
                <div  className="center-right">
                    <video  style={{ borderRadius:'25px', overflow:'hidden'}} width={'100%'}  loop autoPlay  src="/src/res/video/Cake_Couch.mp4">
                    </video>
                </div>
            </div>
            <div className="bottom-bar">
                {
                    icons.map(i => (
                        <div key={i} className="icon" style={{background:`no-repeat center/contain url(${i})`}}></div>
                    ))
                }
            </div>
        </div>
    )
}