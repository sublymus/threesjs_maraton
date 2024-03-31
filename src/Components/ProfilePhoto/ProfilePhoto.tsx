import { useEffect, useState } from 'react';
import './ProfilePhoto.css'

let i = 0;

    export function ProfilePhoto(props: {photo:string, onOpen: (photo: string) => any, onChange: (fileList: FileList|null) => any, canOpen: boolean, canEdit: boolean }) {
        const [initUrl ,  setInitUrl] = useState(props.photo);
        
        const onImageChange = (event: any) => {
            if (event.target.files && event.target.files[0]) {
                props.onChange(event.target.files);
                // setUrl(URL.createObjectURL(event.target.files[0]))
            }
        }

        useEffect(()=>{
            setInitUrl(props.photo)
        } , []);
        
        const id  =( Math.random()+(i++)).toString();
        return (
            <div className="profile-photo" style={{ backgroundImage:(props.canEdit? `url('${props.photo}')`:`url('${initUrl}')`) }}>
                <div className="open" style={{ display: props.canEdit ? 'block' : 'none' }} onClick={() => {
                    props.onOpen(props.photo);
                }}></div>
                <input id={id} type='file' onChange={onImageChange} />
                <label className="edit" style={{ display: props.canEdit ? 'initial' : 'none' }} htmlFor={id}></label>
            </div>
        )
    }
    