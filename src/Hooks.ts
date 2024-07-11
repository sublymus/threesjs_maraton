import { useEffect, useState } from "react";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    screen: '',
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        screen: window.innerWidth < 480 ? 's-480' : window.innerWidth < 680 ? 's-680' : window.innerWidth < 920 ? 's-920' : window.innerWidth < 1200 ? 's-1200' : window.innerWidth < 1800 ? 's-1800' : 's-big'
      });
    }

    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function notifPermission() {
  const [permission, setPermission] = useState<PermissionStatus['state']>();

  useEffect(() => {
    navigator.permissions.query({ name: 'notifications' }).then((result) => {
      result.addEventListener('change', () => {
        setPermission(result.state)
      })
      setPermission(result.state)
    })
  },[])
  return permission
}

export function checkVisibility(/* id: string, */ ref: { current: HTMLElement | null | undefined }, interval: number, check: boolean) {

  const [visible, setVisible] = useState(false)

  const [data] = useState({
    rect: new DOMRect(),
    id: 0,

    init(this: { id: number, rect: DOMRect }) {

      clearInterval(this.id);

      const id = setInterval(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const widthVisible = rect.x < (window.innerWidth) && (rect.x + rect.width) > 0
        const heightVisible = rect.y < (window.innerHeight) && (rect.y + rect.height) > 0
        const visible = heightVisible && widthVisible;
        setVisible(visible)
      }, interval)

      return () => clearInterval(id);

    },
    remove(this: { id: number }) {
      clearInterval(this.id)
    }
  });

  useEffect(() => {
    if (check) data.init();
    else data.remove();
    return data.remove()
  }, [check]);

  return visible;
}
