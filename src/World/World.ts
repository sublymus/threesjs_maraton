import * as THREE from "three";

export interface Feature {
    icon: string,
    type: string,
    name: string,
    values: {
        label: string,
        value: string,
        icon: string,
    }
}
export interface AbstractWorld {
    getScene(): THREE.Scene
    getCamera(): THREE.Camera
    update(time?: number, step?: number, renderer?: THREE.WebGLRenderer): void
    open(): void
    close(): void
    init(renderer:THREE.WebGLRenderer):void
    getUUID(): string;
    getFeatures(): Feature[]
}

export class WorldManager {
    public static worldManager:WorldManager|null = null;
    _renderer: THREE.WebGLRenderer;
    currentWorl: AbstractWorld | null = null;
    constructor(container:HTMLElement) {
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setAnimationLoop(this.animus);
        container.style.zIndex = '-100';
        container.append(this._renderer.domElement);
        WorldManager.worldManager = this;

        window.addEventListener('resize', this.onResize)
    }

    setWorld(world: AbstractWorld) {
        world.init(this._renderer);
        this.currentWorl = world;
    }

    onResize() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.domElement.height = window.innerHeight
        this._renderer.domElement.width = window.innerWidth;
    }
    animus = (time: number) => {
        const t = time * 0.001;
        if (this.currentWorl) {
            this.currentWorl.update(t)
            this._renderer.render(this.currentWorl.getScene(), this.currentWorl.getCamera())
        }

    }
}