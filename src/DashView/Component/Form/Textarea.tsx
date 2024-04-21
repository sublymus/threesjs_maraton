import { useEffect, useRef, useState } from 'react'
import './Textarea.css'

export function Textarea({ placeholder, value: _v, isCheckRequired, label, max, min, check, openEditor, prompt: _prompt, editable , onChange }: {onChange?:(value:string|number)=>any, editable?: boolean, prompt?: string, openEditor?: boolean, isCheckRequired?: boolean, check: 'auto' | 'event', min?: number, max?: number, label?: string, placeholder?: string, value?: string }) {
    const [value, setValue] = useState(_v || '')
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState('')
    const [canEdit, setCanEdit] = useState(openEditor || false);
    const [blurActive, setBlurActive] = useState(openEditor || false);
    const [infoPromtId, setInfoPromtId] = useState(0);
    const [editPromtId, setEditPromtId] = useState(0);
    const editPromt = useRef<HTMLDivElement | null>(null);
    const infoPromt = useRef<HTMLDivElement | null>(null);
    const [state] = useState({
        validation: (value: string) => {
            console.log(value, min && value.length < min, value.length, min);
            setMessage('');
            value = value.toString().trim();
            if (min && value.length < min) {
                setMessage(`Minimum length ${min}`);
                return false;
            }
            if (max && value.length > max) {
                setMessage(`Maximum length ${max}`);
                return false;
            }
           onChange?.(value)
            return true;
        }
    })
    useEffect(() => {
        isCheckRequired ? state.validation(value) : 0;
    }, [isCheckRequired])
    const resizePrompt = ()=>{
        if (editPromt.current){
            const rect = editPromt.current.getBoundingClientRect();
            const t = `${-10 - rect.height}px`;
            editPromt.current.style.top = t
        }
        if (infoPromt.current){
            const rect = infoPromt.current.getBoundingClientRect();
            const t = `${-10 - rect.height}px`;
            infoPromt.current.style.top = t
        }
       
    }
    return (
        <div className="textarea-text textarea">
            <div className="textarea-top">
                <div className="left-side">
                    <div className="label">{label} </div>
                    {_prompt && <div className="textarea-info" onMouseEnter={(e) => {
                        if((e.target as HTMLDivElement).className !== 'textarea-info') return  infoPromt.current!.style.display = 'none'
                        clearTimeout(infoPromtId);
                        if (infoPromt.current) infoPromt.current.style.display = 'block';
                        resizePrompt();
                    }} onMouseLeave={() => {
                        setInfoPromtId(setTimeout(() => {
                            if (infoPromt.current) infoPromt.current.style.display = 'none';
                        }, 300));
                    }}>
                        <div className="promt" ref={infoPromt}>
                            {
                                _prompt
                            }
                        </div>
                    </div>}
                    {editable && <div className="edit" style={{ background: `no-repeat center/80% url(${canEdit ? '/src/res/x.png' : '/src/res/pencil.png'})` }} onClick={() => {
                        const c = !canEdit;
                        if(blurActive){
                            return setBlurActive(false);
                        }
                        setCanEdit(c==false?(!state.validation(value)):true);
                        resizePrompt()
                    }} onMouseEnter={(e) => {
                        if((e.target as HTMLDivElement).className !== 'edit') return  infoPromt.current!.style.display = 'none'
                        clearTimeout(editPromtId);
                        if (editPromt.current) editPromt.current.style.display = 'block';
                        resizePrompt()
                    }} onMouseLeave={() => {
                        setEditPromtId(setTimeout(() => {
                            if (editPromt.current) editPromt.current.style.display = 'none';
                        }, 300));
                    }}>
                        <div className="promt" ref={(ref)=>{editPromt.current = ref; resizePrompt()}} >
                            {
                                !canEdit ? 'click here to edit value' : 'Close editor'
                            }
                        </div>
                    </div>}
                </div>
            </div>
                {!canEdit&&<div className="value">{value}</div>}
            {canEdit && <div className="textarea-editor">
            <textarea spellCheck='false' rows={5}  placeholder={placeholder} value={value} onChange={(e) => {
                    let v = e.currentTarget.value;
                    while (v.includes('  ')) {
                        v = v.replace('  ', ' ');
                    }
                    if (v.length > (max || Number.MAX_VALUE)) return
                    setValue(v);
                    setMessage('');
                    setCount(v.length);
                }} onBlur={() => {
                    if (check != 'auto') return;
                    if(state.validation(value)){
                        setBlurActive(true);
                        setCanEdit(false);
                    }

                }} />
                <div className="count"> <div className="message">{message}</div>{max && `${count}/${max}`}</div>
            </div>}
        </div>
    )
}