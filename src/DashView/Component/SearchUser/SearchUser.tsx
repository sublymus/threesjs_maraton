import { useEffect, useRef, useState } from 'react';
import { ListType, UserInterface } from '../../../DataBase';
import { getImg, limit } from '../../../Tools/StringFormater';
import './SearchUser.css'

export function SearchUser({setUser, fetchUsers , user ,openChild, setAbsPath, selector}: {selector?:{setSelected:(selected:string)=>any,list:{name:string,fetch:(filter?:Record<string,any>)=>Promise<ListType<UserInterface>|undefined>}[]}, setAbsPath:Function,openChild:Function,user:UserInterface, fetchUsers:(filter?:Record<string,any>)=>Promise<ListType<UserInterface>|undefined>,setUser:(user:UserInterface, selected?:string)=>void}) {
    const [uers, setUsers] = useState<ListType<UserInterface>>();
    const [f,setF] = useState({fetchUsers});
    useEffect(()=>{
        f.fetchUsers({}).then((users:any)=>{
            if(users?.list){
                return setUsers(users,)
            }
        });
    },[f])
    const e= uers?.list.filter(f=>f.id != user?.id)
    const ref = useRef<HTMLSelectElement|null>(null)
    return (
        <div className='search-user'>

            <div className="search-ctn"onContextMenu={(e)=>{
                e.stopPropagation();
                e.preventDefault();
            }} onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <div className="close" onClick={()=>{
                    openChild(undefined);
                }}></div>
                <div className="top">
                    <div className="icon"></div>
                    <input autoFocus type="text" placeholder='Search By #id , email, name' onChange={(e) => {
                        f.fetchUsers({
                            limit: 10,
                            query: {
                                text: e.currentTarget.value
                            }
                        }).then(users=>{
                            if(users?.list){
                                return setUsers(users)
                            }
                        });
                    }} />
                   {selector && (
                        <select ref={ref} name="search-select" id="search-select"  onChange={(e)=>{
                            selector.setSelected(e.currentTarget.value)
                            const _f = selector.list.find(l=>l.name==e.currentTarget.value)?.fetch
                            _f && setF({fetchUsers:_f})
                        }}>
                            {
                                selector.list.map(s=>(
                                    <option key={s.name} value={s.name}>{s.name}</option>
                                ))
                            }
                        </select>
                   )}
                </div>
                <div className="list">
                    {
                       e?.map(((c,i) => {
                            return (
                                <div key={c.id+i} className="collabo"  onClick={()=>{
                                    openChild(undefined);
                                    setUser(c,ref.current?.value);
                                }}>
                                    <div className="photo" style={{background:getImg(c.photos[0])}}></div>
                                    <div className="name-ctn">
                                        <div className="name">{limit(c.name,20)}</div>
                                        <div className="email">{c.email}</div>
                                    </div>
                                    <div className="id">#{c.id.split('-')[0]}</div>
                                </div>
                            )
                        }))
                    }
                </div>
                {e && (e.length>7)&&(<div className="see-all" onClick={()=>{
                    setAbsPath(['collaborators']);
                    openChild(undefined)
                }}>
                    SEE ALL
                </div>)}
            </div>
        </div>
    )
}