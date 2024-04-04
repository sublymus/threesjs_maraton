import { create } from 'zustand'

/******************************************************* */
//             DEFINE ROUTE PATH
/******************************************************* */
//     setPath('./PageA1') <==> setPath('PageA1')
//     setPath('PageB','PageB2') <==> setPath('./','PageB','PageB2') 
//     setPath('../','../','PageA1');
//     setPath('/','PageA1');
//     setAbsPath(['pageA', 'pageA1'])


/******************************************************* */
//        VERIFY IF COMPONENT OR LAYOUT IS AVAILABLE
/******************************************************* */
//      check('component_name')

type V<RK> = RK[keyof RK];
type AllComponents<O> = {
    [key in keyof O]: key extends string ? key | V<AllComponents<O[key]>> : never
}

type PageType = {
    [key: string]: null | PageType
}

type NavJson = (qs: Record<string, any>) => Record<string, any>

function windowListenner(f: Function) {
    return () => {
        f();
    }
}

export class SRouter<T extends PageType = PageType>{
    isInitialized = false;
    listener: Function | null = null;
    store;
    constructor(private pages: T, private defaultPath?: string[]) {
        interface AppState {
            json: Record<string, any> | undefined,
            Pages: typeof pages,
            navHistory: string[];
            pathList: string[],
            navNext(json?: NavJson): undefined,
            navBack(json?: NavJson): undefined,
            setAbsPath<
                A extends '/',
                B extends keyof typeof pages[A],
                C extends keyof typeof pages[A][B],
                D extends keyof typeof pages[A][B][C],
                E extends keyof typeof pages[A][B][C][D],
                F extends keyof typeof pages[A][B][C][D][E],
                G extends keyof typeof pages[A][B][C][D][E][F],
                H extends keyof typeof pages[A][B][C][D][E][F][G],
                I extends keyof typeof pages[A][B][C][D][E][F][G][H],
                J extends keyof typeof pages[A][B][C][D][E][F][G][H][I],
            >(page: [B, C?, D?, E?, F?, G?, H?, I?, J?]): undefined,
            check(page: V<AllComponents<typeof pages>>): true | undefined;
            setPath(...page: (V<AllComponents<typeof pages>> | './' | '../')[]): undefined,
            init(): void;
        }

        const urlToPath = (): Partial<AppState> => {
            let hash = window.location.hash;
            if (!hash) return ({ pathList: this.defaultPath })
            hash = decodeURIComponent(hash.slice(1, hash.length));
            let h = '';
            let h_json = ''
            let json = undefined
            if (hash.includes('=')) {
                const index = hash.indexOf('=');
                h = hash.substring(0, index)
                h_json = hash.substring(index + 1, hash.length);
                try {
                    json = h_json && JSON.parse(h_json);

                } catch (error) {
                    console.warn("Url to JSON error");
                }
            } else {
                h = hash
            } 
            return { pathList: ['/', ...h.split('/')], json };
        }


        const self = this;
        this.store = create<AppState>((set) => ({
            Pages: pages,
            json: {},
            navHistory: [],
            pathList: this.defaultPath || ['/'],
            init() {
                if (self.isInitialized) return;
                self.listener = () => {
                    const state = urlToPath();
                    set(() => state)
                }
                window.addEventListener('hashchange', windowListenner(self.listener));
                self.listener();
                self.isInitialized = true;
            },
            navNext() {
                history.forward()
                return;
            },
            navBack() {
                history.back();
                return;
            },
            setPath(...paths) {
                console.log('paths',paths);
                
                self.editPath(paths)
            },

            setAbsPath(paths) {
                let nav: string[] = ['/'];
                let currentPage = pages['/'];
                for (const path of paths) {
                    // @ts-ignore
                    const c = currentPage[path]
                    if (!c) {
                        self.navHistoryUpdate(nav);
                        return;
                    }
                    currentPage = c;
                    nav.push(path as string);
                }
                self.navHistoryUpdate(nav);
                return
            },
            check(component) {
                try {
                    let currentPage = pages
                    const list = [...self.store.getState().pathList];
                    if (list.includes(component)) return true;

                    for (const path of list) {
                        //@ts-ignore
                        const c = currentPage[path];
                        if (c && (c[component] === null)) {
                            return true;
                        } else if (c === undefined) {
                            return
                        }
                        //@ts-ignore
                        currentPage = c;
                    }
                } catch (error) {
                    return
                }
                return
            },
        }))
    }
    getPages() {
        return this.pages
    }
    getStore() {
        this.store.getState().init();
        return this.store
    }


    navHistoryUpdate(pathList: string[]) {
        const path = pathList.join('/').replace('//', '')
        if (window.location.hash !== path) window.location.hash = path;
    }

    editPath(paths: string[]) {
        if (paths[0] === '/') {
            let nav: string[] = [];
            let currentPage = this.pages
            try {
                for (const path of paths) {
                    //@ts-ignore
                    const c = currentPage[path]
                    if (c === null) {
                        this.navHistoryUpdate(nav);
                        return;
                    } else if (c === undefined) {
                        console.error(' Error Path don\'t exist');
                        return; // Error Path don't exist
                    }
                    //@ts-ignore
                    currentPage = c;
                    nav.push(path as string);
                }
            } catch (error) {
                return
            }
            this.navHistoryUpdate(nav);
            return
        }

        if (paths[0] === './') paths.shift();

        let i = 1;
        if (paths[0] === '../') {
            for (const path of paths) {
                if (path == '../') i++;
                else break;
            }
            paths = paths.slice(i - 1, paths.length);
        }

        const list = [...this.store.getState().pathList];
        const max = list.length - i;

        const l = list.splice(0, max < 0 ? 0 : max);
        if (l[0] !== '/') return console.error('//Error  Path don\'t exist  L :', l);

        if (l.length == 0) l.push('/');
        let _paths: string[] = [...l, ...paths];
        if (_paths.length > 0) {
            let currentPage: any = this.pages
            for (const path of _paths) {
                //@ts-ignore
                const c = currentPage[path]
                if (c === null) {
                    return console.error('error Component detected  c==null ', _paths, path);
                } else if (c === undefined) {
                    return console.error('// Path don\'t exist  c == undefined', _paths, path);
                }
                currentPage = c;
            }
            this.navHistoryUpdate(_paths);
        }
        return
    }
}
