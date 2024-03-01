export type FuncAsArray = { [key: number]: (this: VerticalCadre) => void }
export const defaultData = {
    SIZE: 200,
    INFLUENCE: 0.11,
    BELL_DELAY_Y: 5,
    IMPACT_DELAY_Y: 5,
    AMPLITUDE: 100,
    SCOPE: 200,
    STEP: 20,
    isHover: false,
    mX: 0,
    mY: 0, 
    Y: 0,
    X: 0
}
export type dataType = typeof defaultData;

export class VerticalCadre {

    private tx = 0;
    // private ty = 0;
    // private ty0 = 0;

    // private ry0 = 0;
    // private _ry = 0;

    private amplitude = 0;
    private y0 = 0;
    private style: { [key in keyof HTMLDivElement['style']]?: string } = {}
    private rect: DOMRect;
    private data: dataType
    private div: HTMLDivElement | null= null
    constructor( data?: Partial<dataType>) {
        this.data = { ...defaultData, ...data }
        this.rect = new DOMRect();
    }
    setdata(data: dataType) {
        this.data = data;
    }
    setDiv(div:HTMLDivElement) {
        this.div = div;
    }
    getDiv(){
        return this.div
    }
    init() {

        if (!this.div) return
        this.rect = this.div.getBoundingClientRect();
        this.style.transform = '';
    }

    private bell() {
        if (this.data?.isHover){
            this.amplitude +=( this.data.AMPLITUDE - this.amplitude)/5
            if(this.amplitude > this.data.AMPLITUDE) this.amplitude = this.data.AMPLITUDE
        }
            // if (this.amplitude + this.data.STEP > this.data.AMPLITUDE) this.amplitude = this.data.AMPLITUDE;
            // else this.amplitude += this.data.STEP;
        else{
            this.amplitude -= this.amplitude/5
            if(this.amplitude<=1){
                this.amplitude = 1
            }
        }
            // if (this.amplitude - this.data.STEP < 1) this.amplitude = 1
            // else this.amplitude -= this.data.STEP;

        const DY = this.data.Y - this.y0
        this.y0 += (DY / this.data.BELL_DELAY_Y)

        const scale = (Math.sqrt(this.amplitude) / (this.data.SCOPE))
        const Y = Math.pow((this.rect.y - this.y0) * scale, 2)
        this.tx = (this.amplitude / (this.amplitude + Y)) * this.amplitude

        this.style.transform += ` translateX(${this.tx}px) `;
    }

    // private impact() {
    //     const G = 5;
    //     const next = -(Math.abs(this._ry) / this._ry) * G;
    //     if (next < -G - 1 || next > G + 1) this._ry = next;

    //     const DRY = this._ry - this.ry0
    //     this.ry0 += (DRY / this.data.IMPACT_DELAY_Y)
    //     // this.style.transform += ` translateY(${this.ry0}px) `;
    // }

    resize() {
        const size = this.data.SIZE * (1 - this.data.INFLUENCE) + this.data.INFLUENCE * this.data.SIZE * (this.tx / this.data.AMPLITUDE);
        this.style.width = `${size}px`;
        this.style.height = `${size}px`;
    }

    end() {
        if (!this.div) return
        for (const key in this.style) {
            this.div.style[key] = this.style[key] || this.div.style[key];
        }
    }
    anim(_time:number,_step:number) {
        this.init();
        this.bell();
        // this.impact();
        this.resize();
        this.end()
    }
    // addRy(ry: number) {
    //     this.ry
    // }

    // private U(a: number) {
    //     return (Math.abs(a) / a) * 0.5 + 0.5
    // }


}


