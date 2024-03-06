import { WorldManager } from "../../World/WorldManager";
import { Catalogue } from "../../World/Catalogue/Catalogue";
import { World } from "../../World/Rings/Ring_petal_1";
import { useEffect } from "react";
import React from "react";

export function WorldView( {root}:{root:HTMLElement}) {
  useEffect(() => {
    if(WorldManager.worldManager) return;
    const w = document.getElementById('world')!
    root.prepend(w);
    const world = new WorldManager(w)
    world.animus(0);
    
    new World();
    const catalogue = new Catalogue();
    world.setWorld(catalogue);
  }, [])
  return (<></>)
}
