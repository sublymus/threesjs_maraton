import { useEffect, useRef, useState } from 'react'
import './Input.css'


export function InputText({ placeholder, value: _v, isCheckRequired, label, max, min, check, openEditor, prompt: _prompt, editable, type, onChange }: { onChange?: (value: string | number) => any, editable?: boolean, prompt?: string, openEditor?: boolean, isCheckRequired?: boolean, check?: 'auto' | 'event', type?: 'number' | 'text' | 'email' | 'password', min?: number, max?: number, label?: string, placeholder?: string, value?: string | number }) {
    const [value, setValue] = useState(_v || '')
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState('')
    const [canEdit, setCanEdit] = useState(openEditor || false);
    const [infoPromtId, setInfoPromtId] = useState(0);
    const [editPromtId, setEditPromtId] = useState(0);
    const editPromt = useRef<HTMLDivElement | null>(null);
    const infoPromt = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const _type = type || 'text';
    const [state] = useState({
        validation: (value: string | number) => {
            setMessage('');
            if (_type == 'number') {
                if (min && Number(value) < min) {
                    if (max)
                        setMessage(`Value Interval[${min},${max}]`);
                    else
                        setMessage(`Minimum value ${min}`);
                    return false;
                }
                if (max && Number(value) > max) {
                    if (min)
                        setMessage(`Value Interval[${min},${max}]`);
                    else
                        setMessage(`Minimum value ${min}`);
                    return false;
                }
            } else {
                value = value.toString().trim()
                if (min && String(value).length < min) {
                    setMessage(`Minimum length ${min}`);
                    return false;
                }
                if (max && String(value).length > max) {
                    setMessage(`Maximum length ${max}`);
                    return false;
                }
            }
            onChange?.(value);
            return true;
        }
    })
    useEffect(() => {
        isCheckRequired ? state.validation(value) : 0;
    }, [isCheckRequired])
    const resizePrompt = () => {
        if (editPromt.current) {
            const rect = editPromt.current.getBoundingClientRect();
            const t = `${-10 - rect.height}px`;
            editPromt.current.style.top = t
        }
        if (infoPromt.current) {
            const rect = infoPromt.current.getBoundingClientRect();
            const t = `${-10 - rect.height}px`;
            infoPromt.current.style.top = t
        }

    }
    return (
        <div className="input-text input">
            <div className="input-top">
                <div className="left-side">
                    <div className="label">{label} </div>
                    {_prompt && <div className="input-info" onMouseEnter={(e) => {
                        if ((e.target as HTMLDivElement).className !== 'input-info') return infoPromt.current!.style.display = 'none'
                        clearTimeout(infoPromtId);
                        if (infoPromt.current) infoPromt.current.style.display = 'block';
                        resizePrompt();
                    }} onMouseLeave={() => {
                        setInfoPromtId(setTimeout(() => {
                            if (infoPromt.current) infoPromt.current.style.display = 'none';
                        }, 300));
                    }}>
                        <div className="promt" ref={(ref) => {
                            infoPromt.current = ref
                            if (infoPromt.current) {
                                const rect = infoPromt.current.getBoundingClientRect();
                                if (infoPromt.current.dataset.top) return;
                                const t = `${-10 - rect.height}px`;
                                infoPromt.current.dataset.top = t
                                infoPromt.current.style.top = t
                            }
                        }}>
                            {
                                _prompt
                            }
                        </div>
                    </div>}
                    {editable && <div className="edit" style={{ background: `no-repeat center/80% url(${canEdit ? '/src/res/x.png' : '/src/res/pencil.png'})` }} onClick={() => {
                        const c = !canEdit;
                        console.log('***********');
                        
                        if(c){
                            setTimeout(() => {
                                inputRef.current?.focus();   
                            });
                        }
                        setCanEdit(c == false ? (!state.validation(value)) : true);
                        resizePrompt()
                    }} onMouseEnter={(e) => {
                        if ((e.target as HTMLDivElement).className !== 'edit') return editPromt.current!.style.display = 'none';
                        clearTimeout(editPromtId);
                        if (editPromt.current) editPromt.current.style.display = 'block';
                        resizePrompt()
                    }} onMouseLeave={() => {
                        setEditPromtId(setTimeout(() => {
                            if (editPromt.current) editPromt.current.style.display = 'none';
                        }, 300));
                    }}>
                        <div className="promt" ref={(ref) => { editPromt.current = ref; resizePrompt() }}>
                            {
                                !canEdit ? 'click here to edit value' : 'Close editor'
                            }
                        </div>
                    </div>}
                </div>
            </div>
            {!canEdit && <div className="value">{value}</div>}
            {canEdit && <div className="input-editor">
                <input ref={inputRef} type={_type} placeholder={placeholder} value={value} onChange={(e) => {
                    let v = e.currentTarget.value;
                    while (v.includes('  ')) {
                        v = v.replace('  ', ' ');
                    }
                    if (_type == 'number') {
                        const n = Number(v)
                        if (n > (max || Number.MAX_VALUE)) return
                        setValue(n);
                    } else {
                        if (v.length > (max || Number.MAX_VALUE)) return;
                        setValue(v);
                    }
                    setMessage('');
                    setCount(v.length);
                }} onBlur={() => {
                    if (check != 'auto') return;
                    if (state.validation(value)) {
                       setTimeout(() => {
                        console.log('##############');
                        
                        setCanEdit(false);
                       },0);
                    }

                }} />
                <div className="count"> <div className="message">{message}</div>{_type == 'number' ? (`[${(min !== undefined ? min : '-∞') + ' , ' + (max !== undefined ? max : '+∞')}]`) : (max !== undefined) && (`${count}/${max}`)}</div>
            </div>}
        </div>
    )
}