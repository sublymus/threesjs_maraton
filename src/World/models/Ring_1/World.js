import { LocalLoader } from "./LocalLoader.js";
import Three from 'three'
import Addons from 'three/examples/jsm/Addons.js'
class World {
    scene;
    camera;
    controls = null;
    localLoader;

    dependencies = {
        obj: {
            THREE: Three,
            WorldManager: null,
            ADDON: Addons,
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
        const { THREE,ADDON } = objDependencies;
        this.dependencies.obj.ADDON = ADDON;
        this.dependencies.obj.THREE = Three;
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

        this.WorldManager.loadCache(new this.dependencies.obj.ADDON.RGBELoader(), path, setTexture)

        this.localLoader.init(objDependencies);

        this.localLoader.getModel().then((model) => {
            this.scene.add(model);
        })

        window.addEventListener('resize', () => {
            (this.camera).aspect = window.innerWidth / window.innerHeight;
            (this.camera).updateProjectionMatrix();
        })

        this.controls = new this.dependencies.obj.ADDON.OrbitControls(this.camera, this.WorldManager.tactil.getView())
        this.controls.target.z = 0;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enabled = true;
        this.controls.maxDistance = 20;
        this.controls.minDistance = 7;
        // this.controls.
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
        console.log('Open',this.scene.id);
        (this.WorldManager.tactil.getView()).style.touchAction = "none"
        this.WorldManager.tactil.visibility(false);
    }
    close() {
        console.log('Close',this.scene.id);
        if (this.controls) this.controls.enabled = false;
    }
}

export { World };
