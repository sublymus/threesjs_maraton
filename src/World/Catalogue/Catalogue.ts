import * as THREE from "three";
import { AbstractWorld, Features, FeaturesCollector, WorlGui, WorldManager } from "../World";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Ring_model_Event } from "../Rings/Ring_petal_1";
import { rotate } from "three/examples/jsm/nodes/Nodes.js";

const BOX_SIZE =7;

const MARGE = 0;
let RELATIVE_SCLAE = 0.3;
const SCALE = 1.2
const NEAR = 5

export class Catalogue implements AbstractWorld {
    featuresCollector: FeaturesCollector;
    scene: THREE.Scene;
    camera: THREE.Camera;
    gui: GUI;
    collected: { [key: string]: any } = {};
    controls: OrbitControls | null = null;
    mouse = {
        x: 0,
        y: 0
    }
    index = 0;
    groupe = {
        position :{
            x:0
        },
        index : 0,
        model : new THREE.Object3D,
    }
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 300)
        // this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
        this.updateCamera()
        this.scene = new THREE.Scene();
// console.log(this.camera);

        this.gui = WorlGui.addFolder(this.scene.uuid)
        this.gui.close()

        this.scene.add(this.groupe.model);
        const path = '/src/World/images/royal_esplanade_1k.hdr';
        const setTexture = (texture: THREE.DataTexture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;
        }

        WorldManager.loadCache(new RGBELoader(), path, setTexture)

        const upDateFeatureMap: { [key: string]: Function } = {
            'feature_A': () => {
                //update
            }
        }
        this.featuresCollector = {
            add: (key, value) => {
                if (value) {
                    this.collected[key] = value;
                    upDateFeatureMap[key](value.value || value.id)
                }
                else {
                    delete this.collected[key];
                }
            },
            all: () => this.collected,
            get: (key) => this.collected[key],
        }

       
        Ring_model_Event.fun.push((model)=>{
            this.addModel(model.clone());
            this.addModel(model.clone());
            this.addModel(model.clone());
            this.addModel(model.clone());
            this.addModel(model.clone());
            this.addModel(model.clone());
        })

        
    }
    addModel(model: THREE.Object3D) {
        this.groupe.model.add(model)
       // model.scale.set(0.5, 0.5, 0.5)
        model.position.x = ((this.groupe.model.children.length - 1) * (BOX_SIZE + MARGE))
        console.log(model.position.x);

    }
    getScene(): THREE.Scene {
        return this.scene;
    }
    getCamera(): THREE.Camera {
        return this.camera
    }
    update(_time?: number | undefined, _step?: number | undefined, _renderer?: THREE.WebGLRenderer | undefined): void {
        this.groupe.model.position.x  += (this.getPositionX()- this.groupe.model.position.x)/10
        this.groupe.model.children.forEach((model,i)=>{
            if(i == this.index){
                model.position.z += (NEAR - model.position.z)/10   
                model.scale.x = model.scale.y = model.scale.z  +=  (SCALE*RELATIVE_SCLAE - model.scale.x)/10;
            }else{
                model.position.z += (-1 - model.position.z)/10
                model.scale.x = model.scale.y = model.scale.z  +=  (RELATIVE_SCLAE - model.scale.x)/10;
            }
            
        })
    }
    isOpen = false;
    open(_renderer: THREE.WebGLRenderer): void {
        this.isOpen = true;
    }
    close(): void {
        this.isOpen = false;
    }
    setIndex(i: number) {
        this.index = i<0?0:(i>=this.groupe.model.children.length?this.groupe.model.children.length-1:i);
        this.groupe.position.x = -this.getPositionX();
        console.log(this.index);
        
    }
    getPositionX(){
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
        window.addEventListener('resize',()=>{
            this.updateCamera()
        })
        document.addEventListener('keyup', (e) => {

            if (true) {
                switch (e.code) {
                    case 'ArrowRight': this.setIndex(this.index + 1)

                        break;
                    case 'ArrowLeft': this.setIndex(this.index - 1)

                        break;
                }
            }
            console.log(e);


        })
        renderer.domElement.tabIndex = 1;
        renderer.domElement.addEventListener('mousemove', mouse)
        renderer.domElement.addEventListener('touchmove', touche)
        // this.controls = new OrbitControls(this.camera, renderer.domElement)
        // this.controls.target.z = 0;
        // this.controls.enableDamping = false;
        // this.controls.dampingFactor = 0.05;
        // this.controls.enabled = true;
        // this.controls.maxDistance = 20;
        // this.controls.minDistance = 7;
        // console.log('EEEEEEEEEEEEEEE');

    }
    updateCamera(){
        const a = window.innerWidth/window.innerHeight;
            const w = 10;
            const h = w/a;
            const phi = ((this.camera as any).fov/180)*Math.PI;
            const m = (h/2)/Math.tan(phi/2);
            const l = Math.sqrt(Math.pow(m,2)-Math.pow(w/2,2))
            console.log({a,w,h,phi,m,l});
            
            this.camera.position.z= (w>h)?w*2:l;
            //@ts-ignore
            this.camera.updateProjectionMatrix();
    }
    getUUID(): string {
        throw this.scene.uuid
    }
    getFeatures(): Features {
        return {}// throw new Error("Method not implemented.");
    }
    showFeature(_uuid: string): void {
        //throw new Error("Method not implemented.");
    }

} 