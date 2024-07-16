import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../Hooks';
import { useWebRoute } from '../../WebStore';
import './Tuto.css';
import { getImg } from '../../../Tools/StringFormater';
import { Producd3d } from '../PageHome/Producd3d';
import { TutorialCard } from './PageTutorial';


const sublym_tuto = {
    product_tuto: {
        theme: 'product',
        title: `Découverte Product`,
        tutos: [{
            author: {
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
                }]
            },
            title: 'Introduction à Product',
            video: {
                url: 'https://youtu.be/ULs7m9srEj8',
            },
            descriptions: [{
                h1: `À propos de ce tutoriel`,
                p: [{
                    text: "Bienvenue dans cette nouvelle formation consacrée à la découverte et à l'apprentissage du framework PHP Laravel.",
                }]
            }, {
                h1: `Qu'est ce que Laravel ?`,
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }, {
                h1: 'Programme de la formation',
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Enfin, on finira avec des travaux pratiques avec un exemple concret de mise en place de Laravel pour un projet spécifique.`,
                }]
            }, {
                h1: 'Prérequis',
                p: [{
                    text: "Pour bien suivre cette formation il y a quelques prérequis. Le premier c'est d'être bien à l'aise avec PHP, comprendre les bases du langage et la programmation orientée objet. Je ne reviendrai pas sur le principe de classe, d'instance, les notions de public, protégé et privé. Il est impératif que tout ça soit acquis sinon vous risquez d'avoir du mal à suivre les explications.",
                    img: {
                        h2: '',
                        url: '',
                    },
                    view: <Producd3d />
                }, {
                    text: `Ensuite, il faut aussi savoir utiliser le terminal. Il n'est pas nécessaire d'être un expert mais beaucoup d'opérations dans Laravel se font au travers du terminal (comme pour démarrer un serveur ou générer du code) donc il faut que vous ayez un petit peu d'expérience avec ça.
                    Il faudra aussi savoir utiliser Composer car c'est ce qui va nous permettre de créer notre projet Laravel mais aussi d'installer différentes extensions lorsqu'on en aura besoin.`,
                }, {
                    text: `Et enfin, il faut aussi comprendre SQL. Même si vous n'avez pas besoin d'être un expert, comprendre le fonctionnement de base (surtout la notion de clé étrangère et de relation) est essentiel. Cela vous permettra d'avancer un petit peu plus vite dans cette formation. Si vous ne savez pas du tout ce qu'est SQL, je vous invite à regarder ma formation sur le sujet.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }]
        },]
    },
    command_tuto: {
        theme: 'command',
        title: `Découverte de Commande`,
        tutos: [{
            author: {
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
            title: 'Introduction à Commande',
            video: {
                url: 'https://youtu.be/ULs7m9srEj8',
            },
            descriptions: [{
                h1: `À propos de ce tutoriel`,
                p: [{
                    text: "Bienvenue dans cette nouvelle formation consacrée à la découverte et à l'apprentissage du framework PHP Laravel.",
                }]
            }, {
                h1: `Qu'est ce que Laravel ?`,
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }, {
                h1: 'Programme de la formation',
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Enfin, on finira avec des travaux pratiques avec un exemple concret de mise en place de Laravel pour un projet spécifique.`,
                }]
            }, {
                h1: 'Prérequis',
                p: [{
                    text: "Pour bien suivre cette formation il y a quelques prérequis. Le premier c'est d'être bien à l'aise avec PHP, comprendre les bases du langage et la programmation orientée objet. Je ne reviendrai pas sur le principe de classe, d'instance, les notions de public, protégé et privé. Il est impératif que tout ça soit acquis sinon vous risquez d'avoir du mal à suivre les explications.",
                    img: {
                        h2: '',
                        url: '',
                    },
                    view: <Producd3d />
                }, {
                    text: `Ensuite, il faut aussi savoir utiliser le terminal. Il n'est pas nécessaire d'être un expert mais beaucoup d'opérations dans Laravel se font au travers du terminal (comme pour démarrer un serveur ou générer du code) donc il faut que vous ayez un petit peu d'expérience avec ça.
                    Il faudra aussi savoir utiliser Composer car c'est ce qui va nous permettre de créer notre projet Laravel mais aussi d'installer différentes extensions lorsqu'on en aura besoin.`,
                }, {
                    text: `Et enfin, il faut aussi comprendre SQL. Même si vous n'avez pas besoin d'être un expert, comprendre le fonctionnement de base (surtout la notion de clé étrangère et de relation) est essentiel. Cela vous permettra d'avancer un petit peu plus vite dans cette formation. Si vous ne savez pas du tout ce qu'est SQL, je vous invite à regarder ma formation sur le sujet.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }]
        }, {
            author: {
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
            title: 'Introduction à Commande 2',
            video: {
                url: 'https://youtu.be/ULs7m9srEj8',
            },
            descriptions: [{
                h1: `À propos de ce tutoriel2`,
                p: [{
                    text: "Bienvenue dans cette nouvelle formation consacrée à la découverte et à l'apprentissage du framework PHP Laravel.",
                }]
            }, {
                h1: `Qu'est ce que Laravel ?`,
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }, {
                h1: 'Programme de la formation',
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Enfin, on finira avec des travaux pratiques avec un exemple concret de mise en place de Laravel pour un projet spécifique.`,
                }]
            }, {
                h1: 'Prérequis',
                p: [{
                    text: "Pour bien suivre cette formation il y a quelques prérequis. Le premier c'est d'être bien à l'aise avec PHP, comprendre les bases du langage et la programmation orientée objet. Je ne reviendrai pas sur le principe de classe, d'instance, les notions de public, protégé et privé. Il est impératif que tout ça soit acquis sinon vous risquez d'avoir du mal à suivre les explications.",
                    img: {
                        h2: '',
                        url: '',
                    },
                    view: <Producd3d />
                }, {
                    text: `Ensuite, il faut aussi savoir utiliser le terminal. Il n'est pas nécessaire d'être un expert mais beaucoup d'opérations dans Laravel se font au travers du terminal (comme pour démarrer un serveur ou générer du code) donc il faut que vous ayez un petit peu d'expérience avec ça.
                    Il faudra aussi savoir utiliser Composer car c'est ce qui va nous permettre de créer notre projet Laravel mais aussi d'installer différentes extensions lorsqu'on en aura besoin.`,
                }, {
                    text: `Et enfin, il faut aussi comprendre SQL. Même si vous n'avez pas besoin d'être un expert, comprendre le fonctionnement de base (surtout la notion de clé étrangère et de relation) est essentiel. Cela vous permettra d'avancer un petit peu plus vite dans cette formation. Si vous ne savez pas du tout ce qu'est SQL, je vous invite à regarder ma formation sur le sujet.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }]
        }, {
            author: {
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
            title: 'Introduction à Commande 3',
            video: {
                url: 'https://youtu.be/ULs7m9srEj8',
            },
            descriptions: [{
                h1: `À propos de ce tutoriel3`,
                p: [{
                    text: "Bienvenue dans cette nouvelle formation consacrée à la découverte et à l'apprentissage du framework PHP Laravel.",
                }]
            }, {
                h1: `Qu'est ce que Laravel ?`,
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }, {
                h1: 'Programme de la formation',
                p: [{
                    text: "Dans un premier temps nous allons faire un petit tour d'horizon du framework, on commencera par l'installer puis on analysera la structure des dossiers et les composants de bases qui constitue le MVC. Nous découvrirons notamment le Routing, les Controller, l'ORM Eloquent et le moteur de template blade.",
                }, {
                    text: `On plongera ensuite un peu plus en profondeur sur certaines fonctionnalités au travers d'une mise en pratique avec la création d'un blog. Cela sera l'occasion de découvrir comment gérer les formulaire efficacement et gérer la relation entre les données.`,
                }, {
                    text: `Ensuite, on approfondira certains éléments et on essaiera de comprendre comment fonctionne le framework en interne. On découvrira le cycle de vie qui permet à Laravel de comprendre une requête et de la transformer en réponse.`,
                }, {
                    text: `Enfin, on finira avec des travaux pratiques avec un exemple concret de mise en place de Laravel pour un projet spécifique.`,
                }]
            }, {
                h1: 'Prérequis',
                p: [{
                    text: "Pour bien suivre cette formation il y a quelques prérequis. Le premier c'est d'être bien à l'aise avec PHP, comprendre les bases du langage et la programmation orientée objet. Je ne reviendrai pas sur le principe de classe, d'instance, les notions de public, protégé et privé. Il est impératif que tout ça soit acquis sinon vous risquez d'avoir du mal à suivre les explications.",
                    img: {
                        h2: '',
                        url: '',
                    },
                    view: <Producd3d />
                }, {
                    text: `Ensuite, il faut aussi savoir utiliser le terminal. Il n'est pas nécessaire d'être un expert mais beaucoup d'opérations dans Laravel se font au travers du terminal (comme pour démarrer un serveur ou générer du code) donc il faut que vous ayez un petit peu d'expérience avec ça.
                    Il faudra aussi savoir utiliser Composer car c'est ce qui va nous permettre de créer notre projet Laravel mais aussi d'installer différentes extensions lorsqu'on en aura besoin.`,
                }, {
                    text: `Et enfin, il faut aussi comprendre SQL. Même si vous n'avez pas besoin d'être un expert, comprendre le fonctionnement de base (surtout la notion de clé étrangère et de relation) est essentiel. Cela vous permettra d'avancer un petit peu plus vite dans cette formation. Si vous ne savez pas du tout ce qu'est SQL, je vous invite à regarder ma formation sur le sujet.`,
                }, {
                    text: `Si vous avez ces prérequis et que vous êtes motivé je vous donne rendez-vous dans le premier chapitre où on va installer Laravel et on va découvrir la structure des dossiers.`,
                }]
            }]
        }]
    }
}


