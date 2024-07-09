import './Subject.css';
import { useWebRoute, useWebStore } from "../../WebStore";
import { useEffect, useState } from 'react';

import { subjects } from "./PageForum";
import { getImg } from '../../../Tools/StringFormater';

const responses = {
    page: 1,
    limit: 15,
    total: 4,
    list: [{
        id: '1',
        created_at: '2024-06-16 09:01:57',
        user: {
            email: "sublymus@gmail.com",
            id: "f37b0fd8-35a8-412f-8183-b00910de2957",
            name: "Opus Opus",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
            follow: [{
                name: 'linkedin',
                icon: 'src/res/social/linkedin.png',
                link: 'https://www.linkedin.com/in/wilfried-noga-kouassi-774500236/',
            }, {
                name: 'github',
                icon: 'src/res/social/github.png',
                link: 'https://github.com/sublymus',
            }, {
                name: 'twitter',
                icon: 'src/res/social/twitter.png',
                link: 'https://x.com/sublymus',
            }],
        },
        text: `Hello :)
    
        Alors par défaut Symfony enregistre la session en fichier, il faudrait modifier la valeur handler_id pour enregistrer la session sur Redis, la database ou DynamoDB
        
        Si tu es en SPA (front React par exemple) regarde si le site controle bien l'état de la session et pas seulement un état front`
    }, {
        id: '2',
        created_at: '2024-06-16 09:01:57',
        user: {
            email: "sublymus@gmail.com",
            id: "f37b0fd8-35a8-412f-8183-b00910de2957",
            name: "Opus Opus",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
            follow: [{
                name: 'linkedin',
                icon: 'src/res/social/linkedin.png',
                link: 'https://www.linkedin.com/in/wilfried-noga-kouassi-774500236/',
            }, {
                name: 'github',
                icon: 'src/res/social/github.png',
                link: 'https://github.com/sublymus',
            }, {
                name: 'twitter',
                icon: 'src/res/social/twitter.png',
                link: 'https://x.com/sublymus',
            }],
        },
        text: `Hello :)
    
        Alors par défaut Symfony enregistre la session en fichier, il faudrait modifier la valeur handler_id pour enregistrer la session sur Redis, la database ou DynamoDB
        
        Si tu es en SPA (front React par exemple) regarde si le site controle bien l'état de la session et pas seulement un état front`
    }, {
        id: '3',
        created_at: '2024-06-16 09:01:57',
        user: {
            email: "sublymus@gmail.com",
            id: "f37b0fd8-35a8-412f-8183-b00910de2957",
            name: "Opus Opus",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
            follow: [{
                name: 'linkedin',
                icon: 'src/res/social/linkedin.png',
                link: 'https://www.linkedin.com/in/wilfried-noga-kouassi-774500236/',
            }, {
                name: 'github',
                icon: 'src/res/social/github.png',
                link: 'https://github.com/sublymus',
            }, {
                name: 'twitter',
                icon: 'src/res/social/twitter.png',
                link: 'https://x.com/sublymus',
            }],
        },
        text: `Hello :)
    
        Alors par défaut Symfony enregistre la session en fichier, il faudrait modifier la valeur handler_id pour enregistrer la session sur Redis, la database ou DynamoDB
        
        Si tu es en SPA (front React par exemple) regarde si le site controle bien l'état de la session et pas seulement un état front`
    }, {
        id: '4',
        created_at: '2024-06-16 09:01:57',
        user: {
            email: "sublymus@gmail.com",
            id: "f37b0fd8-35a8-412f-8183-b00910de2957",
            name: "Opus Opus",
            photos: ["https://lh3.googleusercontent.com/a/ACg8ocKBUk529kp5YE4tF1KOY9WnKIoj5wjFsoQA6RiQcstmXc0j5aU=s96-c"],
            follow: [{
                name: 'linkedin',
                icon: 'src/res/social/linkedin.png',
                link: 'https://www.linkedin.com/in/wilfried-noga-kouassi-774500236/',
            }, {
                name: 'github',
                icon: 'src/res/social/github.png',
                link: 'https://github.com/sublymus',
            }, {
                name: 'twitter',
                icon: 'src/res/social/twitter.png',
                link: 'https://x.com/sublymus',
            }],
        },
        text: `Hello :)
    
        Alors par défaut Symfony enregistre la session en fichier, il faudrait modifier la valeur handler_id pour enregistrer la session sur Redis, la database ou DynamoDB
        
        Si tu es en SPA (front React par exemple) regarde si le site controle bien l'état de la session et pas seulement un état front`
    }]
}
export function Subject() {
    const { current, json } = useWebRoute();
    const [subject, setSubject] = useState<(typeof subjects)['list'][number] | undefined>();
    // const {} = useWebStore()
    useEffect(() => {
        console.log(json, json?.subject_id, subjects.list[json?.subject_id]);
        setSubject(subjects.list[json?.subject_id]);
    }, [json])
    return current('subject') && subject && <div className="page-subject">
        <div className="top">
            <h1 className="title">{subject.title}</h1>
            <div className="info">
                <div className="photo" style={{ background: getImg(subject.user.photos[0]) }}></div>
                <div className="user-name">{subject.user.name}</div>
                <div className="date">, {new Date(subject.created_at).toLocaleDateString()}</div>
                <div className="targs" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    {
                        subject.targs.map(s => (
                            <div key={s.name} className={"targ " + (s.targ ? 's' : '')}>
                                {<div className="t" style={{ background: s.targ?.icon || s.icon }}>{s.targ?.name || s.name}</div>}
                                {s.targ && <div className="s">{s.name}</div>}
                            </div>
                        ))
                    }
                </div>
                <div className="report"></div>
            </div>
        </div>
        <div className="message">
            {
                subject.message
            }
        </div>
        <h2 className="count-response">{responses.total} Respons{responses.list.length > 1 ? 'es' : ''}</h2>
        <div className="responses">
            {
                responses.list.map(r => (
                    <div key={r.id} className="response">
                        <div className="photo p1" style={{ background: getImg(subject.user.photos[0]) }}></div>
                        <div className="right">
                            <div className="top-top">
                                <div className="photo p2" style={{ background: getImg(subject.user.photos[0]) }}></div>
                                <div className="top">
                                    <div className="name">{r.user.name}</div>
                                    <div className="date">, {new Date(subject.created_at).toLocaleDateString()}</div>
                                    <div className="report"></div>
                                </div>
                            </div>
                            <div className="message">{r.text}</div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="new-response">
            <div className="prompt">YOUR MESSGAE</div>
            <div className="zone">

            </div>
            <div className="notif" onClick={(e)=>{
                if(e.currentTarget.className.includes('ok')){
                    e.currentTarget.classList.remove('ok')
                }else{
                    e.currentTarget.classList.add('ok')
                }
            }}>
                <div className="box"></div>BE NOTIFIED IN CASE OF RESPONSE
            </div>
            <div className="answer">Answer</div>
        </div>
    </div>
}