import { useDashRoute, useDashStore } from '../../../dashStore'
import './FeaturesDash.css'
import { useEffect, useState } from 'react';
import { InputText } from '../../../Component/Form/Input';
import { useWindowSize } from '../../../../Hooks';
import { useFeatureStore } from './FeatureStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
import { getImg, limit } from '../../../../Tools/StringFormater';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
import { toFilter } from '../../../../Tools/FilterColor';
import { Feature } from '../../../../DataBase';
import "./Views.css";
import { useProductStore } from '../../PageProduct/ProductStore';
import { Components, FDate, Number, Phone, Text } from "../../../Component/FeatureViews/FeatureViews";

export function FeaturesDash() {
    const { current, json, pathList, navBack } = useDashRoute();
    const { selectedProduct } = useProductStore()
    const { user } = useRegisterStore();
    const { selectedFeature, createFeature, updateFeature, setSelectedFeature, removeFeature, setFeatureById, fetchFeatures } = useFeatureStore();
    const { openChild } = useDashStore()

    const [openChoises, setOpenChoises] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(
        'components' as
        'components' |
        'number' |
        'text' |
        'email' |
        'website' |
        'date' |
        'time' |
        'phone'
    );

    const isNew = current('new_feature');
    const isDash = current('dash_features');
    const [collected, setCollected] = useState<Partial<Feature> & Record<string, any>>(isDash ? selectedFeature || {} : {});

    useEffect(() => {
        if (selectedFeature) {
            setCollected(selectedFeature);
            setData(selectedFeature.view as any || 'components')
        }
    }, [selectedFeature])

    useEffect(() => {
        isNew && setCollected({})
        isDash && json?.feature_id && user && setFeatureById(json.feature_id)
    }, [user, json, pathList])

    const Views = {
        components: <Components openChild={openChild} canAdd setCollected={(list) => setCollected({ ...collected, components: list })} collected={collected} />,
        number: <Number collected={collected} />,
        text: <Text type='text' collected={collected} />,
        email: <Text type='email' collected={collected} />,
        website: <Text type='url' collected={collected} />,
        date: <FDate type={'date'} collected={collected} />,
        time: <FDate type={'time'} collected={collected} />,
        phone: <Phone collected={collected} />
    }


    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    collected.is_new = isNew;

    return (isDash || isNew) && (
        (!selectedFeature && isDash) ? (
            <div className="not-found">
                <div className="img"></div>
            </div>
        ) : (
            <div className="dash-feature" ref={bindToParentScroll}>

                <EditorTopBar deteleKey={selectedFeature?.id.trim() || 'noga'} mode={isNew ? 'create' : 'delete'} title='Product Information' onCreate={() => {
                    if (loading) return
                    setLoading(true)
                    createFeature({ ...collected, view: data, product_id: selectedFeature?.id || json?.product_id }).then((res) => {
                        setLoading(false)
                        if (res?.id) {
                            fetchFeatures()
                            setSelectedFeature(undefined)
                            setCollected({})
                            return navBack();
                        } else {
                            console.error('res', res);
                        }
                    })
                }} onDelete={() => {
                    if (loading) return
                    setLoading(true)
                    selectedFeature && removeFeature(selectedFeature.id).then((res) => {
                        setLoading(false)
                        if (res) {
                            // const id = selectedFeature.id
                            fetchFeatures().then(() => setFeatureById(selectedFeature.id))
                            setCollected({})
                            setSelectedFeature(undefined)
                            return navBack()
                        }
                    })
                }} />

                <section className={"editor " + wrap}>

                    <div className="right-side">
                        <h3>Preview Feature</h3>
                        <div className='feature-infos'>
                            <div className='edit-infos' >
                                <label className='s-icon' htmlFor="s-icon">
                                    <div className="label">{(collected.icon?.[0] || collected.new_icon) ? 'Change Image' : 'Add Image'}</div>
                                    <input accept='image/*' style={{ display: 'none' }} type="file" name="s-icon" id="s-icon" onChange={(e) => setCollected({ ...collected, new_icon: e.currentTarget.files?.[0] || collected.new_icon })} />
                                </label>
                                <label className='s-name' htmlFor="s-name">
                                    <div className="label">Name</div>
                                    <input id='s-name' value={collected.name || ''} type="text" placeholder='Feature Name' onChange={(e) => setCollected({ ...collected, name: e.currentTarget.value || '' })} />
                                </label>
                            </div>
                            <div className="feature" style={{ background: '#358f2733' }} onClick={() => {

                            }}>
                                <label htmlFor='s-icon' className="icon" style={{ background: collected.new_icon ? collected.new_icon && getImg(URL.createObjectURL(collected.new_icon)) : collected.icon?.[0] && getImg(collected.icon[0]) }}>
                                    {(!(collected.icon || collected.new_icon)) && '+ add Image'}
                                </label>
                                <label htmlFor='s-name' style={{ filter: /* impact */toFilter('#358f27')?.result.filter || '' }} className="label _limit-text">{collected.name ? limit(collected.name, 10) : '..'}</label>
                            </div>
                        </div>

                        <h3 className="setting">Setting</h3>
                        <div className="setting-ctn">
                            <div className="s-required" onClick={() => setCollected({ ...collected, required: collected.required ? undefined : 'true' })}>
                                <div className={"box " + (collected.required ? 'active' : '')}> <span style={{ filter: toFilter('#fff').result.filter }}></span></div>
                                Required
                            </div>
                            {(data != 'phone' && data != 'time') && <>
                                <label htmlFor="s-min">
                                    <div className="label">Min</div>
                                    <input id='s-min' value={collected.min || ''} min={data == 'components' ? 0 : (data == 'text' || data == 'email' || data == 'website') ? 0 : undefined} type={data == 'date' ? 'date' : "number"} placeholder={'Min ' + (data == 'components' ? 'Selected' : ((data == 'text' || data == 'email' || data == 'website')) ? 'Length' : 'value')} onChange={(e) => {
                                        console.log(e.currentTarget.value);
                                        //@ts-ignore
                                        setCollected({ ...collected, min: (data == 'date') ? new Date(e.currentTarget.value).getTime() : e.currentTarget.value || parseFloat(e.currentTarget.value) })
                                    }} />
                                </label>
                                <label htmlFor="s-max">
                                    <div className="label">Max</div>
                                    <input id='s-max' value={collected.max || ''} min={data == 'components' ? 0 : (data == 'text' || data == 'email' || data == 'website') ? 0 : undefined} type={data == 'date' ? 'date' : "number"} placeholder={'Max ' + (data == 'components' ? 'Selected' : ((data == 'text' || data == 'email' || data == 'website')) ? 'Length' : 'value')} onChange={(e) => {
                                        console.log(e.currentTarget.value);
                                        //@ts-ignore
                                        setCollected({ ...collected, max: (data == 'date') ? new Date(e.currentTarget.value).getTime() : e.currentTarget.value || parseFloat(e.currentTarget.value) })
                                    }} />
                                </label>
                            </>}
                            {
                                /* 
                                <label htmlFor="s-default-value">
                                    <div className="label">Default Value</div>
                                    <input id='s-default-value' type="text" placeholder='Default Value' onChange={(e) => setCollected({ ...collected, default_value: e.currentTarget.value as any })} />
                                </label> 
                                */
                            }
                            {(data == 'number' || data == 'text' || data == 'email' || data == 'website') && <label htmlFor="s-placeholder">
                                <div className="label">Placeholder</div>
                                <input id='s-placeholder' type="text" value={collected.placeholder || ''} placeholder='Placeholder' onChange={(e) => setCollected({ ...collected, placeholder: e.currentTarget.value })} />
                            </label>}
                            {(data == 'text' || data == 'email' || data == 'website') && <label htmlFor="s-match">
                                <div className="label">RegExp</div>
                                <input id='s-match' type="text" placeholder='RegExp' value={collected.match || ''} onChange={(e) => setCollected({ ...collected, match: e.currentTarget.value })} />
                            </label>}
                            {data == 'text' && <div className="s-cases">
                                <div className={"lowercase " + (collected.case == 'lowercase' ? 'active' : '')} onClick={() => setCollected({ ...collected, case: collected.case == 'lowercase' ? undefined : 'lowercase' })}></div>
                                <div className={"uppercase " + (collected.case == 'uppercase' ? 'active' : '')} onClick={() => setCollected({ ...collected, case: collected.case == 'uppercase' ? undefined : 'uppercase' })}></div>
                                <div className={"capitalize " + (collected.case == 'capitalize' ? 'active' : '')} onClick={() => setCollected({ ...collected, case: collected.case == 'capitalize' ? undefined : 'capitalize' })}></div>
                            </div>}
                        </div>
                    </div>
                    <div className="left-side">
                        {
                            isDash && <div className='feautre_id-update'>
                                <InputText label='Feature Id' value={(selectedFeature?.id)} />
                                <div className={'update ' + (loading ? 'loading' : '')} onClick={() => {
                                    if (loading) return
                                    setLoading(true)
                                    updateFeature(collected).then((feature) => {
                                        setLoading(false)
                                        if (feature?.id) {
                                            // setSelectedFeature(undefined)
                                            // setCollected({})
                                            // navBack();
                                        }
                                    });

                                }} ><span style={{ filter: toFilter('#0012ff').result.filter }}></span> {!loading && 'Update'}</div>
                            </div>
                        }
                        <label htmlFor="feature.product_id">
                            <h2 className="labele">Product Id</h2>
                            <input type="text" value={isNew ? selectedProduct?.id || json?.product_id : collected.product_id || ''} onChange={(e) => setCollected({ ...collected, product_id: e.currentTarget.value })} />
                        </label>
                        <h3>Choise Feature Type</h3>
                        <div className="choise-view">
                            <div className="choised" onClick={() => setOpenChoises(true)}>View : <span className='view'>{collected.view || data}</span> <span className='open'></span></div>
                            <div className={"datas " + (openChoises ? 'open' : '')} onClick={() => setOpenChoises(false)}>
                                {/* <div className="close" ></div> */}
                                <div className={"input-datas"}>
                                    <div className={"d-components " + (data == 'components' ? 'active' : '')} onClick={() => {
                                        setCollected({ ...collected, view: 'components', match: '' })
                                        setData('components')
                                    }}>Components</div>
                                    <div className={"d-number " + (data == 'number' ? 'active' : '')} onClick={() => {
                                        setCollected({ ...collected, view: 'number', match: '' })
                                        setData('number')
                                    }}>Number</div>
                                    <div className={"d-text " + (data == 'text' ? 'active' : '')} onClick={() => {
                                        setCollected({ ...collected, view: 'text', match: '' })
                                        setData('text')
                                    }}>Text</div>
                                    <div className={"d-email " + (data == 'email' ? 'active' : '')} onClick={() => {
                                        setData('email');
                                        setCollected({ ...collected, view: 'email', match: '^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' })
                                    }}>Email</div>
                                    <div className={"d-website " + (data == 'website' ? 'active' : '')} onClick={() => {
                                        setData('website');
                                        setCollected({ ...collected, view: 'website', match: '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})' })
                                    }}>Web Site</div>
                                    <div className={"d-date " + (data == 'date' ? 'active' : '')} onClick={() => {
                                        setCollected({ ...collected, view: 'date', match: '' })
                                        setData('date')
                                    }}>Date</div>
                                    <div className={"d-time " + (data == 'time' ? 'active' : '')} onClick={() => {
                                        setCollected({ ...collected, view: 'time', match: '' })
                                        setData('time')
                                    }}>Time</div>
                                    <div className={"d-phone " + (data == 'phone' ? 'active' : '')} onClick={() => {
                                        setCollected({ ...collected, view: 'phone', match: '' })
                                        setData('phone')
                                    }}>Phone</div>
                                </div>
                            </div>
                            <div className="ctn-view">
                                {
                                    Views[data]
                                }
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        )
    )
}
