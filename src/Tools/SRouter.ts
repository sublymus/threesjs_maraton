import { StoreApi, UseBoundStore, create } from 'zustand'

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

//TODO
/**
    ajouter un path par defaut ( facultatif ) au ca ou une page parente sans contenu es soliciter.. pour une redirection vers une page pus adequate

 */

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
interface UnUseAppState<T extends PageType> {
    json: Record<string, any> | undefined,
    Pages: T,
    navHistory: string[];
    pathList: V<AllComponents<T>>[],
    navNext(json?: NavJson): undefined,
    navBack(json?: NavJson): undefined,
    setAbsPath<
        A extends '/',
        B extends keyof T[A],
        C extends keyof T[A][B],
        D extends keyof T[A][B][C],
        E extends keyof T[A][B][C][D],
        F extends keyof T[A][B][C][D][E],
        G extends keyof T[A][B][C][D][E][F],
        H extends keyof T[A][B][C][D][E][F][G],
        I extends keyof T[A][B][C][D][E][F][G][H],
        J extends keyof T[A][B][C][D][E][F][G][H][I],
        K extends keyof T[A][B][C][D][E][F][G][H][I][J],
        L extends keyof T[A][B][C][D][E][F][G][H][I][J][K],
        M extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L],
        N extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M],
        O extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N],
        P extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O],
        Q extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P],
        R extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q],
        S extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R],
        _T extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R][S],
        U extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R][S][_T],
        V extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R][S][_T][U],
        W extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R][S][_T][U][V],
        X extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R][S][_T][U][V][W],
        Y extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R][S][_T][U][V][W][X],
        _Z extends keyof T[A][B][C][D][E][F][G][H][I][J][K][L][M][N][O][P][Q][R][S][_T][U][V][W][X][Y],
    >(page: [B, C?, D?, E?, F?, G?, H?, I?, J?]): undefined,
    check(...page: V<AllComponents<T>>[]): true | undefined;
    setPath(...page: (V<AllComponents<T>> | './' | '../')[]): undefined,
    init(): void;
    current(...page: V<AllComponents<T>>[]): true | undefined;
    exist(...page: string[]): true | undefined,
    qs(json:Record<string, any>):UnUseAppState<T>
}

export const urlToPath = (self?: SRouter<any>): { pathList: string[], json?: Record<string, any> } => {
    let hash = window.location.hash;
    // history.pushState(self?.store.getState().pathList,self?.store.getState().pathList.join('/')||'')
    // console.log(history.length);
    
    // if(hash.includes('cart')){
    //     // history.go(0)
    // }
    // 
    // console.log('ert',history.state);
    if (!hash) return ({ pathList: (self?.defaultPath || ['/']) as string[] })
    hash = decodeURIComponent(hash.slice(1, hash.length));
    let h = '';
    let h_json = ''
    let json = undefined
    if (hash.includes('=')) {
        const index = hash.indexOf('=');
        h = hash.substring(0, index);
        h_json = hash.substring(index + 1, hash.length);
        try {
            json = h_json && JSON.parse(h_json);
        } catch (error) {
            console.warn("Url to JSON error");
        }
    } else {
        h = hash
    }
    const pathList = ['/', ...h.split('/')] as any;
    // const l = self.store.getState().exist(pathList);
    // console.log('l',l);

    return { pathList, json };
}

let _qs:any = {};

export class SRouter<T extends PageType = PageType>{
    isInitialized = false;
    listener: Function | null = null;
    store: UseBoundStore<StoreApi<UnUseAppState<T>>>;
    constructor(public pages: T, public defaultPath?: V<AllComponents<T>>[]) {

        const self = this;

        this.store = create<UnUseAppState<T>>((set) => ({
            Pages: pages,
            json: {},
            navHistory: [],
            pathList: self.defaultPath || ['/'] as any,
            current(...path) {
                const l = self.store.getState().pathList;
                return (path.includes(l[l.length - 1] as any)) || undefined;
            },
            init() {
                if (self.isInitialized) return;
                self.listener = () => {
                    const state = urlToPath(self);
                    set(() => state as any)
                }
                window.addEventListener('hashchange', windowListenner(self.listener));
                self.listener();
                self.isInitialized = true;
            },
            navNext() {
                history.forward();
                return;
            },
            qs(json){
                _qs = json;
                return self.store.getState()
            },
            navBack() {
                history.back();
                return;
            },
            setPath(...paths) {
                self.editPath(paths);
                _qs = undefined;
            },
            exist(...paths) {
                let nav: string[] = ['/'];
                let currentPage = pages['/'];
                for (const path of paths) {
                    // @ts-ignore
                    const c = currentPage[path]

                    if (!c) {
                        console.log('not existe');
                        return;
                    }
                    currentPage = c;
                    nav.push(path as string);
                }
                console.log('ok existe');
                return true
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
                _qs = undefined;
                return
            },
            check(...paths) {

                for (const path of paths) {
                    if (_check(path, pages, self)) return true
                }
                return
            }
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
        let path = pathList.join('/').replace('//', '');
        try {
            if(_qs) path += '='+ JSON.stringify(_qs);
        } catch (error) {}
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

        //@ts-ignore
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

function _check(_path: string, pages: any, self: SRouter<any>) {
    try {
        let currentPage = pages
        const list = [...self.store.getState().pathList];
        if (list.includes(_path)) return true;
        const r = ()=>{
            for (const path of list) {
            //@ts-ignore

            const c = currentPage[path];

            //@ts-ignore
            if (c && (c[_path] === null)) {
                return true;
            } else if (c === undefined) {
                return
            }
            //@ts-ignore
            currentPage = c;
        }
        }
        let res = r();        
        return res
    } catch (error) {
        return
    }
}