import { useEffect, useState } from 'react';
import './ProfilePhoto.css'
import { DefaultImage } from '../../AppStore';
import { getImg } from '../../../Tools/StringFormater';

let i = 0;

    export function ProfilePhoto(props: {photo:string|undefined, onOpen: (photo: string) => any, onChange: (fileList: FileList|null) => any, canOpen: boolean, canEdit: boolean }) {
        const [initUrl ,  setInitUrl] = useState(props.photo || DefaultImage);
    
        const onImageChange = (event: any) => {
            if (event.target.files && event.target.files[0]) {
                props.onChange(event.target.files);
                // setUrl(URL.createObjectURL(event.target.files[0]))
            }
        }

        const [id] = useState((Math.random()+(i++)).toString())
        
        return (
            <div className="profile-photo" style={{ background:getImg(props.photo||DefaultImage,undefined ,props.photo?undefined:false)}}>
                <div className="open" style={{ display: props.canEdit ? 'block' : 'none' }} onClick={() => {
                    props.onOpen(initUrl);
                }}></div>
                <input id={id} type='file' onChange={onImageChange} />
                <label className="edit" style={{ display: props.canEdit ? 'initial' : 'none' }} htmlFor={id}></label>
            </div>
        )
    }
    