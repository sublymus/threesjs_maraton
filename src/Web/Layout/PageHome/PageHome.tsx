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
                        <div className="top">Startup </div>
                        <div className="btm">Business</div>
                    </div>
                    <p>
                    {
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia tenetur, provident expedita voluptates cumque quibusdam adipisci itaque. Molestiae rerum, labore rem itaque hic atque magnam nam cumque quaerat fuga!Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia tenetur, provident expedita voluptates cumque quibusdam adipisci itaque. Molestiae rerum, labore rem itaque hic atque magnam nam cumque quaerat fuga!'.split(' ').map((m,i)=>(
                            <span key={i}>{m+' '}</span>
                        ))
                    }    
                    </p>
                    <div className="btn-ctn">
                        <div className="manage" onClick={()=>owner?setAbsPath(['store_list']):setAbsPath(['store_list'])}>MANAGE YOUR STORES</div>
                    </div>
                </div>
                <div className="center-right"></div>
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