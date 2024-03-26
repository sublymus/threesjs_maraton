import { DefaultImage, Host, useAppStore } from "../../AppStore"
import './PageUser.css'
import { useRegisterStore } from "../PageRegister/RegisterStore";
import { useProfileStore } from "../PageProfile/ProfileStore";
import { ProfilePhoto } from "../../Components/ProfilePhoto/ProfilePhoto";
import { ProductInterface } from "../../DataBase";
import { useProductStore } from "../../Components/Products/ProductStore";
import { useEffect, useRef, useState } from "react";

['33+','33+_2','33+_22','3_+22','+22']
const identifierList: string[] = [];
for (let i = 0; i < 12; i++) {
    identifierList.push('+'+i+':'+i+':1');
}
const list:string[] =[];
for (let i = 0; i < 10; i++) {
   list.push(i.toString())
}
const isNumber =(s:string , i?:number)=>{
    return  list.includes(s.charAt(i||0));
}

function doGetCaretPosition(ctrl: HTMLInputElement) {
    var CaretPos = 0;

    if (ctrl.selectionStart || ctrl.selectionStart == 0) {// Standard.
        CaretPos = ctrl.selectionStart;
    }
    else if (document.getSelection()) {// Legacy IE
        //   ctrl.focus ();
        //   var Sel = new Range();
        //   Sel.moveStart ('character', -ctrl.value.length);
        //   CaretPos = Sel.text.length;
    }

    return (CaretPos);
}


// function setCaretPosition(ctrl:HTMLInputElement,pos:number)
// {
//  if (ctrl.setSelectionRange)
//  {
//   ctrl.focus();
//   ctrl.setSelectionRange(pos,pos);
//  }
//  else if (ctrl.createTextRange)
//  {
//   var range = ctrl.createTextRange();
//   range.collapse(true);
//   range.moveEnd('character', pos);
//   range.moveStart('character', pos);
//   range.select();
//  }
// }
let ctn :number[] = []

