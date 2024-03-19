import * as THREE from "three";
import { AbstractLocalLoader, AbstractWorld, Dependencies, WorldManager } from "../WorldManager";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Feature } from "../../DataBase";
import { Emitter } from "../../Tools/Emitter";

const BOX_SIZE = 6.4;

const MARGE = 0;
let RELATIVE_SCLAE = 0.2;
const SCALE = 4
const NEAR = 5;

const events = ['chance'] as const
export interface CatalogueEvent {
    focusedModel: THREE.Object3D
}
export class CatalogueWorld extends Emitter<CatalogueEvent, typeof events> implements AbstractWorld {
    public static Info = {
        product: null,
    }
    
    public static catalogueWorld: CatalogueWorld | null = null;
    scene: THREE.Scene;
    camera: THREE.Camera;
    collected: { [key: string]: any } = {};
    controls: OrbitControls | null = null;
    mouse = {
        x: 0,
        y: 0
    }
    index = 0;
    groupe = {
        position: {
            x: 0
        },
        index: 0,
        model: new THREE.Object3D,
    }
    outId = 0;
    localLoader: AbstractLocalLoader;
    constructor() {
        super(events, {
            chance: []
        })
        CatalogueWorld.catalogueWorld = this;
        WorldManager.tactil.addListener('step', (step) => {
            this.indexBeforLastRemove = -1
            if (step.x != 0) {
                clearTimeout(this.outId)
                let s = step.x / 60;
                const l = 0.2;
                s = s > l ? l : (s < -l ? -l : s)
                this.setIndex(this.index + s);
                this.outId = setTimeout(() => {
                    this.setIndex(Math.round(this.index));
                }, 500);
            }
        })
        WorldManager.tactil.visibility(true);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.01, 300)
        this.camera.lookAt(0, 0, 0);
        this.updateCamera()
        this.scene = new THREE.Scene();
        this.scene.add(this.groupe.model);
        const path = '/src/World/images/royal_esplanade_1k.hdr';
        
        const setTexture = (texture: THREE.DataTexture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;
        }

        WorldManager.loadCache(new RGBELoader(), path, setTexture)
        //@ts-ignore
        this.localLoader =  null;
    }
    getDependencies(): Dependencies {
        throw new Error("Method not implemented.");
    }
    presentation(): void {
        throw new Error("Method not implemented.");
    }
    async getModel(): Promise<THREE.Object3D> {
        return this.groupe.model
    }
    updateFeature(_feature: Feature): void {
        throw new Error("Method not implemented.");
    }
    addModel(model: THREE.Object3D) {
       
        this.groupe.model.add(model);
        this.disposeChildren();
    }
    disposeChildren() {
        this.groupe.model.children.forEach((model, i) => {
            model.position.x = (i * (BOX_SIZE + MARGE));
        })
        this.setIndex(this.index);
    }
    indexBeforLastRemove = -1;
    removeAll() {
        this.indexBeforLastRemove = this.index;
        this.groupe.model.children.forEach(c => {
            this.groupe.model.remove(c)
            c.removeFromParent()
        });
        this.groupe.model.children =[] //TODO 
    }
    getScene(): THREE.Scene {
        return this.scene;
    }
    getCamera(): THREE.Camera {
        return this.camera
    }
    update(_time?: number | undefined, _step?: number | undefined, _renderer?: THREE.WebGLRenderer | undefined): void {
        this.groupe.model.position.x += (this.getPositionX() - this.groupe.model.position.x) / 10
        this.groupe.model.children.forEach((model, i) => {
            if (i == this.index) {
                model.position.z += (NEAR - model.position.z) / 5
                model.scale.x = model.scale.y = model.scale.z += (SCALE * RELATIVE_SCLAE - model.scale.x) / 10;
            } else {
                model.position.z += (-1 - model.position.z) / 5
                model.scale.x = model.scale.y = model.scale.z += (RELATIVE_SCLAE - model.scale.x) / 10;
            }
        })
    }
    open(): void {
        WorldManager.tactil.visibility(true);
    }
    close(): void {}

    setIndex(i: number) {
        if(this.indexBeforLastRemove>=0){
            i  = this.indexBeforLastRemove
        }
        this.index = i < 0 ? 0 : (i >= this.groupe.model.children.length - 1 ? this.groupe.model.children.length - 1 : i);
        
        this.groupe.position.x = -this.getPositionX();
        if (this.index % 1 === 0) {
            this.register.chance.forEach((cb)=>{
                cb({
                    focusedModel:this.groupe.model.children[this.index]
                })
            })

        }
    }
    getPositionX() {
        return -(this.index * (BOX_SIZE + MARGE))
    }
    init(renderer: THREE.WebGLRenderer): void {
        const mouse = (e: MouseEvent) => {
            const w = window.innerWidth / 2;
            const y = window.innerHeight / 2;
            this.mouse.x = (e.clientX - w) / w;
            this.mouse.y = (e.clientY - y) / y;
        }
        const touche = (e: TouchEvent) => {
            const w = window.innerWidth / 2;
            const y = window.innerHeight / 2;
            this.mouse.x = (e.touches[0].clientX - w) / w;
            this.mouse.y = (e.touches[0].clientY - y) / y;

        }
        window.addEventListener('resize', () => {
            this.updateCamera();
            (this.camera as any).aspect = window.innerWidth / window.innerHeight;
            (this.camera as any).updateProjectionMatrix();

        })
        renderer.domElement.tabIndex = 1;
        renderer.domElement.addEventListener('mousemove', mouse)
        renderer.domElement.addEventListener('touchmove', touche)
    }
    updateCamera() {
        const a = window.innerWidth / window.innerHeight;
        const w = 15;
        const h = w / a;
        const phi = ((this.camera as any).fov / 180) * Math.PI;
        const m = (h / 2) / Math.tan(phi / 2);
        const l = Math.sqrt(Math.pow(m, 2) - Math.pow(w / 2, 2))
        this.camera.position.z = (w > h * 0.8) ? w * 3.5 : l;
        //@ts-ignore
        this.camera.updateProjectionMatrix();
    }
    showFeature(_uuid: string): void {
        throw new Error("Method not implemented.");
    }

} 