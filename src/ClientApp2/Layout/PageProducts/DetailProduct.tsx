import { useEffect, useRef, useState } from 'react';
import { getImg, limit } from '../../../Tools/StringFormater';
import './DetailProduct.css'
import { useProductStore } from './ProductStore';
import { toFilter } from '../../../Tools/FilterColor'
import { CommandInterface, Feature, ListType, ProductCommentInterface, ProductInterface, ProductScenus } from '../../../DataBase';
import { ProductComment } from "../../Components/ProductComment/ProductComment";
import { NoteStars } from "../../Components/NoteStars/NoteStars";
import { cardHorizontalCenter } from "../../../Tools/CardPosition";
import { AddHorizontalScrollIcon } from "../../../Tools/ScrollTools";
import { PageComments } from "./PageComments";
import { useCommentStore } from './CommentStore';
import { PageImage } from "./PageImage";
import { useAppRouter, useAppStore } from '../../AppStore';
import { Visites } from "../../Components/Visites/Visites";
import { MoreProduct } from "../../Components/MoreProduct/MoreProduct";
import { ProductQuantity } from '../../Components/ProductQuantity/ProductQuantity';
import { useCommandStore } from '../PageCommand/CommandStore';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { PageAuth } from '../PageRegister/PageAuth';
import { Producd3d } from "../../Components/Product3d/Producd3d";

