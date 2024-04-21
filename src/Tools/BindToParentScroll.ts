export const bindToParentScroll = (ref:HTMLDivElement|null)=>{
    if(!ref || ref.dataset.isInit) return;
    ref.dataset.isInit = 'init';
    ref.addEventListener('scroll',(e)=>{
        const set = ref.scrollTop - Number(ref.dataset.lastScrollTop);
        ref.dataset.lastScrollTop = `${ref.scrollTop}`; 
        ref.parentElement!.scrollTop +=set*2; 
        
        
    })
}