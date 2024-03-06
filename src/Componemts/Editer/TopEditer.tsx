import { useRef, useState } from 'react'
import './TopEditer.css'
import { useProductStore } from '../Products/ProductStore';
import { useWindowSize } from '../Hooks';
import { Feature } from '../../DataBase';

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
  const r = 400;
  const w = s < r ? s : r
  dim.width = w;
  const v = 70;
  const n = Math.floor((w - 20) / v);
  const l = Math.ceil((feature?.values.length || 0) / n);
  dim.height = Math.min(l,6) * v;


  return product && (
    <div className='top-ctn-edit' >
      <div className='edit-btn'></div>
      <div className="features" ref={featuresDivRef}>
        {
          Object.values(product.features).map((_feature) => (
            <div className={'feature ' + (_feature == feature ? 'active' : '')} key={_feature.id} style={{ backgroundImage: `url(${_feature.image})` }} onClick={() => {
              if (feature == _feature) {
                setFeature(null);
              } else {
                setFeature(_feature);
                setValueId(product.featuresCollector?.getCollectedFeatures(_feature.id)?.id)
              }
            }}></div>
          ))
        }
      </div>
      <div className='features-values' style={{display:feature?'flex':'none', width: dim.width, height: dim.height ,overflowY:l>6?'scroll':'inherit'}}>
        {feature && (
          feature.values.map((_value) => (
            <div key={_value.id} className={'features-value ' + (_value.id == valueId ? 'active' : '')} style={{ backgroundImage: `url(${_value.url})` }} onClick={() => {
              if (valueId == _value.id) {
                product?.featuresCollector?.collectFeature(feature, undefined);
                setValueId(undefined);
              } else {
                product?.featuresCollector?.collectFeature(feature, _value);
                setValueId(_value.id);
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


