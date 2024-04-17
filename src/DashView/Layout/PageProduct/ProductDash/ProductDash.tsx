import { DataBase } from '../../../../DataBase';
import { useWindowSize } from '../../../../Hooks';
import { useDashRoute } from '../../../dashStore'
import { InputText } from '../../../Component/Form/Input'
import { Textarea } from '../../../Component/Form/Textarea'
import './ProductDash.css'
import { useEffect, useState } from 'react';
import { Preview3DModelCard } from '../../../Component/Chart/Preview3DModelCard/Preview3DModelCard'
import {ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard'
import { StatisticCard } from "../../../Component/Chart/StatisticCard/StatisticCard";
import { useProductStore } from '../ProductStore';
import { ImageViewer } from "../../../Component/ImageViewer/ImageViewer";
import { FileLoader } from "../../../Component/LoaderImage/LoaderImage";
import { ChoiseCategory } from '../../../Component/ChoiseCategory/ChoiseCategory'
import { ChoiseFeatures } from '../../../Component/ChoiseFeatures/ChoiseFeatures'
enum StatusMap {
    Start, Payment, Waiting, Delivery, End, Cancel
}



export function ProductDash() {

    const { current } = useDashRoute();
    const { selectedProduct } = useProductStore();
    const [isCheckRequired, setIsCheckRequired] = useState(false)
    
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';
    
    const [collected , setCollected] = useState<Record<string,any>>({});

    collected.prduct_id = selectedProduct?.id;

    return current('dash_product') && (
        <div className="product-dash">
            <div className="product-dash-top">
                <h1 className="page-title">Product Information</h1>
                <div className="save">
                    <div className="icon"></div>
                    <div className="label">SAVE</div>
                </div>
            </div>

            <section className={"editor " + wrap}>
                <div className="editor-left">
                    <div className="editor-name">
                        <div className="product-title">
                            <InputText  editable prompt='Product Title' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Title' placeholder='Product Title' value={selectedProduct?.title || ''} onChange={(value)=>{
                                collected['title'] = value;
                                console.log(collected);
                                
                            }} />
                        </div>
                        <div className="product-description">
                            <Textarea editable prompt='Product Description' isCheckRequired={isCheckRequired} min={3} check='auto' max={250} label='Description' placeholder='Product Description' value={selectedProduct?.description || 'lol'}  onChange={(value)=>{
                                collected['description'] = value;
                                console.log(collected);
                            }}  />
                        </div>
                    </div>
                    <div className="editor-price">
                        <InputText type='number' editable prompt='Product Price' isCheckRequired={isCheckRequired} min={0} check='auto' label='Price' placeholder='Product Price' value={selectedProduct?.price || ''}  onChange={(value)=>{
                                collected['price'] = value;
                                console.log(collected);
                            }}  />
                    </div>
                    <div className="editor-stock">
                        <InputText type='number' editable prompt='Product Stock' isCheckRequired={isCheckRequired} max={10000000000} check='auto' label='Stock' placeholder='Product Stock' value={selectedProduct?.stock || ''}  onChange={(value)=>{
                                collected['stock'] = value;
                                console.log(collected);
                            }} />
                    </div>
                    <div className="editor-category">
                        <ChoiseCategory category_id={selectedProduct?.category_id}   onChange={(id)=>{
                            collected['category_id'] = id;
                            console.log(collected);
                        }} />
                    </div>
                    <div className="editor-features">
                        <ChoiseFeatures features={selectedProduct?.features} onChange={(ids)=>{
                            collected['features'] = ids;
                            console.log(collected);
                        }} />
                    </div>
                </div>
                <div className="editor-right">
                    <div className="editor-images">
                        <ImageViewer name='images'  images={selectedProduct?.images ? selectedProduct.images : []}  onSave={(imageMapper)=>{
                            collected['images'] = imageMapper;
                            console.log(collected);
                        }}/>
                    </div>
                    <div className="editor-mmodel-images">
                        <ImageViewer name='model_images' images={selectedProduct?.images ? selectedProduct.model_images : []}  onSave={(imageMapper)=>{
                            collected['model_images'] = imageMapper;
                            console.log(collected);
                        }}/>
                    </div>
                    <div className="editor-scene-file">
                        <FileLoader ext={['zip']} label='Upload Scene File' onChange={(file) => {
                            collected['scene_dir'] = file;
                            console.log(collected);
                        }} />
                    </div>
                </div>
            </section>
            <div className="product-dash-ctn">

                <div className="info">
                    <ActionsCard/>
                    <StatisticCard/>
                </div>
               <Preview3DModelCard/>
            </div>
            <div className="orders">
                <div className="top">
                    <h1 className="orders-title">Recent Orders</h1>
                    <h1 className="see-all">SEE ALL</h1>
                </div>
                <div className="orders-ctn">
                    {DataBase.commands.map((c) => (
                        <div key={c.id} className="order">
                            <div className="id">#{c.id}</div>
                            <div className="client">{c.client.name}</div>
                            <div className="date">{c.completedAt}</div>
                            <div className="price">{c.ref_payement.price} {c.ref_payement.symbol}</div>
                            <div className={"status " + StatusMap[c.status].toLocaleLowerCase()}>{StatusMap[c.status]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}




