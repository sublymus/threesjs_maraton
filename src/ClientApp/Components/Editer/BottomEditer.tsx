import { useEffect, useRef, useState } from 'react'
import './BottomEditer.css'
import { useProductStore } from '../Products/ProductStore';
import { Feature } from '../../../DataBase';
import { getImg } from '../../../Tools/StringFormater';
import { Host } from '../../../Config';
;

const MIN_FeatureS_HEIGHT = 100;
const MAX_FeatureS_HEIGHT = 600;
const Feature_ZISE = 50;


const VALUES_ICON_SIZE = 50;




export function BottomEditer() {
  const { product  } = useProductStore()
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
    if (!product?.scene) return
    const width = ctn_featuresDivRef.current?.getBoundingClientRect().width;
    const length = product.features?.list.length||0;
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
  }, [size, product]);

  useEffect(() => {
    if (!feature) return
    const width = ctn_featuresDivRef.current?.getBoundingClientRect().width;
    if (!width) return
    const h = VALUES_ICON_SIZE * Math.ceil( (1 + ((feature.components?.length||0) * VALUES_ICON_SIZE) / width))
    setValuesHeight(h);

  }, [feature])

  const moreDisplay = moreRequired ? (size == 'hight' ? 'none' : 'inherit') : 'none';
 
  return product && (
    <div className='bot-ctn-edit ' style={{ height: `${featuresHeight}px` }} ref={ctn_featuresDivRef}>
      <div className='more-top' style={{ display: moreRequired ? 'inherit' : 'none', transform: size == 'hight' ? 'rotateZ(90deg)' : 'rotateZ(-90deg)' }} onClick={() => {
        setSize(size == 'hight' ? 'low' : 'hight')
      }}></div>

      <div className="ctn-features-values"  style={{ display: feature ? 'flex' : 'none', height: `${valuesHeight}px`, top: `${-valuesHeight - 70 +(moreRequired?0:50)}px` }}>
      <div className='features-values'>
        {feature && (
          feature.components?.map((_value) => (
            <div key={(_value as any).id} className={'features-value ' + ((_value as any).id == valueId ? 'active' : '')} style={{ backgroundImage: `url(${Host}${_value.icon[0]})` }} onClick={() => {
              if (valueId == (_value as any).id) {
                product?.featuresCollector?.collectFeature(feature, undefined);
                setValueId(undefined);
              } else {
                product.featuresCollector?.collectFeature(feature, _value);
                setValueId((_value as any).id);
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
      </div>
    </div>

  )
}


