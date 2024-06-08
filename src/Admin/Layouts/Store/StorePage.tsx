import { useEffect } from 'react'
import './StorePage.css'
import { useStoreStore } from './StoreStore'
import { useAdminRoute } from '../../AdminStore'
import { useRegisterStore } from '../PageAuth/RegisterStore'
import { getImg } from '../../../Tools/StringFormater'
import { Local } from '../../../Config'



export function StorePage() {
    const { current, qs,pathList } = useAdminRoute()
    const { user } = useRegisterStore()
    const { stores, fetchStores , setStore } = useStoreStore()
    useEffect(() => {
        user && current('stores') && fetchStores({text:''})
    }, [user,pathList])
    
    return current('stores') &&(
        <div className='stores-page'>
            <div className="sreach-stores">
                <div className="ctn">
                    <div className="icon"></div>
                    <input type="text" placeholder='Search by #id, name, email' name="sreach-stores" id="sreach-stores" onChange={(e)=>{
                        fetchStores({text:e.currentTarget.value})
                    }} />
                </div>
            </div>
            <div className="stores">
                {stores?.list.map((s) => (
                    <div className="store" key={s.id}>
                        <div className="banner" style={{ background: getImg(s.banners[0]) }} onClick={()=>{
                            setStore(s)
                            qs({store_id:s.id}).setAbsPath(['stores','store_info']);
                        }}>
                            <div className="more">
                                <div className="logo" style={{ background: getImg(s.logo[0]) }}></div>
                                <div className="text">
                                    <div className="name">{s.name}</div>
                                    <div className="owner-email">{s.store_email}</div>
                                    <div className="id">#{s.id.split('-')[0]}</div>
                                </div>
                            </div>
                        </div>
                        <div className="btm">
                            <div className="info">
                                <div className="stat">
                                    <div className="products">
                                        <div className="value">42</div>
                                        <div className="icon"></div>
                                    </div>
                                    <div className="clients">
                                        <div className="value">205</div>
                                        <div className="icon"></div>
                                    </div>
                                    <div className="collaborators">
                                        <div className="value">9</div>
                                        <div className="icon"></div>
                                    </div>
                                </div>
                                <div className="other">
                                    <div className="site">
                                        {s.website}
                                    </div>
                                    <div className="phone">
                                        {s.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="options">
                                <div className="open-store" onClick={() => {
                                    localStorage.setItem('store', JSON.stringify(s));
                                    window.open(
                                        `${Local}/${s.name}`
                                    );
                                }}>STORE</div>
                                <div className="open-dash" onClick={() => {
                                    localStorage.setItem('store', JSON.stringify(s));
                                    window.open(
                                        `${Local}/${s.name}/dash`
                                    );
                                }}>DASH</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}