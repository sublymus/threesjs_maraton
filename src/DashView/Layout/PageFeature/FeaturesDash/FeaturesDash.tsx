import { useDashRoute } from '../../../dashStore'
import './FeaturesDash.css'
import { useEffect, useState } from 'react';
import { InputText } from '../../../Component/Form/Input';
import { useWindowSize } from '../../../../Hooks';
import { Choiser } from "../../../Component/Choiser/Choiser";
import { GenericList } from '../../../Component/GenericList/GenericList';
import { Host } from '../../../../Config';
import { ActionsCard } from '../../../Component/Chart/ActionsCard/ActionsCard';
import { useFeatureStore } from '../FeatureStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
import { getImg, limit } from '../../../../Tools/StringFormater';
import { useRegisterStore } from '../../PageAuth/RegisterStore';


export function FeaturesDash() {
    const { current, setAbsPath, json } = useDashRoute();
    const { user } = useRegisterStore();
    const { selectedFeature, createFeature, fetchProductsUseFeature, productsUseFeature, setSelectedFeature, removeFeature, setFeatureById } = useFeatureStore();
    const [collected] = useState<Record<string, any>>({});
    const isNew = current('new_feature');
    const isDash = current('dash_features');
    const [featureIcon] = useState<{ url?: string, file?: File }>({ url: selectedFeature?.icon?.[0] })

    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    collected.prduct_id = selectedFeature?.id;

    useEffect(() => {
        if (selectedFeature)
            fetchProductsUseFeature(selectedFeature.id)
    }, [selectedFeature])
    useEffect(() => {
        isDash && json?.feature_id && user && setFeatureById(json.feature_id)
    }, [user, json])

    return (isDash || isNew) && (
        (!selectedFeature && isDash) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
            <div className="dash-feature" ref={bindToParentScroll}>

                <EditorTopBar deteleKey={selectedFeature?.id || 'noga'} mode={isNew ? 'create' : 'delete'} title='Product Information' onCreate={() => {
                    createFeature(collected).then((error) => {
                        if (!error) return setAbsPath(['products', 'dash_product']);
                        // if (error.length) setError(error?.toString())
                    })
                }} onDelete={() => {
                    selectedFeature && removeFeature(selectedFeature.id).then((res) => {
                        if (res) {
                            setSelectedFeature(undefined)
                        }
                    })
                }} />
                <section className={"editor " + wrap}>
                    <div className="left-side">
                        {
                            isDash && <InputText label='Feature Id' value={(selectedFeature?.id || '')} />
                        }

                        <InputText editable label='Name' value={(selectedFeature?.name || '')} />
                        <label htmlFor='choise_feature_icon' className="choise_icon">
                            <div className="ctn">
                                <input type="file" name="choise_feature_icon" id="choise_feature_icon" onChange={(_e) => {

                                }} />
                                <div className="icon" style={{ background: getImg(selectedFeature?.icon[0] || '') }}></div>
                                <div className="text">
                                    <span className="title">{selectedFeature?.icon ? 'Change' : 'Choise'} Icon</span>
                                    <span className="url">{limit(featureIcon.url || '', 20)}</span>
                                </div>
                            </div>
                        </label>
                        <InputText editable label='Collected type' value={(selectedFeature?.collect_type || '')} />
                        <Choiser canEdit list={['Required']} onChange={(required) => {
                            console.log(required);

                        }} />
                        <InputText editable label='Placeholder' value={(selectedFeature?.placeholder || '')} />
                        <InputText editable label='Default' value={('TODO DEFAULT')} />
                        <Choiser canEdit select={selectedFeature?.capitalize ? 'Capitalize' : selectedFeature?.lowercase ? 'Lowercase' : selectedFeature?.uppercase ? 'Uppercase' : ''} list={['Capitalise', 'Uppercase', 'LowerCase']} onChange={(format) => {
                            console.log(format);
                        }} />
                        <InputText editable label='Macth RegExp' value={(selectedFeature?.match || '')} />
                        <InputText editable label='Min Length' type='number' value={(selectedFeature?.min_length || '')} />
                        <InputText editable label='Max Length' type='number' value={(selectedFeature?.max_length || '')} />
                        <InputText editable label='Min Value' type='number' value={(selectedFeature?.min || '')} />
                        <InputText editable label='Max Value' type='number' value={(selectedFeature?.max || '')} />
                        <InputText editable label='Max File Size' type='number' value={(selectedFeature?.max_size || '')} />
                        <InputText editable label='Files Type' value={(selectedFeature?.ext || '')} />
                        <InputText editable label='Enumeration of possible values' value={(selectedFeature?.id || '')} />
                        <div className="editor-name">

                        </div>
                    </div>
                    <div className="right-side">
                        <ActionsCard />

                    </div>

                </section>
                <h1 className=''>Feature's Products</h1>
                <GenericList filter={{
                    sortBy: 'id',
                    limit: productsUseFeature?.limit || 25,
                    page: productsUseFeature?.page,
                    total: productsUseFeature?.total,
                }}
                    disableFilterBar
                    items_height={80}
                    id={'product-use-Feature_list'}
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