let imageIndex: ((index: number) => void) | undefined;
export function DetailProduct({ onRefresh }: { onRefresh?: () => any }) {

    const { json, qs, check, current, navBack, pathList } = useAppRouter()
    const { setProductById, product, selectProduct, products, fetchProducts, setProducts } = useProductStore()
    const { fetchProductComments, setLastPage } = useCommentStore()
    const { addProductToCart, carts, fetchCarts } = useCommandStore()
    const { user } = useRegisterStore()
    const { openChild } = useAppStore()

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
    const [ImageComments, setImageComments] = useState<{
        images: string[],
        more: boolean
    }>();
    const [s] = useState<any>({})
    const [imagesCtn] = useState<{ current: HTMLDivElement | null }>({ current: null });


    const handler = () => {
        if (!imagesCtn.current) return
        const rect = imagesCtn.current.getBoundingClientRect();
        const imgs = imagesCtn.current.querySelectorAll('.img') as NodeListOf<HTMLDivElement>;
        let w = rect.width - 60;
        w = w > 400 ? 400 : w;
        for (const img of imgs) {
            img.style.height = `${(w) / 1.295}px`
            img.style.width = `${w}px`
            img.style.minWidth = `${w}px`
        }
    }

    handler()

    useEffect(() => {
        if (check('detail') && json?.product_id && json.product_id != s.product_id) {
            s.product_id = json.product_id;
            setProductById({ json } as any)
        }
    }, [json]);

    useEffect(() => {

        if (product && check('detail')) {
            detailRef.current && (detailRef.current.scrollTop = 0)
            setReadDescription(false);
            setIndex(0)
            imageIndex?.(0);
            // qs().keepJson().setAbsPath(['products', 'detail'])
        }
    }, [product])

    useEffect(() => {
        if (product && check('detail')) {
            // console.log('new Comments fech');

            fetchProductComments({
                product_id: product.id,
                no_save: true,
                limit: 4
            }).then((list) => {
                return setComments(list)
            })
            fetchProductComments({
                product_id: product.id,
                no_save: true,
                with_photo: true,
                limit: 5
            }).then((list) => {
                const a = list?.list.map(i => i.photos).flat();
                return setImageComments({
                    images: a?.slice(0, 5) || [],
                    more: (a?.length || 0) > 5
                })
            })
            if (s.carts?.list) {
                // console.log('dans la list existant',s.carts?.list);

                const cart = (s.carts.list as CommandInterface[]).find(c => c.product_id == s.product?.id)
                if (cart) {
                    (s.product as ProductScenus).featuresCollector?.setAll(cart.collected_features as any)
                }
            } else {
                fetchCarts({}).then((catrs) => {
                    console.log('dans la new  list');
                    if (catrs?.list) {
                        const cart = (s.carts.list as CommandInterface[]).find(c => c.product_id == s.product?.id)
                        if (cart) {
                            (s.product as ProductScenus).featuresCollector?.setAll(cart.collected_features as any)
                        }
                    }
                })
            }
        }

    }, [product, pathList]);

    useEffect(() => {

        window.addEventListener('resize', handler);
        setTimeout(() => {
            handler()
        }, 1000);
        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [])
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

    s.product = product
    s.carts = carts
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
                    list: products?.list.map((l => l.id == newP.id ? newP : l))
                });
                // (product?.id == newP.id) && (selectProduct(newP));
            }
            return
        })
    }

    return product && (
        <div className={"detail-product " + (product ? 'open' : '')} >
            {product && product.scene_dir && <Producd3d product={product} />}
            {product && <PageComments onRefresh={onRefresh} ImageComments={ImageComments} userComment={userComment} userCommand={userCommand} setRef={setCommentRef} product={product} />}
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
                        navBack()
                    }}></div>
                    <div className="label _lr-auto">Detail Product</div>
                    <div className="cart" onClick={() => {
                        qs().setAbsPath(['cart']);
                    }}></div>
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
                        <div className="list" ref={(ref => {
                            cardHorizontalCenter((setIndex) => { imageIndex = setIndex }, setIndex)(ref);
                            imagesCtn.current = ref;
                        })}>
                            <div className="gap"></div>
                            {
                                product?.images.map((img, i) => (
                                    <div key={img + product?.id} className={"img card-h-c " + (index == i ? 'active' : '')} style={{ background: getImg(img) }} onClick={() => {
                                        imageIndex?.(i);
                                        setIndex(i)
                                    }}></div>
                                ))
                            }
                            {
                                product.scene_dir && <div className="img card-h-c open3d" onClick={() => {
                                    qs().keepJson().setAbsPath(['products', 'detail', 'product3d'])
                                }}>
                                    <div className="blur">

                                        <span></span>
                                        <h1>Open 3D View</h1>
                                    </div>

                                </div>
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
                            {
                                product.scene_dir && <div className="min-img i3d" onClick={() => {
                                    qs().keepJson().setAbsPath(['products', 'detail', 'product3d'])
                                }}><span style={{ filter:/* impact - color */toFilter('#fff').result.filter }}></span></div>
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
                                    <div className="lol">
                                        <div className="features" ref={AddHorizontalScrollIcon({ posistion: 20 })}>
                                            {
                                                product?.features.list.map(f => (
                                                    <div key={f.id} className={"feature " + (feature?.id == f.id ? 'active' : '')} onClick={() => {
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
                                                        <div className="icon" style={{ background: getImg(f.icon[0]) }}></div>
                                                        <div className="label">{limit(f.name, 10)}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                            {feature && <div className="label-components">Components: <span>{product?.featuresCollector?.allCollectedFeatures()[feature.id]?.name}</span></div>}
                            <div className={'lol ' + (feature ? 'open' : '')}>
                                <div className={"components " + (feature ? 'open' : '')} ref={AddHorizontalScrollIcon({ posistion: 20 })}>
                                    {
                                        feature?.components?.map(c => (
                                            <div key={c.id} className={"component " + (product?.featuresCollector?.allCollectedFeatures()[feature.name]?.id == c.id ? 'active' : '')} onClick={() => {
                                                if (product?.featuresCollector?.allCollectedFeatures()[feature.name]?.id == c.id) product?.featuresCollector?.collectFeature(feature, undefined);
                                                else product?.featuresCollector?.collectFeature(feature, c);
                                                if (carts) {
                                                    let cart = carts.list.find(c => c.product_id == product.id);
                                                    if (cart) {
                                                        addProductToCart({
                                                            //@ts-ignore
                                                            product_id: product?.id,
                                                            //@ts-ignore
                                                            command_id: cart.id,
                                                            collected_features: product?.featuresCollector?.allCollectedFeatures()
                                                        })
                                                    } else {
                                                        fetchCarts({}).then((res) => {
                                                            if (res?.list) {
                                                                cart = res?.list.find(c => c.product_id == product.id);
                                                                if (cart) {
                                                                    addProductToCart({
                                                                        //@ts-ignore
                                                                        product_id: product?.id,
                                                                        //@ts-ignore
                                                                        command_id: cart.id,
                                                                        collected_features: product?.featuresCollector?.allCollectedFeatures()
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            }}>
                                                <div className="icon" style={{ background: c.images?.[0] && getImg(c.images[0], 'cover') }}></div>
                                                <div className="label">{limit(c.name, 10)}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail-box'>
                    <div className="center">
                        <div className='title'>product reviews<span></span></div>
                        {product && <ToImagesRating images={ImageComments?.images} more={ImageComments?.more} onClick={() => { setLastPage(''); qs().keepJson().setAbsPath(['products', 'detail', 'images']) }} product={product} />}
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
                (current('detail') || current('products')) && <div className="price-zone">
                    <div className="ctn">
                        <div className="price">
                            <div>Price</div>
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

export function ToImagesRating({ product, onClick, images, more }: { images?: string[], more?: boolean, product: ProductInterface, onClick?: () => any }) {
    const { qs } = useAppRouter()
    return <div className="group-file-rating">
        <div className="after-order">
            <div className="ctn-mini-files" onClick={onClick}>
                {
                    images?.map((i, a) => (
                        <div key={a} className="w">
                            <div className="mini-file" style={{ background: getImg(i) }}></div>
                        </div>
                    ))
                }
                {
                    more && <div className="back" style={{ background: images?.[0] && getImg(images?.[0]) }}>
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

