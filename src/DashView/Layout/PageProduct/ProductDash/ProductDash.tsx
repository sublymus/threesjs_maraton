import { CommandInterface } from '../../../../DataBase';
import { useWindowSize } from '../../../../Hooks';
import { useDashRoute } from '../../../dashStore'
import { InputText } from '../../../Component/Form/Input'
import { Textarea } from '../../../Component/Form/Textarea'
import './ProductDash.css'
import { useEffect, useState } from 'react';
import { Preview3DModelCard } from '../../../Component/Chart/Preview3DModelCard/Preview3DModelCard'
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard'
import { StatisticCard } from "../../../Component/Chart/StatisticCard/StatisticCard";
import { useProductStore } from '../ProductStore';
import { ImageViewer } from "../../../Component/ImageViewer/ImageViewer";
import { FileLoader } from "../../../Component/LoaderImage/LoaderImage";
import { ChoiseCategory } from '../../../Component/ChoiseCategory/ChoiseCategory'
import { ChoiseFeatures } from '../../../Component/ChoiseFeatures/ChoiseFeatures'
import { EditorTopBar } from "../../../Component/EditorTopBar/EditorTopBar";
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { ChoiseStatus } from "../../../Component/ChoiseStatus/ChoiseStatus";
import { useFeatureStore } from '../../PageFeature/FeatureStore';
// enum StatusMap {
//     Start, Payment, Waiting, Delivery, End, Cancel
// }


