import { create } from 'zustand'

export const Host = 'http://localhost:3333';
export const DefaultImage = '/src/res//photo2.png';

type PageType = {
    [key: string]: null | PageType
}
const Pages = {
    '/': {
        loading: {},
        catalogue: {
            'catalogue_description': null,
            'catalogue_onglet': null,
            'top-bar': null,
        },
        product: {
            'editer': null,
            'products': null,
            'summary': null,
            'filter': null,
            'top-bar': null,
        },
        profile: {
            'login': {},
            'create': {},
            'error': {},
            'user': {
                'profile-nav': null
            },
            'command': {
                'profile-nav': null
            },
            'cart': {
                'profile-nav': null
            },
            favorites:{
                'profile-nav': null
            },
            visited:{
                'profile-nav': null
            },
            about: {
                'profile-nav': null
            },
            blog: {
                'profile-nav': null
            },
            service: {
                'profile-nav': null
            },
            'top-bar': null,
        },
    }
} satisfies PageType;

type navQS = (qs: Record<string, any>) => Record<string, any>

type V<RK> = RK[keyof RK];
type AllComponents<O> = {
    [key in keyof O]: key extends string ? key | V<AllComponents<O[key]>> : never
}

//     setPath('./PageA1') <==> setPath('PageA1')
//     setPath('PageB','PageB2') <==> setPath('./','PageB','PageB2') 
//     setPath('../','../','PageA1');
//     setPath('/','PageA1');

interface AppState {
    // page: keyof typeof Pages,
    qs: Record<string, any>,
    Pages: typeof Pages,
    navHistory: string[];
    pathList: string[],
    // lastPathList: string[];
    // skeep(id:string ,...page: (V<AllComponents<typeof Pages>> | './' | '../')[] ):undefined
    // skeepAbs<
    //     A extends '/',
    //     B extends keyof typeof Pages[A],
    //     C extends keyof typeof Pages[A][B],
    //     D extends keyof typeof Pages[A][B][C],
    //     E extends keyof typeof Pages[A][B][C][D],
    //     F extends keyof typeof Pages[A][B][C][D][E],
    //     G extends keyof typeof Pages[A][B][C][D][E][F],
    //     H extends keyof typeof Pages[A][B][C][D][E][F][G],
    //     I extends keyof typeof Pages[A][B][C][D][E][F][G][H],
    //     J extends keyof typeof Pages[A][B][C][D][E][F][G][H][I],
    // >(id:string,page: [B, C?, D?, E?, F?, G?, H?, I?, J?]): undefined,
    navNext(qs?: navQS): undefined,
    navBack(qs?: navQS): undefined,
    setAbsPath<
        A extends '/',
        B extends keyof typeof Pages[A],
        C extends keyof typeof Pages[A][B],
        D extends keyof typeof Pages[A][B][C],
        E extends keyof typeof Pages[A][B][C][D],
        F extends keyof typeof Pages[A][B][C][D][E],
        G extends keyof typeof Pages[A][B][C][D][E][F],
        H extends keyof typeof Pages[A][B][C][D][E][F][G],
        I extends keyof typeof Pages[A][B][C][D][E][F][G][H],
        J extends keyof typeof Pages[A][B][C][D][E][F][G][H][I],
    >(page: [B, C?, D?, E?, F?, G?, H?, I?, J?]): undefined,
    check(page: V<AllComponents<typeof Pages>>): true | undefined;
    setPath(...page: (V<AllComponents<typeof Pages>> | './' | '../')[]): undefined,
    init(): void;
}

const DEFAULT_PAGE = ['/','profile','about'];

let isInitialized = false;
let getListener = (set: (cb: (data: Partial<AppState>) => Partial<AppState>) => any) => {
    return () => {
        let hash = window.location.hash;
        if(!hash) return set(({}) => ({ pathList:DEFAULT_PAGE }));
        
        hash = hash.slice(1, hash.length)
        const path = ['/', ...hash.split('/')];
        set(() => ({ pathList: path }))
    }
};
let listener: ReturnType<(typeof getListener)> | null = null
export const useAppStore = create<AppState>((set) => ({
    Pages,
    qs: {},
    navHistory: [],
    pathList: DEFAULT_PAGE,
    //lastPathList: ['/'],
    // skeep(id, ...page) {

    // },
    // skeepAbs(id, ...paths) {
    //     const doc = SkeepCache[id];
    //     const state = useAppStore.getState();
    //     if(!doc){
    //         SkeepCache[id] = {
    //             current:state.pathList.join('/').replace('//',''),
    //             last:state.lastPathList.join('/').replace('//',''),
    //             next: paths.join('/').replace('//',''),
    //         }
    //         //@ts-ignore
    //         state.setAbsPath(...paths)
    //         return;
    //     }

    //     if(doc.next == state.lastPathList.join('/').replace('//','')){
    //         delete SkeepCache[id] 

    //     }


    // },
    init() {
        if (isInitialized) return;
        listener = getListener(set);
        navHistoryUpdate( useAppStore.getInitialState().pathList);
        window.addEventListener('hashchange', listener);
        isInitialized = true;
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
        editPath(paths)
    },

    setAbsPath(paths) {
        let nav: string[] = ['/'];
        let currentPage = Pages['/'];
        for (const path of paths) {
            //@ts-ignore
            const c = currentPage[path]
            if (!c) {
                navHistoryUpdate( nav);
                return;
            }
            currentPage = c;
            nav.push(path as string);
        }
        navHistoryUpdate( nav);
        return
    },
    check(component) {
        let currentPage = Pages
        const list = useAppStore.getState().pathList;
        if (list.includes(component)) return true;

        for (const path of list) {
            //@ts-ignore
            const c = currentPage[path];
            if (c && (c[component] === null)) {
                return true;
            }else if(c===undefined) {
                return
            }
            currentPage = c;
        }
        return
    },
}))

function navHistoryUpdate(pathList: string[]) {
    const path = pathList.join('/').replace('//', '')
    window.location.hash = path;
}

function editPath( paths: string[]) {
    if (paths[0] === '/') {
        let nav: string[] = [];
        let currentPage = Pages

        for (const path of paths) {
            //@ts-ignore
            const c = currentPage[path]
            if (c === null) {
                navHistoryUpdate( nav);
                return;
            } else if (c === undefined) {
                console.error(' Error Path don\'t exist');
                return; // Error Path don't exist
            }
            currentPage = c;
            nav.push(path as string);
        }
        navHistoryUpdate( nav);
        return
    }

    if (paths[0] === './')   paths.shift();

    let i = 1;
    if (paths[0] === '../') {
        for (const path of paths) {
            if (path == '../') i++;
            else break;
        }
        paths = paths.slice(i - 1, paths.length);
    }

    const list = useAppStore.getState().pathList;
    const max = list.length - i;
    const l = list.splice(0, max < 0 ? 0 : max);
    if (l[0] !== '/') return //Error  Path don't exist
    if (l.length == 0) l.push('/');
    let _paths: string[] = [...l, ...paths];
    if (_paths.length > 0) {
        let currentPage: any = Pages
        for (const path of _paths) {
            //@ts-ignore
            const c = currentPage[path]
            if (c === null) {
                return; //error Component detected
            } else if (c === undefined) {
                return // Path don't exist
            }
            currentPage = c;
        }
        navHistoryUpdate( _paths);
    }
    return
}