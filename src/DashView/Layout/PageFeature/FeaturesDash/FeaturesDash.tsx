import { useDashRoute } from '../../../dashStore'
import './FeaturesDash.css'
import { useEffect, useState } from 'react';
import { InputText } from '../../../Component/Form/Input';
import { useWindowSize } from '../../../../Hooks';
import { Textarea } from '../../../Component/Form/Textarea';
import { FileLoader } from '../../../Component/LoaderImage/LoaderImage';
import { GenericList } from '../../../Component/GenericList/GenericList';
import { Host } from '../../../../Config';
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard';
import { Preview3DModelCard } from '../../../Component/Chart/Preview3DModelCard/Preview3DModelCard';
import { ChoiseCatalog } from '../../../Component/ChoiseCatalog/ChoiseCatalog';
import { useFeatureStore } from '../FeatureStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';


export function FeaturesDash() {
    const { current } = useDashRoute();
    const { selectedFeature, fetchProductsUseFeature, productsUseFeature } = useFeatureStore();
    const [collected, setCollected] = useState<Record<string, any>>({});
    const [isCheckRequired, setIsCheckRequired] = useState(false);
    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    collected.prduct_id = selectedFeature?.id;

    useEffect(() => {
        if (selectedFeature)
            fetchProductsUseFeature(selectedFeature.id)
    }, [selectedFeature])
    console.log(selectedFeature);

    const isNew = current('new_feature');
    const isDash = current('dash_features');
    return (isDash || isNew) && (
        (!selectedFeature) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
            <div className="dash-feature" ref={bindToParentScroll}>
                <div className="feature-dash-top">
                    <h1>Catalog Information</h1>
                    <div className="save">
                        <div className="icon"></div>
                        <div className="label">SAVE</div>
                    </div>
                </div>
                <section className={"editor " + wrap}>
                    <div className="left-side">
                        <div className="editor-name">

                        </div>

                        <div className="editor-scene-file">
                            <FileLoader ext={['zip']} label='Upload Scene File' onChange={(file) => {
                                collected['scene_dir'] = file;
                            }} />
                        </div>
                    </div>
                    <div className="right-side">
                        <ActionsCard />
                        <Preview3DModelCard onClick={() => {

                        }} direction='horizontal' />
                    </div>

                </section>
                <h1 className=''>Products That Use This Category</h1>
                <GenericList filter={{
                    sortBy: 'id',
                    limit: productsUseFeature?.limit || 25,
                    page: productsUseFeature?.page,
                    total: productsUseFeature?.total,
                }}
                    disableFilterBar
                    items_height={80}
                    id={'product-use-catalog_list'}
                    datas={productsUseFeature?.list || []}
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
                    }}>
                </GenericList>
            </div>
        )
    )
}