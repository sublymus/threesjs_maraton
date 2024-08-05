import { useDashRoute, useDashStore } from '../../../dashStore'
import './FeaturesDash.css'
import { useEffect, useState } from 'react';
import { InputText } from '../../../Component/Form/Input';
import { useWindowSize } from '../../../../Hooks';
import { useFeatureStore } from '../FeatureStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
import { EditorTopBar } from '../../../Component/EditorTopBar/EditorTopBar';
import { getImg, limit } from '../../../../Tools/StringFormater';
import { useRegisterStore } from '../../PageAuth/RegisterStore';
import { toFilter } from '../../../../Tools/FilterColor';
import { Component, Feature } from '../../../../DataBase';
import "./Views.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FileLoader } from "../../../Component/LoaderImage/LoaderImage";
import { useProductStore } from '../../PageProduct/ProductStore';


export function FeaturesDash() {
    const { current, json, pathList, navBack } = useDashRoute();
    const { selectedProduct } = useProductStore()
    const { user } = useRegisterStore();
    const { selectedFeature, createFeature, updateFeature, setSelectedFeature, removeFeature, setFeatureById, fetchFeatures } = useFeatureStore();


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

    const size = useWindowSize();
    const wrap = size.width < 1000 ? 'wrap' : '';

    collected.is_new = isNew;

    const Views = {
        components: <Components canAdd setCollected={(list) => setCollected({ ...collected, components: list })} collected={collected} />,
        number: <Number collected={collected} />,
        text: <Text type='text' collected={collected} />,
        email: <Text type='email' collected={collected} />,
        website: <Text type='url' collected={collected} />,
        date: <FDate type={'date'} collected={collected} />,
        time: <FDate type={'time'} collected={collected} />,
        phone: <Phone collected={collected} />
    }
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
                            {/* <label htmlFor="s-default-value">
                                <div className="label">Default Value</div>
                                <input id='s-default-value' type="text" placeholder='Default Value' onChange={(e) => setCollected({ ...collected, default_value: e.currentTarget.value as any })} />
                            </label> */}
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
                </section>
                <h1 className=''>Feature's Products</h1>
                {
                    <pre>
                        {JSON.stringify(collected, undefined, 4)}
                    </pre>
                }
            </div>
        )
    )
}

function FDate({ collected, type }: { type: string, collected: any }) {

    const [error, setError] = useState('');
    const [value, setValue] = useState(collected.default_value || '');
    return <label htmlFor="v-text">
        <div className="label">{collected.name || 'Input Date'} <span>{error}</span></div>
        <input id='v-text' type={type} placeholder={collected.placeholder} value={value || ''} onChange={(e) => {
            const v = e.currentTarget.value;
            if (collected.min != undefined && v.length < collected.min) {
                setError('Minimum Lenght is ' + collected.min);
            } else if (collected.max != undefined && v.length > collected.max) {
                setError('Maximum Lenght is ' + collected.max);
            } else {
                setError('')
            }
            setValue(v);
        }} />
    </label>

}
function Phone({ collected }: { collected: any }) {
    const [value, setValue] = useState(collected.default_value || '');
    return <PhoneInput
        country={'us'}
        value={value}
        onChange={phone => setValue(phone)}
    />
}


