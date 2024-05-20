import { useEffect } from 'react';
import { ProductInterface, UserInterface } from '../../../DataBase';
import { getImg, limit } from '../../../Tools/StringFormater';
import { useAppStore , useAppRouter} from '../../AppStore';
import './SearchProduct.css'
import { useProductStore } from "../../Components/Products/ProductStore";
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';


export function SearchProduct({setProduct}: {setProduct:(user:ProductInterface)=>void}) {

    const { products, fetchProducts } = useProductStore()
    const {openChild} = useAppStore()
    
    useEffect(()=>{
        fetchProducts({});
    },[])

    return (
        <div className='search-product'>

            <div className="search-ctn" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <div className="close" onClick={()=>{
                    openChild(undefined);
                }}></div>
                <div className="top">
                    <div className="icon"></div>
                    <input type="text" autoFocus placeholder='Search By #id , email, name' onChange={(e) => {
                        e.currentTarget.value && fetchProducts({
                            limit:10,
                            query:{
                                text:e.currentTarget.value
                            }
                        })
                    }} />
                </div>
                <div className="list">
                    {
                       products?.list.map(((c,i) => {
                            return (
                                <div key={c.id+i} className="s-product"  onClick={()=>{
                                    openChild(undefined);
                                    setProduct(c);
                                }}>
                                    <div className="images" style={{background:getImg(c.images[0])}}></div>
                                    <div className="title-ctn">
                                        <div className="title">{limit(c.title,20)}</div>
                                        <div className="price">{c.price}</div>
                                    </div>
                                    <div className="id">#{c.id.split('-')[0]}</div>
                                </div>
                            )
                        }))
                    }
                </div>
                {/* {products && (products.length>7)&&(<div className="see-all" onClick={()=>{
                    // setAbsPath(['product']);
                    // openChild(undefined)
                }}>
                    SEE ALL
                </div>)} */}
            </div>
        </div>
    )
}