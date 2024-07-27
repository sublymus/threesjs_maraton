import { useEffect, useRef, useState } from 'react';
import { getImg, limit } from '../../../Tools/StringFormater';
import './DetailProduct.css'
import { useProductStore } from './ProductStore';
import { toFilter } from '../../../Tools/FilterColor'
import { CommandInterface, Feature, ListType, ProductCommentInterface, ProductInterface } from '../../../DataBase';
import { ProductComment } from "../../Components/ProductComment/ProductComment";
import { NoteStars } from "../../Components/NoteStars/NoteStars";
import { cardHorizontalCenter } from "../../../Tools/CardPosition";
import { AddHorizontalScrollIcon } from "../../../Tools/ScrollTools";
import { PageComments } from "./PageComments";
import { useCommentStore } from './CommentStore';
import { PageImage } from "./PageImage";
import { useAppRouter } from '../../AppStore';
import { Visites } from "../../Components/Visites/Visites";
import { MoreProduct } from "../../Components/MoreProduct/MoreProduct";
import { ProductQuantity } from '../../Components/ProductQuantity/ProductQuantity';
import { useCommandStore } from '../PageCommand/CommandStore';
const images = {
    more: true,
    list: [
        '/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        '/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
    ]
}

let imageIndex: ((index: number) => void) | undefined;
export function DetailProduct() {

    const { json, qs, check, current } = useAppRouter()
    const { setProductById, product, selectProduct,products, fetchProducts, setProducts } = useProductStore()
    const { fetchProductComments, setLastPage } = useCommentStore()
    const { addProductToCart } = useCommandStore()
   
    const infoRef = useRef<HTMLDivElement>(null);
    const diffRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    const [minText, setMinText] = useState(true);
    const [index, setIndex] = useState(0);
    const [readDescription, setReadDescription] = useState(false);
    const [feature, setFeature] = useState<Feature>()

    const [commentCanUp, setCommentCanUp] = useState(false);
    const [userComment/* , setCanWrite */] = useState<ProductCommentInterface>();
    
    const [userCommand/* , setCanWrite */] = useState<CommandInterface>({
        payment_id: 'lol'
    } as any);

    const [commentRef, setCommentRef] = useState<HTMLElement | null>(null)

    const [comments, setComments] = useState<ListType<ProductCommentInterface>>();
    const [s] = useState<any>({})

    useEffect(() => {
        if (check('detail') && json?.product_id && json.product_id != s.product_id) {
            s.product_id = json.product_id;
            setProductById(json as any)
        }
    }, [json]);

    useEffect(() => {

        if (product && check('detail')) {
            // detailRef.current && (detailRef.current.scrollTop = 0)
            setReadDescription(false);
            setIndex(0)
            imageIndex?.(0);
            qs().keepJson().setAbsPath(['products', 'detail'])
        }
    }, [product])
    
    useEffect(() => {
        if (product && check('detail')) {
            console.log('new Comments fech');
            
            fetchProductComments({
                product_id: product.id,
                no_save: true,
                limit:4
            }).then((list) => {
                return setComments(list)
            })
        }
    }, [ product]);

    useEffect(() => {
        if (commentRef) {
            if (commentRef.dataset.init) return;
            commentRef.dataset.init = 'init';
            commentRef.addEventListener('scroll', () => {
                if (commentRef.scrollTop > 200) {
                    setCommentCanUp(true)
                } else {
                    setCommentCanUp(false)
                }
            })
        }
    }, [commentRef])
    const refreshProducts = ()=>{
        product && fetchProducts({
            add_cart:true,
            product_id:product.id,
            no_save:true
        }).then((p)=>{
            if(p?.list[0].id){
                const newP = {...p?.list[0]};
                products && setProducts({
                    ...products,
                    list:products?.list.map((l=>l.id==p?.list[0].id?newP:l))
                })
                product?.id == p?.list[0].id && (selectProduct(newP))
            }
        })
    }
    return product && (
        <div className={"detail-product " + (product ? 'open' : '')} >
            {product && <PageComments userComment={userComment} userCommand={userCommand} setRef={setCommentRef} product={product} />}
            {product && <PageImage product={product} />}
            <section className={'detail ' + ((current('products') || current('detail')) ? 'open' : 'close')} ref={detailRef}>
                <div className="top-top _flex">
                    <div className="return" ref={ref => {
                        if (!ref) return;
                        if (ref.dataset.init) return;
                        ref.dataset.init = 'init';
                        const doIt = () => {
                            if (window.innerWidth > 940) {
                                ref.style.display = ' none'
                            } else {
                                ref.style.display = 'flex'
                            }
                        }
                        window.addEventListener('resize', doIt)
                        doIt();
                    }} onClick={() => {
                        selectProduct(undefined)
                    }}></div>
                    <div className="label _lr-auto">Detail Product</div>
                </div>
                <div className="top-infos" ref={ref => {
                    if (!ref) return;
                    if (ref.dataset.init) return;
                    ref.dataset.init = 'init';
                    const images = ref.querySelector('.images')! as HTMLDivElement
                    const infos = ref.querySelector('.infos')! as HTMLDivElement
                    const checkSize = () => {
                        const rect = ref.getBoundingClientRect();
                        if (rect.width < 700) {
                            ref.style.flexWrap = 'wrap';
                            images.style.width = '';
                            images.style.minWidth = '';
                            images.style.maxWidth = '';
                            infos.style.width = '';
                            infos.style.minWidth = '';
                            infos.style.maxWidth = '';

                        } else {
                            ref.style.flexWrap = '';
                            images.style.width = '50%';
                            images.style.minWidth = '50%';
                            images.style.maxWidth = '50%';
                            infos.style.width = '50%';
                            infos.style.minWidth = '50%';
                            infos.style.maxWidth = '50%';
                        }
                    }
                    window.addEventListener('resize', checkSize)
                    setTimeout(() => {
                        checkSize();
                        imageIndex?.(0);
                    }, 200);
                }}>
                    <div className="images">
                        <div className="list" ref={cardHorizontalCenter((setIndex) => { imageIndex = setIndex }, setIndex)}>
                            <div className="gap"></div>
                            {
                                product?.images.map((img, i) => (
                                    <div key={img + product?.id} className={"img card-h-c " + (index == i ? 'active' : '')} style={{ background: getImg(img) }} onClick={() => {
                                        imageIndex?.(i);
                                        setIndex(i)
                                    }}></div>
                                ))
                            }
                            <div className="gap"></div>
                        </div>

                        <div className="min-list">
                            {
                                product?.images.map((img, i) => (
                                    <div key={img + product?.id} className={"min-img " + (index == i ? 'active' : '')} style={{ background: getImg(img) }} onClick={() => {
                                        setIndex(i)
                                        imageIndex?.(i);
                                    }}></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="infos" ref={infoRef}>
                        <div className="diff" ref={diffRef}>
                            <div className={"text " + ((feature && minText) ? 'min' : '')}>
                                <div className='title'>{product?.title}<span></span></div>
                                <p className="description">{((product?.description.length || 0) > 100 && !readDescription) ? (<>{limit(product?.description || '', 100)} <span onClick={() => setReadDescription(true)}>Read more</span></>) : product?.description || ''}</p>
                            </div>

                            {
                                product?.features && <>
                                    <div className="label-features">Features<span> {feature?.name && ' : ' + feature?.name}</span> {
                                        feature && <span className='close' style={{ filter: /* item-color */ toFilter('#112233')?.result.filter || '' }} onClick={() => {
                                            setFeature(undefined)
                                        }}></span>
                                    }</div>
                                    <div className="features">
                                        {
                                            product?.features.list.map(f => (
                                                <div key={f.id} className={"feature " + (feature?.id == f.id ? 'active' : '')} style={{ filter: /* impact */toFilter('#358f27')?.result.filter || '' }} onClick={() => {
                                                    if (!feature) {
                                                        const iH = infoRef.current?.getBoundingClientRect().height || 0
                                                        const dH = diffRef.current?.getBoundingClientRect().height || 0
                                                        if ((iH - dH) < 150) {
                                                            setMinText(true);
                                                        } else {
                                                            setMinText(false);
                                                        }
                                                    }
                                                    if (feature?.id == f.id) setFeature(undefined);
                                                    else setFeature(f);
                                                }}>
                                                    <div className="icon" style={{ background: getImg(f.icon) }}></div>
                                                    <div className="label">{limit(f.name, 10)}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            }
                            {feature && <div className="label-components">Components: <span>{product?.featuresCollector?.allCollectedFeatures()[feature.id]?.name}</span></div>}
                            <div className={"components " + (feature ? 'open' : '')}>
                                {
                                    feature?.components?.map(c => (
                                        <div className={"component " + (product?.featuresCollector?.allCollectedFeatures()[feature.id]?.id == c.id ? 'active' : '')} onClick={() => {
                                            if (product?.featuresCollector?.allCollectedFeatures()[feature.id]?.id == c.id) product?.featuresCollector?.collectFeature(feature, undefined);
                                            else product?.featuresCollector?.collectFeature(feature, c);
                                        }}>
                                            <div className="icon" style={{ background: getImg(c.icon[0], 'contain') }}></div>
                                            <div className="label">{limit(c.name, 10)}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail-box'>
                    <div className="center">
                        <div className='title'>product reviews<span></span></div>
                        {product && <ToImagesRating onClick={() => { setLastPage(''); qs().keepJson().setAbsPath(['products', 'detail', 'images']) }} product={product} />}
                        <div className='title'>Comments<span></span></div>
                        <div className="min-comments" ref={AddHorizontalScrollIcon({ posistion: 20 })}>
                            {
                                comments?.list.map((c) => (
                                    <ProductComment key={c.id} comment={c} onClick={() => {
                                        qs().keepJson().setAbsPath(['products', 'detail', 'comments'])
                                    }} />
                                ))
                            }
                            <div className={"more-comment " + (comments?.list.length || 0 > 0 ? '' : 'horizontal')} onClick={() => {
                                qs().keepJson().setAbsPath(['products', 'detail', 'comments'])
                            }}>
                                <div className={"icon " + ((comments?.list.length || 0 > 0) ? '' : 'add')}><span style={{ filter: /* background */toFilter('#ffffff').result.filter }}></span></div>
                                <div className="label">{(comments?.list.length || 0 > 0) ? 'More' : 'Add First Comment'}</div>
                            </div>
                        </div>
                    </div>
                    <Visites />
                    <MoreProduct />

                </div>
            </section>
            {
                current('detail') && <div className="price-zone">
                    <div className="ctn">
                        <div className="price">
                            <div>Price</div>
                            <div className="value">{product?.price || 0} $</div>
                        </div>
                        {(
                            product.quantity != undefined &&
                            product.quantity != null &&
                            parseInt(product.quantity + '') != 0 &&
                            product.quantity.toString() != '0') ? <ProductQuantity canNull product={product} onChange={() => {
                                refreshProducts()
                            }} /> : <div className="add-to-cart" onClick={() =>
                                addProductToCart({ product_id: product.id , quantity:1 }).then((c) => {
                                    if (c?.id) {
                                        refreshProducts()
                                    }
                                })}>Add <span> to cart</span></div>}
                    </div>
                </div>
            }
            {
                current('comments') && (commentCanUp || (userCommand?.payment_id && !userComment)) && <div className="write-zone">
                    {commentCanUp && <div className="up-icon" onClick={() => {
                        commentRef && (commentRef.scrollTop = 0)
                    }}><span></span></div>}
                    <div className="write-icon"><span></span></div>
                </div>
            }
        </div>
    )
}

export function ToImagesRating({ product, onClick }: { product: ProductInterface, onClick?: () => any }) {
    const { qs } = useAppRouter()
    return <div className="group-file-rating">
        <div className="after-order">
            <div className="ctn-mini-files" onClick={onClick}>
                {
                    images.list.map((i, a) => (
                        <div key={a} className="w">
                            <div className="mini-file" style={{ background: getImg(i) }}></div>
                        </div>
                    ))
                }
                {
                    images.more && <div className="back" style={{ background: getImg(images.list[0]) }}>
                        <div className="more-files" >+ More</div>
                    </div>
                }
            </div>
        </div>
        {product?.note && <div className="rating" onClick={() => qs().keepJson().setAbsPath(['products', 'detail', 'comments'])}>
            <div className="note">{product.note.star}</div>
            <NoteStars note={product.note.star} />
            <div className="vote">{product.note.votes} <span></span></div>
        </div>}
    </div>
}

