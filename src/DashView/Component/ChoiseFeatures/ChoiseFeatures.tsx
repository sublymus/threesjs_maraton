import { useEffect, useState } from 'react'
import './ChoiseFeatures.css'
import { Feature } from '../../../DataBase';
import { useFeatureStore } from "../../Layout/PageFeature/FeatureStore";

export function ChoiseFeatures({onChange , features:_features }:{features?:Feature[],onChange?:(ids:string[])=>any}) {
    const {fetchFeatures , features} = useFeatureStore()
    const [selected, setSelected] = useState(_features);
    const [open, setOpen] = useState('');

    useEffect(()=>{
        fetchFeatures();
    },[]);
    useEffect(()=>{
        setSelected(_features?.filter((_f=>features?.list.find(f=>f.id == _f.id))));
    },[features]);
    return (
        <div className="choise-features">
            <div className="choise-ctn" onClick={()=>{
                setOpen(open?'':'open');
            }}>
                <div className="back">
                    <div className="icon"></div>
                </div>
                <div className="text">
                    <div className="label">Features</div>
                    <div className="name">{selected?.length||0} Selected</div>
                </div>
                <div className="choise-icon" style={{transform:open?`rotate(180deg)`:''}}></div>
            </div>
            <div className={"list-features "+open} style={{height:open?`${45*(features?.list.length||0)}px`:'0px'}}>
                {
                    features?.list.map((l) => (
                        <div  key={l.id}  className={"item "+ ( selected?.find(f=>f.id ==l.id) ?'selected':'')} onClick={()=>{
                            const s = selected?.find(f=>f.id ==l.id)?selected.filter(f=>f.id!==l.id):[...(selected||[]),l];
                            setSelected(s);
                            onChange?.(s.map(i=>i.id));
                        }}>
                            <div className="label">{l.name}</div>
                            <div className="id">#{l.id.split('-')[0]}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}