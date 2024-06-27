export const bindToParentScroll = (ref:HTMLDivElement|null)=>{
    if(!ref || ref.dataset.isInit) return;
    ref.dataset.isInit = 'init';
    ref.addEventListener('scroll',()=>{
        const set = ref.scrollTop - Number(ref.dataset.lastScrollTop);
        ref.dataset.lastScrollTop = `${ref.scrollTop}`; 
        ref.parentElement!.scrollTop +=set*2; 
    })
}

export const limitPopupPosition = (ref:HTMLDivElement)=>{
    const r = ref.getBoundingClientRect();
        if ((r.x + r.width) > window.innerWidth) {
            ref.style.left = `${window.innerWidth - r.width}px`;
        }
        if ((r.y + r.height) > window.innerHeight) {
            ref.style.top = `${window.innerHeight - r.height}px`;
        }
}

export const bindTopToParentScroll = (height:number, parent:string)=>{
   return (ref:HTMLDivElement|null)=>{
        if(!ref || ref.dataset.isInit) return;
        ref.dataset.isInit = 'init';
        const parentElement = document.querySelector(parent);
        if(!parentElement) return;
        let y = 0;
        parentElement.addEventListener('scroll',()=>{
            
            let step = parentElement.scrollTop - Number(ref.dataset.lastScrollTop||0);
            step *= 2
            ref.dataset.lastScrollTop = parentElement.scrollTop+'';
            // const y = ref.getBoundingClientRect().y;
            const s  = step + y > height ? height :step + y <0 ?0 : step + y ;
            y = s
            ref.style.top = `${-s}px` ; 
            
        })
    }
}