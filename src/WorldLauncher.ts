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
  
}