function Components({ collected, setCollected, canAdd }: { canAdd?: boolean, setCollected: (list: Component[]) => any, collected: any }) {

    const [error/* , setError */] = useState('');
    // const [id, setId] = useState(0);
    const { openChild } = useDashStore();
    useEffect(() => {
        // setCollected([])
    }, [collected])

    return <div className="components">
        <div className="comp-top">
            ( {collected.components?.length} ) Avalaible
            {
                canAdd && <div className="add-btn" onClick={() => {
                    openChild(<NewComponent onCreate={(component) => setCollected([component, ...(collected.components?.filter((c: any) => c.name != component.name) || [])])} />, false, '#3455', {
                        overlay: true
                    });
                }}><span></span>Add New</div>
            }
            <span>{error}</span>
        </div>

        <div className={"comp-list " + (canAdd ? 'can-add' : '')}>
            {
                collected.components?.map((c: Component) => (
                    <div key={c.name} className={"component _limit-text" + (c.images?.[0] ? ' icon' : 'not-icon')} onClick={() => {
                        openChild(<NewComponent component={c} onCreate={(component) => setCollected([component, ...(collected.components?.filter((_c: any) => _c.name != c.name) || [])])} />, false, '#3455', {
                            overlay: true
                        });
                    }}>
                        {c.images?.[0] && <div className="icon" style={{ background: typeof c.images?.[0] == 'string' ? getImg(c.images?.[0]) : c.images?.[0] && getImg(URL.createObjectURL(c.images[0])) }}></div>}
                        <div style={{ filter: /* impact */toFilter('#358f27')?.result.filter || '' }} className="label _limit-text">{c.name && limit(c.name, 10)}</div>
                        {
                            canAdd && <div className="remove" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCollected(collected.components.filter((b: Component) => b.name != c.name))
                            }}></div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
}

function NewComponent({ onCreate, component }: { component?: Component, onCreate: (component: Component) => any }) {
    const { openChild } = useDashStore();
    const [collected, setCollected] = useState({
        description: '',
        scene_code: '',
        scene: null as Blob | null | undefined,
        price: 0,
        unity: '',
        images: [] as Blob[],
        ...component,
        name: component?.name || ''
    })
    return <div className="new-component" onClick={(e) => {
        if (e.currentTarget == e.target) openChild(undefined)
    }}>
        <div className="ctn">
            <div className="close" onClick={() => openChild(undefined)}></div>
            <h1>New Component</h1>
            <label htmlFor="new-comp-name" className="name">
                <div className="label">Name</div>
                <input id='new-comp-name' type="text" value={collected.name || ''} onChange={(e) => setCollected({ ...collected, name: e.currentTarget.value })} />
            </label>
            <label htmlFor='new-comp-image' style={{ background: typeof collected.images[0] == 'string' ? getImg(collected.images[0]) : ((collected.images[0] instanceof Blob) && getImg(URL.createObjectURL(collected.images[0])) || '') }} className="new-comp-image">
                {
                    !collected.images[0] && ('+ Add Image')
                }
                <div className="label">Image <span>( optional )</span></div>
                <input accept='image/*' style={{ display: 'none' }} id='new-comp-image' name='new-comp-image' type="file" onChange={(e) => setCollected({ ...collected, images: e.currentTarget.files || collected.images as any })} />
            </label>
            <div className={"is-default " + (collected.is_default ? 'default' : '')} onClick={() => setCollected({ ...collected, is_default: !collected.is_default })}><div className='check'><span></span></div>Is Default</div>
            <label htmlFor="new-comp-description" className="description">
                <div className="label">Description <span>( optional )</span></div>
                <input id='new-comp-description' type="text" value={collected.description || ''} onChange={(e) => setCollected({ ...collected, description: e.currentTarget.value })} />
            </label>
            <label htmlFor="new-comp-price" className="price">
                <div className="label">Price Impact <span>( optional )</span></div>
                <input id='new-comp-price' type="number" value={collected.price || ''} onChange={(e) => setCollected({ ...collected, price: parseFloat(e.currentTarget.value) })} />
            </label>
            <label htmlFor="new-comp-scene-code" className="scene-code">
                <div className="label">Scene Code <span>( optional )</span></div>
                <input id='new-comp-scene-code' type="text" value={collected.scene_code || ''} onChange={(e) => setCollected({ ...collected, scene_code: e.currentTarget.value })} />
            </label>
            <div className="label">Scene File <span>( optional )</span></div>
            <FileLoader onChange={(file) => setCollected({ ...collected, scene: file as any })} />
            <div className="btm">
                <div className="cancel" onClick={() => openChild(undefined)}>Cancel</div>
                <div className="create" onClick={() => {
                    if (collected.name.trim()) {
                        onCreate(collected as any);
                        openChild(undefined)
                    }
                }}>{component ? 'Edit' : 'Create'}</div>
            </div>
        </div>
    </div>
}

function Text({ collected, color, type }: { type: string, collected: any, color?: string }) {

    const [error, setError] = useState('');

    let reg: RegExp | undefined;
    let input_type = type || 'text';

    if (collected.match) {
        try {
            reg = new RegExp(collected.match, 'i');
        } catch (error) {

        }
    }


    const [value, setValue] = useState(collected.default_value || '');
    return <label htmlFor="v-text">
        {collected.icon && <div className="icon" style={{ background: getImg(collected.icon[0]), filter: color && toFilter(color).result.filter }}></div>}
        <div className="label">{collected.name || ('Input ' + input_type)}<span>{error}</span></div>
        <input id='v-text' type={input_type} placeholder={collected.placeholder} value={value || ''} onChange={(e) => {
            const v = e.currentTarget.value;
            if (reg) {
                if (!reg.test(v)) setError('inValid ' + input_type)
                else {
                    setError('')
                }
            } else if (collected.min && v.length < collected.min) {
                setError('Minimum Lenght is ' + collected.min);
            } else if (collected.max && v.length > collected.max) {
                setError('Maximum Lenght is ' + collected.max);
            } else {
                setError('')
            }
            collected.max ? setValue(v.substring(0, collected.max)) : setValue(v);
        }} />
    </label>
}

function Number({ collected, color }: { collected: any, color?: string }) {

    const [error, setError] = useState('');

    const [value, setValue] = useState(collected.min || 0);
    const [i_id, setI_id] = useState(0);
    return <label htmlFor="v-text">
        {collected.icon && <div className="icon" style={{ background: getImg(collected.icon[0]), filter: color && toFilter(color).result.filter }}></div>}
        <div className="label">{collected.name || 'Input Number'}<span>{error}</span></div>
        <input id='v-text' type='number' placeholder={collected.placeholder} value={value || ''} onChange={(e) => {
            let v = e.currentTarget.value;

            if (collected.min != undefined && v < collected.min) {
                setError('Minimum Value is ' + collected.min);
                clearTimeout(i_id)
                const id = setTimeout(() => {
                    setError('')
                }, 2000);
                setI_id(id);
            } else if (collected.max != undefined && v > collected.max) {
                setError('Maximum Value is ' + collected.max);
                const id = setTimeout(() => {
                    setError('')
                }, 2000);
                setI_id(id);
            } else {
                setError('')
            }
            setValue(v)
        }} />
    </label>
}


/*


function Components({ collected, setCollected, canAdd }: { canAdd?: boolean, setCollected: (list: Component[]) => any, collected: any }) {

    const [error, setError] = useState('');
    const [s, setS] = useState<Component[]>([]);
    const [id, setId] = useState(0);
    const { openChild } = useDashStore();
    useEffect(() => {
        // setCollected([])
    }, [collected])

    return <div className="components">
        <div className="comp-top">selected ( {s.length} ) <span>{error}</span></div>
        {
            canAdd && <div className="add-btn" onClick={() => {
                openChild(<NewComponent onCreate={(component) => setCollected([component, ...(collected.components?.filter((c:any)=>c.name != component.name) || [])])} />, false, '#3455', {
                    overlay: true
                });
            }}><span></span>Add New</div>
        }
        <div className={"comp-list " + (canAdd ? 'can-add' : '')}>
            {
                collected.components?.map((c: Component) => (
                    <div key={c.name} className={"component _limit-text " + (s.find(f => f.name == c.name) ? ' active ' : '') + (c.images?.[0] ? ' icon' : 'not-icon')} onClick={() => {
                        const inc = s.find(f => f.id == c.name);
                        if (inc) {
                            if (collected.min != undefined && (s.length <= collected.min)) {
                                setError('Minimum Selection is ' + collected.min);
                                clearTimeout(id);
                                const i = setTimeout(() => {
                                    clearTimeout(i);
                                    setError('')
                                }, 2000);
                                setId(i);
                            } else {
                                setS(s.filter(f => f.name != c.name))
                            }
                        } else {
                            if (collected.max != undefined && (s.length >= collected.max)) {
                                setError('maximum Selection is ' + collected.max);
                                clearTimeout(id);
                                const i = setTimeout(() => {
                                    clearTimeout(i);
                                    setError('')
                                }, 2000);
                                setId(i);
                            } else {
                                setS([...s, c]);
                            }
                        }
                    }}>
                        {c.images?.[0] && <div className="icon" style={{ background: typeof c.images?.[0] == 'string' ? getImg(c.images?.[0]) : c.images?.[0] && getImg(URL.createObjectURL(c.images[0])) }}></div>}
                        <div style={{ filter:toFilter('#358f27')?.result.filter || '' }} className="label _limit-text">{c.name && limit(c.name, 10)}</div>
                        {
                            canAdd && <div className="remove" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setS(s.filter(f => f.name != c.name));
                                setCollected(collected.components.filter((b: Component) => b.name != c.name))
                            }}></div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
}


*/