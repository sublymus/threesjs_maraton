import { useEffect, useState } from 'react';
import { CommentIndex, ProductInterface } from '../../../DataBase';
import './PageImage.css'
import { useCommentStore } from './CommentStore';
import { toFilter } from '../../../Tools/FilterColor';
import { getImg, limit } from '../../../Tools/StringFormater';
import { NoteStars } from '../../Components/NoteStars/NoteStars';
import { Host } from '../../../Config';
import { useAppRouter } from '../../AppStore';
import { ProductComment } from '../../Components/ProductComment/ProductComment';

export function PageImage({ product }: { product: ProductInterface }) {

    const { current, navBack , pathList} = useAppRouter()
    const { getCommentIndex, index } = useCommentStore();

    const [videoRef, setVideoRef] = useState<HTMLDivElement | null>(null)

    const [relativeIndex, setRelativeIndex] = useState(index?.relative || 0);
    const [commentIndex, setCommentIndex] = useState<CommentIndex>();
    const [s] = useState<any>({});
    const [openComment, setOpenComment] = useState(false);
    const [filter, setFilter] = useState({
        move: '' as 'next' | 'back' | '',
        comment_id: index?.comment.id,
    });


    useEffect(() => {
        current('images') && product && getCommentIndex({
            product_id: product.id,
            comment_id: filter.comment_id || index?.comment.id,
            move: filter.move || undefined
        }).then((res) => {
            console.log({ res });
            if (res?.comment?.id) {
                if (filter.move == 'back') {
                    setRelativeIndex(res.comment.photos_count + res.comment.videos_count - 1)
                } else if (filter.move == 'next') {
                    setRelativeIndex(0)
                } else {
                    let a = (index?.relative ?? relativeIndex) || 0;
                    const l = res.comment.photos_count + res.comment.videos_count;
                    a = a <= 0 ? 0 : a >= l - 1 ? l - 1 : a;
                    setRelativeIndex(a)
                }
                filter.move = ''
                filter.comment_id = undefined
                setCommentIndex(res)
            }
        })
    }, [filter, index, pathList]);

    useEffect(() => {
       current('images') &&( (()=>{
        setFilter({ comment_id: undefined, move: '' });
        setCommentIndex(undefined)
        console.log({ commentIndex });
       })())
    }, [product, pathList])

    useEffect(() => {
        if (s.init) return
        s.init = true
        window.addEventListener('keyup', (e) => {
            if (e.code == 'ArrowRight') {
                s.moveNext()
            } else if (e.code == 'ArrowLeft') {
                s.moveBack()
            }
        })
    }, [])

    const moveBack = () => {
        if (relativeIndex <= 0) {
            console.log('back comment ');
            commentIndex && setFilter({ ...filter, comment_id: commentIndex.comment.id, move: 'back' })
        } else {
            console.log('back image ');
            setRelativeIndex(relativeIndex - 1)
        }
    }
    const moveNext = () => {
        if (relativeIndex >= currentFiles.length - 1) {
            console.log('next comment ');

            commentIndex && setFilter({ ...filter, comment_id: commentIndex.comment.id, move: 'next' })
        } else {
            console.log('next image ');
            setRelativeIndex(relativeIndex + 1)
        }
    }

    s.moveNext = moveNext;
    s.moveBack = moveBack;

    const currentFiles = [...(commentIndex?.comment?.photos || []), ...(commentIndex?.comment?.videos || [])]


    return current('images') && !commentIndex?.comment ? <div className="image-not-found">
        <p className="text">no images or videos found for this product.</p>
        <div onClick={() => navBack()}><span></span>go back</div>
    </div> :
        current('images') && commentIndex?.comment && <section className={'page-comment-image ' + (current('images') ? 'open' : 'close')}>
            <div className="page-top">
                <div className="return" style={{ filter:/* discret-color */ toFilter('#fff').result.filter }} onClick={() => navBack()}></div>
                <div className="count">{(commentIndex?.befor || 0) + relativeIndex} / {commentIndex?.total || 0}</div>
            </div>
            <div className="file-view _flex _center">
                {
                    (relativeIndex > (commentIndex?.comment?.photos_count || 0) - 1) ? <div className="video _flex" ref={ref => {
                        if (!ref) return;
                        if (ref.dataset.init) return;
                        ref.dataset.init = 'init';
                        setVideoRef(ref)
                        const setSize = () => {
                            const v = ref.querySelector('video')! as HTMLVideoElement
                            const rect = ref.getBoundingClientRect()
                            v.width = rect.width;
                        }
                        window.addEventListener('resize', setSize);
                    }}>
                        <video loop autoPlay controls width={videoRef?.getBoundingClientRect().width} src={`${Host}${currentFiles[relativeIndex]}`}></video>
                    </div>
                        :
                        <div className="photo">
                            <div className="img" style={{ background: getImg(currentFiles[relativeIndex], '100%') }}></div>
                        </div>
                }
                <div className="move-next" onClick={moveNext}>
                    <div className="next"><span></span></div>
                </div>
                <div className="move-back" onClick={moveBack}>
                    <div className="back"><span></span></div>
                </div>
            </div>
            <div className="btm">
                <div className="top _flex _wrap">
                    <div className="name">{limit(commentIndex?.comment.user?.name || '', 50)}</div>
                    <div className="_flex  _l-auto">
                        <NoteStars note={commentIndex?.comment?.note || 0} />
                        <div className="open" onClick={() => setOpenComment(true)}>Open</div>
                    </div>
                </div>
                <div className="message">
                    {
                        limit(commentIndex?.comment.text || '', 100)
                    }
                </div>
                <div className={"preview-comment "+(openComment?'open':'close')}>
                    <div className="close" onClick={()=>{
                        setOpenComment(false)
                    }}></div>
                    <ProductComment canOpen comment={commentIndex.comment} />
                </div>
            </div>
        </section>
} 