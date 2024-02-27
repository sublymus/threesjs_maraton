import * as THREE from "three";
import { AbstractWorld, Feature } from "../World";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { ParametricGeometry ,OrbitControls, RGBELoader , GLTFLoader} from 'three/examples/jsm/Addons';
import { noise2 } from "../Utils/perlin";
const test = {
    emissive: 0x000000,//pc
    color: 0xbead2e,//pc
    metalness: 1,
    roughness: 0,
    r_metalness: 1,
    r_roughness: 0,
    emissiveIntensity: 1,
    scene: 0x334455,
    ground:0x4ffcf9e,
    gold() {
        test.emissive = 0x483e19;
        test.color = 0xbead2e;
        test.metalness= 1;
        test.roughness= 0;
    }
}
const Gui = new GUI();

export  class Product implements AbstractWorld {
    scene: THREE.Scene;
    camera: THREE.Camera;
    ring: THREE.Object3D | null = null;
    controls: OrbitControls | null = null;
    gui:GUI
    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 300)
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);
        this.scene = new THREE.Scene();
        
        this.gui  = Gui.addFolder(this.scene.uuid)
        this.gui.close()
        const textureEquirec = new RGBELoader().load( '../World/images/royal_esplanade_1k.hdr',(texture)=>{
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;
        },undefined,
        // onError callback
        (error) => {
            console.error('Error loading HDR file:', error);
        });
       
        this.addLight();
        this.addGround();
 
        const loader = new GLTFLoader();
        const self = this;
       
        const update = (o: any, key: string, value: any) => {
            for (const mesh of o.children) {
                mesh.material[key] = value
            }
        }
       
        let root: any = null
        this.gui.addColor(test, 'scene').onChange(() => {
            this.scene.background = new THREE.Color(test.scene)
        });
        
        this.gui.add(test, 'metalness', 0, 1, 0.1).onChange(() => {
            update(root, 'metalness', test.metalness)
        });;
        this.gui.add(test, 'roughness', 0, 1, 0.1).onChange(() => {
            update(root, 'roughness', test.roughness)
        });
        this.gui.add(test, 'emissiveIntensity', 0, 1, 0.01).onChange(() => {
            update(root, 'emissiveIntensity', test.emissiveIntensity)
        });
        this.gui.addColor(test, 'emissive').onChange(() => {
            update(root, 'emissive', new THREE.Color(test.emissive))
        });
        this.gui.addColor(test, 'color').onChange(() => {
            update(root, 'color', new THREE.Color(test.color))
        });


        loader.load('../World/models/ring_1.glb', (gltf) => {
            root = gltf.scene.children[0];
            // /his.ring = root
            this.ring = new THREE.Object3D();
            this.ring.add(root)
            root.rotation.x = 1.2
            this.ring.translateY(0.5)
            self.scene.add(this.ring)
            root.scale.set(0.5, 0.5, 0.5)
            update(root, 'metalness', test.metalness)
            update(root, 'roughness', test.roughness)
            update(root, 'color', new THREE.Color(test.color))
            update(root, 'emissive', new THREE.Color(test.emissive))
            update(root, 'envMap', textureEquirec)
            update(root, 'needsUpdate', true)
        })

    }
    init(renderer :THREE.WebGLRenderer){
        this.controls = new OrbitControls(this.camera, renderer.domElement )
        this.controls.target.z = 0;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enabled = true;
        this.controls.update()
    }
    getUUID(): string {
        throw new Error("Method not implemented.");
    }
    getFeatures() : Feature[] {
        return []
    }
    noise2D(x: number, y: number) {
        const scale = 1;
        return noise2(x*scale, y*scale) ;
    }

    smoothNoise2D(x:number, y:number) {
        const scale = 1000;
        const octaves = 10 ;
        const persistence = 1;
        const exponentiation=10;
        const height = 1;
        const lacunarity = 10;
        const xs = x *scale;
        const ys = y *scale
        let amplitude = 1.0;
        let frequency = 1.0;
        let normalization = 0;
        let total = 0;
        for (let o = 0; o < octaves; o++) {
          const noiseValue = noise2(
              xs * frequency, ys * frequency) * 0.5 + 0.5;
          total += noiseValue * amplitude;
          normalization += amplitude;
          amplitude *= persistence;
          frequency *= lacunarity;
        }
        total /= normalization;
        return Math.pow(total, exponentiation) * height;
      }

    createBox(w: number, h: number, d: number) {

        const boxGeometry = new THREE.BoxGeometry(w, h, d);
        const boxMaterial = new THREE.MeshNormalMaterial();

        const box = new THREE.Mesh(boxGeometry, boxMaterial)
        box.geometry
        return box
    }
    addLight() {
        this.scene.add(new THREE.HemisphereLight(0xffffff, 0xffddbb, 0.3))
        const light = new THREE.DirectionalLight(0xffffff, 0.8);
        const light1 = new THREE.DirectionalLight(0xffffff, 0.4);
        const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(20, 20, -20);
        light1.position.set(20, 20, 20);
        light2.position.set(-20, 20, -20);
        this.scene.add(light);
        this.scene.add(light1);
        this.scene.add(light2);
    }
    addGround() {
        const self = this;

        const groundGeometry = new ParametricGeometry(function fun(u,v ,target){
            const x = u*50-25;
            const y = v*50-25;
            // const  d = Math.sqrt(x*x + y*y); 
            const scale = 1;
            const a = x*scale;
            const b = y*scale;
            let z = 0;
            target.set(x,y,z)
        },300,300)

        
        const groundMaterial = new THREE.MeshPhongMaterial();
        groundMaterial.displacementMap = new THREE.TextureLoader().load('../World/images/tissus2/TexturesCom_Fabric_Rough2_512_height.jpg' ); 
        groundMaterial.displacementScale = 0.2;
        groundMaterial.displacementBias = 0;
        groundMaterial.color = new THREE.Color(test.ground);

        groundMaterial.normalMap = new THREE.TextureLoader().load('../World/images/tissus2/TexturesCom_Fabric_Rough2_512_normal.jpg' ); 
        groundMaterial.specularMap = new THREE.TextureLoader().load('../World/images/tissus2/TexturesCom_Fabric_Rough2_512_albedo.jpg' ); 
        groundMaterial.map = new THREE.TextureLoader().load('../World/images/tissus2/30756994992.jpg' ); 

 
        this.gui.add(test, 'metalness', 0, 1, 0.1).onChange(() => {
            // groundMaterial.ro
        });;
        this.gui.add(test, 'roughness', 0, 1, 0.1).onChange(() => {
            // update(root, 'roughness', c.roughness)
        });
        this.gui.addColor(test, 'ground').onChange(() => {
            groundMaterial.color = new THREE.Color(test.ground);
        });

        const ground = new THREE.Mesh(groundGeometry, groundMaterial)
        ground.rotation.x = -Math.PI / 2;
        
        this.scene.add(ground);

    }

    getScene(): THREE.Scene {
        return this.scene
    }
    getCamera(): THREE.Camera {
        return this.camera
    }
    update(t: number) {
        // console.log('$$$$$4');
        t = t / 10
        this.ring?.rotation.set(0, t, 0);
        // this.ring.scale.set( (t%1000)/1000, (t%1000)/1000, (t%1000)/1000 );
        this.controls?.update();
    }
    open(): void {
        throw new Error("Method not implemented.");
    }
    close(): void {
        throw new Error("Method not implemented.");
    }

}