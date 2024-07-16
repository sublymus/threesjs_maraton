import { useRef, useState } from 'react'
import './TopEditer.css'
import { useProductStore } from '../Products/ProductStore';
import { useWindowSize } from '../../../Hooks';
import { Feature } from '../../../DataBase';
import { Host } from '../../../Config';
;

export function TopEditer() {
  const { product } = useProductStore()
  const [feature, setFeature] = useState<Feature | null>(null)
  const featuresDivRef = useRef<HTMLDivElement | null>(null);
  const [valueId, setValueId] = useState<string | undefined>(undefined);


  const dim = {
    width: 0,
    height: 0
  }
  const size = useWindowSize();
  const s = size.width - 80;
  const maxSize = 400;
  const w = s < maxSize ? s : maxSize
  dim.width = w; 
  const v = 50;
  const column = Math.floor((w - 20) / v); // nbr of valu per row
  const row = Math.ceil((feature?.components?.length || 0) / column);
  dim.height = Math.min(row,6) * v;
  return product && (
    <div className='top-ctn-edit' >
      <div className="features" ref={featuresDivRef}>
        {
          product.features&&Object.values(product.features.list).map((_feature) => (
            <div className={'feature ' + (_feature == feature ? 'active' : '')} key={_feature.id} style={{ backgroundImage: `url(${Host}${_feature.icon[0]})` }} onClick={() => {
              if (feature == _feature) {
                setFeature(null);
              } else {
                setFeature(_feature);
                setValueId((product.featuresCollector?.getCollectedFeatures(_feature.id) as any)?.id)
              }
            }}></div>
          ))
        }
      </div>
      <div className='features-values' style={{display:feature?'flex':'none', width: dim.width, height: dim.height ,overflowY:row>6?'scroll':'inherit'}}>
        {feature && (
          feature.components?.map((_value) => (
            <div key={(_value as any).id} className={'features-value ' + ((_value as any).id == valueId ? 'active' : '')} style={{ backgroundImage: `url(${Host}${_value.icon[0]})` }} onClick={() => {
              
              if (valueId == (_value as any).id) {
                
                product?.featuresCollector?.collectFeature(feature, undefined);
                setValueId(undefined);
              } else {
                product?.featuresCollector?.collectFeature(feature, (_value as any));
                setValueId((_value as any).id);
              }
            }}>
              <span className='lable'></span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


