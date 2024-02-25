import * as THREE from "three";
import { Primitive } from "./Primitive/Primitive";
export interface AbstractWorld{
     getScene():THREE.Scene
     getCamera():THREE.Camera
     update(time?:number, step?:number, renderer?:THREE.WebGLRenderer):void
     open():void
     close():void

}

export class World {
    _renderer: THREE.WebGLRenderer;
    currentWorl : AbstractWorld;
    constructor() {
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setAnimationLoop(this.animus);
        const container = document.createElement('div');
        container.id = 'world';
        container.style.zIndex = '-100';
        document.body.appendChild(container)

        container.append(this._renderer.domElement);
        
        this.currentWorl = new Primitive()
        
        window.addEventListener('resize', this.onResize)
    }

    
    onResize() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this.currentWorl.getCamera()
        this._renderer.domElement.height=  window.innerHeight
        this._renderer.domElement.width= window.innerWidth;
    }
    animus = (time: number) => {
        const t = time * 0.001;
        this.currentWorl.update(t)
        this._renderer.render(this.currentWorl.getScene(),this.currentWorl.getCamera())
    }
}