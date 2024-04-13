import { DataBase } from '../../../../DataBase';
import { useWindowSize } from '../../../../Hooks';
import { useDashRoute } from '../../../dashStore'
import { InputText } from '../../../Component/Form/Input'
import { Textarea } from '../../../Component/Form/Textarea'
import './ProductDash.css'
import { useState } from 'react';
import { useProductStore } from '../ProductStore';
import { ImageViewer } from "../../../Component/ImageViewer/ImageViewer";


enum StatusMap {
    Start, Payment, Waiting, Delivery, End, Cancel
}



export function ProductDash() {

    const { current } = useDashRoute();
    const size = useWindowSize();
    const wrap = size.width < 1200 ? 'wrap' : '';
    const [isCheckRequired, setIsCheckRequired] = useState(false)
    const { selectedProduct } = useProductStore();

    const onImageAdded = ()=>{

    }
    return current('dash_product') && (
        <div className="product-dash">
            <h1 className="page-title">Product Information</h1>

            <section className={"editor " + wrap}>
                <div className="editor-left">
                    <div className="editor-name">
                        <div className="product-title">
                            <InputText editable prompt='Product Title' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Title' placeholder='Product Title' value={selectedProduct?.title || ''} />
                        </div>
                        <div className="product-description">
                            <Textarea editable prompt='Product Description' isCheckRequired={isCheckRequired} min={3} check='auto' max={250} label='Description' placeholder='Product Description' value={selectedProduct?.description || 'lol'} />
                        </div>
                    </div>
                    <div className="editor-price">
                        <InputText type='number' editable prompt='Product Price' isCheckRequired={isCheckRequired} min={0} check='auto'  label='Price' placeholder='Product Price' value={selectedProduct?.price || ''} />
                    </div>
                    <div className="editor-stock">
                        <InputText type='number' editable prompt='Product Stock' isCheckRequired={isCheckRequired} max={10000000000}  check='auto'  label='Stock' placeholder='Product Stock' value={selectedProduct?.stock||''}/>
                    </div>
                    <div className="editor-category">
                        dyj
                    </div>
                    <div className="editor-features">
                        dyj
                    </div>
                </div>

                <div className="editor-right">
                    <div className="editor-images">
                       <ImageViewer onImageAdded={onImageAdded} images={selectedProduct?.images?JSON.parse(selectedProduct.images.toString()):[]}/>
                    </div>
                    <div className="editor-mmodel-images">
                         <ImageViewer onImageAdded={onImageAdded} images={selectedProduct?.images?JSON.parse(selectedProduct.model_images.toString()):[]}/>
                    </div>
                    <div className="editor-scene-file">
                        dyj
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
                        <BarChart />
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
                        <div className="order">
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