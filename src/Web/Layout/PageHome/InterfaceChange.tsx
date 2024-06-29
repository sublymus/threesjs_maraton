import './InterfaceChange.css'
import { useEffect, useState } from "react"
import { useWebRoute } from "../../WebStore";

export function InterfaceChange() {

    const { pathList, check } = useWebRoute()
    const [count, setCount] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [data] = useState({
        time: 0,
        id: undefined as number | undefined,
        start: 0,
        count: 0,
        stop(this: {
            id: number | undefined,
        }) {
            clearInterval(this.id || 0);
            this.id = undefined
        },
        init(this: {
            time: number,
            id: number | undefined,
            start: number,
            count: number
        }) {
            if (this.id) return;
            this.start = Date.now();
            this.id = setInterval(() => {
                this.time = Date.now() - this.start;
                this.count++
                setCount(this.count)
            }, 5000)
        }
    });
    useEffect(() => {
        if (check('home')) !data.id && data.init();
        return () => {
            data.stop();
        }
    }, [data, pathList]);

    return <div className="interface-change" onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerx = rect.x + rect.width / 2;
        const centery = rect.y + rect.height / 2;
        setX((e.clientX - centerx) / (rect.width / 2));
        setY(-(e.clientY - centery) / (rect.height / 2));
    }} onTouchMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerx = rect.x + rect.width / 2;
        const centery = rect.y + rect.height / 2;
        setX((e.touches[0].clientX - centerx) / (rect.width / 2));
        setY(-(e.touches[0].clientY - centery) / (rect.height / 2));
    }}>
        <div className="left-side">
            <div className="ctn-monitor" style={{ transform: `rotateY(${Math.PI * x * 0.05}rad) rotateX(${Math.PI * y * 0.05}rad)` }}>
                <div className="monitor"></div>
                <div className="interfaces-ctn">
                    <div className="interfaces">
                        By NG
                        <div className={"interface1 " + (count % 4 == 0 ? 'active' : 'hide')}></div>
                        <div className={"interface2 " + (count % 4 == 1 ? 'active' : 'hide')}></div>
                        <div className={"interface3 " + (count % 4 == 2 ? 'active' : 'hide')}></div>
                        <div className={"interface4 " + (count % 4 == 3 ? 'active' : 'hide')}></div>
                    </div>
                </div>
            </div>
            <div className="icons">
                <div className={"icon1 "+(count% 4 == 0 ?'active':'')}></div>
                <div className={"icon2 "+(count% 4 == 1 ?'active':'')}></div>
                <div className={"icon3 "+(count% 4 == 2 ?'active':'')}></div>
                <div className={"icon4 "+(count% 4 == 3 ?'active':'')}></div>
            </div>
        </div>
        <div className="infos">
            <h2>e currentTarget getBounding ClientRect()</h2>
            <div className="info">
                <h3 className="title"><span>1</span> Info Tiltle Let see</h3>
                <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,
                </p>
            </div>
            <div className="info">
                <h3 className="title"><span>2</span> Info Tiltle Let see</h3>
                <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,
                </p>
            </div>
            <div className="info">
                <h3 className="title"><span>3</span> Info Tiltle Let see</h3>
                <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,
                </p>
            </div>
            <div className="info">
                <h3 className="title"><span>4</span> Info Tiltle Let see</h3>
                <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,
                </p>
            </div>
            <div className="info">
                <h3 className="title"><span>5</span> Info Tiltle Let see</h3>
                <p className="text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,
                </p>
            </div>
        </div>
    </div>
}