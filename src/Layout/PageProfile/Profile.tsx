import { useEffect, useRef, useState } from 'react';
import { DefaultImage, useAppStore } from '../../AppStore';
import { PageRegister } from '../PageRegister/PageRegister';
import { PageUser } from './PageUser';
import './Profile.css';
import { useRegisterStore } from '../PageRegister/RegisterStore';
import { ProfilePhoto } from '../../Components/ProfilePhoto/ProfilePhoto';
import { useProfileStore } from './ProfileStore';
let bubbleDiv :any = null;
export function Profile() {
    const { setPath, check, navBack } = useAppStore();
    const { openPhoto, photo: bigPhoto } = useProfileStore();
    const bubbleCtnRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState('');
    const updateProfilePhoto = () => {

    }

    const isNavUsed = check('profile-nav') ;
    useEffect(() => {
        console.log('EFFECT = > ',bubbleCtnRef.current, bubbleDiv === bubbleCtnRef.current);
        if (!bubbleCtnRef.current || bubbleDiv === bubbleCtnRef.current ) {
            console.log('BUBBLE = > ',bubbleCtnRef.current, bubbleDiv === bubbleCtnRef.current);
            
            return ;
        };
        bubbleDiv = bubbleCtnRef.current;
        const bubbles: {
            div: HTMLDivElement,
            x: number,
            y: number,
            a:number,
            v: number,
            f: number,
            r: number,
        }[] = []
        bubbleCtnRef.current.innerHTML = '';

        const size = 20;
        const w = 350
        const h = 80
        const wMax = w+size;
        const wMin = -size;

        for (let i = 0; i < 10; i++) {
            const div = document.createElement('div');
            div.style.width = `${size}px`
            div.style.height = `${size}px`
            div.style.background = `rgba(${58 + Math.round(Math.random() * 100) - 40} , ${19 + Math.round(Math.random() * 50) - 10}, ${163 + Math.round(Math.random() * 50) - 20},0.7)`
            div.className = 'bubble';
            const x = w * Math.random();
            const y = h * Math.random();
            div.style.top = `${y}px`
            div.style.left = `${x}px`
            bubbles.push({
                div,
                x,
                y,
                a:(h/2)*Math.random(),
                v:0.3*(Math.random()-0.5),
                f:0.001*(Math.random()-0.5),
                r:Math.PI*Math.random(),
            })
            bubbleCtnRef.current.append(div)
        }
        let i = 0;
        
        const id = setInterval(() => {
            isNavUsed&&bubbles.forEach(bubble => {
                const {  div, a,f ,v , r} = bubble;
                bubble.x += v,
                bubble.x = bubble.x>wMax?wMin:bubble.x<wMin?wMax:bubble.x;
                bubble.y  = Math.sin(i*f-r)*a+(h/2);
                div.style.top = `${bubble.y}px`;
                div.style.left = `${bubble.x}px`;
                i++;
            })
        });
        return ()=>{
            clearInterval(id);
            bubbleDiv =null;
        }
    }, [bubbleCtnRef])

    const { user } = useRegisterStore();
    return check('profile') && (
        <div className="page-profile">
            <div className="profile-background" onClick={() => {
                bigPhoto ? openPhoto('') : navBack();
            }}></div>
            <div className="ctn-profile">
                <div className="close" onClick={() => {
                    bigPhoto ? openPhoto('') : navBack();
                }}></div>
                <div className="show-photo" style={{ display: bigPhoto ? 'block' : 'none' }}>
                    <div className="back" onClick={() => {
                        openPhoto('')
                    }}>
                        <div className="photo" style={{ backgroundImage: `url('${bigPhoto}')` }}></div>
                    </div>
                </div>
                {isNavUsed&& <div className='profile-nav'>
                    <ProfilePhoto init={user?.photos[0] || DefaultImage} canEdit canOpen onChange={updateProfilePhoto} onOpen={(photo) => openPhoto(photo)} />
                    <div className="info">
                        Naila Stefenson
                    </div>
                    <div className='ctn-bubble' ref={bubbleCtnRef}></div>
                    <ul>
                        <li className={check('user')&&'active'} onClick={() => {
                            setPath('user')
                        }}>Profile</li>
                        <li  className={check('command')&&'active'} onClick={() => {
                            setPath('command')
                        }}>Command</li>
                        <li  className={check('cart')&&'active'} onClick={() => {
                            setPath('cart')
                        }}>Cart</li>
                        <li  className={check('favorites')&&'active'} onClick={() => {
                            setPath('favorites')
                        }}>Favorites</li>
                        <li  className={check('visited')&&'active'} onClick={() => {
                            setPath('visited')
                        }}>Visited</li>
                        <li  className={check('service')&&'active'} onClick={() => {
                            setPath('../', 'service')
                        }}>Customer service</li>
                        <li  className={check('blog')&&'active'} onClick={() => {
                            setPath('../', 'blog')
                        }}>Blog</li>
                        <li  className={check('about')&&'active'} onClick={() => {
                            setPath('../', 'about')
                        }}>About us</li>
                    </ul>
                </div>}
                <PageRegister />
                <PageUser />
            </div>
        </div>
    )
}






//{check('user')&&(user && JSON.stringify(user))}