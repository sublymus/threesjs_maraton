import './PageBlog.css'
import { useAppStore } from "../../AppStore";

export function PageBlog() {
    const { check } = useAppStore();
    return check('blog') && (<div className="page-blog">

        <div className='blog-block'>
            <div className='block reverse'>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/wrs_store_image.jpg'})` }}></div>
                <p className="info">
                    A jewellery store (American English: jewelry store[1]) is a retail business establishment, that specializes in selling (and also buying) jewellery and watches. Jewellery stores provide many services such as repairs, remodeling, restoring, designing and manufacturing pieces.[2]
                </p>
            </div>
            <div className='block'>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/IMG_1182-HDR.jpg'})` }}></div>
                <p className="info">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste reiciendis optio enim laudantium totam, ex molestias tempore id, asperiores rerum atque fugit deserunt laboriosam suscipit aliquid cumque quo, quos blanditiis.
                </p>
            </div>
            <div className='block reverse'>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/istockphoto-1368965646-612x612.jpg'})` }}></div>
                <p className="info">
                    Workspace is a term used for the place in which you work, such as your desk in an office. A workstation is an area where work of a particular nature is carried out, such as using a desktop computer.
                </p>
            </div>
            <div className='block '>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/istockphoto-1132135988-612x612.jpg'})` }}></div>
                <p className="info">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste reiciendis optio enim laudantium totam, ex molestias tempore id, asperiores rerum atque fugit deserunt laboriosam suscipit aliquid cumque quo, quos blanditiis.
                </p>
            </div>
            <div className='block reverse'>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/47543.jpg'})` }}></div>
                <p className="info">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste reiciendis optio enim laudantium totam, ex molestias tempore id, asperiores rerum atque fugit deserunt laboriosam suscipit aliquid cumque quo, quos blanditiis.
                </p>
            </div>
            <div className='block '>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/csm_illustration-mariage-1200_846ac62e83.jpg'})` }}></div>
                <p className="info">
                    a typically circular band of metal or other durable material, especially one of gold or other precious metal, often set with gems, for wearing on the finger as an ornament, a token of betrothal or marriage, etc.
                </p>
            </div>
            <div className='block reverse'>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/single.jpg'})` }}></div>
                <p className="info">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste reiciendis optio enim laudantium totam, ex molestias tempore id, asperiores rerum atque fugit deserunt laboriosam suscipit aliquid cumque quo, quos blanditiis.
                </p>
            </div>
            <div className='block banner'>
                <div className="img" style={{ backgroundImage: `url(${'/src/Layout/PageBlog/img/BANNER-2.png'})` }}></div>

            </div>
        </div>
    </div>
    )
}
