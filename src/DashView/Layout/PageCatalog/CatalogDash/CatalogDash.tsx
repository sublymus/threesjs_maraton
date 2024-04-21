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

export function CatalogDash() {
    const { current, setAbsPath } = useDashRoute();
    const { selectedCatalog, updateCatalog, catalogProducts, fetchCatalogProducts, createCatalog } = useCatalogStore();
    const { setSelectedProduct } = useProductStore();
    const [collected] = useState<Record<string, any>>({});

    const [isCheckRequired, setIsCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    useEffect(() => {
        if (selectedCatalog)
            fetchCatalogProducts({
                catalog_id: selectedCatalog.id
            });
    }, [selectedCatalog])

    const isDash = current('dash_catalogs');
    const isNew = current('new_catalog');

    const choiser = <FileLoader ext={['zip']} label='Upload Scene File' onChange={(file) => {
        isDash ? (selectedCatalog && updateCatalog({
            catalog_id: selectedCatalog.id,
            scene_dir: file
        })) : collected['scene_dir'] = file;
    }} />
    return (isDash || isNew) && (
        (!selectedCatalog) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
            <div className="catalog-dash" ref={bindToParentScroll}>
                <div className="catalog-dash-top">
                    <h1>Catalog Information</h1>
                    <div className="create" onClick={() => {
                        console.log('send', collected);

                        createCatalog(collected).then((error) => {
                            if (!error) return setAbsPath(['store', 'catalogs', 'dash_catalogs']);
                            //  if (error.length) setError(error?.toString())
                        })
                    }}>
                        <div className="icon"></div>
                        <div className="label">Create New</div>
                    </div>
                </div>
                <section className={"editor " + wrap}>
                    <div className="left-side">
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
                            isNew && choiser
                        }
                    </div>

                </section>
                {
                    isDash && <>
                        <h1 className=''>Products That Use This Category</h1>
                        <GenericList filter={{
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
                                status: GenericList.StringElement({ size: 150 }),
                                stock: GenericList.StringElement(),
                                category_id: {
                                    getView(_, value, e, setRef) {
                                        return (
                                            <div ref={setRef} key={e.id}>#{value.split('-')[0]}</div>
                                        )
                                    }
                                },
                                price: GenericList.StringElement({ size: 200 }),
                                created_at: GenericList.DateStringElement({ size: 200 }),
                            }}
                            onItemsSelected={(item) => {
                                setSelectedProduct(item[0] as any);
                                setAbsPath(['store', 'products', 'dash_product']);
                            }}
                        >

                        </GenericList></>
                }
            </div>
        )
    )
}