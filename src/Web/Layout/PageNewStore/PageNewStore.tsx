import { useEffect, useState } from 'react';
import { getImg } from '../../../Tools/StringFormater';
import { useWebRoute, useWebStore } from '../../WebStore'
import './PageNewStore.css'
import { generateUid } from '../../../Tools/uidGenerator';
import { StoreInterface } from '../../../DataBase';
import { StoreCard } from '../PageHome/PageHome';
import { Local } from '../../../Config';
import { TutorialCard } from '../PageTutorial/PageTutorial';
import { PageAuth } from '../PageAuth/PageAuth';

const steps = [{
    icon: '',
    name: 'Name',
    title: 'Choise your store name',
    message: 'Two stores cannot have the same name, make sure you choose an available name',
}, {
    icon: '',
    name: 'Images',
    title: 'Add a logo and a banner to your store',
    message: 'Add a logo and a banner to your store',
}, {
    icon: '',
    name: 'Optional',
    title: 'Add more information about your store',
    message: 'The information below is optional you can add it later',
}]

export function PageNewStore() {

    const [id] = useState(generateUid());
    const { current, qs, json, pathList } = useWebRoute();
    const { createStore, owner, exist,openChild } = useWebStore();

    const [step, setStep] = useState(json?.step || 0)
    const [collected, setCollected] = useState<Record<string, any>>({});

    const [newStore, setNewStore] = useState<StoreInterface | undefined>();

    const [enable, setEnable] = useState('')
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     owner && json?.store_id && setStoreById(json.store_id)
    // }, [json, owner])
    useEffect(() => {
        let step = Number(json?.step || 0);
        step = (step > 0 && enable != 'yes') ? 0 : (step > 1 && (!collected.logo || !collected.banner)) ? 1 : step
        setStep(step);
        collected.name?.length >= 3 ? exist(collected.name)?.then((deja_pris) => {
            setEnable(deja_pris ? 'no' : 'yes')
        }) : setEnable('no');
        if(step != 2) setNewStore(undefined)
    }, [json])
    useEffect(() => {
        setEnable('')
    }, [pathList]);
    const canEnd = collected.logo && collected.banner && collected.name;
    const isValid = (p: string) => {
        if (p == 'name') return enable == 'yes';
        else if (p == 'store_email') {
            const R = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            return R.test(collected[p])
        } else if (p == 'website') {
            const R = /^([a-zA-Z0-9][a-zA-Z0-9-_]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+$/
            return R.test(collected[p])
        } else if (p == 'description') {
            return collected[p]?.length >= 3
        } else if (p == 'descraddressiption') {
            return collected[p]?.length >= 3
        }
        return false
    }
    const stepBtn = (step == 0 && enable == 'yes') ? 'next' : (step == 1 && collected.logo && collected.banner) ? 'next' : (step == 2) ? 'create' : 'wait'
    
    return current('new_store') && <div className="page-new-store">
        <div className="page-top">
            <h1 className="title">{newStore && (json?.step ==2) ? '🎉 congratulations on your new online store 🎉' : 'Create You New Store'}</h1>
        </div>
        <div className="steps" style={{ display: newStore && (json?.step ==2) ? 'none' : '' }}>
            {
                steps.map((s, i) => (
                    <>
                        <div key={s.name} className={"icon-ctn " + (step - 1 >= i ? 'active' : '')} onClick={() => {
                            qs({ step: i }).apply()
                        }}>
                            <div className={"icon"} style={{ background: getImg(s.icon) }}></div>
                            <div className="label">{s.name}</div>
                        </div>

                        {
                            i != steps.length - 1 && <div key={s.name + 'bar'} className={"bar " + (step - 1 >= i ? 'active' : '')}></div>
                        }
                    </>
                ))
            }
        </div>
        <div className="step-prompt" style={{ display: newStore && (json?.step ==2) ? 'none' : '' }}>
            <div className="count">step {step + 1} / {steps.length}</div>
            <h1 className="title">{steps[step].title}</h1>
            {/* <p className="message">{steps[step].message}</p> */}
        </div>
        <div className="step-forms" style={{ display: newStore && (json?.step ==2) ? 'none' : '' }}>
            <div className={"step-name " + (step == 0 ? 'visible' : '')}>
                <div className="name">
                    <div className="top">
                        <label htmlFor={id + 'name'} >Store Name</label>
                        <div className="available" style={{ display: enable == 'yes' ? 'flex' : 'none' }}>
                            <span></span> available
                        </div>
                        <div className="not-available" style={{ display: enable == 'no' ? 'flex' : 'none' }}>
                            <span></span> not available
                        </div>
                    </div>
                    <input type="text" className={isValid('name') ? 'ok' : ''} id={id + 'name'} value={collected.name || ''} placeholder="Name" onChange={(e) => {
                        const name = e.currentTarget.value
                        console.log(name);
                        
                        if (name.trim().length < 3) setEnable('no')
                        else exist(name)?.then((deja_pris) => {
                            setEnable(deja_pris ? 'no' : 'yes')
                        })

                        setCollected({
                            ...collected,
                            ['name']: name
                        })
                    }} onKeyUp={(e)=>{
                        if(e.code == 'Enter'){
                            qs({ step: step + 1, id: Math.trunc(Math.random() * 100) }).apply();
                        }
                    }} onKeyDown={(e)=>{
                        if(e.code == 'Tab'){
                            qs({ step: step + 1, id: Math.trunc(Math.random() * 100) }).apply();
                        }
                    }} />
                </div>
            </div>
            <div className={"step-images " + (step == 1 ? 'visible' : '')}>
                <div className="banner">
                    <label className={'top ' + (collected.banner ? 'available' : 'not-available')} htmlFor={id + 'banner'} ><span></span> Cover Image  </label>
                    <input type="file" accept="image/*" id={id + 'banner'} style={{ display: 'none' }} onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        file && setCollected({
                            ...collected,
                            banner: file
                        })
                    }} />
                    <label htmlFor={id + 'banner'} className="img" style={{ background: collected.banner && getImg(URL.createObjectURL(collected.banner)) }}>
                        {
                            !collected.banner && '+ Add Cover Image '
                        }
                    </label>
                </div>
                <div className="logo">
                    <label className={'top ' + (collected.logo ? 'available' : 'not-available')} htmlFor={id + 'logo'} ><span></span>Logo </label>
                    <input type="file" accept="image/*" id={id + 'logo'} style={{ display: 'none' }} onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        console.log('logo', file);

                        file && setCollected({
                            ...collected,
                            logo: file
                        })
                    }} />
                    <label htmlFor={id + 'logo'} className="img" style={{ background: collected.logo && getImg(URL.createObjectURL(collected.logo)) }}>
                        {
                            !collected.logo && '+ add Logo'
                        }
                    </label>
                </div>

            </div>
            <div className={"step-optional " + (step == 2 ? 'visible' : '')}>
                <div className="phone ">
                    <div className="top">
                        <label htmlFor={id + 'phone'}>Phone</label>
                        <div className="optional">(optional)</div>
                    </div>
                    <input type="text" className={isValid('phone') ? 'ok' : ''} id={id + 'phone'} value={collected.phone || ''} placeholder="Phone" onChange={(e) => {
                        setCollected({
                            ...collected,
                            ['phone']: e.currentTarget.value
                        })
                    }} />
                </div>
                <div className="store_email">
                    <div className="top">
                        <label htmlFor={id + 'store_email'}>Store Email</label>
                        <div className="optional">(optional)</div>
                    </div>
                    <input type="email" className={isValid('store_email') ? 'ok' : ''} id={id + 'store_email'} value={collected.store_email || ''} placeholder="Store email" onChange={(e) => {
                        setCollected({
                            ...collected,
                            ['store_email']: e.currentTarget.value
                        })
                    }} />
                </div>
                <div className="website">
                    <div className="top">
                        <label htmlFor={id + 'website'}>Web Site</label>
                        <div className="optional">(optional)</div>
                    </div>
                    <input type="text" className={isValid('website') ? 'ok' : ''} id={id + 'website'} value={collected.website || ''} placeholder="Web Site" onChange={(e) => {
                        setCollected({
                            ...collected,
                            ['website']: e.currentTarget.value
                        })
                    }} />
                </div>
                <div className="desciption">
                    <div className="top">
                        <label htmlFor={id + 'desciption'}>Description</label>
                        <div className="optional">(optional)</div>
                    </div>
                    <input type="text" className={isValid('description') ? 'ok' : ''} id={id + 'description'} value={collected.description || ''} placeholder="Description" onChange={(e) => {
                        setCollected({
                            ...collected,
                            ['description']: e.currentTarget.value
                        })
                    }} />
                </div>
                <div className="address">
                    <div className="top">
                        <label htmlFor={id + 'address'}>Address</label>
                        <div className="optional">(optional)</div>
                    </div>
                    <input type="text" className={isValid('address') ? 'ok' : ''} id={id + 'address'} value={collected.address} placeholder="Address" onChange={(e) => {
                        setCollected({
                            ...collected,
                            ['address']: e.currentTarget.value
                        })
                    }} />
                </div>
            </div>

        </div>
        <div className="btn-ctn" style={{ display: newStore && (json?.step ==2) ? 'none' : '' }}>
            <div className={"btn " + (stepBtn)} onClick={() => {
                if (stepBtn == 'next') {
                    qs({ step: step + 1, id: Math.trunc(Math.random() * 100) }).apply();
                } else if (stepBtn == 'create') {
                    if (!canEnd || loading) return;
                    !owner && openChild(<PageAuth/>)
                    setLoading(true);
                    createStore({
                        ...collected,
                        banner: collected.banner,
                        logo: collected.logo
                    }).then((res) => {
                        setLoading(false)
                        
                        if (res?.id) {
                            setNewStore(res);
                            setCollected({});
                            setEnable('')
                        }
                        else {
                            //Error
                        }
                    })
                }
            }}>
                {
                    loading ? <div className="loading"></div> : (stepBtn == 'create' ? 'Create Now' : 'Next Step')
                }
            </div>
        </div>
        {newStore && (json?.step ==2) && <div className="mini-tuto">
            <div className="card-side">
                <StoreCard isNew owner={owner} key={newStore.id} setSelectedStore={() => { }} store={newStore} />
            </div>
            <div className="info-side">
                <div className="store-info">
                    <h1>Open Your Store</h1>
                    <p><span className='span-left'>Open {'>'}</span> <a className='link' onClick={() => {
                        localStorage.setItem('store', JSON.stringify(newStore));
                        window.open(
                            `${Local}/${newStore.name}`
                        );
                    }}>http://sublymus.com/{newStore.name}</a> <span className='copie-link' onClick={(e) => {
                        navigator.clipboard.writeText(`http://sublymus.com/${newStore.name}`);
                        const div =e.currentTarget
                        div.classList.add('anim')
                        setTimeout(()=>{
                            div.classList.remove('anim')
                        },400)
                    }}>Copie <span ></span></span></p>
                </div>
                <div className="dash-info">
                    <h1>Manage Your Dashboard</h1>
                    <p><span className='span-left'>Manage {'>'}</span> <a className='link' onClick={() => {
                        localStorage.setItem('store', JSON.stringify(newStore));
                        window.open(
                            `${Local}/${newStore.name}/dash`
                        );
                    }}>http://sublymus.com/{newStore.name}/dash</a> <span className='copie-link' onClick={(e) => {
                        navigator.clipboard.writeText(`http://sublymus.com/${newStore.name}/dash`);
                        const div =e.currentTarget
                        div.classList.add('anim')
                        setTimeout(()=>{
                            div.classList.remove('anim')
                        },400)
                    }}>Copie <span ></span></span></p>
                </div>
            </div>
        </div>}

        {
            newStore && (json?.step == 2) && <TutorialCard/>
        }
    </div>
} 