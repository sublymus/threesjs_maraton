export type FuncAsArray = { [key: number]: (this: Cadre) => void }
export const defaultData = {
    SIZE: 200,
    INFLUENCE: 0.11,
    DELAY: 5,
    AMPLITUDE: 200,
    SCOPE: 200,
    STEP: 20,
    isHover: false,
    mX:0,
    mY:0,
    Y:0,
    X:0
} 
export type dataType = typeof defaultData;

export class Cadre {

    private tx = 0;
    private ty = 0;
    private ty0 = 0;

    private amplitude = 0;
    private y0 = 0;
    private style: { [key in keyof HTMLDivElement['style']]?: string } = {}
    private rect: DOMRect;
    private data: dataType
    constructor(private div: React.MutableRefObject<HTMLDivElement | null> , data?: Partial<dataType>) {
        this.data =  {...defaultData,...data}
        this.rect = div.current?.getBoundingClientRect() || new DOMRect();
    }
    setdata(data:dataType){
        this.data = data;
    }
    initFunc() {

        if (!this.div.current) return
        this.rect = this.div.current.getBoundingClientRect();
        this.style.transform = '';
    }

    delayFunc() {
        const DY = this.data.Y - this.y0
        this.y0 += (DY / this.data.DELAY)
    }

    reframeFunc() {
        if (this.data?.isHover)
            if (this.amplitude + this.data.STEP > this.data.AMPLITUDE) this.amplitude = this.data.AMPLITUDE;
            else this.amplitude += this.data.STEP;
        else
            if (this.amplitude - this.data.STEP < 1) this.amplitude = 1
            else this.amplitude -= this.data.STEP;

    }
    bellFunc() {

        const scale = (Math.sqrt(this.amplitude) / (this.data.SCOPE))
        const Y = Math.pow((this.rect.y - this.y0) * scale, 2)
        this.tx = (this.amplitude / (this.amplitude + Y)) * this.amplitude

        this.style.transform += ` translateX(${this.tx}px) `;
    }

    impactFunc() {
       // this.U()
        this.style.transform += ` translateY(${this.tx}px) `;
    }

    resizeFunc() {
        const size = this.data.SIZE * (1 - this.data.INFLUENCE) + this.data.INFLUENCE * this.data.SIZE * (this.tx / this.data.AMPLITUDE);
        this.style.width = `${size}px`;
        this.style.height = `${size}px`;
    }

    endFunc() {
        if (!this.div.current) return
        for (const key in this.style) {
            this.div.current.style[key] = this.style[key] || this.div.current.style[key];
        }
    }

    private U(a:number) {
      return (Math.abs(a)/a)*0.5+0.5
    }
    

}


