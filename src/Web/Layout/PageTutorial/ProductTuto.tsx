import { useState } from 'react';
import { useWindowSize } from '../../../Hooks';
import { useWebRoute } from '../../WebStore';
import './Tuto.css';
import { getImg } from '../../../Tools/StringFormater';


const sublym_tuto = {
    product_tuto:{
        title: `Découverte Product`,
        tutos: [{
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
                    }
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
    command_tuto :{
        title: `Découverte de Commande`,
        tutos: [{
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
                    }
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
    }
}


export function ProductTuto() {
    const [theme, setTeme] = useState<keyof typeof sublym_tuto>('command_tuto')
    const [tuto, setTuto] = useState(0)
    const [onglet, setOngle] = useState('desc');
    const { current } = useWebRoute()

    const size = useWindowSize();
    const small = size.width < 1000;
    return current('product_tuto') && <div className="product-tuto sublym-tuto">
        <h1 className='title'>{sublym_tuto[theme].title}</h1>
        <div className="video-section">
            <div className="video">
                <video autoPlay src={sublym_tuto[theme].tutos[tuto].video.url}></video>
            </div>
            {
                !small && <div className="summary">
                    {
                        sublym_tuto[theme].tutos.map((tuto) => (
                            <div className="title">{tuto.title}</div>
                        ))
                    }
                </div>
            }
        </div>
        {
            small && <div className="onglet">
                <div className="description">Description</div>
                <div className="summary">Summary</div>
            </div>
        }
        {
            (!small || onglet == 'desc') && <div className="description">
                {
                    sublym_tuto[theme].tutos[tuto].descriptions.map((d) => (
                        <section>
                            <h1>{d.h1}</h1>
                            {
                                d.p.map((p) => (
                                    <p>{p.text}{
                                        p.img && <div className="ctn-img">
                                            <div className="img" style={{ background: getImg(p.img.url) }}></div>
                                            <h4>{p.img.h2}</h4>
                                        </div>
                                    }</p>
                                ))
                            }
                        </section>
                    ))
                }
            </div>
        }

    </div>
}