import { useEffect, useRef, useState } from 'react'
import './Editer.css'
import { Feature } from '../../World/World';
import { useProductStore } from '../Product/ProductStore';

const MIN_FeatureS_HEIGHT = 100;
const MAX_FeatureS_HEIGHT = 600;
const Feature_ZISE = 50 + 20;//width+padding


const VALUES_ICON_SIZE = 40 + 30;//width+padding




export function Editer() {
  const { productScenus } = useProductStore()
  const [feature, setFeature] = useState<Feature | null>(null)
  const featuresDivRef = useRef<HTMLDivElement | null>(null);
  const ctn_featuresDivRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState('low')
  const [featuresHeight, setFeaturesHeight] = useState(MIN_FeatureS_HEIGHT);
  const [valuesHeight, setValuesHeight] = useState(MIN_FeatureS_HEIGHT);
  const [moreRequired, setMoreRequired] = useState(false);
  const [valueId, setValueId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!ctn_featuresDivRef.current) return
    if (!productScenus?.scenus) return
    const width = ctn_featuresDivRef.current?.getBoundingClientRect().width;
    const length = Object.keys(productScenus.scenus.getFeatures()).length;
    const sumWidth = length * Feature_ZISE
    const required = sumWidth > width;
    setMoreRequired(required)

    if (size == 'low') {
      setFeaturesHeight(MIN_FeatureS_HEIGHT);
    } else {
      let height = Feature_ZISE * (1 + ((length * Feature_ZISE) / width));
      if (height > MAX_FeatureS_HEIGHT) height = MAX_FeatureS_HEIGHT;
      setFeaturesHeight(height + 10);
    }

  }, [size, productScenus]);

  useEffect(() => {
    if (!feature) return
    const width = ctn_featuresDivRef.current?.getBoundingClientRect().width;
    if (!width) return
    const h = VALUES_ICON_SIZE * (1 + (feature.values.length * VALUES_ICON_SIZE) / width)
    setValuesHeight(h);

  }, [feature])

  const moreDisplay = moreRequired ? (size == 'hight' ? 'none' : 'inherit') : 'none';

  return productScenus && (
    <div className='ctn-edit ' style={{ height: `${featuresHeight}px` }} ref={ctn_featuresDivRef}>
      <div className='more-top' style={{ display: moreRequired ? 'inherit' : 'none', transform: size == 'hight' ? 'rotateZ(90deg)' : 'rotateZ(-90deg)' }} onClick={() => {
        setSize(size == 'hight' ? 'low' : 'hight')
      }}></div>

      <div className="ctn-features-values"  style={{ display: feature ? 'flex' : 'none', height: `${valuesHeight}px`, top: `${-valuesHeight - 70 +(moreRequired?0:50)}px` }}>
      <div className='features-values'>
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
      <div className='ctn-features '>
        <div className='more-right' style={{ display: moreDisplay }} onClick={() => {
          if (featuresDivRef.current) {
            featuresDivRef.current.scrollTo({
              top: 0,
              left: featuresDivRef.current.scrollLeft + 250,
              behavior: "smooth",
            })
          }
        }}></div>
        <div className='more-left' style={{ display: moreDisplay }} onClick={() => {
          if (featuresDivRef.current) {
            featuresDivRef.current.scrollTo({
              top: 0,
              left: featuresDivRef.current.scrollLeft - 250,
              behavior: "smooth",
            })
          }
        }}></div>
        <div className={"features " + (moreRequired ? size : '')} style={{ height: `${featuresHeight}px`, ...(size == 'low' ? { whiteSpace: 'nowrap' } : {}) }} ref={featuresDivRef}>
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
      </div>
    </div>

  )
}


