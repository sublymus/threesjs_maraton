import "./PageHome.css";
import { useWebRoute, useWebStore } from '../../WebStore'
import { useEffect, useState } from "react";
import { getImg } from '../../../Tools/StringFormater'
import { ListType, StoreInterface, UserInterface } from "../../../DataBase";
import { TutorialCard } from "../PageTutorial/PageTutorial";
import { Local } from "../../../Config";

export function PageHome() {

    const [onlyMyStore, setOnlyMystore] = useState(false)
    useEffect(() => {
        fetchStores({})
    }, [])
    const { check, pathList, setAbsPath } = useWebRoute()
    const { owner, fetchStores } = useWebStore()
    const [stores, setStores] = useState<ListType<StoreInterface> | undefined>()
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        owner && check('home') && fetchStores({
            name: searchValue,
            only_owner: onlyMyStore
        }).then((res) => {
            setStores(res)
        })
    }, [pathList, owner, onlyMyStore, searchValue])

    return check('home') && (
        <div className="page-home">
            <div className="back"></div>
            <div className="top-ctn">
                <div className="left-side">
                    <div className="stores-count">{34} Stores</div>
                    <div className="title">Create your online <span className="store">store</span>, and boost your <span className="business">business</span></div>
                    <div className="sub-title">Have your online store, present your products with standard or 3D interfaces and have all the necessary tools for management.</div>
                    <div className="mobile-video" ref={ref => {
                        if (!ref) return
                        if (ref.dataset.init) return;
                        ref.dataset.init = 'init';
                        const rest = () => {
                            const video = ref.querySelector('video')! as HTMLVideoElement;

                            let w = window.innerWidth - 30;
                            if (w > 500) w = 500
                            video.autoplay = true;
                            video.width = w;
                            video.style.width = `${w}px`;
                            console.log('$$$$$$$$$$$$$$$$', video, window.innerWidth, window.innerHeight);
                        }
                        window.addEventListener('resize', rest)
                        rest();
                    }}>
                        <div className="video">
                            <video autoPlay loop muted src="/src/res/video/original-fa0f11cbea12e0e485700258378a884b.mp4"></video>
                        </div>
                    </div>
                    <div className="btn-stores">
                        <div className="add-new-store" onClick={() => {
                            setAbsPath(['new_store'])
                        }}>
                            <div className="icon"></div>
                            <div className="label"> ADD NEW STORE</div>

                        </div>
                    </div>
                    <div className="top-searsh">
                        <div className="section-search">
                            <label htmlFor="home-search" className="search">
                                <div className="icon"></div>
                                <input id="home-search" type="text" placeholder="Store name" onChange={(e) => {
                                    setSearchValue(e.currentTarget.value)
                                }} />
                            </label>
                        </div>
                       {owner && <div className="only-my-store" style={{ pointerEvents: 'initial' }} onClick={() => {
                            setOnlyMystore(!onlyMyStore)
                        }} >
                            <span className={"check-only-my-store " + (onlyMyStore ? 'true' : '')}></span>My stores only
                        </div>}
                    </div>
                </div>
                <div className="right">
                    <div className="video" ref={ref => {
                        if (!ref) return
                        if (ref.dataset.init) return;
                        ref.dataset.init = 'init';
                        const rest = () => {
                            const video = ref.querySelector('video')! as HTMLVideoElement;

                            video.autoplay = true;
                            let w = 500;
                            if (window.innerWidth > 1300) w = 600
                            if (window.innerWidth < 900) w = 400
                            video.width = w;
                            video.style.width = `${w}px`;
                            // video.height = 500;
                            // video.style.height = `${500}px`;
                            console.log('$$$$$$$$$$$$$$$$', video, window.innerWidth, window.innerHeight);
                        }
                        window.addEventListener('resize', rest)
                        rest();
                    }}>
                        <video autoPlay loop muted src="/src/res/video/original-fa0f11cbea12e0e485700258378a884b.mp4"></video>
                    </div>
                </div>

            </div>
            <div className="home-stores">
                <div className="list">
                    <div className="stores">
                        {stores?.list.map((s) => <StoreCard owner={owner} key={s.id} setSelectedStore={() => { }} store={s} />)}
                    </div>
                </div>
            </div>
            <TutorialCard/>

        </div>
    )
}

const products = [{
    icon: '/src/res/screen/167814d2-d7c5-4c13-9baa-a26bbba58283.jpg',
    name: 'Lanoda'
}, {
    icon: '/src/res/screen/167814d2-d7c5-4c13-9baa-a26bbba58283.jpg',
    name: 'Lanoda'
}, {
    icon: '/src/res/screen/167814d2-d7c5-4c13-9baa-a26bbba58283.jpg',
    name: 'Lanoda'
}, {
    icon: '/src/res/screen/167814d2-d7c5-4c13-9baa-a26bbba58283.jpg',
    name: 'Lanoda'
}, {
    icon: '/src/res/screen/167814d2-d7c5-4c13-9baa-a26bbba58283.jpg',
    name: 'Lanoda'
}, {
    icon: '/src/res/screen/167814d2-d7c5-4c13-9baa-a26bbba58283.jpg',
    name: 'Lanoda'
}, {
    icon: '/src/res/screen/167814d2-d7c5-4c13-9baa-a26bbba58283.jpg',
    name: 'Lanoda'
}]

export function StoreCard({ setSelectedStore, store, owner, isNew }: { isNew?:boolean,owner?: UserInterface, store: StoreInterface, setSelectedStore: () => any }) {

    return <div className={"store-card "+(isNew?'new':'')}>
        <div className="banner" style={{ background: getImg(store.banners[0]) }} onClick={() => {
            setSelectedStore();
        }}>
            <div className="more">
                <div className="logo" style={{ background: getImg(store.logo[0]) }}></div>
                <div className="text">
                    <div className="name">{store.name}</div>
                    <div className="store_email">{store.store_email || 'sublymus@gmail.com'}</div>
                </div>
            </div>
        </div>
        <div className="store-products">
            {
                products.map((p) => (
                    <div className="store-product" style={{ background: getImg(p.icon) }}></div>
                ))
            }
            {
                products.length > 1 && <div className="more-product" style={{ background: getImg(products[products.length - 1].icon) }}>
                    <div className="more-icon">+ see all</div>
                </div>
            }
        </div>
        <div className="see-all">
            <div className="btn" onClick={() => {
                localStorage.setItem('store', JSON.stringify(store));
                window.open(
                    `${Local}/${store.name}`
                );
            }}> Open {'>'} </div>
            {
                owner && owner.id == store.owner_id && <div className="btn" onClick={() => {
                    localStorage.setItem('store', JSON.stringify(store));
                    window.open(
                        `${Local}/${store.name}/dash`
                    );
                }}> Manage {'>'} </div>
            }
        </div>
    </div>
}

