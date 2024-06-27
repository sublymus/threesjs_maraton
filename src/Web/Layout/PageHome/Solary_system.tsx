import './SolarySystem.css'
// import { useEffect, useState } from "react"
// import { useWebRoute } from "../../WebStore";


export function SolarySystem() {
    // const { pathList, check } = useWebRoute()
    // const [data] = useState({
    //     time: 0,
    //     id: undefined as number | undefined,
    //     start: 0,
    //     count: 0,
    //     stop(this: {
    //         id: number | undefined,
    //     }) {
    //         clearInterval(this.id || 0);
    //         this.id = undefined
    //     },
    //     init(this: {
    //         time: number,
    //         id: number | undefined,
    //         start: number,
    //         count: number
    //     }) {
    //         if (this.id) return;
    //         this.start = Date.now();
    //         this.id = setInterval(() => {
    //             this.time = Date.now() - this.start;
    //         }, 50)
    //     }
    // });
    // useEffect(() => {
    //     if (check('home')) !data.id && data.init();
    //     return () => {
    //         data.stop();
    //     }
    // }, [data, pathList]);
    const planetScale = (s: number, w=50) => {
        const ref = 100;
        const a = ref * s - w * 0.5
        const b = ref - (a + w);
        return {
            transformOrigin : `${-a}px 25px`,
            right: `${b}px`
        }
    }
    const scale =(s :number)=>{
        return {
            scale:`${s}`
        }
    }
    const a = 2;
    return <div className="solary-system">
        <div className="ctn">
            <div className="circle1" style={scale(a*0.3)}></div>
            <div className="circle2" style={scale(a*0.6)}></div>
            <div className="circle3" style={scale(a*0.9)}></div>
            <div className="circle4" style={scale(a*1.15)}></div>
            <div className="circle5" style={scale(a*1.4)}></div>
            <div className="circle6" style={scale(a*1.65)}></div>
            <div className="circle7" style={scale(a*2)}></div>
            <div className="sun"></div>
            <div className="planet1" style={planetScale(a*0.3,20)}></div>
            <div className="planet2" style={planetScale(a*0.6,40)}></div>
            <div className="planet3" style={planetScale(a*0.9)}></div>
            <div className="planet4" style={planetScale(a*1.15,40)}></div>
            <div className="planet5" style={planetScale(a*1.4, 70)}></div>
            <div className="planet6" style={planetScale(a*1.65)}></div>
            <div className="planet7" style={planetScale(a*2)}></div>
        </div>
    </div>
}