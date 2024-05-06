import { useEffect, useRef, useState } from 'react';
import { DefaultImage, useAppRouter } from '../../AppStore';
import { PageRegister } from '../PageRegister/PageRegister';
import { PageUser } from '../PageUser/PageUser';
import './Profile.css';
import { ProfilePhoto } from '../../Components/ProfilePhoto/ProfilePhoto';
import { useProfileStore } from './ProfileStore';

import { PageAbout } from "../../Layout/PageAbout/PageAbout";
import { PageBlog } from "../../Layout/PageBlog/PageBlog";
import { PageService } from "../../Layout/PageService/PageService";
import { PageCommand } from "../../Layout/PageCommand/PageCommand";
import { PageCart } from "../../Layout/PageCart/PageCart";
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore';
import { Host } from '../../../Config';
;

let bubbleDiv: any = null;
export function Profile() {
    const { setPath, check, navBack } = useAppRouter();
    const { openPhoto, photo: bigPhoto } = useProfileStore();
    const bubbleCtnRef = useRef<HTMLDivElement | null>(null);
    const [isMin, setIsMin] = useState(false);
    const { user , updateUser } = useRegisterStore()
    const updateProfilePhoto = (photos: FileList | null) => {
        if (user && photos) updateUser({ id: user.id, photos })
    }

    const isNavUsed = check('profile_nav');
    useEffect(() => {
        if (!bubbleCtnRef.current || bubbleDiv === bubbleCtnRef.current) {
            return;
        };
        bubbleDiv = bubbleCtnRef.current;
        const bubbles: {
            div: HTMLDivElement,
            x: number,
            y: number,
            h0: number,
            a: number,
            v: number,
            f: number,
            r: number,
        }[] = []
        bubbleCtnRef.current.innerHTML = '';

        const size = 200;
        const w = 800
        const h = 800
        const wMax = w + size;
        const wMin = -size;

        for (let i = 0; i < 20; i++) {
            const s = (size * 0.3) + (size * 0.7) * Math.random()
            const div = document.createElement('div');
            div.style.width = `${s}px`
            div.style.height = `${s}px`
            div.style.background = `rgba(${36 + Math.round(Math.random() * 220)} , ${19 + Math.round(Math.random() * 50) - 10}, ${36 + Math.round(Math.random() * 220)},0.4)`
            div.className = 'bubble';
            const x = w * Math.random();
            const y = h * Math.random();
            div.style.top = `${y}px`
            div.style.left = `${x}px`
            bubbles.push({
                div,
                x,
                y,
                h0: (h) * Math.random(),
                a: (h / 4) * Math.random(),
                v: 0.3 * (Math.random() - 0.5),
                f: 0.0003 * (Math.random() - 0.5),
                r: Math.PI * Math.random(),
            })
            bubbleCtnRef.current.append(div)
        }
        let i = 0;

        const id = setInterval(() => {
            isNavUsed && bubbles.forEach(bubble => {
                const { div, a, f, v, r, h0 } = bubble;
                bubble.x += v,
                    bubble.x = bubble.x > wMax ? wMin : bubble.x < wMin ? wMax : bubble.x;
                bubble.y = Math.sin(i * f - r) * a + (h0);
                div.style.top = `${bubble.y}px`;
                div.style.left = `${bubble.x}px`;
                i++;
            })
        });
        return () => {
            clearInterval(id);
            bubbleDiv = null;
        }
    }, [bubbleCtnRef])

    
    console.log('user' , user);
    
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
                        <div className="photo" style={{ backgroundImage: `url('${bigPhoto.startsWith('/')?Host:''}${bigPhoto}')` }}></div>
                    </div>
                </div>
                {isNavUsed && <div className={'ctn-profile-nav ' + (isMin ? 'min-size' : '')}>
                    <div className='resizer' onClick={() => {
                        setIsMin(!isMin);
                    }}></div>
                    <div ref={bubbleCtnRef} className='back-profile-nav'></div>
                    <div className='profile-nav'>
                        <ProfilePhoto photo={user?.photos[0]} canEdit={!!user} canOpen onChange={updateProfilePhoto} onOpen={(photo) => openPhoto(photo)} />
                        <div className="info">
                            Naila Stefenson
                        </div>
                        <ul>
                            <li className={(check('user') || check('login') || check('create')) && 'active'} onClick={() => {
                                setPath('user')
                            }}>Profile</li>
                            <li className={check('command') && 'active'} onClick={() => {
                                setPath('command')
                            }}>Command</li>
                            <li className={check('cart') && 'active'} onClick={() => {
                                setPath('cart')
                            }}>Cart</li>
                            <li className={check('service') && 'active'} onClick={() => {
                                setPath('service')
                            }}>Customer service</li>
                            <li className={check('blog') && 'active'} onClick={() => {
                                setPath('blog')
                            }}>Blog</li>
                            <li className={check('about') && 'active'} onClick={() => {
                                setPath('about')
                            }}>About us</li>
                        </ul>
                    </div>
                </div>}
                <div className="ctn-pages">
                    {(check('user') && !user) ?  <PageRegister login />: (
                        <>
                            <PageRegister />
                            <PageUser />
                            <PageAbout />
                            <PageBlog />
                            <PageService />
                            <PageCommand />
                            <PageCart />
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}






//{check('user')&&(user && JSON.stringify(user))}