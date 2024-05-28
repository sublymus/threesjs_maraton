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