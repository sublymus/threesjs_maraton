import "./Tactil.css";
export type VECTOR = { x: number, y: number }
type CallbackVector = ((v: VECTOR) => any);
export class Tactil {
    private register: {
        step: CallbackVector[],
        direction: CallbackVector[];
        distance: CallbackVector[]
        scroll: CallbackVector[]
    } = {
            direction: [],
            distance: [],
            scroll: [],
            step: []
        }
    private lastScroll: VECTOR = {
        x: 0,
        y: 0
    };

    private rect: { width: number, height: number } = { height: 0, width: 0 };
    private marge = 1;

    private tactil: HTMLDivElement;
    private scrollable: HTMLDivElement;
    private lastdirection: VECTOR = {
        x: 0,
        y: 0
    };
    private progress: VECTOR = {
        x: 0,
        y: 0
    };
    resize(rec: { width: number, height: number }){
        this.tactil.style.width = rec.width + 'px';
        this.tactil.style.height = rec.height + 'px';
        this.tactil.style.top = 0 + 'px';
        this.tactil.style.left = 0 + 'px';

        this.rect = rec;

        this.scrollable.style.width = (this.rect.width * 2) + 'px';
        this.scrollable.style.height = (this.rect.height * 2) + 'px';

    }
    visibility(isVisible:boolean){
        this.tactil.style.display = isVisible?'block':'none'
    }
    constructor() {

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
            }
        }, 100);
        setInterval(() => {
            this.lastdirection.x = 0;
            this.lastdirection.y = 0;
        }, 1000);
    }
    alertDistance() {

        for (const cb of this.register.distance) {
            cb({
                x: this.progress.x * (this.rect.width - 3 * this.marge) + this.tactil.scrollLeft,
                y: this.progress.x * (this.rect.width - 3 * this.marge) + this.tactil.scrollTop
            })
        }
    }
    alertStep() {
        const step: VECTOR = {
            x: this.tactil.scrollLeft - this.lastScroll.x,
            y: this.tactil.scrollTop - this.lastScroll.y
        };
        for (const cb of this.register.step) {
            cb(step)
        }
        /**************************
      *  DIRECTION
      **************************/
        let isDirectionChanged = false;
        if (Math.abs(step.x) > 5) {
            if (step.x < 0 && this.lastdirection.x >= 0) {
                isDirectionChanged = true;
                this.lastdirection.x = -1;
            } else if (step.x > 0 && this.lastdirection.x <= 0) {
                isDirectionChanged = true;
                this.lastdirection.x = 1;
            }
        }
        if (Math.abs(step.y) > 5) {
            if (this.lastdirection.y >= 0 && step.y < 0) {
                isDirectionChanged = true;
                this.lastdirection.y = -1;
            } else if (this.lastdirection.y <= 0 && step.y > 0) {
                isDirectionChanged = true;
                this.lastdirection.y = 1;
            }
        }

        if (isDirectionChanged) {

            for (const cb of this.register.direction) {
                cb(this.lastdirection)
            }
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
                x:this.tactil.scrollWidth,
                y:this.tactil.scrollHeight
            })
        }
        this.alertDistance();
        this.alertStep();
    }

    getView() {
        return this.tactil;
    }
    addListener(event: keyof typeof this.register, cb: CallbackVector) {
        this.register[event].push(cb)
    }
    removeListener(event: keyof typeof this.register, cb: CallbackVector) {
        this.register[event] = this.register[event].filter((_cb) => {
            return cb !== cb;
        })
    }
}
