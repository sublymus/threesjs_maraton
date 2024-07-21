export const elementMounted = (elem: HTMLElement, cb: () => any) => {
    const id = setInterval(() => {
        let ok = false;
        let p = elem as HTMLElement | null
        let count = 0
        while (!ok) {
            if (p == document.body) {
                clearInterval(id)
                cb()
                ok = true;
                return
            } else if (p == null || count > 100) {
                ok = true
            } else {
                p = p.parentElement
            }
            count++
        }
    }, 100);
} 