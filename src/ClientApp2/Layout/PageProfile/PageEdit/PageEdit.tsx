// import { useProfileStore } from '../../PageProfile/ProfileStore'
import { useEffect, useState } from 'react'
import { useRegisterStore } from '../../PageRegister/RegisterStore'
import './PageEdit.css'
import { getImg } from '../../../../Tools/StringFormater'

export function PageEdit() {

    const { updateUser, user } = useRegisterStore()
    const [collected,setCollected] = useState<any>({})

    useEffect(()=>{
        setCollected({
            name:user?.name,
            address:(user as any)?.address||'Yopouon',
            phone:(user as any)?.phone ||'+7(999)862-74-41',
            date:(user as any)?.created_at,
            money:(user as any)?.money || 'USD'
        })
    },[user])
    return <div className="page-edit">
        <div className="photo" style={{background:user && getImg(user.photos[0])}}>
            <div className="div">
            <label htmlFor='new-photo' className="new-photo">
                <input style={{display:'none'}} type="file" name="new-photo" id="new-photo" onChange={(e) => {
                    updateUser({
                        photo: e.currentTarget.files?.[0]
                    })
                }} />
            </label>
            </div>
        </div>
        <div className="infos">
            <label htmlFor='edit-email' className='edit-email'>
                   <div className="prompt">User Email</div>
                <div className="icon"></div>
                <input id='edit-email' type="text" placeholder='Edit Name' value={user?.email} />
            </label>
            <label htmlFor='edit-name' className='edit-name'>
                   <div className="prompt">Name</div>
                <div className="icon"></div>
                <input id='edit-name' type="text" placeholder='Edit Name' value={collected.name} onChange={(e) => {
                    setCollected({
                        ...collected,
                        text: e.currentTarget.value
                    });
                }} />
                <div className="send" onClick={() => {
                    // setCollected({
                    //     ...collected,
                    //     text: ''
                    // });
                }}></div>
            </label>
            <label htmlFor='edit-phone' className='edit-phone'>
                   <div className="prompt">Phone</div>
                <div className="icon"></div>
                <input id='edit-phone' type="text" placeholder='Search Product' value={collected.phone} onChange={(e) => {
                    setCollected({
                        ...collected,
                        text: e.currentTarget.value
                    });
                }} />
                <div className="send" onClick={() => {
                    // setCollected({
                    //     ...collected,
                    //     text: ''
                    // });
                }}></div>
            </label>
            <label htmlFor='edit-address' className='edit-address'>
                   <div className="prompt">Address</div>
                <div className="icon"></div>
                <input id='edit-address' type="text" placeholder='Search Product' value={collected.address} onChange={(e) => {
                    setCollected({
                        ...collected,
                        text: e.currentTarget.value
                    });
                }} />
                <div className="send" onClick={() => {
                    // setCollected({
                    //     ...collected,
                    //     text: ''
                    // });
                }}></div>
            </label>
            <label htmlFor='edit-date' className='edit-date'>
                   <div className="prompt">date of birth</div>
                <div className="icon"></div>
                <input type="text"  placeholder={'dd-mm-yyyy'} value={new Date(collected.date).toDateString()}  onChange={(e) => {
                    setCollected({
                        ...collected,
                        text: e.currentTarget.value
                    });
                }} /> 
                  <input style={{display:'none'}} id='edit-date' type="date"  min="1997-01-01" max={new Date().toDateString()} placeholder={new Date().toDateString()}   onChange={(e) => {
                    setCollected({
                        ...collected,
                        text: e.currentTarget.value
                    });
                }} />
                <div className="send" onClick={() => {
                    // setCollected({
                    //     ...collected,
                    //     text: ''
                    // });
                }}></div>
            </label>
            <label htmlFor='edit-devise' className='edit-devise'>
                   <div className="prompt">Default Money</div>
                <div className="icon"></div>
                <input id='edit-devise' type="text" placeholder='Search Product' value={collected.money} onChange={(e) => {
                    setCollected({
                        ...collected,
                        text: e.currentTarget.value
                    });
                }} />
                <div className="send" onClick={() => {
                    // setCollected({
                    //     ...collected,
                    //     text: ''
                    // });
                }}></div>
            </label>
        </div>
    </div>
}