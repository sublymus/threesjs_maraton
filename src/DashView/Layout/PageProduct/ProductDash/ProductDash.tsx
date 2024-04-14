import { DataBase } from '../../../../DataBase';
import { useWindowSize } from '../../../../Hooks';
import { useDashRoute } from '../../../dashStore'
import { InputText } from '../../../Component/Form/Input'
import { Textarea } from '../../../Component/Form/Textarea'
import './ProductDash.css'
import { useEffect, useState } from 'react';
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
    const wrap = size.width < 1200 ? 'wrap' : '';
    
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
                            collected['category'] = id;
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
                    <div className="action">
                        <div className="text">
                            <h1 className="title">All Colaborator Action</h1>
                            <h2 className="description">See all colaborators actions executed on this product like update and collaborator source </h2>
                        </div>
                        <CircularLineChart />
                    </div>
                    <div className="stat">
                        <div className="text">
                            <h1 className="title">Product Statistic</h1>
                            <div>
                                <h1 className="title">{Number(20000).toLocaleString()}  ₽ </h1>
                                <h2 className="description">since {(new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)).toDateString())}</h2>
                            </div>
                        </div>
                        <BarChart/>
                    </div>
                </div>
                <div className="prev">
                    <div className="top">PREVIEW 3D MODEL</div>
                    <div className="image" style={{ backgroundImage: `url(${'/src/res/ert.avif'})` }}></div>
                    <div className="features">{3} FEATURE{3 > 1 ? 'S' : ''}</div>
                    <div className="prompt">{'Loader File is missing'}</div>
                </div>
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


function CircularLineChart() {
    return (
        <div className="circular-line-chart">
            <div className="back"></div>
            <div className="btn"> ACTIONS </div>
        </div>
    )
}

const bars = {
    with: 250,
    height: 120,
    bars: [
        { value: 80 },
        { value: 15 },
        { value: 25 },
        { value: 10 },
        { value: 15 },
        { value: 25 },
        { value: 15 },
        { value: 25 },
        { value: 90 },
        { value: 25 },
        { value: 30 },
        { value: 25 },
        { value: 30 },
        { value: 50 },
        { value: 100 },
        { value: 90 },
        { value: 80 },
        { value: 70 },
        { value: 60 },
        { value: 60 },
        { value: 70 },
        { value: 80 },
    ]
}
function BarChart() {


    return (
        <div className="bar-chart">
            <div className="bars">
                {bars.bars.map((b, i) => (
                    <div key={i} className="bar">
                        <div className="level" style={{ height: `${(b.value / 100) * bars.height}px`, background: `linear-gradient(rgb(0, 90, 180),rgb(23, 108, 194)${((b.value < 35 ? 35 : b.value) - 25) * 0.7}% , rgb(75, 165, 255)100%)` }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}