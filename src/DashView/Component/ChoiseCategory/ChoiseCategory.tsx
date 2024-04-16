import { useEffect, useState } from 'react'
import './ChoiseCategory.css'
import { useCategotyStore } from "../../Layout/PageCategory/CategoryStore";
import { Category } from '../../../DataBase';

export function ChoiseCategory({onChange , category_id}:{category_id?:string, onChange?:(category_id:string)=>any}) {
    const {fetchCategories , categories}= useCategotyStore();
    const [selected, setSelected] = useState<Category>();
    const [open, setOpen] = useState('');
    useEffect(()=>{
        fetchCategories({limit:1});
    },[])
    useEffect(()=>{
        setSelected(categories?.list.find((c)=>c.id == category_id));
    },[categories]);
    return (
        <div className="choise-category">
            <div className="choise-ctn" onClick={()=>{
                setOpen(open?'':'open');
            }}>
                <div className="back">
                    <div className="icon"></div>
                </div>
                <div className="text">
                    <div className="label">Category</div>
                    <div className="name">{selected?.label||'select category'}</div>
                </div>
                <div className="choise-icon" style={{transform:open?`rotate(180deg)`:''}}></div>
            </div>
            <div className={"list-category "+open} style={{height:open?`${45*(categories?.list.length||0)}px`:'0px'}}>
                {
                    categories?.list.map((l) => (
                        <div key={l.id} className={"item "+ (selected?.id==l.id?'selected':'')} onClick={()=>{
                            setSelected(l);
                            onChange?.(l.id);
                        }}>
                            <div className="label">{l.label}</div>
                            <div className="id">#{l.id.split('-')[0]}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}