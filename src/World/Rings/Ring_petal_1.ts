import * as THREE from "three";
import { AbstractWorld, CollectedFeatures, Feature, Features, FeaturesCollector, WorlGui, WorldManager } from "../World";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { noise2 } from "../Utils/perlin";


const gemFeature : Feature = {
  uuid: (Math.random() * 10000000).toString(32),
  name: 'gem',
  icon: '/src/World/images/gem/gem.png',
  ext: '.png',
  type: 'icon',
  // default:'blue_garnet',
  path: '/src/World/images/gem/',
  values: [{
    label: 'Grenat bleu',
    id: 'blue_garnet',
    value: '2d3563'
  }, {
    label: 'Taaffeite',
    id: 'taaffeite',
    value: '9575ab'
  }, {
    label: 'Grandidierite',
    id: 'grandidierite',
    value: '3f7269'
  }, {
    label: 'Serendibite',
    id: 'serendibite',
    value: '024a3d'
  }, {
    label: 'Diamant',
    id: 'diamond',
    value: 'abdcf9'
  }, {
    label: 'Rubis',
    id: 'ruby',
    value: 'c24a4a'
  }, {
    label: 'Alexandrite',
    id: 'alexandrite',
    value: '0d5a4c'
  }, {
    label: 'Béryl rouge',
    id: 'red_beryl',
    value: '6f4060'
  }, {
    label: 'Padparadscha Saphire',
    id: 'padparadscha_saphire',
    value: '98485d'
  }, {
    label: 'Musgravite',
    id: 'musgravite',
    value: 'b2acad'
  }, {
    label: 'Saphir',
    id: 'sapphire',
    value: '288fc3'
  }, {
    label: 'Benitoite',
    id: 'benitoite',
    value: '286bc3'
  }, {
    label: 'Opale noire',
    id: 'black_opal',
    value: '4c415e'
  }, {
    label: 'Grenat démantoïde',
    id: 'demantoid_garnet',
    value: '5cb065'
  }, {
    label: 'Poudretteite',
    id: 'poudretteite',
    value: 'a770b5'
  }, {
    label: 'Opale de feu',
    id: 'fire_opal',
    value: 'b38a3c'
  }, {
    label: 'Jeremejevite',
    id: 'jeremejevite',
    value: '99a1ca'
  }, {
    label: 'Tanzanite',
    id: 'tanzanite',
    value: '46518a'
  }]
}

const metalFeature : Feature = {
  uuid: (Math.random() * 10000000).toString(32),
  name: 'metal',
  icon: '/src/World/images/metal/metal.png',
  ext: '.png',
  type: 'icon',
  path: '/src/World/images/metal/',
  values: [{
    label: 'Gold',
    id: 'gold',
    value: 'bead2e'
  },{
    label: 'Silver',
    id: 'silver',
    value: 'eeeeee'
  },{
    label: 'Bronze',
    id: 'bronz',
    value: 'ffaa55'
  },]
  
}

const Gui = new GUI();
const features: Features = {
  [metalFeature.uuid] : metalFeature,
  [gemFeature.uuid]:gemFeature
}
  


