import { useEffect, useState } from 'react'
import './ChoiseCatalog.css'
import { useCatalogStore } from "../../Layout/PageCatalog/CatalogStore";
import { CatalogueInterface } from '../../../DataBase';

export function ChoiseCatalog({onChange , catalog_id}:{catalog_id?:string, onChange?:(Catalog_id:string)=>any}) {
    const {fetchCatalogs , catalogs}= useCatalogStore();
    const [selected, setSelected] = useState<CatalogueInterface>();
    const [open, setOpen] = useState('');
    useEffect(()=>{
        fetchCatalogs();
    },[])
    useEffect(()=>{
        setSelected(catalogs?.list.find((c)=>c.id == catalog_id));
    },[catalogs]);
    return (
        <div className="choise-catalog">
            <div className="choise-ctn" onClick={()=>{
                setOpen(open?'':'open');
            }}>
                <div className="back">
                    <div className="icon"></div>
                </div>
                <div className="text">
                    <div className="label">Catalog</div>
                    <div className="name">{selected?.label||'Select Catalog'}</div>
                </div>
                <div className="choise-icon" style={{transform:open?`rotate(180deg)`:''}}></div>
            </div>
            <div className={"list-catalog "+open} style={{height:open?`${45*(catalogs?.list.length||0)}px`:'0px'}}>
                {
                    catalogs?.list.map((l) => (
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