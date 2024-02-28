import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export const  WorlGui = new GUI();
export interface Feature {
    icon: string,
    type: string,
    path:string,
    uuid:string,
    ext:'.png'|'.jpg'|'.jpeg'|'.webp'
    name: string,
    values: {
        label: string,
        value: string,
        ext?:string
    }[]
}
export interface AbstractWorld {
    getScene(): THREE.Scene
    getCamera(): THREE.Camera
    update(time?: number, step?: number, renderer?: THREE.WebGLRenderer): void
    open(): void
    close(): void
    init(renderer: THREE.WebGLRenderer): void
    getUUID(): string;
    getFeatures(): Feature[]
}
const params = {
    exposure: 1.0,
    toneMapping: 'AgX' as const,
    blurriness: 0.3,
    intensity: 1.0,
};

const toneMappingOptions = {
    None: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
    AgX: THREE.AgXToneMapping,
    Custom: THREE.CustomToneMapping
};

export class WorldManager {
    public static worldManager: WorldManager | null = null;
    _renderer: THREE.WebGLRenderer;
    currentWorl: AbstractWorld | null = null;
    stats:Stats
    constructor(container: HTMLElement) {
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setAnimationLoop(this.animus);
        this._renderer.toneMapping = toneMappingOptions[params.toneMapping];
        this._renderer.toneMappingExposure = params.exposure;
        
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
        container.append(this._renderer.domElement);
        container.style.zIndex = '-100';
        
        window.addEventListener('resize', this.onResize)
        
        const gui = WorlGui.addFolder('World');
        const toneMappingFolder = gui.addFolder('tone mapping');
        toneMappingFolder.close();
        
        toneMappingFolder.add(params, 'toneMapping' as any, Object.keys(toneMappingOptions))
        .onChange( ()=> {
            this._renderer.toneMapping = toneMappingOptions[params.toneMapping];
            });
            
        toneMappingFolder.add( params, 'blurriness', 0, 1 )
        
        .onChange( ( value )=> {
            if(this.currentWorl)this.currentWorl.getScene().backgroundBlurriness = value;
        } );
        
        toneMappingFolder.add( params, 'intensity', 0, 1 )

        .onChange( ( value ) =>{
            if(this.currentWorl)this.currentWorl.getScene().backgroundIntensity = value;
        } );
        
        toneMappingFolder.add( params, 'exposure', 0, 2 )
        
        .onChange(()=> {
            
            this._renderer.toneMappingExposure = params.exposure;
            
        } );
            
        WorldManager.worldManager = this;
    }
        
    setWorld(world: AbstractWorld) {
        world.init(this._renderer);
        this.currentWorl = world;
        world.getScene().backgroundBlurriness = params.blurriness;
    }

    onResize() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.domElement.height = window.innerHeight
        this._renderer.domElement.width = window.innerWidth;
    }
    animus = (time: number) => {
        const t = time * 0.001;
        this.stats.update();
        if (this.currentWorl) {
            this.currentWorl.update(t)
            this._renderer.render(this.currentWorl.getScene(), this.currentWorl.getCamera())
        }

    }
}