import { useEffect, useState } from 'react'
import { CommandInterface, ProductCommentInterface, ProductInterface } from '../../../DataBase'
import { ProductComment } from '../../Components/ProductComment/ProductComment'
import { ToImagesRating } from './DetailProduct'
import './PageComments.css'
import { getImg } from '../../../Tools/StringFormater'
import { useCommentStore } from "./CommentStore";
import { useAppRouter, useAppStore } from '../../AppStore'
import { PageAuth } from "../PageRegister/PageAuth";
import { useRegisterStore } from '../PageRegister/RegisterStore'

export function PageComments({ product, setRef, userCommand,ImageComments, onRefresh }: {
    onRefresh?:()=>any,
    ImageComments: {
        images: string[],
        more: boolean
    } | undefined, userComment?: ProductCommentInterface, userCommand?: CommandInterface, setRef: (ref: HTMLElement | null) => any, product: ProductInterface
}) {
    const { userComment, comments, create_product_comment, fetchProductComments, setIndex } = useCommentStore()
    const { openChild } = useAppStore()
    const { user } = useRegisterStore()
    const { navBack, qs, current, json } = useAppRouter()
    const [photos, setPhotos] = useState<File[]>([])
    const [videos, setVideos] = useState<File[]>([])
    const [text, setText] = useState('');
    const [star, setStar] = useState(0);
    const [_seeMyComment, setSeeMyComment] = useState(false);
    const [newComment, setNewComment] = useState<ProductCommentInterface>();
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        order_by: 'created_at_desc',
        order_text: 'Date',
        with_photo: false,
        with_video: false,
        limit: 20,
        page: 1
    })
    const [openFilterOption, setOpenFilterOption] = useState(false);
    useEffect(() => {
        fetchProductComments({
            product_id: product.id,
            ...filter
        });
    }, [newComment, product, filter, json])

    return current('comments') && <section className={'page-comments ' + (current('comments') ? 'open' : 'close')} ref={setRef}>
        <div className="top" >
            <div className="return" onClick={() => {
                navBack()
            }}></div>
            <h1>Comments</h1>
            <div className="option"></div>
        </div>
        <ToImagesRating images={ImageComments?.images} more={ImageComments?.more} product={product} onClick={() => qs().keepJson().setAbsPath(['products', 'detail', 'images'])} />
        <div className="write-comment">
            <div className="top-prompt"> Leave a comment <span></span></div>
            {
                newComment ? (<div>Thank you for the comment.</div>) :
                    userComment ? (<div>You have already commented on this product <span onClick={() => setSeeMyComment(true)}> see my comment</span></div>) :
                        !userCommand?.payment_id ? (<div>Comments are allowed after purchasing the product</div>) :
                            (<div className='zone-inputs'>
                                <div className="user-rating">
                                    <div className="stars">
                                        <div className={"icon " + (star >= 1 ? 'star' : '')} onClick={() => setStar(1)}></div>
                                        <div className={"icon " + (star >= 2 ? 'star' : '')} onClick={() => setStar(2)}></div>
                                        <div className={"icon " + (star >= 3 ? 'star' : '')} onClick={() => setStar(3)}></div>
                                        <div className={"icon " + (star >= 4 ? 'star' : '')} onClick={() => setStar(4)}></div>
                                        <div className={"icon " + (star == 5 ? 'star' : '')} onClick={() => setStar(5)}></div>
                                    </div>
                                    <div className="value">{star}</div>
                                </div>
                                {!!star && (
                                    <label htmlFor='comment-input-text' className="input-text">
                                        <input id='comment-input-text' autoFocus type="text" value={text} placeholder='Write Comment' onChange={e => {
                                            setText(e.target.value.substring(0, 200))
                                        }} />
                                        <div className="div">{text.length}/200</div>
                                    </label>
                                )}
                                <input multiple style={{ display: 'none' }} type="file" name="comment-photo" id="comment-photo" accept='image/*' onChange={(e) => {
                                    if (e.target.files) {
                                        for (const file of e.target.files) {
                                            photos.unshift(file)
                                        }
                                        setPhotos([...photos].slice(0, 5));
                                    }
                                }} />
                                <input multiple style={{ display: 'none' }} type="file" name="comment-video" id="comment-video" accept='video/*' onChange={(e) => {
                                    if (e.target.files) {
                                        for (const file of e.target.files) {
                                            videos.unshift(file)
                                        }
                                        setVideos([...videos].slice(0, 2));
                                    }
                                }} />
                                <div className="files-ctn" style={{ display: !!star && text ? 'flex' : 'none' }}>
                                    <div className="photo-ctn">
                                        <label htmlFor='comment-photo' className="photo"><span></span>Photo {photos.length}/5</label>
                                        <div className="files-photo">
                                            {
                                                photos.map((c) => (
                                                    <div key={c.name} style={{ background: getImg(URL.createObjectURL(c)) }}><span onClick={() => {
                                                        setPhotos(photos.filter(p => p != c));
                                                    }}></span></div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="video-ctn">
                                        <label htmlFor='comment-video' className="photo"><span></span>Video {videos.length}/2</label>
                                        <div className="files-video">
                                            {
                                                videos.map((c) => (
                                                    <div key={c.name}>
                                                        <video width={80} height={80} src={URL.createObjectURL(c)} ></video>
                                                        <span onClick={() => {
                                                            setVideos(videos.filter(p => p != c));
                                                        }}></span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={"send-comment " + (loading ? 'loading' : '')}><span className={'text ' + (text.trim() ? '' : 'no')} onClick={() => {
                                    if (!user) {
                                        return openChild(<PageAuth />, false,/* background 80% */ '#3455')
                                    }
                                    if (!!star && text) {
                                        setLoading(true)
                                        create_product_comment({
                                            note: star,
                                            photos,
                                            product_id: product.id,
                                            text,
                                            videos
                                        }).then((c) => {
                                            setLoading(false)
                                            if (c?.id) {
                                                setNewComment(c)
                                                onRefresh?.()
                                            }
                                            return;
                                        })
                                    }
                                }}>Send</span> <span className='loading'></span></div>
                            </div>)
            }
        </div>
        <div className="my-comment">
            {
                userComment && <ProductComment comment={userComment} canOpen={true} />
            }
        </div>
        <div className="filter">
            <div className={"date active"} onClick={() => {
                setOpenFilterOption(!openFilterOption)
            }}>{filter.order_text}
                <span className={filter.order_by.includes('desc') ? 'desc' : ''}></span>
                <div className={openFilterOption ? 'open' : ''}>
                    <div onClick={() => setFilter({ ...filter, order_by: 'created_at_desc', order_text: 'Date' })}>Date <span className='desc'></span></div>
                    <div onClick={() => setFilter({ ...filter, order_by: 'created_at_asc', order_text: 'Date' })}>Date <span className=''></span></div>
                    <div onClick={() => setFilter({ ...filter, order_by: 'note_desc', order_text: 'Star' })}>Star <span className='desc'></span></div>
                    <div onClick={() => setFilter({ ...filter, order_by: 'note_asc', order_text: 'Star' })}>Star <span className=''></span></div>
                </div>
            </div>
            <div className={"photo " + (filter.with_photo ? 'active' : '')} onClick={() => setFilter({ ...filter, with_photo: !filter.with_photo })}>With Photo</div>
            <div className={"video " + (filter.with_video ? 'active' : '')} onClick={() => setFilter({ ...filter, with_video: !filter.with_video })}>With Video</div>
        </div>
        <div className="comments">
            {
                comments?.list.map((c) => (
                    <ProductComment key={c.id} comment={c} canOpen={true} onClick={(d) => {
                        const a = d?.comment;
                        if (a) {
                            qs().keepJson().setAbsPath(['products', 'detail', 'images'])
                            setIndex({
                                comment: a,
                                relative: d.relative
                            })
                        }
                    }} />
                ))
            }
        </div>
    </section>
}