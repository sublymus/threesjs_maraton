import "./PageNewStore.css";
import { useWebRoute, useWebStore } from '../../WebStore'
import { Host, Local } from "../../../Config";
import { useEffect, useState } from "react";
import { generateUid } from "../../../Tools/uidGenerator";
import { useWindowSize } from "../../../Hooks";
import { EditorTopBar } from "../../../DashView/Component/EditorTopBar/EditorTopBar";

export function PageNewStore() {
    const [id] = useState(generateUid());
    const { current, setAbsPath } = useWebRoute();
    const { owner, createStore, deleteStore, editStore, selectedStore } = useWebStore();

    const [collected, setCollected] = useState<Record<string, any>>(selectedStore || {});
    const [file, setFile] = useState<{ file?: File, url: string } | null>(selectedStore ? { url: `${Host}${selectedStore.banners[0]}` } : null)

    const size = useWindowSize();
    const wrap = size.width < 1050 ? 'wrap' : ''
    useEffect(() => {
        setTimeout(() => {//TODO tres gros probleme le useEffeect est appele avant le changement de page;
            if (selectedStore && current('edit_store')) {
                console.log('new File');
                setCollected(selectedStore);
                setFile({ url: `${Host}${selectedStore.banners[0]}` });
            }
        });
    }, [selectedStore]);

    const fileName = file?.file?.name || file?.url;
    const edit = current('edit_store');
    return (edit && (!selectedStore)) ? (
        <div className="store-select-btn" onClick={() => { setAbsPath(['store_list']) }}>
            Select Store Before Edition
        </div>
    ) : (current('new_store', 'edit_store')) && (
        <div className="page-new-store">
            {selectedStore && <EditorTopBar terme="dark" deteleKey={selectedStore.id} mode={'delete'} onDelete={() => {
                deleteStore(selectedStore.id).then((res => {
                    if (res) {
                        setAbsPath(['store_list'])
                    }
                }))
            }} onCreate={() => { }} title="Store Information" />}
            <div className={"center-content " + wrap}>
                <div className="center-left">
                    <input type="file" id={id} style={{ display: 'none' }} onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) {
                            setFile({ file, url: URL.createObjectURL(file) })
                        }
                    }} />
                    <label htmlFor={id} className="choose-img"><span className="btn">{file ? 'Replace Banner' : 'Choose Banner'}</span> <span>{fileName ? (fileName.length > 35 ? fileName.substring(0, 35) + '...' : fileName) : ''}</span></label>
                    <div className={"banner " + (file ? '' : 'nothing')} onDrop={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                            setFile({ file, url: URL.createObjectURL(file) })
                        }
                    }} style={{ background: `no-repeat center/cover url(${file?.url})` }}>
                        {!file && <label htmlFor={id} className="img"></label>}
                    </div>
                </div>
                <div className="center-right">
                    {/* <div className="user-name"><span>Owner : </span> <span className="name">{owner?.name}</span></div> */}
                    {
                        edit && <div className="id">
                            <label htmlFor={id + 'id'} style={{ color: '#fff9' }} >Id</label>
                            <input type="text" id={id + 'id'} value={collected.id || ''} style={{ color: '#fff9', borderColor: '#fff9' }} placeholder="Name" />
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
                        <input type="text" id={id + 'address'} value={''} placeholder="Address" onChange={(e) => {
                            setCollected({
                                ...collected,
                                // ['address_id'] : e.currentTarget.value
                            })
                        }} />
                    </div>
                    <div className="btm">
                        <div className="btn" onClick={() => {
                            edit ? (selectedStore && editStore({
                                ...collected,
                                file: file,
                                store_id: selectedStore?.id
                            }).then((res) => {
                                res && setAbsPath(['store_list']);
                            })) : createStore({
                                ...collected,
                                banners: file
                            }).then((res) => {
                                res && setAbsPath(['store_list']);
                            })
                        }}>
                            {edit ? 'Edit' : 'Create'} Store
                        </div>
                        {
                            edit && <div className="btn open" onClick={() => {
                                localStorage.setItem('store',JSON.stringify(selectedStore));
                                window.open(
                                    `${Local}/${selectedStore?.name}/dash`,
                                    "mozillaWindow",
                                );
                            }}>
                                Open Store
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className="bottom-bar">

            </div>
        </div>
    )
}