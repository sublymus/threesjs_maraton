import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import './Producd3d.css'
import { LocalLoader } from "../../../World/models/Ring_1/LocalLoader";
import { useEffect, useRef, useState } from 'react';
import { checkVisibility } from '../../../Hooks';
import { useWebRoute } from '../../WebStore';
import { type Feature, features, Component } from '../../../DataBase';
import { getImg } from '../../../Tools/StringFormater';

export function Producd3d() {

	const [data] = useState({
		product3d: undefined as WorldProduct3D | undefined,
		init(this: { product3d: WorldProduct3D | undefined }, canvas: HTMLCanvasElement) {
			this.product3d = new WorldProduct3D(canvas);
		}
	})
	const { pathList, check } = useWebRoute();
	const canvas = useRef<HTMLCanvasElement | null>(null)
	const canvas_ctn = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		if (!data.product3d && canvas.current) {
			data.init(canvas.current);
		} else if (canvas.current) {
			data.product3d?.setCanvas(canvas.current);
		}
		return () => {
			data.product3d?.setVisible(false);
		}
	}, [canvas])

	const visible = checkVisibility(canvas_ctn, 500, !!check('home'))
	useEffect(() => {
		data.product3d?.setVisible(visible);
		return () => {
			data.product3d?.setVisible(false);
		}
	}, [pathList, visible])

	const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>(undefined);
	const [selectedComponent, setSelectedComponent] = useState<Component | undefined>(undefined);
	const [collected, setCollected] = useState<Record<string, Component | undefined>>({})
	return <div className='product-3d'>
		<div className="canvas-ctn" ref={canvas_ctn}>
			<canvas id="home-canvas-product-3d" ref={canvas}></canvas>
			<div className="features-ctn" style={{ width: selectedComponent ? '100%' : '' }}>
				<div className="values">
					<div className="ctn">
						{
							selectedFeature?.components?.map((c, i) => {
								return <div key={i} className={"value " + (selectedComponent?.id == c.id ? 'active' : '')} style={{ background: getImg(c.icon[0], selectedComponent?.id == c.id ? '80%' : '70%') }} onClick={() => {
									if (selectedComponent?.id == c.id) {
										setSelectedComponent(selectedFeature.default_value);
										setCollected({
											...collected,
											[selectedFeature.name]: selectedFeature.default_value
										})
										data.product3d?.loader.updateFeature(selectedFeature, selectedFeature.default_value?.code)
									} else {
										setSelectedComponent(c);
										setCollected({
											...collected,
											[selectedFeature.name]: c
										})
										data.product3d?.loader.updateFeature(selectedFeature, c.code)
									}
								}}></div>
							})
						}
					</div>
				</div>
				<div className="name">
					<h4>{collected[selectedFeature?.name || '']?.name || selectedFeature?.default_value?.name}</h4>
				</div>
				<div className="features">
					{features.list.map((f, i) => {
						return <div key={i} className={"feature " + (selectedFeature?.id == f.id ? 'active' : '')} style={{ background: getImg(f.icon, selectedFeature?.id == f.id ? '70%' : '60%') }} onClick={() => {
							if (selectedFeature?.id == f.id) {
								setSelectedFeature(undefined);
								setSelectedComponent(undefined)
							} else {
								setSelectedFeature(f);
								const c = collected[f.name] || f.default_value;
								setCollected({
									...collected,
									[f.name]: c
								})
								setSelectedComponent(c)
							}
						}}></div>
					})}
				</div>
			</div>
		</div>
		<div className="infos">
			<h2>Choose the interface that suits you</h2>
			<div className="info">
				<h3 className="title"><span>1</span>Product Presentation</h3>
				<p className="text">
					The presentation of the product depends on the interface you choose, standard, 3D or mixed (standard + 3D)
				</p>
			</div>
			<div className="info">
				<h3 className="title"><span>2</span> Create your product </h3>
				<p className="text">
					To create your 3d product you must fill in the necessary information. Then add a 3D file of the product (see more).
				</p>
			</div>
			<div className="info">
				<h3 className="title"><span>3</span> Dashboard</h3>
				<p className="text">
					The Dashboard of your store is fully equipped to manage your products as you wish
				</p>
			</div>
		</div>
	</div>
}

const Cache: {
	model?: any,
	loader?: LocalLoader
} = {}
class WorldProduct3D {
	controls: OrbitControls;
	renderer: THREE.WebGLRenderer;
	private visible = false;
	loader: LocalLoader
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

		const scene = new THREE.Scene();

		if (Cache.model) {
			console.log('last Cache.model', Cache.model);
			this.loader = Cache.loader!;
			scene.add(Cache.model);
		} else {
			this.loader = new LocalLoader();
			Cache.loader = this.loader;
			this.loader.init({
				GLTFLoader,
				THREE
			})
			this.loader.getModel().then((v: THREE.Mesh) => {
				const textureLoader = new THREE.TextureLoader();
				textureLoader.load('/src/World/images/royal_esplanade_1k3.jpg', (texture) => {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					const list = v.children[0].children[0].children;
					for (const m of list) {
						//@ts-ignore
						m.material.envMap = texture;

					}
					setTimeout(() => {
						const textureLoader = new RGBELoader();
						textureLoader.load('/src/World/images/royal_esplanade_1k.hdr', (texture) => {
							texture.mapping = THREE.EquirectangularReflectionMapping;
							const list = v.children[0].children[0].children;
							for (const m of list) {
								//@ts-ignore
								m.material.envMap = texture;
							}
						});
					}, 5000);
				});
				scene.add(v);
				Cache.model = v;
				console.log('new Cache.model');

			})
		}

		let lastW = 0;
		let lastH = 0;
		function resizeRendererToDisplaySize(renderer: THREE.Renderer) {

			const rect = parent.getBoundingClientRect();
			const w = Math.min(rect.width, 400);
			const h = Math.min(rect.height, 400);
			const needResize = lastW !== w || lastH !== h;
			if (needResize) {
				lastH = h
				lastW = w;
				// canvas.height = rect.height;
				// canvas.width = rect.width;
				renderer.setSize(rect.width, rect.height, false);
				// console.log({lastH,lastW,rect,});

			}

			return needResize;

		}
		const self = this;
		this.render = function (time: number) {
			time *= 0.001;

			if (resizeRendererToDisplaySize(self.renderer)) {

				const canvas = self.renderer.domElement;
				camera.aspect = canvas.width / canvas.height;
				camera.updateProjectionMatrix();

			}
			if (!self.visible) return

			self.controls.update();
			self.renderer.render(scene, camera);
			requestAnimationFrame(self.render);
			// console.log('@@@@@@@@@@');

		}
		requestAnimationFrame(self.render);
	}
}