export function PageUser() {
    const { check } = useAppStore();
    const { user } = useRegisterStore();
    const { openPhoto } = useProfileStore();
    const { products } = useProductStore();
    const [index, setIndex] = useState(0)
    const [canSee, setCanSee] = useState(false);
    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [method, setMethod] = useState('');
    const [methodError, setMethodError] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [counter, setICounter] = useState<number[]>([]);
    const [phone, setPhone] = useState('');
    const phoneRef = useRef<HTMLInputElement>(null)
    const updateProfilePhoto = () => {
    }
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
        
        let  t = e.target.value;
        while (t.includes('-')) {
            t = t.replace('-','')
        }
        let count = 0;
        t = ctn.map((c,e) => {
            console.log(c, e);
            
            let s = '';
            for (let i = 0; i < c; i++) {
                s += isNumber(t,count+i)?t[count+i]:'';
            }
            count +=c;
            return s+'-'
        }).join('');
        while (t.endsWith('-')) {
            t = t.endsWith('-')? t.slice(0, t.length-1):t
        }
        
        setPhone(t)
    }
    const onIdentifierChange = (e?: React.ChangeEvent<HTMLSelectElement>) => {
        const parts = e?.target.value.split(':') || identifierList[10];
        let l = Number(parts[1]);
        console.log({l});
        ctn = [];
        while (l > 0) {
            // let t = (l - 3) >= 3 ? 3 : (l-3)<0?2:3; // 33+_2
            let t = (l - 3) >= 2 ? 3:2;   // 33+_22
            // let t = 2;   // +22
            // let t = 3;   // +33
            ctn.push(t);
            l -= t;
        }        
        setICounter(ctn)
        setPhone(ctn.map(c => {
            let s = '';
            for (let i = 0; i < c; i++) {
                s += '_';
            }
            return s
        }).join('-'));
    }
    useEffect(() => {
        onIdentifierChange();
    },[])

    console.log('etet');
    
    if (phoneRef.current) {
    }
    return (check('user') &&
        <div className="user-page">
            <div className="user-top">
                <div className="info">
                    <h1 className="full_name">{user?.full_name}</h1>
                    <h2 className="email">{user?.email}</h2>
                    <h1 className="created_at">{user?.createdAt}</h1>
                </div>
                <div className="user-photo">
                    <ProfilePhoto init={url} canEdit={!!user} canOpen onChange={updateProfilePhoto} onOpen={(photo) => openPhoto(photo)} />
                </div>
            </div>
            <div className="user-info">
                <div className="full-name" onClick={() => {
                    setIndex(1);
                }}>
                    <div className="icon"></div>
                    <div className="label">Full Name</div>
                    <div className="val">Visa ***4559</div>
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
                    <div className="val">+7(999)862-74-41</div>
                    <div className="edit"></div>
                </div>
                <div className="password" onClick={() => {
                    setIndex(5)
                }}>
                    <div className="icon"></div>
                    <div className="label">Password</div>
                    <div className="val">********</div>
                    <div className="edit"></div>
                </div>
                <div className="logout">
                    <div className="icon"></div>
                    <div className="label">Logout</div>
                </div>
            </div>
            <div className="ctn-list">
                <h1>Last Visited Product</h1>
                <div className="list">
                    {([...products, ...products, ...products]).map((p, i) => (<div key={p.id + i} className='profile-btm-product' style={{ backgroundImage: `url(${Host}${p.images[0]})` }}>
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
                    <div className="left" onClick={() => {
                        setIndex(index - 1 < 1 ? 1 : index - 1)
                    }}></div>
                    <div className="center">
                        <div className="card">
                            <div className={"space 1 " + (index == 1 ? 'active' : '')}>
                                <div className="label"> Change you Name </div>
                                <input type="text" name="name" onChange={onNameChange} />
                                <div className="promt">
                                    <p className='error'>{passwordError}</p>
                                    <p className='count'>{password.length}/50</p>
                                </div>
                            </div>
                            <div className={"space 5 " + (index == 5 ? 'active' : '')}>
                                <div className="label"> Change you password </div>
                                <div className="pass-ctn" >
                                    <input type={(canSee ? "text" : "password")} name="pass" onChange={onPassChange} />
                                    <div className={"icon " + (canSee ? '' : 'off')} onClick={() => {
                                        setCanSee(!canSee);
                                    }}></div>
                                </div>
                                <div className="promt">
                                    <p className='error'>{passwordError}</p>
                                    <p className='count'>{password.length}/50</p>
                                </div>
                            </div>
                            <div className={"space 4 " + (index == 4 ? 'active' : '')}>
                                <div className="label"> change your phone number </div>
                                <div className="phone-ctn">
                                    <select name="identifier" onChange={onIdentifierChange}>
                                        {identifierList.map(i => (<option key={i} value={i}>{i.split(':')[0]}</option>))}
                                    </select>
                                    <input type="text" value={phone} ref={phoneRef} name="phone" onChange={onPhoneChange} />

                                </div>
                            </div>
                            <div className={"space 2 " + (index == 2 ? 'active' : '')}>

                                <div className="label"> Change Payement Method </div>
                                <div className="pass-ctn" onClick={() => {
                                    setCanSee(!canSee);
                                }}>
                                    <input type={(canSee ? "text" : "password")} name="pass" />
                                    <div className={"icon " + (canSee ? '' : 'off')}></div>
                                </div>
                                <div className="promt">
                                    <p className='error'>{fullNameError}</p>
                                    <p className='count'>{fullName.length}/20</p>
                                </div>
                            </div>
                            <div className={"space 3 " + (index == 3 ? 'active' : '')}>
                                <div className="label"> Change your address </div>
                                <div className="pass-ctn" onClick={() => {
                                    setCanSee(!canSee);
                                }}>
                                    <input type={(canSee ? "text" : "password")} name="address" />
                                    <div className={"icon " + (canSee ? '' : 'off')}></div>
                                </div>
                                <div className="promt">
                                    <p className='error'>{fullNameError}</p>
                                    <p className='count'>{fullName.length}/20</p>
                                </div>
                            </div>
                        </div>
                        <ul className="index">
                            {[1, 2, 3, 4, 5].map(n => (
                                <li key={n} className={n + " " + (index == n ? 'active' : '')} onClick={() => {
                                    setIndex(n)
                                }}></li>
                            ))}
                        </ul>
                        <div className="save" onClick={() => {
                            setIndex(0)
                        }}>Save</div>
                    </div>
                    <div className="right" onClick={() => {
                        setIndex(index + 1 > 5 ? 5 : index + 1)
                    }}></div>
                </div>
            </div>
        </div>
    )
}