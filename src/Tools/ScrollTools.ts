import { toFilter } from "./FilterColor";

export function AddHorizontalScrollIcon({ posistion, size, top, step }: {step?:number, size?: number, posistion?: number, top?: number }) {

    return (ref: HTMLDivElement | null) => {

        if (!ref) return;
        if (ref.dataset.init) return;
        ref.dataset.init = 'init';
        ref.style.scrollBehavior = 'smooth'
        const parent = ref.parentElement!;
       
        const ctn = document.createElement('div')
        ctn.style.width = ref.style.width;
        ctn.style.position = 'relative';

        ctn.append(ref);
        parent.append(ctn)



        const left = document.createElement('div')
        const right = document.createElement('div')
        const left_icon = document.createElement('div')
        const right_icon = document.createElement('div')
        right.className = 'h-scroll-icon-ctn right'
        left.className = 'h-scroll-icon-ctn'
        if (size) {
            right.style.width = `${size}px`
            right.style.height = `${size}px`
            left.style.width = `${size}px`
            left.style.height = `${size}px`
        }
        if (posistion) {
            right.style.right = `${-posistion}px`
            left.style.left = `${-posistion}px`
        }
        if (top) {
            right.style.top = `${top}px`
            left.style.top = `${top}px`
        }

        right_icon.className = 'h-scroll-icon right'
        left_icon.className = 'h-scroll-icon'
        right.append(right_icon)
        left.append(left_icon)
        right_icon.style.filter = /* item-color */ toFilter('#123').result.filter
        left_icon.style.filter = /* item-color */ toFilter('#123').result.filter
        ctn.append(right, left);

        const checkScroll = ()=>{
            if (ref.scrollLeft <= 0) {
                left.style.display = 'none'
            } else {
                left.style.display = 'block'
            }
            if (ref.scrollLeft >= (ref.scrollWidth - ref.getBoundingClientRect().width ) - 30 ) {
                right.style.display = 'none'
            } else  {
                right.style.display = 'block'
            }
        }
        left.addEventListener('click',()=>{
            if(step){
                ref.scrollLeft -= step 
            }else{
                ref.scrollLeft -= ref.getBoundingClientRect().width /2 
            }
        })
        right.addEventListener('click',()=>{
            if(step){
                ref.scrollLeft += step 
            }else{
                ref.scrollLeft += ref.getBoundingClientRect().width /2 
            }
        })
        ref.addEventListener('scroll', checkScroll);

      
        setTimeout(() => {
            checkScroll()
        }, 500);
    }
}