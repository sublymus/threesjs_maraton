import { DefaultImage, useAppRouter } from "../../AppStore"
import './PageUser.css'
// import { useProfileStore } from "../PageProfile/ProfileStore";
import { useProductStore } from "../../Components/Products/ProductStore";
import { useEffect, useRef, useState } from "react";
import { Host } from "../../../Config";
import { useRegisterStore } from "../PageRegister/RegisterStore";
;

['33+', '33+_2', '33+_22', '3_+22', '+22']
const identifierList: string[] = [];
for (let i = 0; i < 12; i++) {
    identifierList.push('+' + i + ':' + i + ':1');
}
const list: string[] = [];
for (let i = 0; i < 10; i++) {
    list.push(i.toString())
}
const isNumber = (s: string, i?: number) => {
    return list.includes(s.charAt(i || 0));
}
let ctn: number[] = []

export function PageUser() {
    const { check , current} = useAppRouter();
    const { user } = useRegisterStore();
    const { visites, fetchVisites } = useProductStore();
    const [index, setIndex] = useState(0)
    const [canSee, setCanSee] = useState(false);
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('')
    const [_phonePlaceholder, setPhonePlaceholder] = useState('');
    const [phoneError, _setPhoneError] = useState('');
    const [phone, setPhone] = useState('999-862-74-41');
    const phoneRef = useRef<HTMLInputElement>(null)
   
    let url = user?.photos[0];
    url = url?.startsWith('http') ? url : url ? `${Host}${url}` : DefaultImage

    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 50) {
            e.target.value = e.target.value.slice(0, 50)
            return setPasswordError('Max length is 50');
        }
        setPasswordError('');
        setPassword(e.target.value);
    }
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 50) {
            e.target.value = e.target.value.slice(0, 50)
            return setFullNameError('Max length is 50');
        }
        const v = e.target.value;
        if (v.length > 0) {
            const s = v.charAt(v.length - 1);
            e.target.value = v.trim() + (s === ' ' ? ' ' : '')
        }
        setFullNameError('');
        setFullName(e.target.value);
    }
    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let t = e.target.value;
        while (t.includes('-')) {
            t = t.replace('-', '')
        }
        let count = 0;
        t = ctn.map((c) => {

            let s = '';
            for (let i = 0; i < c; i++) {
                s += isNumber(t, count + i) ? t[count + i] : '';
            }
            count += c;
            return s + '-'
        }).join('');
        while (t.endsWith('-')) {
            t = t.endsWith('-') ? t.slice(0, t.length - 1) : t
        }
        setPhone(t)
    }
    const onIdentifierChange = (e?: React.ChangeEvent<HTMLSelectElement>) => {
        const parts = e?.target.value.split(':') || identifierList[10];
        let l = Number(parts[1]);
        ctn = [];
        while (l > 0) {
            // let t = (l - 3) >= 3 ? 3 : (l-3)<0?2:3; // 33+_2
            let t = (l - 3) >= 2 ? 3 : 2;   // 33+_22
            // let t = 2;   // +22
            // let t = 3;   // +33
            ctn.push(t);
            l -= t;
        }
        setPhonePlaceholder(ctn.map(c => {
            let s = '';
            for (let i = 0; i < c; i++) {
                s += '_';
            }
            return s
        }).join('-'))
    }
    const onAddressChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        if (currentTarget.value.length > 250) {
            currentTarget.value = currentTarget.value.slice(0, 250)
            return setFullNameError('Max length is 250');
        }
        setAddressError('');
        setAddress(currentTarget.value)
    }
    useEffect(() => {
        onIdentifierChange();
        fetchVisites({limit:15})
    }, [])

    
    if (phoneRef.current) {
    }
    return ((check('user')||current('profile')) &&
        <div className="user-page">
           <div className="user-info">
                <div className="full-name" onClick={() => {
                    setIndex(1);
                }}>
                    <div className="icon"></div>
                    <div className="label">Full Name</div>
                    <div className="val">{user?.name}</div>
                    <div className="edit"></div>
                </div>
                <div className="compte" onClick={() => {
                    setIndex(2);
                }}>
                    <div className="icon"></div>
                    <div className="label">Compte info</div>
                    <div className="val">Visa ***4559</div>
                    <div className="edit"></div>
                </div>
                <div className="address" onClick={() => {
                    setIndex(3)
                }}>
                    <div className="icon"></div>
                    <div className="label">Address</div>
                    <div className="val">Youpougon...</div>
                    <div className="edit"></div>
                </div>
                <div className="phone" onClick={() => {
                    setIndex(4)
                }}>
                    <div className="icon"></div>
                    <div className="label">Phone</div>
                    <div className="val">{phone}</div>
                    <div className="edit"></div>
                </div>
            </div>
            <div className="ctn-list">
                <h1>Last Visited Product</h1>
                <div className="list">
                    {(visites?.list)?.map((p, i) => (<div key={p.id + i} className='profile-btm-product' style={{ backgroundImage: `url(${Host}${p.images[0]})` }}>
                        <div className="min-info">
                            <div className="category">Ring</div>
                            <div className="Price">2000p</div>
                            <div className="name">Lagona</div>
                        </div>
                    </div>))

                    }
                </div>
            </div>
            <div className="edit-page" style={{ display: index == 0 ? 'none' : 'flex' }} onClick={(e) => {
                if (e.target === e.currentTarget) setIndex(0);
            }}>
                <div className="ctn">
                    <div className="center">
                        <div className="editor">
                            <div key={1} className={"space s1 " + (index == 1 ? 'active' : '')}>
                                <div className="label"> Change you Name </div>
                                <input type="text" placeholder="name" name="name" onChange={onNameChange} />
                                <div className="promt">
                                    <p className='error'>{fullNameError}</p>
                                    <p className='count'>{fullName.length}/50</p>
                                </div>
                            </div>
                            <div key={2} className={"space s5 " + (index == 5 ? 'active' : '')}>
                                <div className="label"> Change you password </div>
                                <div className="pass-ctn" >
                                    <input type={(canSee ? "text" : "password")} placeholder="password" name="pass" onChange={onPassChange} />
                                    <div className={"icon " + (canSee ? '' : 'off')} onClick={() => {
                                        setCanSee(!canSee);
                                    }}></div>
                                </div>
                                <div className="promt">
                                    <p className='error'>{passwordError}</p>
                                    <p className='count'>{password.length}/50</p>
                                </div>
                            </div>
                            <div key={3} className={"space s4 " + (index == 4 ? 'active' : '')}>
                                <div className="label"> change your phone number </div>
                                <div className="phone-ctn">
                                    <select name="identifier" onChange={onIdentifierChange}>
                                        {identifierList.map(i => (<option key={i} value={i}>{i.split(':')[0]}</option>))}
                                    </select>
                                    <input type="text" placeholder="phone number" value={phone} ref={phoneRef} name="phone" onChange={onPhoneChange} />
                                    <div className="promt">
                                        <p className='error'>{phoneError}</p>
                                    </div>
                                </div>
                            </div>
                            <div key={4} className={"space s2 " + (index == 2 ? 'active' : '')}>
                                <div className="label">Current Carte **59</div>
                                <div className="carte-nbm">
                                    <input type="text" placeholder="_ _ _" />
                                    <input type="text" placeholder="_ _ _" />
                                    <input type="text" placeholder="_ _ _" />
                                    <input type="text" placeholder="_ _ _" />
                                </div>
                                <div className="carte-name">
                                    <input type="text" placeholder="Card User Name" />
                                </div>
                                <div className="carte-btm">
                                    <input type="text" placeholder="__/__" />
                                    <input type="text" placeholder="_ _ _" />
                                </div>
                            </div>
                            <div key={5} className={"space s3 " + (index == 3 ? 'active' : '')}>
                                <div className="label"> Change your address </div>
                                <input type="text" placeholder="address" onChange={onAddressChange} />
                                <div className="promt">
                                    <p className='error'>{addressError}</p>
                                    <p className='count'>{address.length}/250</p>
                                </div>
                            </div>
                        </div>
                        <div className="end">
                            <div className="cancel" onClick={() => {
                                setIndex(0)
                            }}>Cancel</div>
                            <div className="save" onClick={() => {
                                setIndex(0)
                            }}>Save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}