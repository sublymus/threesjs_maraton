import { LocalLoader } from "./LocalLoader.js";
class World {
    scene;
    camera;
    controls = null;
    localLoader;

    dependencies = {
        path: {
            THREE: '/three/build/three.module.js',
            RGBELoader: '/three/examples/jsm/loaders/RGBELoader.js',
            OrbitControls: '/three/examples/jsm/controls/OrbitControls.js'
        },
        obj: {
            THREE: null,
            WorldManager: null,
            RGBELoader: null,
            OrbitControls: null
        }
    }
    WorldManager;
    constructor() {
        this.localLoader = new LocalLoader();
    }
    getDependencies() {
        this.dependencies.path = {
            ...this.dependencies.path,
            ...this.localLoader.getDependencies().path
        }
        return this.dependencies;
    }
    init = (objDependencies, renderer , WorldManager) => {
        const { THREE,RGBELoader, OrbitControls } = objDependencies;
        this.dependencies.obj.OrbitControls = OrbitControls;
        this.dependencies.obj.THREE = THREE;
        this.dependencies.obj.RGBELoader = RGBELoader;
        this.WorldManager =WorldManager;

        this.scene = new this.dependencies.obj.THREE.Scene();
        this.camera = new this.dependencies.obj.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
        this.camera.position.set(7, 7, 7);
        this.camera.lookAt(0, 0, 0);
        this.scene = new this.dependencies.obj.THREE.Scene();

        const setTexture = (texture) => {
            texture.mapping = this.dependencies.obj.THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;
        }

        const path = '/src/World/images/royal_esplanade_1k.hdr';

        this.WorldManager.loadCache(new this.dependencies.obj.RGBELoader(), path, setTexture)

        this.localLoader.init(objDependencies);

        this.localLoader.getModel().then((model) => {
            this.scene.add(model);
        })

        window.addEventListener('resize', () => {
            (this.camera).aspect = window.innerWidth / window.innerHeight;
            (this.camera).updateProjectionMatrix();
        })

        this.controls = new this.dependencies.obj.OrbitControls(this.camera, this.WorldManager.tactil.getView())
        this.controls.target.z = 0;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enabled = true;
        this.controls.maxDistance = 20;
        this.controls.minDistance = 7;
    }

    getScene() {
        return this.scene
    }
    getCamera() {
        return this.camera
    }
    update(t) {
        t = t / 10
        this.controls?.update();
    }

    open() {
        if (this.controls) this.controls.enabled = true;
       console.log('this.dependencies.obj.WorldManager',this.WorldManager);
        // this.WorldManager.tactil.visibility(false);
    }
    close() {
        if (this.controls) this.controls.enabled = false;
    }
}

export { World };
