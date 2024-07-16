import './ProductComment.css'
import { type ProductComment as TypeProductComment } from "../../../DataBase";
import { getImg } from '../../../Tools/StringFormater';
import { NoteStars } from '../NoteStars/NoteStars';
import { useState } from 'react';

export function ProductComment({ comment: c, canOpen }: { comment: TypeProductComment, canOpen?: boolean }) {

    const [openResponse, setOpenResponse] = useState(false);
    return <div className="product-comment">
        <div className="top">
            <div className="photo" style={{ background: c.user ? getImg(c.user.photos[0]) : '' }}><span style={{ background: c.user?.country_icon ? getImg(c.user.country_icon) : '' }}></span></div>
            <div className="coment-right">
                <div className="flex">
                    <div className="name">{c.user?.name}</div>
                    <NoteStars note={c.note} />
                </div>
                <div className="date">{new Date(c.created_at).toLocaleDateString()}</div>
            </div>
        </div>
        <div className="message">{c.message}</div>
        {
            canOpen && <>
                <div className={"open-response " + (openResponse ? 'open' : '')} onClick={() => {
                    setOpenResponse(!openResponse)
                }}>Open response <span></span></div>
                <div className={"response " + (openResponse ? 'open' : '')}>{c.response}</div>
            </>

        }
    </div>
} 