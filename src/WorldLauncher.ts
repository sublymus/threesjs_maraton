import { WorldManager } from "./World/World";
import { Catalogue } from "./World/Catalogue/Catalogue";
import { Product } from "./World/Rings/Ring_petal_1";

export function WorldLauncher(root:HTMLElement){
    const w = document.getElementById('world')!
    root.prepend(w)
    const world = new WorldManager(w)
    world.animus(0);
    new Product();
    const catalogue = new Catalogue();
    world.setWorld(catalogue);
    Tactil(w)
}


function Tactil(target : HTMLElement){
    let lastScrollX = 0;
    let lastScrollY = 0;

    const tactil = document.createElement('div');
    const scrollable = document.createElement('div');
    const rec = target.getBoundingClientRect();
    tactil.style.opacity = '0.4';
    tactil.style.background = '#345';
    tactil.style.width = rec.width+'px';
    tactil.style.height = rec.height+'px';
    tactil.style.position ='absolute';
    tactil.style.top = rec.y+'px';
    tactil.style.left = rec.x+'px';
    tactil.style.overflow = 'scroll';
    target.after(tactil);
    const w = rec.width;
    const h = rec.height;
    const marge = 10;
    scrollable.style.width = (w*2)+'px';
    scrollable.style.height = (h*2)+'px';
    

    tactil.append(scrollable);
    let onScroll = false;
    tactil.addEventListener('scroll',()=>{
        if(tactil.scrollLeft>(w-marge)){
            return tactil.scrollLeft = marge
        }else if(tactil.scrollLeft<(marge)){
            return tactil.scrollLeft = w-marge
        }
        if(tactil.scrollTop>(h-marge)){
            console.log('@@@@@@@@@',tactil.scrollTop);
            
            return tactil.scrollTop =marge
        }else if(tactil.scrollTop<(marge)){
            return tactil.scrollTop = h-marge
        }
        if(!onScroll){
            onScroll =true;
            console.log('satrt');
        }
    console.log('scroll' ,tactil.scrollTop, h-marge );


    })
    tactil.addEventListener('scrollend',()=>{
        console.log('end');
        
    })
}