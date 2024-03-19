import "./Tactil.css";
import { Emitter } from "./Emitter";
export type VECTOR = { x: number, y: number }


const events = ['step','direction','distance','scroll'] as const
export class Tactil extends Emitter<VECTOR , typeof events> {
  
    private lastScroll: VECTOR = {
        x: 0,
        y: 0
    };

    private rect: { width: number, height: number } = { height: 0, width: 0 };
    private marge = 1;

    private tactil: HTMLDivElement;
    private scrollable: HTMLDivElement;
    private progress: VECTOR = {
        x: 0,
        y: 0
    };
    resize(rec: { width: number, height: number }) {
        this.tactil.style.width = rec.width + 'px';
        this.tactil.style.height = rec.height + 'px';
        this.tactil.style.top = 0 + 'px';
        this.tactil.style.left = 0 + 'px';

        this.rect = rec;

        this.scrollable.style.width = (this.rect.width * 2) + 'px';
        this.scrollable.style.height = (this.rect.height * 2) + 'px';

    }
    visibility(isVisible: boolean) {
        this.tactil.style.display = isVisible ? 'block' : 'none'
    }

    constructor() {
        super(events ,{
            direction: [],
            distance: [],
            scroll: [],
            step: []
        })
        this.tactil = document.createElement('div');
        this.scrollable = document.createElement('div');
        this.tactil.style.position = 'absolute';
        this.tactil.style.overflow = 'scroll';
        this.tactil.className = 'tactil'
        this.tactil.append(this.scrollable);

        function isMounted(node: Node) {
            if (node.nodeType === Node.DOCUMENT_NODE) return true;
            if (node.parentNode == undefined) return false;
            return isMounted(node.parentNode);
        }
        const id = setInterval(() => {
            if (isMounted(this.tactil)) {
                this.tactil.scrollLeft = this.marge;
                this.tactil.scrollTop = this.marge;
                clearInterval(id);
                this.tactil.addEventListener('scroll', this.onScroll)
                this.tactil.addEventListener('scrollend', () => {

                })
            }
        }, 100);
        setInterval(() => {
            //dir()
        }, 100);
    }

    alertDistance() {

        this.distance.x = this.progress.x * (this.rect.width - 3 * this.marge) + this.tactil.scrollLeft,
            this.distance.y = this.progress.y * (this.rect.height - 3 * this.marge) + this.tactil.scrollTop
        for (const cb of this.register.distance) {
            cb({
                x: this.distance.x,
                y: this.distance.y
            })
        }
    }

    distance: VECTOR = {
        x: 0,
        y: 0
    }
    lastSetpDistance: VECTOR = {
        x: 0,
        y: 0
    }
    alertStep() {
        const step: VECTOR = {
            x: this.distance.x - this.lastSetpDistance.x,
            y: this.distance.y - this.lastSetpDistance.y
        };
        for (const cb of this.register.step) {
            cb(step)
        }
        this.lastSetpDistance.x = this.distance.x
        this.lastSetpDistance.y = this.distance.y
        const dx = step.y == 0 ? 0 : Math.abs(step.y) / step.y;
        const dy = step.x == 0 ? 0 : Math.abs(step.x) / step.x;
        for (const cb of this.register.direction) {
            cb({
                x: dx,
                y: dy
            })
        }

    }

    onScroll = () => {

        if (this.tactil.scrollLeft > (this.rect.width - this.marge)) {
            this.progress.x++;
            return this.lastScroll.x = this.tactil.scrollLeft = 2 * this.marge
        } else if (this.tactil.scrollLeft < (this.marge)) {
            this.progress.x--;
            return this.lastScroll.x = this.tactil.scrollLeft = this.rect.width - (2 * this.marge)
        }
        if (this.tactil.scrollTop > (this.rect.height - this.marge)) {
            this.progress.y++;
            return this.lastScroll.y = this.tactil.scrollTop = 2 * this.marge
        } else if (this.tactil.scrollTop < (this.marge)) {
            this.progress.y++;
            return this.lastScroll.y = this.tactil.scrollTop = this.rect.height - (2 * this.marge)
        }


        for (const cb of this.register.scroll) {
            cb({
                x: this.tactil.scrollWidth,
                y: this.tactil.scrollHeight
            })
        }

        this.alertDistance();
        this.alertStep();
    }

    getView() {
        return this.tactil;
    }
   
}
