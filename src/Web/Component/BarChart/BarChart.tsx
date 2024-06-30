import { useEffect, useRef, useState } from 'react'
import './BarChart.css'
import { useWebRoute } from '../../WebStore';
const H = 250;
const L = 10;
let t = 0;
let i = 0
const list = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aut', 'Sep', 'Oct', 'Nov', 'Dec']
const pieList = [5, 8, 7, 3, 1, 8, 2, 6];
const pieColor = [
    '#402E7A',
    '#4C3BCF',
    '#4B70F5',
    '#3DC2EC',
    '#49243E',
    '#704264',
    '#BB8493',
    '#DBAFA0',]
export function BarChart() {
    const { check, pathList } = useWebRoute();
    const refBarChart = useRef<HTMLDivElement | null>(null);
    const refPieChart = useRef<HTMLDivElement | null>(null);
    const [pie, setPie] = useState({
        v: undefined as number | undefined
    });
    const [d, setD] = useState(Array.from({ length: L }, (_, i) => (i / L) * H));
    const [data] = useState({
        time: 0,
        id: undefined as number | undefined,
        start: 0,
        count: 0,
        y: 0,
        touchDate: undefined as number | undefined,
        isHover: false,
        pie: {
            touchDate: undefined as number | undefined,
            isHover: false,
            x: 0,
            y: 0,
        },
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
            y: number,
            touchDate: number | undefined
            pie: {
                touchDate: number | undefined,
                x: number,
                y: number,
            },
        }) {
            if (this.id) return;
            this.start = Date.now();
            this.id = setInterval(() => {
                this.time = Date.now() - this.start;
                t++;
                //bar chart
                if (this.touchDate) {
                    d.shift();
                    d.push(this.y);
                    setD([...d]);
                    this.count++
                } else {
                    if ((i++) % 30 == 0) {
                        d.shift();
                        const c = (Math.cos(t / 80));
                        const v = H * (c * 0.5 + 0.5);
                        d.push(v > H ? H : (v < 0 ? 0 : v));
                        setD([...d]);
                        this.count++
                    }
                }
                if (Date.now() - (this.touchDate || 0) > 1000) {
                    this.touchDate = undefined
                }
                // Pie Chart
                if (this.pie.touchDate) {
                    let o = 180 * (Math.atan2(this.pie.y, this.pie.x) / (Math.PI));
                    o = o + (1 - ((Math.abs(this.pie.y) / this.pie.y) * 0.5 + 0.5)) * 360
                    o += 90
                    o -= ((o > 360) && (o < 360 + 90)) ? 360 : 0
                    const total = pieList.reduce((p, c) => p + c)
                    pieList.find((_, i) => {
                        const b = (pieList[i] / total) * 360
                        let a = 0;
                        pieList.find((_, j) => {
                            if (j == i) return true;
                            a += (pieList[j] / total) * 360;
                        })
                        const min = a
                        const max = (a + b);
                        if (o < max && o > min) {
                            setPie({ v: i });
                            return true;
                        }
                        return false
                    })
                } else {
                    pie.v = undefined
                    setPie(pie)
                }
                if (Date.now() - (this.pie.touchDate || 0) > 1000) {
                    this.pie.touchDate = undefined
                }
            }, 100)
        }
    });
    useEffect(() => {
        if (check('home')){
            !data.id && data.init();
        }else{
            data.stop();
        }
        return () => {
            data.stop();
        }
    }, [pathList]);

    // console.log(data);

    let x = (refBarChart.current?.getBoundingClientRect().width || 0) / d.length;
    const p = [0, H, ...d.map((v, i) => [x * (i), H - Math.trunc(v)]).flat(1), x * (L - 1), H]
    return <div className="bar-chart">
        <div className="bar-top">
            <div className="chart-ctn" ref={refBarChart}
                onMouseMove={(e) => {
                    const rec = e.currentTarget.getBoundingClientRect();
                    data.y = (rec.y + rec.height) - e.clientY;
                    data.touchDate = Date.now();
                }}
                onTouchMove={(e) => {
                    const rec = e.currentTarget.getBoundingClientRect();
                    data.y = (rec.y + rec.height) - e.touches[0].clientY;
                    data.touchDate = Date.now();
                }}>
                {
                    Array.from({ length: L }, (_, i) => (i / L) * H).map((v, i) => (
                        <div key={i} className="val" style={{ left: '-15px', position: 'absolute', top: `calc(${(1 - (i / L)) * H}px - 1em)` }}>{Math.trunc((v / H) * 100) / 10}</div>
                    ))
                }
                <div className="hand-ctn" style={{ bottom: `${d[d.length - 1]}px`/* ,display:(data.isHover || data.touchDate)?'flex':'none' */ }}>
                    <div className="hand" style={{ transform: 'translateY(-0.5em)' }}>👈 {Math.trunc(((d[d.length - 1] / H) * 100)) / 10}</div>
                </div>
                <svg className='svg-lines' style={{ width: '100%', height: '100%' }}>
                    <defs>
                        <linearGradient id="chart-line-gradieant" gradientTransform="rotate(90)">
                            <stop offset="5%" stopColor="#6200ff66" />
                            <stop offset="95%" stopColor="#58007a33" />
                        </linearGradient>
                    </defs>
                    <polygon className='polygon' points={p.toString()} />
                </svg>
                {
                    d.map((v, i) => <div key={i + 'b'} className="bar" style={{ height: `${v * 0.5}px`, width: `20px`, left: `${2.5 + ((100 / d.length)) * i}%`, bottom: '0' }}>
                        <div  className="label">{list[(data.count + i) % 12]}</div>
                    </div>)
                }
            </div>
        </div>
        <div className="infos">
            <div className="top">
                <div className="left">
                    have graphic tools to follow your users' consumption trends
                </div>
                <div className="piechart" ref={refPieChart}
                    onMouseMove={(e) => {
                        const rec = e.currentTarget.getBoundingClientRect();
                        data.pie.y = e.clientY - (rec.y + rec.height / 2);
                        data.pie.x = e.clientX - (rec.x + rec.width / 2);
                        data.pie.touchDate = Date.now();
                    }}
                    onTouchMove={(e) => {
                        const rec = e.currentTarget.getBoundingClientRect();
                        data.pie.y = e.touches[0].clientY - (rec.y + rec.height / 2);
                        data.pie.x = e.touches[0].clientX - (rec.x + rec.width / 2);
                        data.pie.touchDate = Date.now();
                    }}>
                    {
                        pieList.map((_, i) => {
                            const total = pieList.reduce((p, c) => p + c)
                            const v = (pieList[i] / total) * 360
                            let r = 0;
                            pieList.find((_, j) => {
                                if (j == i) return true;
                                r += (pieList[j] / total) * 360;
                            })
                            return <div key={i} className={"part " + (pie.v == i ? 'active' : '')} style={{ rotate: `${r}deg`, background: `conic-gradient(${pieColor[i]} ${v}deg, transparent ${v}deg)` }}></div>
                        })
                    }
                    <div className="part" style={{ pointerEvents: 'none', background: 'radial-gradient(circle, #0005 0% ,#0000 50% ) ' }}></div>
                    {
                        <div className={"value " + (data.pie.touchDate ? 'touch' : '')} style={{ top: `${100 + data.pie.y}px`, left: `${(100 - 35) + data.pie.x}px`, display: pie.v == undefined ? 'none' : '' }}>{pieList[pie.v || 0]}</div>
                    }
                </div>
            </div>
            <div className="btm">
                <div className="info">
                    <h3 className="title"><span className="count">1</span>Product visit statistics</h3>
                    <p>  you will have access to the number of visits per defined period, this will allow you to know the current trends of your customer</p>
                </div>
                <div className="info">
                    <h3 className="title"><span className="count">2</span>Product order statistics</h3>
                    <p>  order statistics, to track your revenue</p>
                </div>
                <div className="info">
                    <h3 className="title"><span className="count">3</span>Customer satisfaction statistics</h3>
                    <p>  your customers will leave you a product rating per order, this will allow you to judge user preferences</p>
                </div>
            </div>
        </div>
    </div>
}