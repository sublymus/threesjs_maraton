import { useEffect, useState } from 'react';
import { CommentIndex, ProductInterface } from '../../../DataBase';
import './PageImage.css'
import { useCommentStore } from './CommentStore';
import { toFilter } from '../../../Tools/FilterColor';
import { getImg, limit } from '../../../Tools/StringFormater';
import { NoteStars } from '../../Components/NoteStars/NoteStars';
import { Host } from '../../../Config';

export function PageImage({ product, page, setPage }: {  product: ProductInterface, page: string, setPage: (page: string) => any }) {

    const { getCommentIndex, index , lastPage } = useCommentStore();
    const [relativeIndex, setRelativeIndex] = useState(index?.relative || 0);
    const [commentIndex, setCommentIndex] = useState<CommentIndex>();
    const [filter, setFilter] = useState({
        move: '' as 'next' | 'back'|'',
        comment_id: index?.comment.id,
    });
 
    useEffect(() => {
        product && getCommentIndex({
            product_id:product.id,
            comment_id: filter.comment_id || index?.comment.id,
            move:filter.move||undefined
        }).then((res) => {
            console.log({ res });
            if (res?.comment?.id) {
                if (filter.move == 'back') {
                    setRelativeIndex(res.comment.photos_count + res.comment.videos_count - 1)
                } else if(filter.move == 'next') {
                    setRelativeIndex(0)
                }else{
                    let a = (index?.relative??relativeIndex) ||0;
                    const l = res.comment.photos_count + res.comment.videos_count;
                    a  = a<= 0 ? 0 : a>= l-1 ? l-1 :a;
                    setRelativeIndex(a)
                }
                filter.move = ''
                filter.comment_id = undefined
                setCommentIndex(res)
            }
        })
    }, [filter, index]);
    useEffect(()=>{
        setFilter({comment_id:undefined,move:''});
        setCommentIndex(undefined)
        console.log({commentIndex});
    },[product])
    const currentFiles = [...(commentIndex?.comment?.photos || []), ...(commentIndex?.comment?.videos || [])]
   
    const [videoRef, setVideoRef] = useState<HTMLDivElement|null>(null)
    const moveBack = ()=>{
        if (relativeIndex <= 0) {
            console.log('back comment ');
            commentIndex && setFilter({ ...filter, comment_id: commentIndex.comment.id, move: 'back' })
        } else {
            console.log('back image ');
            setRelativeIndex(relativeIndex - 1)
        }
    }
    const moveNext = ()=>{
        if (relativeIndex >= currentFiles.length - 1) {
            console.log('next comment ');
            
            commentIndex && setFilter({ ...filter, comment_id: commentIndex.comment.id, move: 'next' })
        } else {
            console.log('next image ');
            setRelativeIndex(relativeIndex + 1)
        }
    }
    const [s]= useState<any>({});
    s.moveNext = moveNext;
    s.moveBack = moveBack;
    useEffect(()=>{
        if(s.init) return
        s.init = true
        window.addEventListener('keyup',(e)=>{
            if(e.code == 'ArrowRight'){
                s.moveNext()
            }else if(e.code == 'ArrowLeft'){
                s.moveBack()
            }
        })
    },[])

    
   return commentIndex?.comment && page == 'images' && <section className={'page-comment-image ' + (page == 'images' ? 'open' : 'close')}>
        <div className="page-top">
            <div className="return" style={{ filter:/* discret-color */ toFilter('#fff').result.filter }} onClick={() => setPage(lastPage||'')}></div>
            <div className="count">{(commentIndex?.befor || 0) + relativeIndex} / {commentIndex?.total || 0}</div>
        </div>
        <div className="file-view _flex _center">
            {
                (relativeIndex > (commentIndex?.comment?.photos_count || 0) - 1) ? <div className="video _flex" ref={ref=>{
                    if(!ref) return;
                    if(ref.dataset.init) return;
                    ref.dataset.init = 'init';
                    setVideoRef(ref)
                    const setSize = ()=>{
                        const v = ref.querySelector('video')! as HTMLVideoElement
                        const rect = ref.getBoundingClientRect()
                        v.width = rect.width;
                    }
                    window.addEventListener('resize',setSize);
                }}>
                    <video loop  autoPlay controls width={videoRef?.getBoundingClientRect().width} src={`${Host}${currentFiles[relativeIndex]}`}></video>
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
                    <div className="open">Open</div>
                </div>
            </div>
            <div className="message">
                {
                    limit(commentIndex?.comment.text || '', 100)
                }
            </div>
        </div>
    </section>
} 