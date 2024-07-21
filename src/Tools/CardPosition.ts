import { elementMounted } from "./Mounted";



export const cardHorizontalCenter = (cb?: ((setIndex: (index: number) => any) => any) | undefined, newIndex?: (index: number) => any) => {


    return (ref: HTMLDivElement | null) => {
        if (!ref) return;
        if (ref.dataset.init) return cb?.((ref as any).setIndex)


        ref.dataset.init = 'init:' + (Math.trunc(Math.random() * 1000) / 1000)

        const init = () => {

            let i = 0;
            const setIndex = (index: number) => {
                const cards = ref.querySelectorAll('.card-h-c')
                i = index;
                if (cards.length <= 0) return
                i = (i >= cards.length) ? cards.length - 1 : (i < 0) ? 0 : i;
                const rect = ref.getBoundingClientRect();
                const w = rect.width

                const current = cards[i];
                const c = current.getBoundingClientRect();
                const B = (c.x - rect.x) + c.width / 2;

                ref.scrollTo({
                    behavior: 'smooth',
                    left: ref.scrollLeft - (w / 2 - B)
                })
            }
            (ref as any).setIndex = setIndex;

            const setGapSize = () => {
                const w = ref.getBoundingClientRect().width
                setIndex(i)
                const gaps = ref.querySelectorAll('.gap') as NodeListOf<HTMLDivElement>;
                for (const gap of gaps) {
                    gap.style.width = `${w / 2}px`;
                    gap.style.minWidth = `${w / 2}px`;
                    gap.style.maxWidth = `${w / 2}px`;
                }
            }
            window.addEventListener('resize', setGapSize)
            setGapSize();
            const zone = 0.1; //10% 
            ref.addEventListener('scrollend', () => {
                const rect = ref.getBoundingClientRect()
                const w = rect.width
                const z = w * zone;
                const cards = ref.querySelectorAll('.card-h-c')

                const c = cards[i].getBoundingClientRect();
                const B = (c.x - rect.x) + c.width / 2;
                //TODO  actuelle au  scroll c'est le plus proche voisin qui est indexe, TODO si le scroll depasse le plus proche voisin alor c'est le card le plus proche du centre qui sera indexer;
                let a = i;
                if (B < w / 2 - z) {
                    a = i + 1;
                    setIndex(a);

                } else if (B > w / 2 + z) {
                    a = i - 1;
                    setIndex(a)

                } else {
                    setIndex(i)
                }
                newIndex?.(a)
            })

            cb?.(setIndex)

        }
        elementMounted(ref, () => {
            init()
        });
    }

}