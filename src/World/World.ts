import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export const WorlGui = new GUI();
export interface Feature {
    icon: string,
    type: string,
    path: string,
    uuid: string,
    ext: '.png' | '.jpg' | '.jpeg' | '.webp'
    name: string,
    values: {
        label: string,
        id: string,
        value?: string,
        ext?: string
    }[]
}
export type Features = { [key: string]: Feature }
export type CollectedFeatures = { [key: string]: Feature['values'][0] }
export type FeaturesCollector = {
    add(key: string, value: Feature['values'][0] | undefined): void
    get(key: string): Feature['values'][0] | undefined
    all(): CollectedFeatures
};

export interface AbstractWorld {
    getScene(): THREE.Scene
    getCamera(): THREE.Camera
    update(time?: number, step?: number, renderer?: THREE.WebGLRenderer): void
    open(renderer : THREE.WebGLRenderer): void
    close(): void
    init(renderer: THREE.WebGLRenderer): void
    getUUID(): string;
    getFeatures(): Features;
    showFeature(uuid: string): void;
    featuresCollector: FeaturesCollector
}
const params = {
    exposure: 2.0,
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
    public static loadCache<T extends Function>(loader: {
        load: (path: string, setter: T) => any
    }, path: string, setter: T) {
        if (WorldManager.WorldCache[path]) setter(WorldManager.WorldCache[path]);
        else {
            //@ts-ignore
            loader.load(path, (res: any) => {
                WorldManager.WorldCache[path] = res;
                setter(res);
            });
        }
    }
    public static WorldCache: { [path: string]: any } = {};
    private _renderer: THREE.WebGLRenderer;
    currentWorl: AbstractWorld | null = null;
    stats: Stats;
    // WorlList
    constructor(container: HTMLElement) {
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setAnimationLoop(this.animus);
        this._renderer.toneMapping = toneMappingOptions[params.toneMapping];
        this._renderer.toneMappingExposure = params.exposure;
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
        container.append(this._renderer.domElement);
        // this._renderer.setSize(window.innerWidth*0.7,window.innerHeight*0.7)
        this._renderer.setPixelRatio(0.9 );
        container.style.zIndex = '-100';

        window.addEventListener('resize', this.onResize)

        const gui = WorlGui.addFolder('World');
        const toneMappingFolder = gui.addFolder('tone mapping');
        toneMappingFolder.close();

        toneMappingFolder.add(params, 'toneMapping' as any, Object.keys(toneMappingOptions))
            .onChange(() => {
                this._renderer.toneMapping = toneMappingOptions[params.toneMapping];
            });

        toneMappingFolder.add(params, 'blurriness', 0, 1)

            .onChange((value) => {
                if (this.currentWorl) this.currentWorl.getScene().backgroundBlurriness = value;
            });

        toneMappingFolder.add(params, 'intensity', 0, 1)

            .onChange((value) => {
                if (this.currentWorl) this.currentWorl.getScene().backgroundIntensity = value;
            });

        toneMappingFolder.add(params, 'exposure', 0, 2)

            .onChange(() => {

                this._renderer.toneMappingExposure = params.exposure;

            });

        WorldManager.worldManager = this;
    }

    setWorld(world: AbstractWorld) {
        world.init(this._renderer);
        world.open(this._renderer);
        this.currentWorl = world;
        world.getScene().backgroundBlurriness = params.blurriness;
    }

    setExposure(uuid:string,data:{exposure?:number,toneMapping?:keyof typeof toneMappingOptions}){
        if(uuid != this.currentWorl?.getScene().uuid) return;
        if(data.toneMapping)this._renderer.toneMapping = toneMappingOptions[data.toneMapping];
        if( data.exposure) this._renderer.toneMappingExposure = data.exposure
    }

    onResize = () => {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        // this._renderer.domElement.height = window.innerHeight
        // this._renderer.domElement.width = window.innerWidth;
        if (this.currentWorl?.getCamera()) {
            (this.currentWorl.getCamera() as any).aspect = window.innerWidth / window.innerHeight;
            (this.currentWorl.getCamera() as any).updateProjectionMatrix();
        }
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