export function ProductDash() {

    const { current, setAbsPath , qs, json, pathList } = useDashRoute();
    const { selectedProduct, setSelectedProduct, updateProduct, createProduct, removeProduct, setProductById, fectProductCommands } = useProductStore();
    const [isCheckRequired,] = useState(false);
    const [commands, setCommands]  = useState<CommandInterface[]>([])
    const [error, setError] = useState('')

    const {setSelectedFeature} =useFeatureStore()

    useEffect(()=>{
        current('dash_product') && setSelectedFeature(undefined);
    },[pathList]);

    useEffect(()=>{
        if(json?.product_id){
            setProductById(json?.product_id)
        }
    },[json])
    useEffect(() => {
        selectedProduct && fectProductCommands({
            limit:10,
            product_id:selectedProduct.id
        }).then((commands)=>{
            return setCommands(commands?.list||[])
        })
    }, [selectedProduct]);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    const [collected] = useState<Record<string, any>>({});
    //TODO coder un composant d'error
    const isDash = current('dash_product');
    const isNew = current('new_product');

    return (isDash || isNew) && (
        (!selectedProduct && isDash) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
            <div className="product-dash" ref={bindToParentScroll}>
                {
                    <div className={"error-panel " + (error ? 'open' : '')}>
                        <div className="type">ERROR <span onClick={() => {
                            setError('');
                        }}></span></div>
                        <div className="message">{error}</div>
                    </div>
                }

                <EditorTopBar terme='white' deteleKey={selectedProduct?.id || 'noga'} mode={isNew ? 'create' : 'delete'} title='Product Information' onCreate={() => {
                    createProduct(collected).then((error) => {
                        if (!error) return setAbsPath(['products', 'dash_product']);
                        if (error.length) setError(error?.toString())
                    })
                }} onDelete={() => {
                    selectedProduct && removeProduct(selectedProduct.id).then((res) => {
                        if (res) {
                            setSelectedProduct(undefined)
                        }
                    })
                }} />
                <section className={"editor " + wrap}>
                    <div className="editor-left">
                        <div className="editor-name">

                            {
                                isDash && <InputText isCheckRequired={isCheckRequired} label='Product Id' value={(selectedProduct?.id || '')} />
                            }
                            <div className="product-title">
                                <InputText editable prompt='Product Title' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Title' placeholder='Product Title' value={isDash && (selectedProduct?.title || '')} onChange={(value) => {
                                    isDash ? (selectedProduct && updateProduct({
                                        product_id: selectedProduct.id,
                                        title: value
                                    })) : collected['title'] = value
                                }} />
                            </div>
                            <div className="product-description">
                                <Textarea editable prompt='Product Description' isCheckRequired={isCheckRequired} min={3} check='auto' max={250} label='Description' placeholder='Product Description' value={isDash && (selectedProduct?.description || '')} onChange={(value) => {
                                    isDash ? (selectedProduct && updateProduct({
                                        product_id: selectedProduct.id,
                                        description: value
                                    })) : collected['description'] = value
                                }} />
                            </div>
                        </div>
                        <div className="editor-price">
                            <InputText type='number' editable prompt='Product Price' isCheckRequired={isCheckRequired} min={0} check='auto' label='Price' placeholder='Product Price' value={isDash && (selectedProduct?.price || '')} onChange={(value) => {
                                isDash ? (selectedProduct && updateProduct({
                                    product_id: selectedProduct.id,
                                    price: value
                                })) : collected['price'] = value
                            }} />
                        </div>
                        <div className="editor-stock">
                            <InputText type='number' editable prompt='Product Stock' isCheckRequired={isCheckRequired} max={10000000000} check='auto' label='Stock' placeholder='Product Stock' value={isDash && (selectedProduct?.stock || '')} onChange={(value) => {
                                isDash ? (selectedProduct && updateProduct({
                                    product_id: selectedProduct.id,
                                    stock: value
                                })) : collected['stock'] = value
                            }} />
                        </div>
                        {isDash && <ChoiseStatus status={selectedProduct?.status || 'PAUSE'} onChange={(value) => {
                            isDash ? (selectedProduct && updateProduct({
                                product_id: selectedProduct.id,
                                status: value
                            })) : collected['status'] = value
                        }} />}
                        <div className="editor-category">
                            <ChoiseCategory category_id={isDash && (selectedProduct?.category_id)} onChange={(id) => {
                                isDash ? (selectedProduct && updateProduct({
                                    product_id: selectedProduct.id,
                                    category_id: id
                                })) : collected['category_id'] = id
                            }} />
                        </div>
                        <div className="editor-features">
                            <ChoiseFeatures features={isDash && (selectedProduct?.features?.list)} onEdit={(f)=>{
                                qs({feature_id:f.id}).setAbsPath(['features','dash_features'])
                            }} onNew={()=>{
                                selectedProduct && qs({product_id:selectedProduct.id}).setAbsPath(['features','new_feature'])
                            }} />
                        </div>
                    </div>
                    <div className="editor-right">
                        <div className="editor-images">
                            <h3>Product Images</h3>
                            <ImageViewer name='images' images={isDash && (selectedProduct?.images ? selectedProduct.images : [])} autosave={isNew} onSave={(imageMapper) => {
                                isDash ? (selectedProduct && updateProduct({
                                    product_id: selectedProduct.id,
                                    images: imageMapper
                                })) : collected['images'] = imageMapper;
                            }} />
                        </div>
                        <div className="editor-mmodel-images">
                            <h3>3d Model Images <span style={{fontSize:'0.8rem', fontWeight:'normal'}}>( optional )</span></h3>
                            <ImageViewer name='model_images' images={isDash && (selectedProduct?.images ? selectedProduct.model_images : [])} autosave={isNew} onSave={(imageMapper) => {
                                isDash ? (selectedProduct && updateProduct({
                                    product_id: selectedProduct.id,
                                    model_images: imageMapper
                                })) : collected['model_images'] = imageMapper;
                            }} />
                        </div>
                        {
                            isDash && <div className="editor-scene-file">
                                <FileLoader file_name={selectedProduct?.scene_dir} ext={['zip']} label='Upload Scene File' onChange={(file) => {
                                    //TODO explorateur de fichier
                                    isDash ? (selectedProduct && updateProduct({
                                        product_id: selectedProduct.id,
                                        scene_dir: file
                                    })) : collected['scene_dir'] = file;
                                }} />
                            </div>
                        }
                    </div>
                </section>
                {isDash && <div className="product-dash-ctn">

                    <div className="info">
                        <ActionsCard />
                        <StatisticCard />
                    </div>
                    <Preview3DModelCard onClick={() => {
                        console.log('oo');
                        setAbsPath(['products', 'dash_product', 'product_preview']);
                    }} />
                </div>}
                {isDash && <div className="orders">
                    <div className="top">
                        <h1 className="orders-title">Recent Orders</h1>
                        <h2 className="see-all">SEE ALL</h2>
                    </div>
                    <div className="orders-ctn">
                        {commands.map((c) => (
                            <div key={c.id} className="order">
                                <div className="id">#{c.id.split('-')[0]}</div>
                                <div className="id">{c.quantity}</div>
                                <div className="date">{c.updated_at.split('')}</div>
                                {/* <div className="client">userId: {c.user_id.split('-')[0]}</div> */}
                                <div className="price">{c.price} {'$'}</div>
                                <div className={"status " + c.status.toLocaleLowerCase()}>{c.status}</div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        ))
}