export function Tuto() {
    const [theme, setTheme] = useState<keyof typeof sublym_tuto | undefined>()
    const [tuto, setTuto] = useState(0)
    const [onglet, setOngle] = useState('desc');
    const { pathList } = useWebRoute()
    useEffect(() => {
        setTheme(pathList[2] as any);

        //@ts-ignore
        // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia ;if (navigator.getUserMedia) {navigator.getUserMedia({ audio: true },function onSuccess(stream) {console.log(stream);},function onError(error) {console.log({error}); })} else {}
    }, [pathList])
    const size = useWindowSize();
    const small = size.width < 1100;
    const List = theme && sublym_tuto[theme]?.tutos[tuto] && <div className="list">
        {
            sublym_tuto[theme].tutos.map((tuto, i) => (
                <div key={tuto.title + i} className="title" onClick={() => {
                    setTuto(i)
                }}><span className='progress' style={{ background: `conic-gradient(#6ed1ff ${40}deg, transparent ${0}deg)` }}><span className='icon'></span></span>{tuto.title} <span className='minut'>{3} min</span></div>
            ))
        }
    </div>
    return !(theme && sublym_tuto[theme]?.tutos[tuto]) ? <div className='no-tuto'>
        <h1>this tutorial section is not yet available</h1>
        <TutorialCard />
    </div> : <div className="product-tuto sublym-tuto">
        <h1 className='title'>{sublym_tuto[theme].title}</h1>
        <div className="video-section">
            <div className="video" ref={ref => {
                if (!ref) return
                if (ref.dataset.init) return;
                ref.dataset.init = 'init';
                const rest = () => {
                    const video = ref.querySelector('video')! as HTMLVideoElement;
                    const summary = ref.parentElement!.querySelector('.summary')! as HTMLDivElement;
                    if (window.innerWidth < 1100) {
                        video.style.width = `${window.innerWidth - 50}px`;
                        video.width = window.innerWidth - 50;
                        summary && (summary.style.display = 'none')
                    } else {
                        summary.style.height = `${video.getBoundingClientRect().height}px`
                        const w = Math.min(window.innerWidth - (50 + 400), 900)
                        video.style.width = `${w}px`;
                        video.width = w;
                    }
                }
                window.addEventListener('resize', rest)
                let i = 10;
                const id = setInterval(() => {
                    rest();
                    i--;
                    if (i < 0) {
                        clearInterval(id)
                    }
                }, 100)
                rest();
            }}>
                <video autoPlay controls src="/src/res/video/videoplayback.mp4"></video>
                {/* <video autoPlay src={sublym_tuto[theme].tutos[tuto].video.url}></video> */}
            </div>
            <div className='summary' style={{ display: small ? 'none' : '' }}>
                <h2 className="top">Discover</h2>
                {List}
            </div>
        </div>
        {
            small && <div className="onglet">
                <div className={"onglet-description " + (onglet == 'desc' ? 'active' : '')} onClick={() => {
                    setOngle('desc')
                }}>
                    <div className="icon"></div>
                    <div className="label">Description</div>
                    <span></span>
                </div>
                <div className={"onglet-summary " + (onglet == 'sum' ? 'active' : '')} onClick={() => {
                    setOngle('sum')
                }}>
                    <div className="icon"></div>
                    <div className="label">Summary</div>
                </div>
            </div>
        }

        <div className='summary small' style={{ display: (small && onglet == 'sum') ? '' : 'none' }}>
            <h2 className="top">Discover</h2>
            {List}
        </div>
        <div className="main">
            <div className="descriptions" style={{ display: (small && onglet != 'desc') ? 'none' : '' }}>
                {
                    sublym_tuto[theme].tutos[tuto].descriptions.map((d, i) => (
                        <section key={i}>
                            <h1>{d.h1}</h1>
                            {
                                d.p.map((p, i) => (
                                    <div key={i} className='description'>
                                        <p>{p.text}</p>
                                        {
                                            p.img && <div className="ctn-img">
                                                <div className="img" style={{ background: getImg(p.img.url) }}></div>
                                                <h4>{p.img.h2}</h4>
                                            </div>
                                        }{
                                            p.view
                                        }
                                    </div>
                                ))
                            }
                        </section>
                    ))
                }
            </div>
            <nav>
                <h2 className="top">Current theme</h2>
                <p>{sublym_tuto[theme].theme}</p>
                <div className="author">
                    <div className="photo" style={{ background: getImg(sublym_tuto[theme].tutos[tuto].author.photos[0]) }}></div>
                    <div className="text">

                        <h3>Author :</h3>
                        <div className="name"> {sublym_tuto[theme].tutos[tuto].author.name}</div>
                        <h3>Social :</h3>
                        {sublym_tuto[theme].tutos[tuto].author.follow && <div className="follows">
                            {
                                [...sublym_tuto[theme].tutos[tuto].author.follow, ...sublym_tuto[theme].tutos[tuto].author.follow]?.map(f => (
                                    <a href={f.link} target='_blank' style={{ background: getImg(f.icon, '60%') }}></a>
                                ))
                            }
                        </div>}
                    </div>
                </div>
                <a className="suggest">
                    <span></span>suggest a correction
                </a>
            </nav>
        </div>


    </div>
}