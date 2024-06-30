import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import './Producd3d.css'
import { LocalLoader } from "../../../World/models/Ring_1/LocalLoader";
import { useEffect, useRef, useState } from 'react';
import { checkVisibility } from '../../../Hooks';
import { useWebRoute } from '../../WebStore';

export function Producd3d() {

	const [data] = useState({
		product3d: undefined as WorldProduct3D | undefined,
		init(this: { product3d: WorldProduct3D | undefined }, canvas: HTMLCanvasElement) {
			this.product3d = new WorldProduct3D(canvas);
		}
	})
	const { pathList, check } = useWebRoute();
	const ref = useRef<HTMLCanvasElement | null>(null)
	useEffect(() => {
		if (!data.product3d && ref.current) {
			data.init(ref.current);
		} else if (ref.current) {
			data.product3d?.setCanvas(ref.current);
		}
		return () => {
			data.product3d?.setVisible(false);
		}
	}, [ref])

	const visible = checkVisibility(ref, 500, !!check('home'))
	useEffect(() => {
		data.product3d?.setVisible(visible);
		return () => {
			data.product3d?.setVisible(false);
		}
	}, [pathList, visible])

	return <div className='product-3d'>
		<div className="canvas-ctn">
			<canvas id="home-canvas-product-3d" ref={ref}></canvas>
			<div className="features-ctn">
				<div className="values"></div>
				<div className="features"></div>
			</div>
		</div>
		<div className="infos">
			<h2>Choose the interface that suits you</h2>
			<div className="info">
				<h3 className="title"><span>1</span> 3D or standard interface</h3>
				<p className="text">
					We have two (2) types of interface, 3D and standard. each available in several ranges
				</p>
			</div>
			<div className="info">
				<h3 className="title"><span>2</span> How to have your store</h3>
				<p className="text">
					you to create several stores with the same account. to create your store, fill in the required information (name, logo, etc.)
				</p>
			</div>
			<div className="info">
				<h3 className="title"><span>3</span> Interface update</h3>
				<p className="text">
					you will be notified of interface improvements. We continually update the platform to meet your expectations
				</p>
			</div>
		</div>
	</div>
}

const Cache: any = {}
class WorldProduct3D {
	controls: OrbitControls;
	renderer: THREE.WebGLRenderer;
	private visible = false;
	render: (time: number) => any;
	setCanvas(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.controls.domElement = canvas;
		this.renderer.domElement = canvas;
	}
	setVisible(visible: boolean) {
		this.visible = visible;

		if (visible) {
			requestAnimationFrame(this.render)
		}
	}
	isVisible() {
		this.visible
	}
	constructor(public canvas: HTMLCanvasElement) {
		const parent = canvas.parentElement! as HTMLDivElement;
		this.renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			premultipliedAlpha: false,
			antialias: true
		});

		const fov = 75;
		const aspect = 2; // the canvas default
		const near = 0.1;
		const far = 10;
		this.renderer.domElement = canvas
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		camera.position.z = 2.5;

		this.controls = new OrbitControls(camera, canvas);
		this.controls.enableDamping = true;
		this.controls.maxDistance = 2.5;
		this.controls.minDistance = 1.8;
		this.controls.enablePan = false
		this.controls.dampingFactor = 0.03;
		this.controls.enabled = true;
		// controls.target.z = 0;

		const scene = new THREE.Scene();

		{

			// // const color = 0xFFFFFF;
			// // const intensity = 1;
			// // const l1 = new THREE.DirectionalLight(color, intensity);
			// // l1.position.set(1, 1, 1);
			// // scene.add(l1);

			// // const l2 = new THREE.DirectionalLight(color, intensity);
			// // l2.position.set(-1, 1, -1);
			// // scene.add(l2);

			// // const l3 = new THREE.DirectionalLight(color, intensity);
			// // l3.position.set(0, -1,0);
			// // scene.add(l3);

			// const l = new THREE.AmbientLight(color, 2);
			// scene.add(l);

		}


		if (Cache.model) {
			console.log('last Cache.model', Cache.model);

			scene.add(Cache.model);
		} else {
			const loader = new LocalLoader();
			loader.init({
				GLTFLoader,
				THREE
			})
			loader.getModel().then((v: THREE.Mesh) => {
				const textureLoader = new RGBELoader();
				textureLoader.load('/src/World/images/royal_esplanade_1k.hdr', (texture) => {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					const list = v.children[0].children[0].children;
					for (const m of list) {
						//@ts-ignore
						m.material.envMap = texture;

					}

					// scene.background = texture;
					// scene.environment = texture;
				});
				scene.add(v);
				Cache.model = v;
				console.log('new Cache.model');

			})
		}


		// const boxWidth = 1;
		// const boxHeight = 1;
		// const boxDepth = 1;
		// const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

		// function makeInstance(geometry: any, color: any, x: any) {

		// 	const material = new THREE.MeshPhongMaterial({
		// 		color,
		// 		opacity: 0.5,
		// 		// envMap
		// 	});

		// 	const cube = new THREE.Mesh(geometry, material);
		// 	scene.add(cube);

		// 	cube.position.x = x;

		// 	return cube;

		// }

		// const cubes = [
		// 	makeInstance(geometry, 0x44aa88, 0),
		// 	makeInstance(geometry, 0x8844aa, - 2),
		// 	makeInstance(geometry, 0xaa8844, 2),
		// ];

		let lastW = 0;
		let lastH = 0;
		function resizeRendererToDisplaySize(renderer: THREE.Renderer) {

			const rect = parent.getBoundingClientRect();
			const needResize = lastW !== rect.width || lastH !== rect.height;
			if (needResize) {
				lastH = rect.height;
				lastW = rect.width;
				// canvas.height = rect.height;
				// canvas.width = rect.width;
				renderer.setSize(rect.width, rect.height, false);

			}

			return needResize;

		}
		const self = this;
		this.render = function (time: number) {
			if (!self.visible) return
			time *= 0.001;

			if (resizeRendererToDisplaySize(self.renderer)) {

				const canvas = self.renderer.domElement;
				camera.aspect = canvas.width / canvas.height;
				camera.updateProjectionMatrix();

			}

			self.controls.update();
			self.renderer.render(scene, camera);
			requestAnimationFrame(self.render);

		}
		requestAnimationFrame(self.render);
	}
}
