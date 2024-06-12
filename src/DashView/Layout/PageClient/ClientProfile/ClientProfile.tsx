import './ClientProfile.css'
import { useDashRoute } from '../../../dashStore'
import { useClientStore } from '../ClientStore';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../../Hooks';
import { InputText } from '../../../Component/Form/Input';
import { ImageViewer } from '../../../Component/ImageViewer/ImageViewer';
import { GenericList } from '../../../Component/GenericList/GenericList';
import { Host } from '../../../../Config';
import { StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
import { OpenChat } from "../../../Component/OpenChat/OpenChat";
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
export function ClientProfile() {

    const { current, setAbsPath, json , qs} = useDashRoute();
    const { selectedClient, setClientById, clientCommands, fetchClientVisites,fetchClientCommands, clientVisites } = useClientStore();
    const [btmList, setBtmList] = useState('commands');

    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(() => {
        if (json?.client_id) {
            setClientById(json?.client_id)
        }
    }, [json])
    useEffect(() => {
        selectedClient && fetchClientCommands({limit:5, user_id:selectedClient.id})
        selectedClient && fetchClientVisites({limit:5, client_id:selectedClient.id})
    }, [selectedClient])

    return current('client_profile') && (!selectedClient ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="client-profile" ref={bindToParentScroll}>
            <h1>Client Information</h1>
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <ImageViewer name='client_profile' images={selectedClient.photos || []} cannotEdit />
                </div>
                <div className="left-side">
                    <InputText isCheckRequired={isCheckRequired} label='Client Id' value={(selectedClient?.id || '')} />
                    <InputText prompt='Client Name' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Name' placeholder='Catalog Label' value={selectedClient?.name} />
                    <InputText prompt='Client Email' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Email' placeholder='Catalog Label' value={selectedClient?.email} />
                    <InputText label='created At' value={selectedClient?.created_at} />
                    <InputText label='Join Store At' value={selectedClient?.join_at} />
                    <OpenChat user={selectedClient} channel='sessions' />
                </div>
            </section>
            <>
                <div className="btm-list">

                    <h1 >Products That Use This Catalog</h1>
                    <div style={{display:'flex'}}>
                    <div className={"btn " + (btmList == 'commands' ? 'active' : '')} onClick={() => {
                        setBtmList('commands');
                    }}>
                        <div className="icon"></div>
                        <div className="label">Commands</div>
                    </div>
                    <div className={"btn " + (btmList == 'visites' ? 'active' : '')} onClick={() => {
                        setBtmList('visites');
                    }}>
                        <div className="icon"></div>
                        <div className="label">Visites</div>
                    </div>
                    </div>

                    <h2 className='see-all' onClick={() => {
                        btmList == 'visites' ?
                            setAbsPath(['products']) :
                            setAbsPath(['command'])
                    }}>SEE ALL</h2>
                </div>
                {
                    btmList == 'commands' && <GenericList
                        disableFilterBar
                        items_height={80}
                        id={'product-use-catalog_list'}
                        datas={clientCommands?.list || []}
                        itemsMapper={{
                            images: {
                                getView(label, value, e, setRef) {
                                    return (
                                        GenericList.ImageElement().getView(label, `${Host}${value[0]}`, e, setRef)
                                    )
                                }
                            },
                            id: {
                                getView(_, value: string, e, setRef) {
                                    return (
                                        <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                    )
                                }
                            },
                            // title: GenericList.StringElement({ size_interval: [50, 200] }),
                            stock: GenericList.StringElement(),
                            // category_id: {
                            //     getView(_, value, e, setRef) {
                            //         return (
                            //             <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                            //         )
                            //     }
                            // },
                            price: GenericList.StringElement({ size: 200 }),
                            status: StatusElement,
                            created_at: GenericList.DateStringElement({ size: 200 }),
                        }}
                        onItemsSelected={() => {
                            // s(item[0] as any);
                            // setAbsPath(['command']);
                        }}
                    >

                    </GenericList>
                }{
                    btmList == 'visites' && <GenericList
                        disableFilterBar
                        items_height={80}
                        id={'product-use-catalog_list'}
                        datas={clientVisites?.list || []}
                        itemsMapper={{
                            images: {
                                getView(label, value, e, setRef) {
                                    return (
                                        GenericList.ImageElement().getView(label, `${Host}${value[0]}`, e, setRef)
                                    )
                                }
                            },
                            id: {
                                getView(_, value: string, e, setRef) {
                                    return (
                                        <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                    )
                                }
                            },
                            title: GenericList.StringElement({ size: 200 }),
                            visited_at: GenericList.DateStringElement({ size: 200 }),
                        }}
                        onItemsSelected={(item) => {
                            qs({product_id:item[0].id}).setAbsPath(['products', 'dash_product']);
                        }}
                    >

                    </GenericList>
                }
            </>

        </div>
    ))
}
