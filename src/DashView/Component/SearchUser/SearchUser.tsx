import { UserInterface } from '../../../DataBase';
import { getImg, limit } from '../../../Tools/StringFormater';
import { useCollaboratorStore } from '../../Layout/PageCollaborator/CollaboratorStore';
import { useDashStore } from '../../dashStore';
import './SearchUser.css'


export function SearchUser({setUser}: {setUser:(user:UserInterface)=>void}) {

    const { fetchCollaborators, collaborators } = useCollaboratorStore()
    const {openChild} = useDashStore()
    return (
        <div className='search-user'>

            <div className="search-ctn" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}>
                <div className="close" onClick={()=>{
                    openChild(undefined);
                }}></div>
                <div className="top">
                    <div className="icon"></div>
                    <input type="text" placeholder='Search By #id , email, name' onChange={(e) => {
                        e.currentTarget.value && fetchCollaborators({
                            limit: 10,
                            query: {
                                text: e.currentTarget.value
                            }
                        })
                    }} />
                </div>
                <div className="list">
                    {
                       collaborators?.list?.map(((c,i) => {
                            return (
                                <div key={c.id} className="collabo"  onClick={()=>{
                                    openChild(undefined);
                                    setUser(c);
                                }}>
                                    <div className="photo" style={{background:getImg(c.photos[0])}}></div>
                                    <div className="name-ctn">
                                        <div className="name">{limit(c.name,20)}</div>
                                        <div className="email">{c.email}</div>
                                    </div>
                                    <div className="type">{c.s_type}</div>
                                    <div className="id">#{c.id.split('-')[0]}</div>
                                </div>
                            )
                        }))
                    }
                </div>
                {collaborators?.list && (collaborators.list.length>7)&&(<div className="see-all">
                    SEE ALL
                </div>)}
            </div>
        </div>
    )
}