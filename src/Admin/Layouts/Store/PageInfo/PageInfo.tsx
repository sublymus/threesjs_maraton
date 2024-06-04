import "./PageInfo.css";
import { Local } from "../../../../Config";
import { useEffect, useState } from "react";
import { generateUid } from "../../../../Tools/uidGenerator";
import { useWindowSize } from "../../../../Hooks";
import { EditorTopBar } from "../../../../DashView/Component/EditorTopBar/EditorTopBar";
import { getImg } from "../../../../Tools/StringFormater";
import { useAdminStore , useAdminRoute } from "../../../AdminStore";
import { useStoreStore } from "../StoreStore";
import { useRegisterStore } from "../../PageAuth/RegisterStore";

export function PageInfo () {
    const [id] = useState(generateUid());
    const { current, setAbsPath, navBack , json} = useAdminRoute();
    const {  store ,setStoreById} = useStoreStore();
    const {openChild } = useAdminStore();
    const { user} = useRegisterStore()
    const [collected, setCollected] = useState<Record<string, any>>(store || {});
    const [fileLogo, setFileLogo] = useState<{ file?: File, url: string } | null>(store ? { url: (current('store_info') || '') && `${store.logo[0]}` } : null)
    const [fileBanner, setFileBanner] = useState<{ file?: File, url: string } | null>(store ? { url: (current('store_info') || '') && `${store.banners?.[0]}` } : null)

    const size = useWindowSize();
    const wrap = size.width < 1050 ? 'wrap' : ''
    useEffect(() => {
        setTimeout(() => {//TODO tres gros probleme le useEffeect est appele avant le changement de page;
            if (store && current('store_info')) {
                setCollected(store);
                setFileBanner({ url: `${store.banners[0]}` });
                setFileLogo({ url: `${store.logo?.[0]}` });
            }
        });
        if (!store) {
            setCollected({})
            setFileLogo(null)
            setFileBanner(null)
        }
    }, [store]);

    const edit = current('store_info');
    useEffect(()=>{
        json?.store_id && user && setStoreById(json.store_id)
    },[json, user])
    const s = store;
    return (edit && (!store)) ? (
        <div className="store-select-btn" onClick={() => { setAbsPath(['stores']) }}>
            Select Store Before Edition
        </div>
    ) : (current('store_info')) && (
        <div className="store-info">
            {store && <div className="editor-top">
                <div className="nav-back" onClick={()=>navBack()}></div>
                <EditorTopBar terme="dark" deteleKey={store.id} mode={'delete'} onDelete={() => {
                    console.log('DELETE REQUIRED');
                    
                    // deleteStore(store.id).then((res => {
                    //     if (res) {
                    //         setAbsPath(['stores'])
                    //     }
                    // }))
                }} onCreate={() => { }} title="Store Information" />
                <div className="open-opt">
                    <div className="btn-dash btn demo" onClick={() => {
                        localStorage.setItem('store', JSON.stringify(store));
                        window.open(
                            `${Local}/demo/${store.name}`
                        );
                    }}>
                        Open Demo Store
                    </div>
                    <div className="btn-dash btn" onClick={() => {
                        localStorage.setItem('store', JSON.stringify(store));
                        window.open(
                            `${Local}/${store?.name}/dash`,
                        );
                    }}>
                        Open Dashboard
                    </div>
                </div>
            </div>
            }
            <div className={"center-content " + wrap}>
                <div className="center-left">
                <div className={"store " + (store ? 'anim' : 'void')}>

                        <div className={"banner " + (fileBanner?.url ? '' : 'void')} style={fileBanner?.url ? { background: getImg(fileBanner?.url || '') } : {}} onClick={() => {
                            // setAbsPath(['store_info'])
                        }}>
                            
                            <div className="more">
                                <div className={"logo " + (fileLogo?.url ? '' : 'void')} style={fileLogo?.url ? { background: getImg(fileLogo?.url || '') } : {}} onClick={(e) => {
                                     if(e.currentTarget != e.target) return
                                     fileLogo?.url && openChild(
                                        <div className="big-img" onClick={() => openChild(undefined, false)}>
                                            <div className="img" style={{
                                                background: getImg(fileLogo?.url || '')
                                            }} ></div>
                                        </div>, true, '#3455'
                                    )
                                }}>
                                </div>
                                <div className="text">
                                    <div className="name">{collected.name}</div>
                                    <div className="owner-email">{collected.store_email}</div>
                                    <div className="id">{collected.id && `#${collected.id.split('-')[0]}`}</div>
                                </div>
                            </div>
                        </div>
                        <div className="btm">
                            <div className="info">
                                <div className="stat">
                                    <div className="products">
                                        <div className="value">{store ? 42 : 0}</div>
                                        <div className="icon"></div>
                                    </div>
                                    <div className="clients">
                                        <div className="value">{store ? 205 : 0}</div>
                                        <div className="icon"></div>
                                    </div>
                                    <div className="collaborators">
                                        <div className="value">{store ? 9 : 0}</div>
                                        <div className="icon"></div>
                                    </div>
                                </div>
                                <div className="other">
                                    <div className="site">
                                        {collected.website}
                                    </div>
                                    <div className="phone">
                                        {collected.phone}
                                    </div>
                                </div>
                            </div>
                            {
                                store && (
                                    <div className="options">
                                        <div className="open-store" onClick={() => {
                                            localStorage.setItem('store', JSON.stringify(s));
                                            window.open(
                                                `${Local}/${collected.name}`
                                            );
                                        }}>STORE</div>
                                        <div className="open-dash" onClick={() => {
                                            localStorage.setItem('store', JSON.stringify(s));
                                            window.open(
                                                `${Local}/${collected.name}/dash`
                                            );
                                        }}>DASH</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>




                </div>
                <div className="center-right">
                    {/* <div className="user-name"><span>Owner : </span> <span className="name">{owner?.name}</span></div> */}
                    {
                        edit && <div className="id">
                            <label htmlFor={id + 'id'} style={{ opacity: '0.5' }} >Id</label>
                            <input type="text" id={id + 'id'} value={collected.id || ''} style={{ opacity: '0.5' }} placeholder="Name" />
                        </div>
                    }
                    <div className="name">
                        <label htmlFor={id + 'name'} >Name</label>
                        <input type="text" id={id + 'name'} value={collected.name || ''} placeholder="Name" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['name']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="phone">
                        <label htmlFor={id + 'phone'}>Phone</label>
                        <input type="text" id={id + 'phone'} value={collected.phone || ''} placeholder="Phone" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['phone']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="store_email">
                        <label htmlFor={id + 'store_email'}>Store Email</label>
                        <input type="email" id={id + 'store_email'} value={collected.store_email || ''} placeholder="Store email" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['store_email']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="website">
                        <label htmlFor={id + 'website'}>Web Site</label>
                        <input type="text" id={id + 'website'} value={collected.website || ''} placeholder="Web Site" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['website']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="desciption">
                        <label htmlFor={id + 'desciption'}>Description</label>
                        <input type="text" id={id + 'description'} value={collected.description || ''} placeholder="Description" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['description']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="address">
                        <label htmlFor={id + 'address'}>Address</label>
                        <input type="text" id={id + 'address'} value={''} placeholder="Address" onChange={() => {
                            setCollected({
                                ...collected,
                            })
                        }} />
                    </div>
                    {/* <div className="btm">
                        <div className="btn" onClick={() => {
                            edit ? (store && editStore({
                                ...collected,
                                banners: fileBanner,
                                logo: fileLogo,
                                store_id: store?.id
                            }).then((res) => {
                                res && setAbsPath(['stores']);
                            })) : createStore({
                                ...collected,
                                banners: fileBanner,
                                logo: fileLogo
                            }).then((res) => {
                                res && setAbsPath(['stores']);
                            })
                        }}>
                            {edit ? 'Edit' : 'Create'} Store
                        </div>

                    </div> */}

                </div>
            </div>

            <div className="bottom-bar">

            </div>
        </div>
    )
}