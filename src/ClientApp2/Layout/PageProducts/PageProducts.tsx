import { useEffect, useState } from 'react'
import './PageProducts.css'
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { useProductStore } from "./ProductStore";
import { useAppRouter } from '../../AppStore';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { DetailProduct } from "./DetailProduct";
// import { ListPaging } from "../../../DashView/Component/GenericList/ListPaging/ListPaging";
export function PageProducts() {
    const { json, qs, check } = useAppRouter()
    const { products, fetchProducts , selectProduct, product} = useProductStore();
    const { user } = useRegisterStore();
    const [text, setText] = useState('')
    useEffect(() => {
        fetchProducts({ limit: 10 }).then((p)=>{
            if(p?.list[0]){
                selectProduct(p?.list[0]);
            }
        })
    }, [json, user])
    useEffect(() => {
        fetchProducts({
            ...json,
            text :text||''
        })
    }, [text]);

    return check('products') && (
        <div className='page-products'>
            <div className="left">

            </div>
            <div className="center">
                <div className="search-zone">
                    <label htmlFor='product-search' className="search">
                        <div className="icon"></div>
                        <input id='product-search' type="text" placeholder='Search Product' value={text} onChange={(e) => {
                            setText(e.currentTarget.value);
                        }} />
                        <div className="clear" onClick={()=>{
                            setText('')
                        }}></div>
                    </label>
                    <div className="search-text">{text && <>Search result for "<span>{text}</span>"</>}</div>
                    <div className="sort">
                        <div className="label">Sort</div>
                        <div className="list">
                            {
                                ['name', 'price', 'date', 'popular'].map(s => (
                                    <div key={s} className={(json?.order_by as string).split('_')[0] == s ? 'active' : ''} onClick={() => {
                                        qs({ ...json, order_by: s + '_desc' }).apply()
                                    }}>{s}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="list">
                    {
                        products?.list.map((p) => (
                            <ProductCard key={p.id} product={p} active={product?.id == p.id} onClick={()=>{
                                selectProduct(p) 
                            }} />
                        ))
                    }
                </div>
                {/* <ListPaging limit={products?.limit||10} page={products?.page||1} setPage={()=>{}} total={products?.total||0}/> */}
            </div>
            <div className={"right "+(product ?'open':'')}>
                    <DetailProduct />
            </div>
        </div>
    )
}
