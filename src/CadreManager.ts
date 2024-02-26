import { Cadre, defaultData, type dataType } from "./Card";

export class CadreManager {
    private data: dataType;
    cadreList: Cadre[] = []
    constructor(private cadreContainer: React.MutableRefObject<HTMLDivElement | null>, data?:Partial<dataType>) {
        this.data =  {...defaultData,...data};
    }
    isHover(isHover: boolean) {
        this.data.isHover = isHover
    }
    push(cadre: Cadre) {
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
        
        const animus = (_time: number) => {
            // let setp = 0;
            // if(firstTime){
            //   setp = 0;
            // }else{
            //   setp = time-lastTime;
            // }
            // lastTime = time;
           const index =  ['initFunc','delayFunc','reframeFunc', 'bellFunc','resizeFunc','impactFunc','endFunc'] as const
           index.forEach((f) => {
              this.cadreList.forEach(cadre => {
                cadre[f]()
              });
            })
            requestAnimationFrame(animus);
          }
          requestAnimationFrame(animus);
    }
}



