import { useEffect, useState } from "react";
import { toFilter } from "../../../Tools/FilterColor";
import { useAppStore } from "../../AppStore";
import { useFavoritesStore } from "../../Layout/PageFavorites/FavoritesStore";
import "./FavoritesBtn.css";
import { LabelToColor } from "../../../Tools/StringFormater";

export function FavoritesBtn({ elm, onChange }: { elm: { favorite?: string, id?: string, product_id?: string }, onChange?: (p: any) => any }) {

    const { addFavorite, deleteFavorite } = useFavoritesStore();
    const { openChild } = useAppStore();
    const product_id = elm.product_id || elm.id;
    const [isOpen, setIsOpen] = useState(false);
    const [counter, setCounter] = useState(0);
    const [s] = useState<any>({});
    s.counter = counter;
    s.isOpen = isOpen;
    return <div className={"favorites-btn " + (elm.favorite ? 'favorite' : '')+" "+(isOpen?'open':'')} onClick={() => {

        if (isOpen) {
            (product_id) && openChild(<ChoiseLabel product_id={product_id} onChange={() => onChange?.(elm)} />, false, '#3455')
            setIsOpen(false);
        } else {
            elm.favorite ?
                deleteFavorite(elm.favorite).then(() => {
                    onChange?.(elm);
                }) : (()=>{
                    setIsOpen(true);
                    setCounter(3);
                    const id = setInterval(()=>{
                        console.log(s.counter);
                        
                        if(s.counter>1 && s.isOpen){
                            setCounter(s.counter-1);
                        }else{
                            clearInterval(id);
                            if(s.isOpen){
                                setIsOpen(false);
                                addFavorite({
                                    product_id: product_id,
                                    label: 'default'
                                }).then(() => {
                                    onChange?.(elm)
                                });
                            }
                        }
                    },1000)
                })();
        }
    }}>
        <span className="icon" style={{ display: isOpen ? 'none' : '', filter: elm.favorite && toFilter('#c00').result.filter }}></span>
        <span className="plus" style={{ display: isOpen ? '' : 'none', filter: elm.favorite && toFilter('#c00').result.filter }}></span>
        <span className="down" style={{ display: isOpen ? '' : 'none', filter: elm.favorite && toFilter('#c00').result.filter }}>{counter}</span>
    </div>
}

export function ChoiseLabel({ product_id, onChange }: { onChange?: () => any, product_id: string }) {
    const { openChild } = useAppStore();
    const [addNew, setAddNew] = useState(false);
    const [label, setLabel] = useState('');
    const { addFavorite, favorites, fetchFavorites } = useFavoritesStore();
    const sendFavorite = (l?: string | undefined) => {

        if (l || label) {
            console.log(l, label);

            addFavorite({
                product_id: product_id,
                label: l || label
            }).then(() => {
                onChange?.()
                setLabel('');
                openChild(undefined)
            });
        }
    }
    useEffect(() => {
        !favorites?.labels && fetchFavorites({
            add_labels: true
        })
    })
    return <div className="choise-label" onClick={() => openChild(undefined)}>
        <div className="ctn" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}>
            <h1>Choise Label</h1>
            <div className="list">
                {
                    ((favorites?.labels?.length ==0)?['default']:favorites?.labels)?.map(l => (
                        <div className="label" style={{ borderBottom: `${LabelToColor(l)} 2px solid`, border: `${LabelToColor(l)} 2px solid` }} onClick={() => {
                            sendFavorite(l)
                        }}>{l} <span style={{ background: LabelToColor(l) }} ></span></div>
                    ))
                }
            </div>
            {
                addNew ? <div className="new-label">
                    <label htmlFor="new-label">
                        <span className="plus" onClick={() => {
                            sendFavorite()
                        }}></span>
                        <input type="text" autoFocus id='new-label' value={label} onKeyUp={(e) => {
                            console.log(e.code);
                            if (e.code == 'Enter') {
                                sendFavorite()
                            }
                        }} onChange={(e) => {
                            setLabel(e.currentTarget.value.toLowerCase().trim())
                        }} />
                        <span className="send" onClick={() => {
                            sendFavorite()
                        }}></span>
                    </label>
                </div> : <div className="add-new" onClick={() => {
                    setAddNew(true);
                }}>Add New Label</div>
            }
        </div>
    </div>

}