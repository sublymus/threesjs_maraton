import { useEffect, useRef, useState } from 'react'
import './TopEditer.css'
import { Feature } from '../../World/World';
import { useProductStore } from '../Products/ProductStore';
import { useWindowSize } from '../Hooks';

const MIN_FeatureS_HEIGHT = 100;
const MAX_FeatureS_HEIGHT = 600;
const Feature_ZISE = 50 + 20;//width+padding


const VALUES_ICON_SIZE = 40 + 30;//width+padding 


export function TopEditer() {
  const { productScenus } = useProductStore()
  const [feature, setFeature] = useState<Feature | null>(null)
  const featuresDivRef = useRef<HTMLDivElement | null>(null);
  const ctn_featuresDivRef = useRef<HTMLDivElement | null>(null);
  const [featuresHeight, setFeaturesHeight] = useState(MIN_FeatureS_HEIGHT);
  const [valuesHeight, setValuesHeight] = useState(MIN_FeatureS_HEIGHT);
  const [moreRequired, setMoreRequired] = useState(false);
  const [valueId, setValueId] = useState<string | undefined>(undefined);


  const dim = {
    width: 0,
    height: 0
  }
  const size = useWindowSize();
  const s = window.innerWidth - 80;
  const r = 400;
  const w = s < r ? s : r
  dim.width = w;
  const v = 70;
  const n = Math.floor((w - 20) / v);
  const l = Math.ceil((feature?.values.length || 0) / n);
  dim.height = Math.min(l,6) * v;


  return productScenus && (
    <div className='top-ctn-edit' >
      <div className='edit-btn'></div>
      <div className="features" ref={featuresDivRef}>
        {
          Object.values(productScenus.scenus.getFeatures()).map((_feature) => (
            <div className={'feature ' + (_feature == feature ? 'active' : '')} key={_feature.uuid} style={{ backgroundImage: `url(${_feature.icon})` }} onClick={() => {
              if (feature == _feature) {
                setFeature(null);
              } else {
                setFeature(_feature);
                setValueId(productScenus.scenus.featuresCollector.get(_feature.uuid)?.id)
              }
            }}></div>
          ))
        }
      </div>
      <div className='features-values' style={{display:feature?'flex':'none', width: dim.width, height: dim.height ,overflowY:l>6?'scroll':'inherit'}}>
        {feature && (
          feature.values.map((_value) => (
            <div key={_value.id} className={'features-value ' + (_value.id == valueId ? 'active' : '')} style={{ backgroundImage: `url(${feature.path}${_value.id}${_value.ext || feature.ext})` }} onClick={() => {
              if (valueId == _value.id) {
                productScenus?.scenus.featuresCollector.add(feature.uuid, undefined);
                setValueId(undefined);
              } else {
                productScenus?.scenus.featuresCollector.add(feature.uuid, _value);
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


