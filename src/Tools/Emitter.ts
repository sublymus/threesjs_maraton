export type Callback<T> = ((v: T) => any);

export class Emitter<T , E> {
   //@ts-ignore
    constructor(events:E ,protected register: {[key in E[number]]:Callback<T>[]}){

    }
    addListener(event: keyof typeof this.register, cb: Callback<T>) {
        this.register[event].push(cb)
    }
    removeListener(event: keyof typeof this.register, cb: Callback<T>) {
        this.register[event] = this.register[event].filter((_cb) => {
            return cb !== cb;
        })
    }
}