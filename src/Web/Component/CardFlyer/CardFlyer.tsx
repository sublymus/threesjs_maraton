import { getImg } from '../../../Tools/StringFormater'
import './CardFlyer.css'
let i = 0;
export function CardFlyer({ icon, infos, text, title, id }: {id?:string,link?:string ,title?: string, icon?: string, text?: string, infos?: { icon: string, text: string }[] }) {

    return <div id={id} className="card-flyer">
        <div className="back-flyer" style={{   background: `linear-gradient(${Math.trunc(Math.random()*180 + (i++)*20)}deg, #408DD5 0%, #630B8C 100%)`}}></div>
        <div className="front-flyer">
            {
                icon && <div className="icon" style={{ background: getImg(icon, '90%') }}></div>
            }
            <h1 className="title">{title}</h1>
            <p>{text}</p>
            {
                infos?.map((i, a) =>
                    <div key={a} className="info">
                        <div className="icon" style={{ background: getImg(i.icon, '90%') }}></div>
                        <div className="text">{i.text}</div>
                    </div>
                )
            }
        </div>
    </div>
}