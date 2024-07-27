import { useEffect, useState } from 'react'
import './PageProducts.css'
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { useProductStore } from "./ProductStore";
import { useAppRouter } from '../../AppStore';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { DetailProduct } from "./DetailProduct";
import { CategoryInterface, ListType } from '../../../DataBase';
import { useCategoryStore } from '../PageCategories/CategoryStore'
// import { ListPaging } from "../../../DashView/Component/GenericList/ListPaging/ListPaging";

 let  c = '' as 'mobile-device' | 'not-mobile-device';

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
   c = 'mobile-device'
}else{
    c = 'not-mobile-device'
}
document.body.classList.add(c);
  export const  IsMobile = c;
const FilterBindJSON = (a: any, b: any) => {
    let diff = false;
    for (const key in b) {
        if (a[key] != b[key]) {
            diff = true;
            a[key] = b[key]
        }
    }
    delete a.product_id
    return diff
}
// let differ = 0;
export function PageProducts() {
    const { json, qs, check, pathList } = useAppRouter()
    const { products, fetchProducts, selectProduct, product } = useProductStore();
    const { store } = useRegisterStore();
    const [filter, setFilter] = useState({
        order_by: 'date_desc',
        category_id: '',
        limit:4,
        add_cart:true,
        price_min: undefined, price_max: undefined,
        text: '' as string | undefined,
        product_id: '' as string | undefined
    })

    const { fetchCategoies } = useCategoryStore()
    const [categories, setCategories] = useState<ListType<CategoryInterface>>()
    const [s] = useState<any>({})
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
        /* on recupere les produits */
        check('products') && fetchProducts({
            ...filter
        }).then((p) => {
            if (p?.list[0]) {
                if (!product && window.innerWidth > 940) {
                    selectProduct(p?.list[0]);
                    qs({ ...json, product_id: p.list[0].id }).setAbsPath(['products', 'detail'])
                }
            }
        })
    }, [filter, store,pathList])

    useEffect(() => {
        /* on recupere les categories */
        !categories && fetchCategoies({
            limit: 25,
            no_save: true,
        }).then((list) => {
            if (list?.list) {
                setCategories(list)
            }
        })
    }, [store])

    useEffect(() => {
        /* si le json a change on met a jour le filter */
       if (check('products')  && FilterBindJSON(filter, json || {})) {
            setFilter({ ...filter })
        }
    }, [json])

    useEffect(() => {
        /* en cas de resize desktop on selection un produit*/
        // if (s.init) return;
        // s.init = true;
        window.addEventListener('resize', () => {
            if (window.innerWidth > 940) {
                !s.product && selectProduct(s.products?.list[0]);
            }
        })
    }, []);
   
    s.product = product
    s.products = products

    const [_text, setText] = useState('')
    useEffect(()=>{
        window.addEventListener('resize',()=>{
          
            setText(`${window.innerWidth} / ${window.innerHeight}  / ${window.screen.height} => ${IsMobile}`)
        })
        setText(`${window.innerWidth} / ${window.innerHeight} / ${window.devicePixelRatio}  => ${IsMobile}`)
    },[])
   
    return check('products') && (
        <div className='page-products'>
            <div className={"left " +  (isFilterOpen ? 'open' : '') + ' ' + (check('detail') && product ? 'product-detail' : '')} onClick={() => {
                setIsFilterOpen(false)
            }}>
                <div className="filter-fram">
                    <div className="top">
                        Filter
                    </div>
                    <div className="categories">
                        {
                            categories?.list.map((c) => (
                                <div key={c.id} className="category" onClick={() => setFilter({ ...filter, category_id: c.id })}>{c.label}</div>
                            ))
                        }
                    </div>
                    <div className="prices">
                        <div className="ctn">
                            <label htmlFor="product-price-min">
                                <input type="text" id='product-price-min' placeholder='Min' value={filter.price_min} />
                            </label>
                            <label htmlFor="product-price-max">
                                <input type="text" id='product-price-max' placeholder='Max' value={filter.price_max} />
                            </label>
                        </div>
                        <div className="set-price">
                            <div className="btn">Set Price</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="center">
                <div className="search-zone">
                    <label htmlFor='product-search' className="search">
                        <div className="icon"></div>
                        <input id='product-search' type="text" placeholder='Search Product' value={filter.text} onChange={(e) => {
                            setFilter({
                                ...filter,
                                text: e.currentTarget.value
                            });
                        }} />
                        <div className="clear" onClick={() => {
                            setFilter({
                                ...filter,
                                text: ''
                            });
                        }}></div>
                    </label>
                    {/* <div style={{ position:'absolute'}}> {text}</div> */}
                    <div className="search-text">{filter.text && <>Search result for "<span>{filter.text}</span>"</>}</div>
                    <div className="sort" >
                        <div className="label"onClick={() => {
                        setIsFilterOpen(true)
                    }}>Sort</div>
                        <div className="list">
                            {
                                ['date', 'name', 'price', 'popular'].map(s => (
                                    <div key={s} className={((json?.order_by || filter.order_by) as string)?.split('_')[0] == s ? 'active' : ''} onClick={() => {
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
                            <ProductCard canAddToCart={p.title.includes('321')} key={p.id} product={p} active={product?.id == p.id} onClick={() => {

                                selectProduct({...p})
                                qs({ ...json, product_id: p.id }).setAbsPath(['products', 'detail'])
                            }}/>
                        ))
                    }
                </div>
            </div>
            <div className={"right " + (product ? 'product' : '') + ' ' + (check('detail') ? 'detail' : '')}>
                <DetailProduct />
            </div>
        </div>
    )
}
