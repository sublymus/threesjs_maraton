import './Producd3d.css'
import { useAppRouter, useAppStore } from '../../AppStore';
import type { ProductScenus } from '../../../DataBase';
import { useEffect, useRef, useState } from 'react';
import { WorldManager } from '../../../World/WorldManager';
import { Components, FDate, Number, Phone, Text } from "../FeatureViews/FeatureViews";
import { ProductQuantity } from '../ProductQuantity/ProductQuantity';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { useProductStore } from '../../Layout/PageProducts/ProductStore';
import { useCommandStore } from '../../Layout/PageCommand/CommandStore';
import { PageAuth } from '../../Layout/PageRegister/PageAuth';

export function Producd3d({ product }: {product: ProductScenus }) {
	const { navBack, current, pathList, qs } = useAppRouter();
	const { openChild } = useAppStore()
	const { user } = useRegisterStore()
	const { addProductToCart } = useCommandStore()
	const { fetchProducts, setProducts,selectProduct ,products } = useProductStore()
	const [collected, setCollected] = useState<Record<string, any>>({})
	const [isOpen, setIsOpen] = useState(false)
	const ctn3dRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		console.log(ctn3dRef);

		if (!ctn3dRef.current) return;
		ctn3dRef.current.innerHTML = '';
		const world = WorldManager.getNewWorldManager(ctn3dRef.current);
		world.animus(0);
		console.log({ world });

	}, [ctn3dRef, pathList])
	WorldManager.worldManager?.onResize();

	
	const refreshProducts = () => {
		product && fetchProducts({
			add_cart: true,
			product_id: product.id,
			is_features_required: true,
			no_save: true
		}).then((p) => {
			if (p?.list[0].id) {
				const newP = { ...p?.list[0] };
				
				products && setProducts({
					...products,
					list: products?.list.map((l => l.id == newP.id ? {...l,...newP} : l))
				});
				(product?.id == newP.id) && (selectProduct({...product,...newP}));
			}
			return;
		})
	}
	return current('product3d') && <div className='product-3d'>
		<div className="top" >
			<div className="return" onClick={() => {
				navBack()
			}}></div>
			<h1>3D View</h1>
			<div className="cart" onClick={() => qs().setAbsPath(['cart'])}></div>
		</div>
		<div className="ctn-3d" ref={ctn3dRef}>

		</div>
		<div className={"features " + (isOpen ? 'open' : '')}>
			<div className="ctn-ft">
				{
					product.features?.list.map((f) => {
						const Views = {
							components: <Components openChild={openChild} setCollected={(list) => setCollected({ ...f, components: list })} collected={f} />,
							number: <Number collected={f} />,
							text: <Text type='text' collected={f} />,
							email: <Text type='email' collected={f} />,
							website: <Text type='url' collected={f} />,
							date: <FDate type={'date'} collected={f} />,
							time: <FDate type={'time'} collected={f} />,
							phone: <Phone collected={f} />
						}
						return <div key={f.id} className="feature">
							<h1 className="name">{f.name}</h1>
							{Views[f.view as keyof typeof Views]}
							<span className='space'></span>
						</div>

					}
					)
				}
			</div>

		</div>
		<div className="btm">
			<div className="price">
				<div className="value">{product?.price || 0} $</div>
			</div>
			{(
				product.quantity != undefined &&
				product.quantity != null &&
				parseInt(product.quantity + '') != 0 &&
				product.quantity.toString() != '0') ? <>
				<ProductQuantity canNull product={product} onChange={() => {
					refreshProducts()
				}} />
				<div className="buy" onClick={() => {
					qs().setAbsPath(['cart'])
				}}>BUY <span></span></div>
			</> : <div className="add-to-cart" onClick={() =>
				user ? addProductToCart({ product_id: product.id, quantity: 1, collected_features: { ...product.featuresCollector?.allCollectedFeatures() } }).then((c) => {
					if (c?.id) {
						refreshProducts()
					}
				}) : openChild(<PageAuth />, false, '#3455')
			}>Add <span> to cart</span></div>}

			<div className={"option " + (isOpen ? 'open' : '')} onClick={() => setIsOpen(!isOpen)}><span></span></div>
		</div>
	</div>
}



