import './ProductComment.css'
import { type ProductCommentInterface } from "../../../DataBase";
import { getImg } from '../../../Tools/StringFormater';
import { NoteStars } from '../NoteStars/NoteStars';
import { useState } from 'react';
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { useCommentStore } from '../../Layout/PageProducts/CommentStore';
import { Host } from '../../../Config';

export function ProductComment({ comment: c, canOpen, onClick }: { onClick?: (data?: { comment?: ProductCommentInterface, relative?: number }) => any, comment: ProductCommentInterface, canOpen?: boolean }) {

    const [openResponse, setOpenResponse] = useState(false);
    const [openOption, setOpenOption] = useState(false);
    const { userStore, manager } = useRegisterStore()
    const { deleteComment, sendCommentResponse, fetcheditCommentText } = useCommentStore()
    const isManager = (
        manager?.type.toLocaleLowerCase() == 'collaborator' ||
        manager?.type.toLocaleLowerCase() == 'owner'
    )

    const [editMessage, setEditMessage] = useState(false)
    const [editResponse, setEditResponse] = useState(false)
    const [editMessageText, setEditMessageText] = useState(c.text || '')
    const [editResponseText, setEditResponseText] = useState(c.response || '')
    const isUser = userStore?.user_id == c.user_id;
    const [ref, setRef] = useState<HTMLDivElement | null>(null)

    // const currentFiles = [...(c.photos || []), ...(c.videos || [])]

    return <div ref={setRef} className="product-comment" onClick={() => onClick?.()}>
        <div className="top">
            <div className="photo" style={{ background: c.user ? getImg(c.user.photos[0]) : '' }}><span style={{ background: c.user?.country_icon ? getImg(c.user.country_icon) : '' }}></span></div>
            <div className="coment-right">
                <div className="flex" style={{ flexWrap: 'nowrap' }}>
                    <div className="flex">
                        <div className="name">{c.user?.name}</div>
                        <NoteStars note={c.note} />
                    </div>
                    {
                        (isUser || isManager) && <>
                            <div className="option" onClick={() => {
                                setOpenOption(!openOption)
                            }}></div>
                            <div className={"ctn-option " + (openOption ? 'open' : '')} onClick={() => {
                                setOpenOption(false)
                            }}>
                                <div className="delete" onClick={() => {
                                    deleteComment(c, 300).then((r) => {
                                        if (r?.deleted) {
                                            ref?.classList.add('deleted');
                                            setTimeout(() => {
                                                ref && (ref.style.display = 'none')
                                            }, 300);

                                        }
                                    })
                                }}>Delete</div>
                                {
                                    isUser && <div className="edit-comment" onClick={() => {
                                        setEditMessage(true)
                                        setEditResponse(false)
                                    }}>Edit Comment</div>
                                }
                                {
                                    isManager && <div className="edit-response" onClick={() => {
                                        setEditResponse(true)
                                        setEditMessage(false)
                                    }}>{c.response ? 'Edit Response' : 'Add Response'}</div>
                                }
                            </div>
                        </>

                    }
                </div>
                <div className="date">{new Date(c.created_at).toLocaleDateString()}</div>
            </div>
        </div>
        <div className="message-ctn">
            <div className="gap"></div>
            <div className="message">{
                editMessage ? <label htmlFor={"edit-comment-" + c.id}><input id={'edit-comment-' + c.id} type="text" value={editMessageText} placeholder='Edit Comment' onChange={(e) => {
                    setEditMessageText(e.currentTarget.value)
                }} /><span onClick={() => {
                    setEditResponse(false);
                    setEditMessage(false)
                    fetcheditCommentText({
                        comment_id: c.id,
                        text: editMessageText
                    })
                }}></span></label> : c.text
            }</div>
        </div>
        <div className="message-ctn">
            <div className="gap"></div>
            {
                (canOpen && (c.photos_count > 0 || c.videos_count > 0)) && <div className="files-ctn">

                    {
                        c.photos.map((a, i) => (
                            <div key={a} style={{ background: getImg(a) + ',#4544' }} onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onClick?.({
                                    comment: c,
                                    relative: i
                                })
                            }}></div>
                        ))
                    }
                    {
                        c.videos.map((a, i) => (
                            <div key={a} onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                onClick?.({
                                    comment: c,
                                    relative: c.photos.length + i
                                })
                            }}>
                                <video width={60} height={60} src={`${Host}${a}`} ></video>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
        {
            ((canOpen && c.response) || editResponse) && <>
                <div className={"open-response " + ((openResponse || editResponse) ? 'open' : '')} onClick={() => {
                    setOpenResponse(!openResponse)
                    setEditResponse(false)
                    setEditMessage(false)
                }}>{c.response ? 'Open response' : 'Add Response'}<span></span></div>
                <div className={"response " + ((openResponse || editResponse) ? 'open' : '')}>{
                    editResponse ? <label htmlFor={"edit-response-" + c.id}><input id={'edit-response-' + c.id} type="text" value={editResponseText} placeholder='Edit Response' onChange={(e) => {
                        setEditResponseText(e.currentTarget.value);
                    }} /><span onClick={() => {
                        setEditResponse(false);
                        setOpenResponse(true)
                        sendCommentResponse({
                            comment_id: c.id,
                            response: editResponseText
                        })
                    }}></span></label> : c.response
                }</div>
            </>
        }
    </div>
} 