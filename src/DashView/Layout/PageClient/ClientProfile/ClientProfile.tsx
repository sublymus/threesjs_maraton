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
export function ClientProfile() {

    const { current, setAbsPath, } = useDashRoute();
    const { clients, selectedClient , setSelectedClient ,clientCommands , clientVisites } = useClientStore();

    const [btmList, setBtmList] = useState('commands');

    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(() => {
        // if (selectedCategory)
        //     fetchCategoryProducts({
        //         category_id: selectedCategory.id
        //     });
    }, []);


    return current('client_profile') && (!selectedClient ? (
        <div className="not-found">
            <div className="img"></div>
        </div>
    ) : (
        <div className="client-profile">
            <h1>Client Information</h1>
            <section className={"editor " + wrap}>
                <div className="left-right">
                    <ImageViewer name='client_profile' images={selectedClient.photos || []} cannotEdit />
                </div>
                <div className="left-side">
                    <InputText isCheckRequired={isCheckRequired} label='Product Id' value={(selectedClient?.id || '')} />
                    <InputText prompt='Client Name' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Name' placeholder='Catalog Label' value={selectedClient?.name} />
                    <InputText prompt='Client Email' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Email' placeholder='Catalog Label' value={selectedClient?.email} />
                </div>
            </section>
            <>
            <div className="btm-list">

                <h1 >Products That Use This Catalog</h1>
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

                <h2 className='see-all' onClick={() => {
                    btmList == 'visites' ?
                    setAbsPath(['store', 'products']):
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
                            title: GenericList.StringElement({ size_interval: [50, 200] }),
                            stock: GenericList.StringElement(),
                            category_id: {
                                getView(_, value, e, setRef) {
                                    return (
                                        <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                    )
                                }
                            },
                            price: GenericList.StringElement({ size: 200 }),
                            status: StatusElement,
                            created_at: GenericList.DateStringElement({ size: 200 }),
                        }}
                        onItemsSelected={(item) => {
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
                            id: {
                                getView(_, value: string, e, setRef) {
                                    return (
                                        <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                    )
                                }
                            },
                            label: GenericList.StringElement({ size_interval: [50, 200] }),
                            total_products: {
                                getView(label, value, e, setRef) {
                                    const mapper = GenericList.StringElement();
                                    return mapper.getView(label, value || 0, e, setRef);
                                },
                            },
                            catalog_id: {
                                getView(_, value, e, setRef) {
                                    return (
                                        <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                    )
                                }
                            },
                            status: StatusElement,
                            created_at: GenericList.DateStringElement({ size: 500 }),
                        }}
                        onItemsSelected={(item) => {
                            // setSelectedCategory(item[0] as any);
                            setAbsPath(['store', 'products', 'dash_product']);
                        }}
                    >

                    </GenericList>
                }
            </>

        </div>
    ))
}