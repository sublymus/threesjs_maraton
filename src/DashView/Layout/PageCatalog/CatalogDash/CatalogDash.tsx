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
import { StatisticCard } from '../../../Component/Chart/StatisticCard/StatisticCard';
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard';
import { Preview3DModelCard } from '../../../Component/Chart/Preview3DModelCard/Preview3DModelCard';

export function CatalogDash() {
    const { current } = useDashRoute();
    const { selectedCatalog, fetchProductsUseCatalog, productsUseCatalog } = useCatalogStore();
    const [collected, setCollected] = useState<Record<string, any>>({});

     
     
    const [isCheckRequired, setIsCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    collected.prduct_id = selectedCatalog?.id;

    useEffect(() => {
        if (selectedCatalog)
            fetchProductsUseCatalog(selectedCatalog.id)
    }, [selectedCatalog])
console.log(selectedCatalog);

    return current('dash_catalogs') && (
        <div className="catalog-dash">
            <div className="catalog-dash-top">
                <h1>Catalog Information</h1>
                <div className="save">
                    <div className="icon"></div>
                    <div className="label">SAVE</div>
                </div>
            </div>
            <section className={"editor " + wrap}>
                <div className="left-side">
                    <div className="editor-name">
                        <div className="catalog-title">
                            <InputText editable prompt='Catalog Label' isCheckRequired={isCheckRequired} min={3} check='auto' max={50} label='Label' placeholder='Catalog Label' value={selectedCatalog?.label || ' '} onChange={(value) => {
                                collected['label'] = value;
                                console.log(collected);

                            }} />
                        </div>
                        <div className="Catalog-description">
                            <Textarea editable prompt='Catalog Description' isCheckRequired={isCheckRequired} min={3} check='auto' max={250} label='Description' placeholder='Catalog Description' value={selectedCatalog?.description || 'lol'} onChange={(value) => {
                                collected['description'] = value;
                                console.log(collected);
                            }} />
                        </div>
                    </div>

                    <div className="editor-scene-file">
                        <FileLoader ext={['zip']} label='Upload Scene File' onChange={(file) => {
                            collected['scene_dir'] = file;
                            console.log(collected);
                        }} />
                    </div>
                </div>
                <div className="right-side">
                    <ActionsCard />
                    <Preview3DModelCard direction='horizontal'/>
                </div>

            </section>
            <h1 className=''>Products That Use This Category</h1>
            <GenericList filter={{
                sortBy: 'id',
                limit: productsUseCatalog?.limit||25,
                page: productsUseCatalog?.page,
                total: productsUseCatalog?.total,
            }}
                disableFilterBar
                items_height={80}
                id={'product-use-catalog_list'}
                datas={productsUseCatalog?.list || []}
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
            >

            </GenericList>
        </div>
    )
}