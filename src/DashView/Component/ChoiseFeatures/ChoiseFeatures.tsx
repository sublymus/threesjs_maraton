import { useEffect, useState } from 'react'
import './ChoiseFeatures.css'
import { Feature } from '../../../DataBase';
import { useFeatureStore } from "../../Layout/PageFeature/FeatureStore";
import { getImg } from '../../../Tools/StringFormater';
import { toFilter } from '../../../Tools/FilterColor';

export function ChoiseFeatures({ features: _features, onEdit, onNew }: { features?: Feature[], onNew?: () => any, onEdit?: (feature: Feature) => any }) {
    const { fetchFeatures, features } = useFeatureStore()
    const [open, setOpen] = useState('');
    
    useEffect(() => {
        fetchFeatures();
    }, []);
    return (
        <div className="choise-features">
            <div className="choise-ctn" >
                <div className="back">
                    <div className="icon" style={{ filter: toFilter('6500c4').result.filter }}></div>
                </div>
                <div className="text">
                    <div className="Titile">Features</div>
                    <div className="label"> ( {features?.list.length} ) Avalaible</div>
                </div>
                <div className="icons">
                    <div className="add" style={{ transform: open ? `rotate(180deg)` : '' }} onClick={() => {
                        onNew?.();
                    }}></div>
                    <div className="i_open" style={{ transform: open ? `rotate(180deg)` : '' }} onClick={() => {
                        setOpen(open ? '' : 'open');
                    }}></div>
                </div>
            </div>
            <div className={"list-features " + open} style={{ height: open ? `${85 * (features?.list.length || 0)}px` : '0px' }}>
                {
                    features?.list.map((l) => (
                        <div key={l.id} className="item">
                            <div className="edit" onClick={() => onEdit?.(l)}></div>
                            <div className="icon" style={{ background: getImg(l.icon?.[0]) }}></div>
                            <div className="label">{l.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}