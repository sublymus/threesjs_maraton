import { useEffect } from 'react'
import './StorePage.css'
import { getImg } from '../../../Tools/StringFormater'
import { useWebStore } from "../../WebStore";
import { useWebRoute } from '../../WebStore'
import { bindToParentScroll } from '../../../Tools/BindToParentScroll';
import { Local } from '../../../Config';



export function StorePage() {
    const { check, current, setAbsPath , qs , navBack  } = useWebRoute()
    const { owner, stores, owner_stores, setSelectedStore } = useWebStore()
    
    useEffect(() => {
        check('store_list') && owner_stores({})
    }, [owner])
    
    return current('store_list') && (
        <div className='stores-page'>
            <div className="top-top">
                <div className="nav-back" onClick={()=>navBack()}></div>
                <div className="sreach-stores">
                    <div className="ctn">
                        <div className="icon"></div>
                        <input type="text" placeholder='Search by #id, name, email' name="sreach-stores" id="sreach-stores" onChange={(e) => {
                            owner_stores({ text: e.currentTarget.value })
                        }} />
                    </div>
                    <div className="new-btn" onClick={() => {
                        setSelectedStore(undefined)
                        setAbsPath(['new_store'])
                    }}>
                        <div className="icon"></div>
                        <div className="label">Add New Store</div>
                    </div>
                </div>
            </div>
            <div className="stores" ref={bindToParentScroll}>
                {stores?.list.map((s) => (
                    <div className="store">
                        <div className="banner" style={{ background: getImg(s.banners[0]) }} onClick={() => {
                            setSelectedStore(s)
                            qs({store_id:s.id}).setAbsPath(['edit_store'])
                        }}>
                            <div className="edit"></div>
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