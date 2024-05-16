import { useEffect, useState } from 'react';
import { InputText } from '../../../Component/Form/Input';
import { useDashRoute } from '../../../dashStore'
import './CatalogDash.css'
import { useCatalogStore } from '../CatalogStore';
import { useWindowSize } from '../../../../Hooks';
import { Textarea } from '../../../Component/Form/Textarea';
import { FileLoader } from '../../../Component/LoaderImage/LoaderImage';
import { GenericList } from '../../../Component/GenericList/GenericList';
import { Host } from '../../../../Config';
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard';
import { Preview3DModelCard } from '../../../Component/Chart/Preview3DModelCard/Preview3DModelCard';
import { useProductStore } from '../../PageProduct/ProductStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
import { useCategotyStore } from '../../PageCategory/CategoryStore';
import { ChoiseStatus, StatusElement } from '../../../Component/ChoiseStatus/ChoiseStatus';
import { useRegisterStore } from '../../PageAuth/RegisterStore';

export function CatalogDash() {
    const { json, current, setAbsPath } = useDashRoute();
    const {setCatalogById,  selectedCatalog, catalogCategories, fetchCatalogCategories, updateCatalog, catalogProducts, setSelectedCatalog, removeCatalog, fetchCatalogProducts, createCatalog } = useCatalogStore();
    const { setSelectedProduct } = useProductStore();
    const { setSelectedCategory } = useCategotyStore();
    const [collected] = useState<Record<string, any>>({});
    const {store} = useRegisterStore()
    const [btmList, setBtmList] = useState('products');
    const [isCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(() => {
        if (!selectedCatalog) return;
        fetchCatalogProducts({
            catalog_id: selectedCatalog.id
        });
        fetchCatalogCategories({
            catalog_id: selectedCatalog.id
        });
    }, [selectedCatalog])

    const isDash = current('dash_catalogs');
    const isNew = current('new_catalog');

    useEffect(()=>{
        if(json?.catalog_id){
            setCatalogById(json?.catalog_id)
        }
    },[json])

    const choiser = <>

        {isDash && <>
            <ChoiseStatus status={selectedCatalog?.status || 'PAUSE'} onChange={(value) => {
                isDash ? (selectedCatalog && updateCatalog({
                    catalog_id: selectedCatalog.id,
                    status: value
                })) : collected['status'] = value
            }} /> <FileLoader file_name={isDash ? selectedCatalog?.scene_dir : undefined} ext={['zip']} label='Upload Scene File' onChange={(file) => {
                isDash ? (selectedCatalog && updateCatalog({
                    catalog_id: selectedCatalog.id,
                    scene_dir: file
                })) : collected['scene_dir'] = file;
            }} />
        </>}
    </>
    console.log({ selectedCatalog });

    return (isDash || isNew) && (
        (!selectedCatalog && isDash) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
            <div className="catalog-dash" ref={bindToParentScroll}>
                <EditorTopBar terme='dark' deteleKey={selectedCatalog?.id || 'noga'} mode={isNew ? 'create' : 'delete'} title='Catalog Information' onCreate={() => {
                    createCatalog(collected).then((error) => {
                        if (!error) return setAbsPath(['catalogs', 'dash_catalogs']);
                        // if (error.length) setError(error?.toString())
                    })
                }} onDelete={() => {
                    selectedCatalog && removeCatalog(selectedCatalog.id).then((res) => {
                        if (res) {
                            setSelectedCatalog(undefined)
                        }
                    })
                }} />
                <section className={"editor " + wrap}>
                    <div className="left-side">

                        {
                            isDash && <InputText isCheckRequired={isCheckRequired} label='Product Id' value={(selectedCatalog?.id || '')} />
                        }
                        <div className="editor-name">
                            <div className="catalog-title">
                                <InputText editable prompt='Catalog Label' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Label' placeholder='Catalog Label' value={isDash && (selectedCatalog?.label || '')} onChange={(value) => {
                                    isDash ? (selectedCatalog && updateCatalog({
                                        catalog_id: selectedCatalog.id,
                                        label: value
                                    })) : collected['label'] = value;
                                }} />
                            </div>
                            <div className="Catalog-description">
                                <Textarea editable prompt='Catalog Description' isCheckRequired={isCheckRequired} min={3} check='auto' max={250} label='Description' placeholder='Catalog Description' value={isDash && (selectedCatalog?.description || '')} onChange={(value) => {
                                    isDash ? (selectedCatalog && updateCatalog({
                                        catalog_id: selectedCatalog.id,
                                        description: value
                                    })) : collected['description'] = value;
                                }} />
                            </div>
                        </div>
                        {isDash && choiser}
                    </div>
                    <div className="right-side">
                        {isDash && (<>
                            <ActionsCard />
                            <Preview3DModelCard onClick={() => {
                            }} direction='horizontal' />
                        </>)}
                        {
                            isNew  && <>
                            <InputText isCheckRequired={isCheckRequired} label='Store Name' value={(store?.name || '')}/>
                            <InputText isCheckRequired={isCheckRequired} label='Store Id' value={(store?.id || '')}/>
                            </>
                        }
                        
                    </div>

                </section>
                {
                    isDash && <>
                        <div className="btm-list">

                            <h1 >Products That Use This Catalog</h1>
                            <div className={"btn " + (btmList == 'products' ? 'active' : '')} onClick={() => {
                                setBtmList('products');
                            }}>
                                <div className="icon"></div>
                                <div className="label">Products</div>
                            </div>
                            <div className={"btn " + (btmList == 'categories' ? 'active' : '')} onClick={() => {
                                setBtmList('categories');
                            }}>
                                <div className="icon"></div>
                                <div className="label">Categories</div>
                            </div>

                            <h2 className='see-all' onClick={() => {
                                btmList == 'products' ?
                                    setAbsPath(['products']) :
                                    setAbsPath(['categories'])
                            }}>SEE ALL</h2>
                        </div>
                        {
                            btmList == 'products' && <GenericList filter={{
                                sortBy: 'id',
                                limit: catalogProducts?.limit || 25,
                                page: catalogProducts?.page,
                                total: catalogProducts?.total,
                            }}
                                disableFilterBar
                                items_height={80}
                                id={'product-use-catalog_list'}
                                datas={catalogProducts?.list || []}
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
                                    setSelectedProduct(item[0] as any);
                                    setAbsPath(['products', 'dash_product']);
                                }}
                            >

                            </GenericList>
                        }{
                            btmList == 'categories' && <GenericList
                                disableFilterBar
                                items_height={80}
                                id={'product-use-catalog_list'}
                                datas={catalogCategories?.list || []}
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
                                    console.log(item[0], '))))))))))))))');

                                    setSelectedCategory(item[0] as any);
                                    setAbsPath(['categories', 'dash_categories']);
                                }}
                            >

                            </GenericList>
                        }
                    </>
                }
            </div>
        )
    )
}