export class Product implements AbstractWorld {
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
    gold() {
  
      Product.testGem.color = 0x84d5dc;
      Product.testGem.metalness = 1;
      Product.testGem.roughness = 0;
    },
    silver() {
  
      Product.testGem.color = 0x84d5dc;
      Product.testGem.metalness = 1;
      Product.testGem.roughness = 0;
    },
    bronz() {
  
      Product.testGem.color = 0x84d5dc;
      Product.testGem.metalness = 1;
      Product.testGem.roughness = 0;
    }
  }
  scene: THREE.Scene;
  camera: THREE.Camera;
  ring: THREE.Object3D | null = null;
  featuresCollector: FeaturesCollector;
  public collected: CollectedFeatures = {};
  controls: OrbitControls | null = null;

  gui: GUI
  worldGui: GUI
  constructor() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 300)
    this.camera.position.set(7, 7, 7);
    this.camera.lookAt(0, 0, 0);
    this.scene = new THREE.Scene();

    this.gui = WorlGui.addFolder(this.scene.uuid)
    this.gui.close()

    const path = '/src/World/images/royal_esplanade_1k.hdr';
    const setTexture =  (texture:THREE.DataTexture) => {
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
    const updateall = (o: any, key: string, value: any) => {
      for (const mesh of o.children) {
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
    this.worldGui =   this.gui.addFolder('World');
    const gemGui =   this.gui.addFolder('Gem');
    const metalGui =   this.gui.addFolder('Metal');
    this.worldGui.addColor(Product.testWorld, 'scene').onChange(() => {
      this.scene.background = new THREE.Color(Product.testWorld.scene)
    });
    
    metalGui.add(Product.testMetal, 'metalness', 0, 1, 0.1).onChange(() => {
      updateMetal(root, 'metalness', Product.testMetal.metalness)
    });;
    metalGui.add(Product.testMetal, 'roughness', 0, 1, 0.1).onChange(() => {
      updateMetal(root, 'roughness', Product.testMetal.roughness)
    });
    metalGui.addColor(Product.testMetal, 'color').onChange(() => {
      updateMetal(root, 'color', new THREE.Color(Product.testMetal.color))
    });
    gemGui.add(Product.testGem, 'metalness', 0, 1, 0.1).onChange(() => {
      updateGem(root, 'metalness', Product.testGem.metalness)
    });;
    gemGui.add(Product.testGem, 'roughness', 0, 1, 0.1).onChange(() => {
      updateGem(root, 'roughness', Product.testGem.roughness)
    });
    gemGui.addColor(Product.testGem, 'color').onChange(() => {
      updateGem(root, 'color', new THREE.Color(Product.testGem.color))
    });
    gemGui.add(Product.testGem, 'reflectivity', 0, 1.0, 0.01).name('Reflectivity').onChange(() => {
      updateGem(root, 'reflectivity', Product.testGem.reflectivity)

    })
    gemGui.add(Product.testGem, 'ior',1, 3, 0.1).name('ior').onChange(() => {
      updateGem(root, 'ior', Product.testGem.ior)

    })
    gemGui.add(Product.testGem, 'thickness', 0, 50.0, 1).name('thickness').onChange(() => {
      updateGem(root, 'thickness', Product.testGem.thickness)

    })
    gemGui.add(Product.testGem, 'transmission', 0, 1.0, 0.01).name('transmission').onChange(() => {
      updateGem(root, 'transmission', Product.testGem.transmission)

    })
    gemGui.add(Product.testGem, 'clearcoat', 0, 1.0, 0.01).name('clearcoat').onChange(() => {
      updateGem(root, 'clearcoat', Product.testGem.clearcoat)

    })

    const seTmodel = (gltf) => {
      root = gltf.scene.children[0].clone();
      console.log(root);
      
      this.ring = new THREE.Object3D();
      this.ring.add(root);
      root.rotation.x = 0
      this.ring.translateY(0)
      this.scene.add(this.ring)
      root.scale.set(0.5, 0.5, 0.5)
      updateMetal(root, 'metalness', Product.testMetal.metalness)
      updateMetal(root, 'roughness', Product.testMetal.roughness)
      updateMetal(root, 'color', new THREE.Color(Product.testMetal.color))
      updateGem(root, 'metalness', Product.testGem.metalness)
      updateGem(root, 'roughness', Product.testGem.roughness)
      updateGem(root, 'color', new THREE.Color(Product.testGem.color))
      updateGem(root, 'reflectivity', Product.testGem.reflectivity)
      updateGem(root, 'ior', Product.testGem.ior)
      updateGem(root, 'thickness', Product.testGem.thickness)
      updateGem(root, 'transmission', Product.testGem.transmission)
      updateGem(root, 'clearcoat', Product.testGem.clearcoat)
      updateGem(root, 'side', THREE.DoubleSide)
    }
    const modelPath = 'src/World/models/ring_1.glb';

    new GLTFLoader().load(modelPath,seTmodel);
    
    const upDateFeatureMap ={
      [metalFeature.uuid] : (value:string)=>{
        updateMetal(root, 'color', new THREE.Color(parseInt(value, 16)))
      },
      [gemFeature.uuid] : (value:string)=>{
        updateGem(root, 'color', new THREE.Color(parseInt(value, 16)))
      }
    }
    this.featuresCollector = {
      add: (key, value) => {
        if (value) {
          this.collected[key] = value;
          upDateFeatureMap[key](value.value||value.id)
          

        }
        else {
          delete this.collected[key];
        }
        
      },
      all: () => this.collected,
      get: (key) => this.collected[key],
    }


    // this.addLight();
    // this.addGround();
  }
  showFeature(uuid: string): void {
    throw new Error("Method not implemented.");
  }
  init(renderer: THREE.WebGLRenderer) {
    this.controls = new OrbitControls(this.camera, renderer.domElement)
    this.controls.target.z = 0;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enabled = true;
    this.controls.maxDistance = 20;
    this.controls.minDistance = 7
  }


  getUUID(): string {
    throw new Error("Method not implemented.");
  }
  getFeatures(): Features {
    return features
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

    const groundGeometry = new ParametricGeometry(function fun(u, v, target) {
      const x = u * 50 - 25;
      const y = v * 50 - 25;
      // const  d = Math.sqrt(x*x + y*y); 
      const scale = 1;
      const a = x * scale;
      const b = y * scale;
      let z = 0;
      target.set(x, y, z)
    }, 300, 300)


    const groundMaterial = new THREE.MeshPhongMaterial();
    groundMaterial.displacementMap = new THREE.TextureLoader().load('src/World/images/tissus2/TexturesCom_Fabric_Rough2_512_height.jpg');
    groundMaterial.displacementScale = 0.2;
    groundMaterial.displacementBias = 0;
    groundMaterial.color = new THREE.Color(Product.testWorld.ground);
    this.worldGui.addColor(Product.testWorld,'ground').onChange(() => {
      groundMaterial.color = new THREE.Color(Product.testWorld.ground)
    });
    groundMaterial.normalMap = new THREE.TextureLoader().load('src/World/images/tissus2/TexturesCom_Fabric_Rough2_512_normal.jpg');
    groundMaterial.specularMap = new THREE.TextureLoader().load('src/World/images/tissus2/TexturesCom_Fabric_Rough2_512_albedo.jpg');
    groundMaterial.map = new THREE.TextureLoader().load('src/World/images/tissus2/30756994992.jpg');

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
    // this.ring?.rotation.set(0, t, 0);
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