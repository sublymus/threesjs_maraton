import {world_config} from './world_config.js'
export class LocalLoader {
  static testWorld = {
    scene: 0x334455,
    ground: 0x4ffcf9e,
  }
  static testGem = {
    color: 0x84d5dc,//pc
    metalness: 0,
    roughness: 0,
    reflectivity: 0,
    ior: 1.1,
    thickness: 30,
    clearcoat: 0,
    transmission: 1,
  }
  static testMetal = {
    color: 0xbead2e,//pc
    metalness: 1,
    roughness: 0,
  }

  ring = null;
  upDateFeatureMap
  modelPromise

  dependencies = {
    path: {
      THREE: '/three/build/three.module.js',
      GLTFLoader: '/three/examples/jsm/loaders/GLTFLoader.js'
    },
    obj: {
      THREE: null,
      GLTFLoader: null
    }
  }
  constructor() {

  }

  getDependencies(){
    return this.dependencies;
  }
  init=({THREE,GLTFLoader} )=> {
    this.dependencies.obj.GLTFLoader = GLTFLoader;
    this.dependencies.obj.THREE = THREE;
    const updateGem = (o, key, value) => {
      let i = 0;
      for (const mesh of o.children) {
        i++;
        if (i == 5 || i == 6) continue;
        mesh.material[key] = value;
      }
    }
    const updateMetal = (o, key, value) => {
      [4, 5].forEach(v => {
        const mesh = o.children[v];
        mesh.material[key] = value;
      })
    }

    let root = null

    const seTmodel = (gltf) => {
      root = gltf.scene.children[0].clone();
      this.ring = new this.dependencies.obj.THREE.Object3D();
      const base = new this.dependencies.obj.THREE.Object3D();
      base.add(root);
      this.ring.add(base);
      root.rotation.x = Math.PI * (85 / 180);
      root.scale.set(0.5, 0.5, 0.5)
      updateMetal(root, 'metalness', LocalLoader.testMetal.metalness)
      updateMetal(root, 'roughness', LocalLoader.testMetal.roughness)
      updateMetal(root, 'color', new this.dependencies.obj.THREE.Color(LocalLoader.testMetal.color))
      updateGem(root, 'metalness', LocalLoader.testGem.metalness)
      updateGem(root, 'roughness', LocalLoader.testGem.roughness)
      updateGem(root, 'color', new this.dependencies.obj.THREE.Color(LocalLoader.testGem.color))
      updateGem(root, 'reflectivity', LocalLoader.testGem.reflectivity)
      updateGem(root, 'ior', LocalLoader.testGem.ior)
      updateGem(root, 'thickness', LocalLoader.testGem.thickness)
      updateGem(root, 'transmission', LocalLoader.testGem.transmission)
      updateGem(root, 'clearcoat', LocalLoader.testGem.clearcoat)
      updateGem(root, 'side', this.dependencies.obj.THREE.DoubleSide);
      return this.ring
    }
    this.modelPromise = new Promise((rev) => {
      new this.dependencies.obj.GLTFLoader().load(`${world_config.url}/model.glb`, (gltf) => {
        rev(seTmodel(gltf))
      });
    })


    this.upDateFeatureMap = {
      'metal': (value) => {
        if (typeof value == 'number' || typeof value == 'string' || typeof value == 'boolean') {
          if (typeof value == 'string') updateMetal(root, 'color', new this.dependencies.obj.THREE.Color(parseInt(value, 16)))
        } else {
          updateMetal(root, 'color', value?.value ? new this.dependencies.obj.THREE.Color(parseInt(value.value, 16)) : LocalLoader.testMetal.color)
        }
      },
      'gem': (value) => {
        if (typeof value == 'number' || typeof value == 'string' || typeof value == 'boolean') {
          if (typeof value == 'string') updateGem(root, 'color', new this.dependencies.obj.THREE.Color(parseInt(value, 16)))
        } else {
          updateGem(root, 'color', value?.value ? new this.dependencies.obj.THREE.Color(parseInt(value.value, 16)) : LocalLoader.testMetal.color)
        }
      }
    }
  }
  getModel() {
    return this.modelPromise
  }

  showFeature(_id) {
    throw new Error("Method not implemented.");
  }

  updateFeature(feature, value) {
    this.upDateFeatureMap[feature.name]?.(value)
  }

}
