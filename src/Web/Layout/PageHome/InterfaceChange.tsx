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
        wait: undefined as number |  undefined,
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
            count: number,
            wait: number | undefined
        }) {
            if (this.id) return;
            this.start = Date.now();
            this.id = setInterval(() => {
                if (Date.now() - (this.wait||0) > 5000) {
                    this.time = Date.now() - this.start;
                    this.count++
                    setCount(this.count)
                }
            }, 5000)
        }
    });
    useEffect(() => {
        if (check('home')) !data.id && data.init();
        return () => {
            data.stop();
        }
    }, [data, pathList]);

    return <div className="interface-change">
        <div className="left-side" onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const centery = rect.y + rect.height / 2;
            setX((e.clientX - rect.x) / (rect.width / 2));
            setY((e.clientY - centery) / (rect.height / 2));
        }} onTouchMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const centery = rect.y + rect.height / 2;
            setX((e.touches[0].clientX - rect.x) / (rect.width / 2));
            setY((e.touches[0].clientY - centery) / (rect.height / 2));
        }}>
            <div className="ctn-monitor" style={{ transform: `rotateY(${-Math.PI * x * 0.1}rad) rotateX(${Math.PI * y * 0.1}rad)` }}>
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
                <div className={"icon1 " + (count % 4 == 0 ? 'active' : '')} onClick={() => {
                    data.wait = Date.now()
                    setCount(0)
                }}></div>
                <div className={"icon2 " + (count % 4 == 1 ? 'active' : '')} onClick={() => {
                    data.wait = Date.now()
                    setCount(1)
                }}></div>
                <div className={"icon3 " + (count % 4 == 2 ? 'active' : '')} onClick={() => {
                    data.wait = Date.now()
                    setCount(2)
                }}></div>
                <div className={"icon4 " + (count % 4 == 3 ? 'active' : '')} onClick={() => {
                    data.wait = Date.now()
                    setCount(3)
                }}></div>
                <div className={"round " + ('r-' + count % 4)} style={{ left: `calc(${count % 4} * ((100% - 20px) / 3))` }}></div>
            </div>
        </div>
        <div className="infos">
            <h2>Choose the interface that suits you</h2>
            <div className="info">
                <h3 className="title"><span>1</span> 3D or standard interface</h3>
                <p className="text">
                    We have two (2) types of interface, 3D and standard. each available in several ranges
                </p>
            </div>
            <div className="info">
                <h3 className="title"><span>2</span> How to have your store</h3>
                <p className="text">
                    you to create several stores with the same account. to create your store, fill in the required information (name, logo, etc.)
                </p>
            </div>
            <div className="info">
                <h3 className="title"><span>3</span> Interface update</h3>
                <p className="text">
                    you will be notified of interface improvements. We continually update the platform to meet your expectations
                </p>
            </div>
        </div>
    </div>
}