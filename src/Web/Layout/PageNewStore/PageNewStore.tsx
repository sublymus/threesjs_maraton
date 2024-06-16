import "./PageNewStore.css";
import { useWebRoute, useWebStore } from '../../WebStore'
import { useEffect, useState } from "react";
import { generateUid } from "../../../Tools/uidGenerator";
import { useWindowSize } from "../../../Hooks";
import { EditorTopBar } from "../../../DashView/Component/EditorTopBar/EditorTopBar";
import { getImg } from "../../../Tools/StringFormater";
import { Local } from "../../../Config";
export function PageNewStore() {
    const [id] = useState(generateUid());
    const { current, setAbsPath, navBack, json, pathList } = useWebRoute();
    const { createStore, deleteStore, editStore, selectedStore, openChild, setStoreById, owner, exist } = useWebStore();

    const [collected, setCollected] = useState<Record<string, any>>(selectedStore || {});
    const [fileLogo, setFileLogo] = useState<{ file?: File, url: string } | null>(selectedStore ? { url: (current('edit_store') || '') && `${selectedStore.logo[0]}` } : null)
    const [fileBanner, setFileBanner] = useState<{ file?: File, url: string } | null>(selectedStore ? { url: (current('edit_store') || '') && `${selectedStore.banners?.[0]}` } : null)

    const size = useWindowSize();
    const wrap = size.width < 1050 ? 'wrap' : ''
    const [enable, setEnable] = useState('')
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {//TODO tres gros probleme le useEffeect est appele avant le changement de page;
            if (selectedStore && current('edit_store')) {
                setCollected(selectedStore);
                setFileBanner({ url: `${selectedStore.banners[0]}` });
                setFileLogo({ url: `${selectedStore.logo?.[0]}` });
            }
        });
        if (!selectedStore) {
            setCollected({})
            setFileLogo(null)
            setFileBanner(null)
        }
    }, [selectedStore]);
    useEffect(() => {
        owner && json?.store_id && setStoreById(json.store_id)
    }, [json, owner])
    useEffect(() => {
        setEnable('')
    }, [pathList]);
    const edit = current('edit_store');
    const canEnd = fileBanner?.url && fileLogo?.url && collected.name;
    const s = selectedStore;
    return (edit && (!selectedStore)) ? (
        <div className="store-select-btn" onClick={() => { setAbsPath(['store_list']) }}>
            Select Store Before Edition
        </div>
    ) : (current('new_store', 'edit_store')) && (
        <div className="page-new-store">
            {selectedStore && <div className="editor-top">
                <div className="nav-back" onClick={() => navBack()}></div>
                <EditorTopBar terme="dark" deteleKey={selectedStore.id} mode={'delete'} onDelete={() => {
                    deleteStore(selectedStore.id).then((res => {
                        if (res) {
                            setAbsPath(['store_list'])
                        }
                    }))
                }} onCreate={() => { }} title="Store Information" />
                <div className="open-opt">
                    <div className="btn-dash btn demo no-selectable" onClick={() => {
                        localStorage.setItem('store', JSON.stringify(selectedStore));
                        window.open(
                            `${Local}/demo/${selectedStore.name}`
                        );
                    }}>
                        Open Demo Store
                    </div>
                    <div className="btn-dash btn no-selectable" onClick={() => {
                        localStorage.setItem('store', JSON.stringify(selectedStore));
                        window.open(
                            `${Local}/${selectedStore?.name}/dash`,
                        );
                    }}>
                        Open Dashboard
                    </div>
                </div>
            </div>
            }
            <div className={"center-content " + wrap}>
                <div className="center-left">
                    <div className={"store " + (selectedStore ? 'anim' : 'void')}>
                        <div className={"banner " + (fileBanner?.url ? '' : 'void')} style={fileBanner?.url ? { background: getImg(fileBanner?.url || '') } : {}}>
                            <div className="img-options">
                                {fileBanner?.url && <div className="open" onClick={() => {
                                    openChild(
                                        <div className="big-img" onClick={() => openChild(undefined, false)}>
                                            <div className="img" style={{
                                                background: getImg(fileBanner?.url || '')
                                            }} ></div>
                                        </div>, true, '#3455'
                                    )
                                }}></div>}
                                <input type="file" accept="image/*" id={id + 'banner'} style={{ display: 'none' }} onChange={(e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (file) {
                                        setFileBanner({ file, url: URL.createObjectURL(file) })
                                    }
                                }} />
                                <label htmlFor={id + 'banner'} className="edit"></label>
                            </div>
                            <div className="more">
                                <div className={"logo " + (fileLogo?.url ? '' : 'void')} style={fileLogo?.url ? { background: getImg(fileLogo?.url || '') } : {}} onClick={(e) => {
                                    if (e.currentTarget != e.target) return
                                    fileLogo?.url && openChild(
                                        <div className="big-img" onClick={() => openChild(undefined, false)}>
                                            <div className="img" style={{
                                                background: getImg(fileLogo?.url || '')
                                            }} ></div>
                                        </div>, true, '#3455'
                                    )
                                }}>
                                    <input type="file" accept="image/*" id={id + 'logo'} style={{ display: 'none' }} onChange={(e) => {
                                        const file = e.currentTarget.files?.[0];
                                        if (file) {
                                            setFileLogo({ file, url: URL.createObjectURL(file) })
                                        }
                                    }} />
                                    <label htmlFor={id + 'logo'} className="edit"></label>
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
                                        <div className="value">{selectedStore ? 42 : 0}</div>
                                        <div className="icon"></div>
                                    </div>
                                    <div className="clients">
                                        <div className="value">{selectedStore ? 205 : 0}</div>
                                        <div className="icon"></div>
                                    </div>
                                    <div className="collaborators">
                                        <div className="value">{selectedStore ? 9 : 0}</div>
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
                                selectedStore && (
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
                                )}
                        </div>
                    </div>
                </div>
                <div className="center-right">
                    <div className="imgs">
                        <label className={fileBanner?.url?'available':'no-available'} htmlFor={id + 'banner'} >Banner <span></span></label>
                        <label className={fileLogo?.url?'available':'no-available'} htmlFor={id + 'logo'} >Logo <span></span></label>
                    </div>
                    {
                        edit && <div className="id">
                            <label htmlFor={id + 'id'} style={{ color: '#fff9' }} >Id</label>
                            <input type="text" id={id + 'id'} value={collected.id || ''} style={{ color: '#fff9', borderColor: '#fff9' }} placeholder="Name" />
                        </div>
                    }
                    <div className="name">
                        <div className="top">
                            <label htmlFor={id + 'name'} >Store Name</label>
                            <div className="available" style={{ display: enable == 'yes' ? 'flex' : 'none' }}>
                                <span></span> available
                            </div>
                            <div className="not-available" style={{ display: enable == 'no' ? 'flex' : 'none' }}>
                                <span></span> not available
                            </div>
                        </div>
                        <input type="text" id={id + 'name'} value={collected.name || ''} placeholder="Name" onChange={(e) => {
                            const name = e.currentTarget.value
                            if (name.trim().length < 3) setEnable('no')
                            else exist(name)?.then((deja_pris) => {
                                setEnable(deja_pris ? 'no' : 'yes')
                                console.log(name, enable, deja_pris, deja_pris ? 'no' : 'yes');
                            })

                            setCollected({
                                ...collected,
                                ['name']: name
                            })
                        }} />
                    </div>
                    <div className="phone">
                        <div className="top">
                            <label htmlFor={id + 'phone'}>Phone</label>
                            <div className="optional">(optional)</div>
                        </div>
                        <input type="text" id={id + 'phone'} value={collected.phone || ''} placeholder="Phone" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['phone']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="store_email">
                        <div className="top">
                            <label htmlFor={id + 'store_email'}>Store Email</label>
                            <div className="optional">(optional)</div>
                        </div>
                        <input type="email" id={id + 'store_email'} value={collected.store_email || ''} placeholder="Store email" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['store_email']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="website">
                        <div className="top">
                            <label htmlFor={id + 'website'}>Web Site</label>
                            <div className="optional">(optional)</div>
                        </div>
                        <input type="text" id={id + 'website'} value={collected.website || ''} placeholder="Web Site" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['website']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="desciption">
                        <div className="top">
                            <label htmlFor={id + 'desciption'}>Description</label>
                            <div className="optional">(optional)</div>
                        </div>
                        <input type="text" id={id + 'description'} value={collected.description || ''} placeholder="Description" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['description']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="address">
                        <div className="top">
                            <label htmlFor={id + 'address'}>Address</label>
                            <div className="optional">(optional)</div>
                        </div>
                        <input type="text" id={id + 'address'} value={collected.address} placeholder="Address" onChange={(e) => {
                            setCollected({
                                ...collected,
                                ['address']: e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="btm">
                        <div className="btn no-selectable" style={{background:canEnd?'':'#345'}} onClick={() => {
                            if(!canEnd || loading) return;
                            setLoading(true)
                            edit ? (selectedStore && editStore({
                                ...collected,
                                banners: fileBanner,
                                logo: fileLogo,
                                store_id: selectedStore?.id
                            }).then((res) => {
                                setLoading(false)
                                res && setAbsPath(['store_list']);
                            })) : createStore({
                                ...collected,
                                banners: fileBanner,
                                logo: fileLogo
                            }).then((res) => {
                              setTimeout(() => {
                                setLoading(false)
                              }, 100);
                                if (!res?.id) {
                                    // openChild(<div style={{ color: "#345" }}>
                                    //     {
                                    //         (res as any)?.stack || JSON.stringify(res || '{}')
                                    //     }
                                    // </div>, true, '#fff')
                                } else {
                                    res && setAbsPath(['store_list']);
                                }
                                return;
                            })
                        }}>
                            {
                                loading ? <div className="loading"></div> : `${edit ? 'Edit' : 'Create'} Store`
                            }
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}