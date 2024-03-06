import * as THREE from "three";
import { AbstractWorld, WorldManager } from "../WorldManager";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Feature } from "../../DataBase";
// import { noise2 } from "../Utils/perlin";

export let Ring_model_Event = {
  fun: [] as ((model: THREE.Object3D) => any)[],
  ring: null as THREE.Object3D | null
};



export class World implements AbstractWorld {
  public static testWorld = {
    scene: 0x334455,
    ground: 0x4ffcf9e,
  }
  public static testGem = {
    color: 0x84d5dc,//pc
    metalness: 0,
    roughness: 0,
    reflectivity: 0,
    ior: 1.1,
    thickness: 30,
    clearcoat: 0,
    transmission: 1,

  }
  public static testMetal = {
    color: 0xbead2e,//pc
    metalness: 1,
    roughness: 0,
  }
  scene: THREE.Scene;
  camera: THREE.Camera;
  ring: THREE.Object3D | null = null;
  controls: OrbitControls | null = null;
  upDateFeatureMap:{[key:string]: (value:Feature['values'][0]) => void} 
  constructor() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
    this.camera.position.set(7, 7, 7);
    this.camera.lookAt(0, 0, 0);
    this.scene = new THREE.Scene();

    const path = '/src/World/images/royal_esplanade_1k.hdr';
    const setTexture = (texture: THREE.DataTexture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = texture;
      this.scene.environment = texture;
    }
    WorldManager.loadCache(new RGBELoader(), path, setTexture)

    const updateGem = (o: any, key: string, value: any) => {
      let i = 0;
      for (const mesh of o.children) {
        i++;
        if (i == 5 || i == 6) continue;
        mesh.material[key] = value;
      }
    }
    const updateMetal = (o: any, key: string, value: any) => {
      [4, 5].forEach(v => {
        const mesh = o.children[v];
        mesh.material[key] = value;
      })
    }

    let root: any = null

    const seTmodel = (gltf: any) => {
      root = gltf.scene.children[0].clone();
      console.log(root);

      this.ring = new THREE.Object3D();
      this.ring.add(root);
      Ring_model_Event.fun.forEach(fun => fun(this.ring!));
      root.rotation.x = 0
      this.ring.translateY(0)
      this.scene.add(this.ring)
      root.scale.set(0.5, 0.5, 0.5)
      updateMetal(root, 'metalness', World.testMetal.metalness)
      updateMetal(root, 'roughness', World.testMetal.roughness)
      updateMetal(root, 'color', new THREE.Color(World.testMetal.color))
      updateGem(root, 'metalness', World.testGem.metalness)
      updateGem(root, 'roughness', World.testGem.roughness)
      updateGem(root, 'color', new THREE.Color(World.testGem.color))
      updateGem(root, 'reflectivity', World.testGem.reflectivity)
      updateGem(root, 'ior', World.testGem.ior)
      updateGem(root, 'thickness', World.testGem.thickness)
      updateGem(root, 'transmission', World.testGem.transmission)
      updateGem(root, 'clearcoat', World.testGem.clearcoat)
      updateGem(root, 'side', THREE.DoubleSide)
    }
    const modelPath = 'src/World/models/ring_1.glb';

    new GLTFLoader().load(modelPath, seTmodel);

    window.addEventListener('resize', () => {
      (this.camera as any).aspect = window.innerWidth / window.innerHeight;
      (this.camera as any).updateProjectionMatrix();
    })
    this.upDateFeatureMap ={
      'metal': (value:Feature['values'][0]) => {
        if(value.value)updateMetal(root, 'color', new THREE.Color(parseInt(value.value, 16)))
      },
      'gem': (value: Feature['values'][0]) => {
        if(value.value)updateGem(root, 'color', new THREE.Color(parseInt(value.value, 16)))
      }
   }
  }

  showFeature(_id: string): void {
    throw new Error("Method not implemented.");
  }
  init(renderer: THREE.WebGLRenderer) {
    this.controls = new OrbitControls(this.camera, renderer.domElement)
    this.controls.target.z = 0;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enabled = true;
    this.controls.maxDistance = 20;
    this.controls.minDistance = 7;
    // this.controls.domElement = document.createElement('div');
  }

 

  updateFeature(feature: Feature,value:Feature['values'][0]) {
    this.upDateFeatureMap[feature.name]?.(value)
  }
  createBox(w: number, h: number, d: number) {

    const boxGeometry = new THREE.BoxGeometry(w, h, d);
    const boxMaterial = new THREE.MeshNormalMaterial();

    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.geometry
    return box
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
    // this.ring?.rotation.set(0, t, 0);
    // this.ring.scale.set( (t%1000)/1000, (t%1000)/1000, (t%1000)/1000 );
    this.controls?.update();
  }
  open(_renderer: THREE.WebGLRenderer): void {
    if (this.controls) this.controls.enabled = true;
  }
  close(): void {
    if (this.controls) this.controls.enabled = false;
  }

}