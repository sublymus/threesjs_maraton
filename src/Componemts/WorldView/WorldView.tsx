import { WorldManager } from "../../World/WorldManager";
import { useEffect } from "react";
// import React from "react";

export function WorldView( {root}:{root:HTMLElement}) {
  useEffect(() => {
    if(WorldManager.worldManager) return;
    const w = document.getElementById('world')!
    root.prepend(w);
    const world = new WorldManager(w);
    world.animus(0);
  }, [])
  return (<></>)
}
