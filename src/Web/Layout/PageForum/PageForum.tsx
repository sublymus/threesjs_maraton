import './PageForum.css'
import { useWebRoute } from "../../WebStore";
import { Subject } from "./Subject";
import { getImg, limit } from '../../../Tools/StringFormater';
import { ListPaging } from '../../../DashView/Component/GenericList/ListPaging/ListPaging';
import { useState } from 'react';

export const subjects = {
    limit: 10,
    page: 1,
    total: 15,
    list: [{
        id: '1',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '2',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    }, {
        id: '3',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    }, {
        id: '4',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '5',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '6',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    }, {
        id: '7',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '8',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '9',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    }, {
        id: '10',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    }, {
        id: '11',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '12',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '13',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    }, {
        id: '14',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'open'
    }, {
        id: '15',
        user_id: '',
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
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        theme: 'Lorem/ipsum',
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    },]
}

export function PageForum() {
    const [page, setPage] = useState(subjects.page); //TODO
    const { check, current, qs } = useWebRoute();
    return check('forum') && (!current('forum') ? <>
        <Subject />
    </> : <div className='page-forum'>
        <div className="top">
            <div className="title">Forum</div>
            <div className="search-section">
                <input id='forum-search' type="text" />
                <label htmlFor="forum-search">Search</label>
            </div>
        </div>
        <div className="center">
            <div className="list">
                {
                    subjects.list.slice((subjects.limit*(page-1)),subjects.limit*page).map((s) => (
                        <a className="subject" onClick={()=>qs({subject_id:s.id}).setAbsPath(['forum','subject'])}>
                            <div className="photo" style={{ background: getImg(s.user.photos[0]) }}></div>
                            <div className="right">
                                <div className="title">{s.title}</div>
                                <div className="info">
                                    <div className="name">{s.user.name + s.id}</div>
                                    <div className="date">{s.created_at}</div>
                                </div>
                                <div className="message">{limit(s.message, 256)}</div>
                            </div>
                            <div className="count"><span></span>{s.comment_count}</div>
                        </a>
                    ))
                }
                <ListPaging limit={subjects.limit} page={page} total={subjects.total} setPage={setPage}/>
            </div>
        </div>
    </div>)
}