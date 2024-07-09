import './PageForum.css'
import { useWebRoute } from "../../WebStore";
import { Subject } from "./Subject";
import { getImg, limit } from '../../../Tools/StringFormater';
import { ListPaging } from '../../../DashView/Component/GenericList/ListPaging/ListPaging';
import { useEffect, useState } from 'react';

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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        },],
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
        targs: [{
            name: 'cration/edit',
            targ: {
                icon: '#739',
                name: 'Product'
            }
        }, {
            name: 'features',
            targ: {
                icon: '#b58605',
                name: 'Command'
            }
        }, {
            icon: '#46bf36',
            name: 'Interfaces'
        },],
        message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat voluptas, beatae earum corporis cum tempore quibusdam? Dolorum aut beatae minima quidem consequatur, corporis repellat praesentium dolorem quos. Nemo, libero.',
        created_at: "2024-06-16 09:01:57",
        comment_count: 5,
        status: 'close'
    },]
}
export const nav_targs = [{
    name: 'Product',
    icon: '#739',
    sections: [{
        name: 'cration/edit',
        targ: 'Product'
    }, {
        targ: 'Product',
        name: 'categories',
    }, {
        targ: 'Product',
        name: 'features',
    }]
}, {
    name: 'Command',
    icon: '#b58605',
    sections: [{
        targ: 'Command',
        name: 'cration/edit',
    }, {
        targ: 'Command',
        name: 'categories',
    }, {
        targ: 'Command',
        name: 'features',
    }]
}, {
    name: 'Users',
    icon: '#0042d1',
    sections: [{
        targ: 'Users',
        name: 'cration/edit',
    }, {
        targ: 'Users',
        name: 'categories',
    }, {
        targ: 'Users',
        name: 'features',
    }]
}, {
    name: 'Interfaces',
    icon: '#46bf36',
    sections: [{
        targ: 'Interfaces',
        name: 'cration/edit',
    }, {
        targ: 'Interfaces',
        name: 'categories',
    }, {
        targ: 'Interfaces',
        name: 'features',
    }]
}, {
    name: 'Statistique',
    icon: '#940377',
    sections: [{
        targ: 'Statistique',
        name: 'cration/edit',
    }, {
        targ: 'Statistique',
        name: 'categories',
    }, {
        targ: 'Statistique',
        name: 'features',
    }]
}]
export function PageForum() {
    const { check, current, qs,setAbsPath, json } = useWebRoute();
    const page = json?.page || 1;
    const [openNav, setOpenNav] = useState(false);
    useEffect(() => {
        window.addEventListener('click', () => {
            setOpenNav(false)
        })
    }, [])
    return check('forum') && (!current('forum') ? <>
        <Subject />
    </> : <div className='page-forum'>
        <div className="top">
            <h1 className="title">Forum</h1>
            <div className="search-section" tabIndex={0} >
                <input type="text" placeholder='Search a subject' />
                <div>Search</div>
            </div>
        </div>
        <div className="center">
            <nav>
                <div className="new-subject" onClick={()=>{
                    setAbsPath(['forum','new_subject'])
                }}>New Subject <span></span></div>
                <div className='filter' onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    setOpenNav(!openNav);
                }}>Filter</div>
                {
                    <ul className={openNav ? 'open' : 'close'} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        <span className='targ all'>All subjects</span>
                        {
                            nav_targs.map((n, i) => (
                                <div key={n.name + i}>
                                    <span className='targ'><span className='icon' style={{ background: n.icon }}></span>{n.name}</span>
                                    {
                                        n.sections.map(s => (
                                            <li key={s.name + n.name + i}>{s.name}</li>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </ul>
                }
            </nav>
            <div className="list">
                {
                    subjects.list.slice((subjects.limit * (page - 1)), subjects.limit * page).map((s) => (
                        <a key={s.id} className="subject" onClick={() => qs({ subject_id: s.id }).setAbsPath(['forum', 'subject'])}>
                            <div className="photo" style={{ background: getImg(s.user.photos[0]) }}></div>
                            <div className="right">
                                <div className="text">
                                    <h3 className="title">{s.title}</h3>
                                    <div className="info">
                                        <div className="name">{s.user.name + s.id} </div>
                                        <div className="date">, {new Date(s.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <div className="message">{limit(s.message, 150)}</div>
                                </div>
                                <div className="targs">
                                    <div className="open-targs" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const tl = e.currentTarget.parentElement!.querySelector('.targs.list')!;
                                        if (tl.className.includes('open')) {
                                            tl.classList.add('close')
                                            tl.classList.remove('open')
                                        } else {
                                            tl.classList.add('open')
                                            tl.classList.remove('close')
                                        }
                                    }}></div>
                                    <div className="targs list" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}>
                                        {
                                            s.targs.map(s => (
                                                <div className={"targ " + (s.targ ? 's' : '')}>
                                                    {<div className="t" style={{ background: s.targ?.icon || s.icon }}>{s.targ?.name || s.name}</div>}
                                                    {s.targ && <div className="s">{s.name}</div>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="count"><span></span>{s.comment_count}</div>
                                </div>
                            </div>
                        </a>
                    ))
                }
                <ListPaging limit={subjects.limit} page={page} total={subjects.total} setPage={(p) => {
                    qs({ page: p }).apply();
                }} />
            </div>
        </div>
    </div>)
}