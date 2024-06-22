import * as THREE from "three";
// import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
// import Stats from "three/examples/jsm/libs/stats.module.js";
import * as ADDON from 'three/addons'
import { Tactil } from "../Tools/Tactil";
import { Feature } from "../DataBase";

export const WorlGui: any = null//new GUI();
export interface AbstractLocalLoader {
    showFeature(uuid: string): void;
    updateFeature(feature: Feature, value: string): void;
    getModel(): Promise<THREE.Object3D>;
    getDependencies(): Dependencies;
    init(this: AbstractWorld, dependencies: Dependencies['obj']): void
}

export interface AbstractWorld {
    localLoader: AbstractLocalLoader;
    init(this: AbstractWorld, dependencies: Dependencies['obj'], renderer: THREE.WebGLRenderer, world:typeof WorldManager): void
    getDependencies(): Dependencies,
    getScene(): THREE.Scene
    getCamera(): THREE.Camera
    update(time?: number, step?: number, renderer?: THREE.WebGLRenderer): void
    open(): void
    close(): void
};



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

export interface Dependencies {
    obj: {
        [key: string]: any,
    },
    path: {
        [key: string]: string,
    }
}

type i = (obj: Dependencies['obj'], renderer: THREE.WebGLRenderer , world:typeof WorldManager) => void|((obj: Record<string, any>) => void)

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
    public static tactil = new Tactil();
    
    public _renderer: THREE.WebGLRenderer;
    public currentWorl: AbstractWorld | null = null;
    // private stats: Stats;
    // WorlList
    constructor(container: HTMLElement) {
        WorldManager.worldManager = this;
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.9));
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setAnimationLoop(this.animus);
        this._renderer.toneMapping = toneMappingOptions[params.toneMapping];
        this._renderer.toneMappingExposure = params.exposure;
        // this.stats = new Stats();
        container.append(this._renderer.domElement);
        // container.append(WorldManager.tactil.getView())
        container.style.zIndex = '-100';

        window.addEventListener('resize', this.onResize)

        // WorldManager.tactil.resize({ height: window.innerHeight, width: window.innerWidth })

        // if (WorlGui) {
        //     const gui = WorlGui.addFolder('World');
        //     const toneMappingFolder = gui.addFolder('tone mapping');
        //     toneMappingFolder.close();

        //     toneMappingFolder.add(params, 'toneMapping' as any, Object.keys(toneMappingOptions))
        //         .onChange(() => {
        //             this._renderer.toneMapping = toneMappingOptions[params.toneMapping];
        //         });

        //     toneMappingFolder.add(params, 'blurriness', 0, 1)

        //         .onChange((value) => {
        //             if (this.currentWorl) this.currentWorl.getScene().backgroundBlurriness = value;
        //         });

        //     toneMappingFolder.add(params, 'intensity', 0, 1)

        //         .onChange((value) => {
        //             if (this.currentWorl) this.currentWorl.getScene().backgroundIntensity = value;
        //         });

        //     toneMappingFolder.add(params, 'exposure', 0, 2)

        //         .onChange(() => {

        //             this._renderer.toneMappingExposure = params.exposure;

        //         });
        // }
        // WorlGui?.close()

    }
    public async initialize(initializer: i) {
        // // const obj: any = {};
        // await new Promise(async (rev) => {
        //     // for (const key in dependencies.path) {
        //     //     if (Object.prototype.hasOwnProperty.call(dependencies.path, key)) {
        //     //         const path = dependencies.path[key];
        //     //         console.log('==>',path);
                    
        //     //         const module = await import(/* @vite-ignore */ path);
        //     //         console.log('ok',path);
        //     //         obj[key] = module[key]||module;
        //     //     }
        //     // }
        //     // rev(null)
        // });
        console.log('three , addon');
        
        initializer({THREE, ADDON}, this._renderer , WorldManager );
    }

    setWorld(world: AbstractWorld) {
        this.currentWorl?.close()
        world.open();
        this.currentWorl = world;
        world.getScene().backgroundBlurriness = params.blurriness;
    }

    setExposure(uuid: string, data: { exposure?: number, toneMapping?: keyof typeof toneMappingOptions }) {
        if (uuid != this.currentWorl?.getScene().uuid) return;
        if (data.toneMapping) this._renderer.toneMapping = toneMappingOptions[data.toneMapping];
        if (data.exposure) this._renderer.toneMappingExposure = data.exposure
    }

    onResize = () => {
        WorldManager.tactil.resize({ height: window.innerHeight, width: window.innerWidth })
        this._renderer.setSize(window.innerWidth, window.innerHeight, true);
    }

    animus = (time: number) => {
        const t = time * 0.001;
        // this.stats.update();
        if (this.currentWorl) {
            this.currentWorl.update(t)
            this._renderer.render(this.currentWorl.getScene(), this.currentWorl.getCamera())
        }

    }
}