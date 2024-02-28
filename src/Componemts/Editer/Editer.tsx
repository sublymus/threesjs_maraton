import { useEffect, useRef, useState } from 'react'
import './Editer.css'
import { useEditerStore } from './EditerStore';
import { Feature } from '../../World/World';

const MIN_FeatureS_HEIGHT = 100;
const MAX_FeatureS_HEIGHT = 600;
const Feature_ZISE = 50 + 20;//width+padding


const VALUES_ICON_SIZE = 40 + 30;//width+padding

const features: Feature[] = []
for (let i = 0; i < 15; i++) {
  features.push({
    uuid: (Math.random() * 10000000).toString(32),
    name: 'gem',
    icon: '/src/World/images/gem/gem.png',
    ext: '.png',
    type: 'icon',
    path: '/src/World/images/gem/',
    values: [{
      label: 'Grenat bleu',
      value: 'blue_garnet',
    }, {
      label: 'Taaffeite',
      value: 'taaffeite'
    }, {
      label: 'Grandidierite',
      value: 'grandidierite'
    }, {
      label: 'Serendibite',
      value: 'serendibite'
    }, {
      label: 'Diamant',
      value: 'diamond'
    }, {
      label: 'Rubis',
      value: 'ruby'
    }, {
      label: 'Alexandrite',
      value: 'alexandrite'
    }, {
      label: 'Béryl rouge',
      value: 'red_beryl'
    }, {
      label: 'Padparadscha Saphire',
      value: 'padparadscha_saphire'
    }, {
      label: 'Musgravite',
      value: 'musgravite'
    }, {
      label: 'Saphir',
      value: 'sapphire'
    }, {
      label: 'Benitoite',
      value: 'benitoite'
    }, {
      label: 'Opale noire',
      value: 'black_opal'
    }, {
      label: 'Grenat démantoïde',
      value: 'demantoid_garnet'
    }, {
      label: 'Poudretteite',
      value: 'poudretteite'
    }, {
      label: 'Opale de feu',
      value: 'fire_opal'
    }, {
      label: 'Jeremejevite',
      value: 'jeremejevite'
    }, {
      label: 'Tanzanite',
      value: 'tanzanite'
    }]
  })
}

export function Editer() {

  const { feature, setFeature } = useEditerStore()
  const featuresDivRef = useRef<HTMLDivElement | null>(null);
  const ctn_featuresDivRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState('low')
  const [featuresHeight, setFeaturesHeight] = useState(MIN_FeatureS_HEIGHT);
  const [moreRequired, setMoreRequired] = useState(false);
  const [value, setValue] = useState<Feature['values'][0] | null>(null);

  useEffect(() => {
    if (!ctn_featuresDivRef.current) return
    const width = ctn_featuresDivRef.current?.getBoundingClientRect().width;
    const sumWidth = features.length * Feature_ZISE
    const required = sumWidth > width;
    setMoreRequired(required)

    if (size == 'low') {
      setFeaturesHeight(MIN_FeatureS_HEIGHT);
    } else {
      let height = Feature_ZISE * (1 + ((features.length * Feature_ZISE) / width));
      if (height > MAX_FeatureS_HEIGHT) height = MAX_FeatureS_HEIGHT;
      setFeaturesHeight(height + 10);
    }
  }, [size]);

  console.log({ feature });

  let values_height = 0;
  if (feature) {
    values_height = VALUES_ICON_SIZE * (2 + feature.values.length / VALUES_ICON_SIZE)
  }
  const moreDisplay = moreRequired ? (size == 'hight' ? 'none' : 'inherit') : 'none';

  return (
    <div className='ctn-edit ' style={{ height: `${featuresHeight}px` }} ref={ctn_featuresDivRef}>
      <div className='more-top' style={{ display: moreRequired ? 'inherit' : 'none', transform: size == 'hight' ? 'rotateZ(90deg)' : 'rotateZ(-90deg)' }} onClick={() => {
        setSize(size == 'hight' ? 'low' : 'hight')
      }}></div>

      <div className='features-values-back' style={{ display: feature ? 'flex' : 'none', height: `${values_height}px`, top: `${-values_height - 70}px` }}></div>
      <div className='features-values' style={{ display: feature ? 'flex' : 'none', height: `${values_height}px`, top: `${-values_height - 70}px` }}>
        {feature && (
          feature.values.map((_value) => (
            <div key={_value.value} className={'features-value ' + (_value == value ? 'active' : '')} style={{ backgroundImage: `url(${feature.path}${_value.value}${_value.ext || feature.ext})` }}>
              <span className='lable'></span>
            </div>
          ))
        )}
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
            features.map((_feature, i) => (
              <div className={'feature ' + (_feature == feature ? 'active' : '')} key={_feature.uuid} style={{ backgroundImage: `url(${_feature.icon})` }} onClick={() => {
                setFeature(features[i])
              }}></div>
            ))
          }
        </div>
      </div>
    </div>

  )
}
