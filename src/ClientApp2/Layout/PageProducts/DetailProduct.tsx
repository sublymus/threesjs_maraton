import { useEffect, useRef, useState } from 'react';
import { getImg, limit } from '../../../Tools/StringFormater';
import './DetailProduct.css'
import { useProductStore } from './ProductStore';
import { toFilter } from '../../../Tools/FilterColor'
import { CommandInterface, Feature, ListType ,ProductCommentInterface, ProductInterface } from '../../../DataBase';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { ProductComment } from "../../Components/ProductComment/ProductComment";
import { NoteStars } from "../../Components/NoteStars/NoteStars";
import { cardHorizontalCenter } from "../../../Tools/CardPosition";
import { AddHorizontalScrollIcon } from "../../../Tools/ScrollTools";
import { PageComments } from "./PageComments";
import { useCommentStore } from './CommentStore';
import { PageImage } from "./PageImage";
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

    const { product, fetchProducts, fetchVisites, visites, selectProduct } = useProductStore()
    const [moreProducts, setMoreProducts] = useState<ListType<ProductInterface>>()
    const {fetchProductComments , setLastPage} = useCommentStore()
    const { user } = useRegisterStore()
    const [minText, setMinText] = useState(true);
    const [index, setIndex] = useState(0);
    const [readDescription, setReadDescription] = useState(false);
    const [feature, setFeature] = useState<Feature>()

    const [openPage, setOpenPage] = useState('comments');
  
    const infoRef = useRef<HTMLDivElement>(null);
    const diffRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    const [comments,setComments] = useState<ListType<ProductCommentInterface>>();
    useEffect(() => {
        if (product) {
            fetchProducts({
                no_save: true,
                category_id: product.category_id
            }).then((ps) => {
                if (ps?.list) {
                    setMoreProducts(ps)
                }
            });
            fetchProductComments({
                product_id:product.id,
                no_save:true,
            }).then((list)=>{
                return setComments(list)
            })
        }
        detailRef.current && (detailRef.current.scrollTop = 0)
        setReadDescription(false);
        setOpenPage('')
    }, [product])
    useEffect(() => {
        !visites && user && fetchVisites({
            limit: 10,
        });
    }, [user])
    // useEffect(() => {
    //     const m = 2;
    //     const w = 80;
    //     const left = i.i * (2 * m + w);
    //     // listRef.current && (
    //     //     listRef.current.scrollLeft =
    //     // )
    //     if (listRef.current) {
    //         console.log((left / 100) * listRef.current.getBoundingClientRect().width);
    //         listRef.current.scrollLeft = (left / 100) * listRef.current.getBoundingClientRect().width
    //     }
    // }, [i]);

    // console.log(product?.featuresCollector);
    
    const [commentCanUp, setCommentCanUp] = useState(false);
    const [userComment/* , setCanWrite */] = useState<ProductCommentInterface>();
    const [userCommand/* , setCanWrite */] = useState<CommandInterface>({
        payment_id:'lol' 
    } as any);
    const [commentRef, setCommentRef] = useState<HTMLElement|null>(null)
    useEffect(()=>{
        if(commentRef){
            if(commentRef.dataset.init) return;
            commentRef.dataset.init = 'init';
            commentRef.addEventListener('scroll',()=>{
                if(commentRef.scrollTop > 200){
                    setCommentCanUp(true)
                }else{
                    setCommentCanUp(false)
                }
            })
        }
    },[commentRef])

    return (
        <div className={"detail-product " + (product ? 'open' : '')} >
            {product && <PageComments userComment={userComment} userCommand = {userCommand} setRef={setCommentRef} product={product} page={openPage} setPage={setOpenPage} />}
            { product && <PageImage   setPage={setOpenPage} page={openPage} product={product}/>}
            <section className={'detail ' + (openPage == 'detail' || openPage == '' ? 'open' : 'close')} ref={detailRef}>
                <div className="top-top _flex">
                    <div className="return"></div>
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
                                    <div key={img + product?.id} className={"min-img "+ (index == i ? 'active' : '')} style={{ background: getImg(img) }} onClick={() => {
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
                                <p className="description">{((product?.description.length||0) > 100 && !readDescription) ? (<>{limit(product?.description||'', 100)} <span onClick={() => setReadDescription(true)}>Read more</span></>) : product?.description||''}</p>
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
                <div className="center">
                    <div className='title'>product reviews<span></span></div>
                    {product && <ToImagesRating onClick={()=>{ setLastPage('');setOpenPage('images')}} product={product} />}
                    <div className='title'>Comments<span></span></div>
                    <div className="min-comments" ref={AddHorizontalScrollIcon({ posistion: 20 })}>
                        {
                            comments?.list.map((c) => (
                                <ProductComment key={c.id} comment={c} onClick={() => {
                                    setLastPage(openPage);
                                    setOpenPage('comments');
                                }} />
                            ))
                        }
                        <div className="more-comment" onClick={() => {
                            setLastPage(openPage);
                            setOpenPage('comments');
                        }}>
                            <div className={"icon "+((comments?.list.length||0 > 0)?'':'add')}><span style={{ filter: /* background */toFilter('#ffffff').result.filter }}></span></div>
                            <div className="label">{(comments?.list.length||0 > 0)?'More':'Add'}</div>
                        </div>
                    </div>
                </div>
                <div className="visites">
                    <div className='title'>Products Visited<span></span></div>
                    <div className="list" ref={AddHorizontalScrollIcon({ posistion: 20 })}>
                        {
                            visites?.list.map((p) => (
                                <ProductCard key={p.id} product={p} active={product?.id == p.id} onClick={() => {
                                    selectProduct(p)
                                }} />
                            ))
                        }
                    </div>
                </div>
                <div className="more-products">
                    <div className='title more'>More Products<span></span></div>
                    <div className="list">
                        {
                            moreProducts?.list.map((p) => (
                                <ProductCard key={p.id} product={p} active={product?.id == p.id} onClick={() => {
                                    selectProduct(p)
                                }} />
                            ))
                        }
                    </div>
                </div>
                <footer></footer>
            </section>
            {
                (openPage == 'detail' || openPage == '') && <div className="price-zone">
                    <div className="ctn">
                        <div className="price">
                            <div>Price</div>
                            <div className="value">{product?.price || 0} $</div>
                        </div>
                        <div className="add-to-cart">Add to cart</div>
                    </div>
                </div>
            }
            {
                openPage == 'comments' && (commentCanUp || (userCommand?.payment_id && !userComment)) && <div className="write-zone">
                   {commentCanUp &&  <div className="up-icon" onClick={()=>{
                    commentRef && (commentRef.scrollTop = 0)
                   }}><span></span></div>}
                    <div className="write-icon"><span></span></div>
                </div>
            }
        </div>
    )
}

export function ToImagesRating({ product, onClick}: { product: ProductInterface , onClick?:()=>any }) {

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
        {product?.note && <div className="rating">
            <div className="note">{product.note.star}</div>
            <NoteStars note={product.note.star} />
            <div className="vote">{product.note.votes} <span></span></div>
        </div>}
    </div>
}

