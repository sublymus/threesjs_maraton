import { useRef, useState } from 'react';
import './EditorTopBar.css'

export function EditorTopBar({ mode, title, onCreate, onDelete, deteleKey }: { direction?: 'column' | 'row', deteleKey: string, title: string, mode: 'create' | 'delete', onCreate: () => any, onDelete: () => any }) {

    const [key, setKey] = useState('');
    const [remove, setRemove] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={"product-dash-top "}>
            <h1 className="page-title">{title}</h1>
            {
                (mode == 'create') && <div className='btn-ctn'>
                    <div className="create" onClick={() => {
                    onCreate();
                }}>
                    <div className="icon"></div>
                    <div className="label">Create New</div>
                </div>
                </div>
            }
            {
                (mode == 'delete') && (<>
                    <div className="btn-ctn">
                        {remove && <div className="cancel" onClick={() => {
                            setRemove(false);
                        }}>
                            <div className="icon cancel"></div>
                            <div className="label">Cancel</div>
                        </div>}
                        <div className="delete" onClick={() => {
                            (!remove) ? (() => { setRemove(true); inputRef.current?.focus() })() : (
                                key.trim() == deteleKey ? onDelete() : ''
                            )
                        }}>
                            <div className={"icon " + (mode == 'delete' ? (remove ? 'confirm' : 'delete') : 'lol')}></div>
                            <div className="label">{remove ? 'Confirm' : 'Detele'}</div>
                        </div>
                    </div>
                    {
                        remove && <input ref={inputRef} placeholder='Id Is Required ' type="text" onChange={(e) => {
                            setKey(e.currentTarget.value);
                        }} />
                    }
                </>)
            }
        </div>
    )
}