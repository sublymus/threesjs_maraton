import { useEffect, useRef, useState } from 'react';
import { getImg, limit } from '../../../Tools/StringFormater';
import './DetailProduct.css'
import { useProductStore } from './ProductStore';
import { toFilter } from '../../../Tools/FilterColor'
import { Feature, ListType, ProductInterface } from '../../../DataBase';
import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { ProductComment } from "../../Components/ProductComment/ProductComment";
import { NoteStars } from "../../Components/NoteStars/NoteStars";
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
const comments = {
    page: 1,
    limit: 10,
    total: 34,
    list: [{
        id: '1234_0',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",

            country: 'russia',
            country_icon: '/src/res/countries/russia.png',
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 2,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_1',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",

            country: 'ivory-coast',
            country_icon: '/src/res/countries/ivory-coast.png',
            email: "sublymus@gmail.com",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 5,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_2',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",

            country: 'russia',
            country_icon: '/src/res/countries/russia.png',
            email: "sublymus@gmail.com",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 3,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_3',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 1,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_4',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",

            country: 'ivory-coast',
            country_icon: '/src/res/countries/ivory-coast.png',
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 4,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_5',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 2,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_6',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 4,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_7',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",

            country: 'ivory-coast',
            country_icon: '/src/res/countries/ivory-coast.png',
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 5,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_8',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 3,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }, {
        id: '1234_9',
        user_id: 'c8b3b918-2bc9-4799-b761-a62cb6fbac9b',
        user: {
            id: "c8b3b918-2bc9-4799-b761-a62cb6fbac9b",
            name: "Opus Opus",
            email: "sublymus@gmail.com",

            country: 'russia',
            country_icon: '/src/res/countries/russia.png',
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
        },
        files: [
            '/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
            '/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg',
        ],
        note: 5,
        message: 'Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals.',
        response: 'Response *** Plant Delivery APP designed by Blue for VisualMaka. Connect with them on Dribbble; the global community for designers and creative professionals,.',
        created_at: "2024-07-14T07:02:44.000+00:00"
    }]
}

export function DetailProduct() {

    const { product, fetchProducts, fetchVisites, visites, selectProduct } = useProductStore()
    const [currentImg, setCurrentImg] = useState('');
    const [moreProducts, setMoreProducts] = useState<ListType<ProductInterface>>()
    const { user } = useRegisterStore()
    const listRef = useRef<HTMLDivElement>(null);
    const [minText, setMinText] = useState(true);
    const [i, setI] = useState({ i: 0 });
    const [readDescription, setReadDescription] = useState(false);
    const [feature, setFeature] = useState<Feature>()
    const infoRef = useRef<HTMLDivElement>(null);
    const diffRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        product && setCurrentImg(product?.images[0]);
        setReadDescription(false);
        product && fetchProducts({
            no_save: true,
            category_id: product.category_id
        }).then((ps) => {
            if (ps?.list) {
                setMoreProducts(ps)
            }
        })
    }, [product])
    useEffect(() => {
        !visites && user && fetchVisites({
            limit: 10,
        });
    }, [user])
    useEffect(() => {
        const m = 2;
        const w = 80;
        const left = i.i * (2 * m + w);
        // listRef.current && (
        //     listRef.current.scrollLeft =
        // )
        if (listRef.current) {
            console.log((left / 100) * listRef.current.getBoundingClientRect().width);
            listRef.current.scrollLeft = (left / 100) * listRef.current.getBoundingClientRect().width
        }
    }, [i]);

    // console.log(product?.featuresCollector);

    const description = product?.description + `Traduit de l'anglais-En marketing, un produit est un objet, un système ou un service mis à la disposition du consommateur à la demande du consommateur ; c'est tout ce qui peut être offert à un marché pour satisfaire le désir ou le besoin d'un client. Wikipédia (anglais)` || '';
    return (
        <div className={"detail-product " + (product ? 'open' : '')} >
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
                }, 200);
            }}>
                <div className="images">
                    <div className="list" ref={listRef}>
                        <div className="gap"></div>
                        {
                            product?.images.map((img, i) => (
                                <div key={img + product?.id} className={"img " + (currentImg == img ? 'active' : '')} style={{ background: getImg(img) }} onClick={() => {
                                    setI({ i });
                                    setCurrentImg(img);
                                }}></div>
                            ))
                        }
                        <div className="gap"></div>
                    </div>

                    <div className="min-list">
                        {
                            product?.images.map((img, i) => (
                                <div key={img + product?.id} className={"min-img " + (currentImg == img ? 'active' : '')} style={{ background: getImg(img) }} onClick={() => {
                                    setCurrentImg(img);
                                    setI({ i });
                                }}></div>
                            ))
                        }
                    </div>
                </div>
                <div className="infos" ref={infoRef}>
                    <div className="diff" ref={diffRef}>
                        <div className={"text " + ((feature && minText) ? 'min' : '')}>
                            <div className='title'>{product?.title}<span></span></div>
                            <p className="description">{(description.length > 100 && !readDescription) ? (<>{limit(description, 100)} <span onClick={() => setReadDescription(true)}>Read more</span></>) : description}</p>
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
                        { feature && <div className="label-components">Components: <span>{product?.featuresCollector?.allCollectedFeatures()[feature.id]?.name}</span></div>}
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
                <div className="group-file-rating">
                    <div className="after-order">
                        <div className="ctn-mini-files">
                            {
                                images.list.map((i, a) => (
                                    <div key={a} className="w">
                                        <div  className="mini-file" style={{ background: getImg(i) }}></div>
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
                        <div className="note">{product.note.value}</div>
                        <NoteStars note={product.note.value} />
                        <div className="vote">{product.note.vote} <span></span></div>
                    </div>}
                </div>
                <div className='title'>Comments<span></span></div>
                <div className="min-comments">
                    {
                        comments.list.map((c) => (
                            <ProductComment key={c.id} comment={c} />
                        ))
                    }
                    <div className="more-comment">
                        <div className="icon"><span style={{ filter: /* background */toFilter('#ffffff').result.filter }}></span></div>
                        <div className="label">More</div>
                    </div>
                </div>
            </div>
            <div className="visites">
                <div className='title'>Products Visited<span></span></div>
                <div className="list">
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
        </div>
    )
}

