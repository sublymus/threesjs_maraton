import * as THREE from "three";
import { AbstractWorld } from "../World";
export class Primitive implements AbstractWorld{
    scene:THREE.Scene;
    camera:THREE.Camera;
    box: THREE.Mesh
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100)
        this.camera.position.set(2, 2, 2);
        this.camera.lookAt(0, 0, 0);

        this.scene = new THREE.Scene();

        this.box = this.createBox(1, 1, 1);
        this.scene.add(this.box);

    }
    createBox(w: number, h: number, d: number) {

        const boxGeometry = new THREE.BoxGeometry(w, h, d);
        const boxMaterial = new THREE.MeshNormalMaterial();

        const box = new THREE.Mesh(boxGeometry, boxMaterial)
        return box
    }

    getScene(): THREE.Scene {
        return this.scene
    }
    getCamera(): THREE.Camera {
        return this.camera
    }
    update(t: number) {
        this.box.rotation.set(t, t, t)
    }
    open(): void {
        throw new Error("Method not implemented.");
    }
    close(): void {
        throw new Error("Method not implemented.");
    }

}