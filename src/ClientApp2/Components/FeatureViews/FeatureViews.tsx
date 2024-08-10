import './FeatureViews.css'
import { FileLoader } from "../../../DashView/Component/LoaderImage/LoaderImage";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useEffect, useState } from 'react';
import { Component } from '../../../DataBase';
import { toFilter } from '../../../Tools/FilterColor';
import { getImg, limit } from '../../../Tools/StringFormater';



export function FDate({ collected, type, _set }: { type: string, collected: any, _set?: (value: string) => any }) {

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
            _set?.(v)
            setValue(v);
        }} />
    </label>

}
export function Phone({ collected, _set }: { collected: any, _set?: (value: string) => any }) {
    const [value, setValue] = useState(collected.default_value || '');
    return <PhoneInput
        country={'us'}
        value={value}
        onChange={phone => { setValue(phone); _set?.(phone) }}
    />
}


export function Components({ collected, setCollected, canAdd, openChild }: { openChild: (...arg: any) => any, canAdd?: boolean, setCollected: (list: Component[]) => any, collected: any }) {

    const [error/* , setError */] = useState('');
    // const [id, setId] = useState(0);
    useEffect(() => {
        // setCollected([])
    }, [collected])

    return <div className="components">
        <div className="comp-top">
            ( {collected.components?.length} ) Avalaible
            {
                canAdd && <div className="add-btn" onClick={() => {
                    const a: any = {};
                    openChild(<NewComponent openChild={openChild} onCreate={(component) => setCollected((collected.components as Array<any>)?.map((_c: any) => _c.name == component.name ? component : _c).filter((_c) => a[_c.name] ? false : a[_c.name] = true))} />, false, '#3455', {
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
                        openChild(<NewComponent openChild={openChild} component={c} onCreate={(component) => setCollected((collected.components as Array<any>)?.map((_c: any) => _c.name == c.name ? component : _c).filter((_c) => _c.name == component.name ? (_c.id == component.id ? true : false) : true))} />, false, '#3455', {
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

export function NewComponent({ onCreate, component, openChild }: { openChild: (...arg: any) => any, component?: Component, onCreate: (component: Component) => any }) {
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

export function Text({ collected, color, type, _set }: { type: string, collected: any, color?: string, _set?: (value: string) => any }) {

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
            if (collected.max) {
                const a = v.substring(0, collected.max);
                setValue(a)
                _set?.(a)
            } else {
                _set?.(v)
                setValue(v);
            }
        }} />
    </label>
}

export function Number({ collected, color, _set }: { collected: any, color?: string, _set?: (value: string) => any }) {

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
            _set?.(v)
            setValue(v)
        }} />
    </label>
}


/*


export function Components({ collected, setCollected, canAdd }: { canAdd?: boolean, setCollected: (list: Component[]) => any, collected: any }) {

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