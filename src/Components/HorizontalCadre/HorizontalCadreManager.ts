import { HorizontalCadre, defaultData, type dataType } from "./HorizontalCadre";

export class HorizontalCadreManager {
    private data: dataType; 
    cadreList: HorizontalCadre[] = []
    lastTime = 0;
    firstTime = true;
    constructor(private cadreContainer: React.MutableRefObject<HTMLDivElement | null>, data?: Partial<dataType>) {
        this.data = { ...defaultData, ...data };
    }
    isHover(isHover: boolean) {
        this.data.isHover = isHover
    }
    push(cadre: HorizontalCadre) {
        cadre.setdata(this.data);
        this.cadreList.push(cadre);
    }
    
    init() {
        this.cadreContainer.current?.addEventListener('mousemove', (e) => {
            this.data.Y = e.clientY - this.data.SIZE / 2;
            this.data.mY = e.movementY;
        });
        this.cadreContainer.current?.addEventListener('mouseenter', () => {
            this.data.isHover = true;
        });
        this.cadreContainer.current?.addEventListener('mouseleave', () => {
            this.data.isHover = false;
        });

        const animus = (time: number) => {
            let step = 0;
            step = this.firstTime&&!(this.firstTime=false) ? 0 : time - this.lastTime;

            this.lastTime = time;
            this.cadreList.forEach(cadre => {
                cadre.anim(time, step)
            })
            requestAnimationFrame(animus);
        }
        requestAnimationFrame(animus);
    }
}



