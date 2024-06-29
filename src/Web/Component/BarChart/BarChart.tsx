import { useEffect, useRef, useState } from 'react'
import './BarChart.css'
import { useWebRoute } from '../../WebStore';
const H = 250;
const L = 10;
let t = 0;
let i = 0
const list = ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aut','Sep','Oct','Nov','Dec']
export function BarChart() {
    const { check, pathList } = useWebRoute();
    const ref = useRef<HTMLDivElement | null>(null);
    const [d, setD] = useState(Array.from({ length: L }, (_, i) => (i / L) * H));
    const [data] = useState({
        time: 0,
        id: undefined as number | undefined,
        start: 0,
        count: 0,
        y: 0,
        touchDate:undefined as  number | undefined,
        isHover: false,
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
            touchDate : number|undefined
            isHover: boolean
        }) {
            if (this.id) return;
            this.start = Date.now();
            this.id = setInterval(() => {
                this.time = Date.now() - this.start;

                t++;
                if (this.isHover || this.touchDate) {
                    d.shift();
                    d.push(this.y);
                    setD([...d]);
                    this.count++;
                } else {
                    if ((i++) % 30 == 0) {
                        d.shift();
                        const c = (Math.cos(t / 80));
                        const v = H * (c * 0.5 + 0.5);
                        d.push(v > H ? H : (v < 0 ? 0 : v));
                        setD([...d]);
                        this.count++;
                    }
                }
                if(Date.now() - (this.touchDate||0) > 1000 ){
                    this.touchDate = undefined
                }
            }, 30)
        }
    });
    useEffect(() => {
        if (check('home')) !data.id && data.init();
        return () => {
            data.stop();
        }
    }, [pathList]);

    let x = (ref.current?.getBoundingClientRect().width || 0) / d.length;

    const p = [0, H, ...d.map((v, i) => [x * (i), H - Math.trunc(v)]).flat(1), x * (L - 1), H]
    console.log(p);

    return <div className="bar-chart">
        <div className="chart-ctn" ref={ref}
            onMouseEnter={() => data.isHover = true}
            onMouseLeave={() => data.isHover = false}
            onMouseMove={(e) => {
                const rec = e.currentTarget.getBoundingClientRect();
                data.y = (rec.y + rec.height) - e.clientY;
            }}
            onTouchMove={(e) => {
                const rec = e.currentTarget.getBoundingClientRect();
                data.y = (rec.y + rec.height) - e.touches[0].clientY;
                data.touchDate = Date.now();
            }}>
            {
                Array.from({ length: L }, (_, i) => (i / L) * H).map((v,i)=>(
                    <div className="val" style={{left:'-15px',position:'absolute', top:`calc(${(1-(i/L))*H}px - 1em)`}}>{Math.trunc((v / H) * 100) / 10}</div>
                ))
            }
            <div className="hand-ctn" style={{bottom:`${d[d.length-1]}px`/* ,display:(data.isHover || data.touchDate)?'flex':'none' */}}>
                <div className="hand" style={{transform:'translateY(-0.5em)'}}>👈 {Math.trunc(((d[d.length-1]/H)*100))/10}</div>
               </div>
            <svg className='svg-lines' style={{ width: '100%', height: '100%' }}>
                <defs>
                    <linearGradient id="chart-line-gradieant" gradientTransform="rotate(90)">
                        <stop offset="5%" stop-color="#6200ff66" />
                        <stop offset="95%" stop-color="#58007a33" />
                    </linearGradient>
                </defs>
                <polygon className='polygon' points={p.toString()} />
            </svg>
            {
                d.map((v, i) => {
                    const y = d[i + 1] - v;
                    const D = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                    return (
                        <>
                            <div key={i + 'b'} className="bar" style={{ height: `${v*0.5}px`, width: `20px`, left: `${2.5+ ((100 / d.length)) * i}%`, bottom: '0' }}>
                                <div key={i + 't'} className="label">{list[(data.count+i)%12]}</div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    </div>
}