// const Cache: {
// 	model?: any,
// 	loader?: LocalLoader
// } = {}
// class WorldProduct3D {
// 	controls: OrbitControls;
// 	renderer: THREE.WebGLRenderer;
// 	private visible = false;
// 	loader: LocalLoader
// 	render: (time: number) => any;
// 	setCanvas(canvas: HTMLCanvasElement) {
// 		this.canvas = canvas;
// 		this.controls.domElement = canvas;
// 		this.renderer.domElement = canvas;
// 	}
// 	setVisible(visible: boolean) {
// 		this.visible = visible;
// 		if (visible) {
// 			requestAnimationFrame(this.render)
// 		}
// 	}
// 	isVisible() {
// 		this.visible
// 	}
// 	constructor(public canvas: HTMLCanvasElement) {
// 		const parent = canvas.parentElement! as HTMLDivElement;
// 		this.renderer = new THREE.WebGLRenderer({
// 			canvas,
// 			alpha: true,
// 			premultipliedAlpha: false,
// 			antialias: true
// 		});

// 		const fov = 75;
// 		const aspect = 2; // the canvas default
// 		const near = 0.1;
// 		const far = 10;
// 		this.renderer.domElement = canvas
// 		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// 		camera.position.z = 2.5;

// 		this.controls = new OrbitControls(camera, canvas);
// 		this.controls.enableDamping = true;
// 		this.controls.maxDistance = 2.5;
// 		this.controls.minDistance = 1.8;
// 		this.controls.enablePan = false
// 		this.controls.dampingFactor = 0.03;
// 		this.controls.enabled = true;

// 		const scene = new THREE.Scene();

// 		if (Cache.model) {
// 			console.log('last Cache.model', Cache.model);
// 			this.loader = Cache.loader!;
// 			scene.add(Cache.model);
// 		} else {
// 			this.loader = new LocalLoader();
// 			Cache.loader = this.loader;
// 			this.loader.init({
// 				GLTFLoader,
// 				THREE
// 			})
// 			this.loader.getModel().then((v: THREE.Mesh) => {
// 				const textureLoader = new THREE.TextureLoader();
// 				textureLoader.load('/src/World/images/royal_esplanade_1k3.jpg', (texture) => {
// 					texture.mapping = THREE.EquirectangularReflectionMapping;
// 					const list = v.children[0].children[0].children;
// 					for (const m of list) {
// 						//@ts-ignore
// 						m.material.envMap = texture;

// 					}
// 					setTimeout(() => {
// 						const textureLoader = new RGBELoader();
// 						textureLoader.load('/src/World/images/royal_esplanade_1k.hdr', (texture) => {
// 							texture.mapping = THREE.EquirectangularReflectionMapping;
// 							const list = v.children[0].children[0].children;
// 							for (const m of list) {
// 								//@ts-ignore
// 								m.material.envMap = texture;
// 							}
// 						});
// 					}, 5000);
// 				});
// 				scene.add(v);
// 				Cache.model = v;
// 				console.log('new Cache.model');

// 			})
// 		}

// 		let lastW = 0;
// 		let lastH = 0;
// 		function resizeRendererToDisplaySize(renderer: THREE.Renderer) {

// 			const rect = parent.getBoundingClientRect();
// 			const w = Math.min(rect.width, 400);
// 			const h = Math.min(rect.height, 400);
// 			const needResize = lastW !== w || lastH !== h;
// 			if (needResize) {
// 				lastH = h
// 				lastW = w;
// 				// canvas.height = rect.height;
// 				// canvas.width = rect.width;
// 				renderer.setSize(rect.width, rect.height, false);
// 				// console.log({lastH,lastW,rect,});

// 			}

// 			return needResize;

// 		}
// 		const self = this;
// 		this.render = function (time: number) {
// 			time *= 0.001;

// 			if (resizeRendererToDisplaySize(self.renderer)) {

// 				const canvas = self.renderer.domElement;
// 				camera.aspect = canvas.width / canvas.height;
// 				camera.updateProjectionMatrix();

// 			}
// 			if (!self.visible) return

// 			self.controls.update();
// 			self.renderer.render(scene, camera);
// 			requestAnimationFrame(self.render);
// 			// console.log('@@@@@@@@@@');

// 		}
// 		requestAnimationFrame(self.render);
// 	}
// }
