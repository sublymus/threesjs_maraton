
import { create } from 'zustand'
import { CatalogueInterface, Category } from '../../../DataBase'
import { AbstractLocalLoader, WorldManager } from '../../../World/WorldManager'
import { CatalogueWorld } from '../../../World/Catalogue/Catalogue'
import { Host } from '../../../Config'
import { useRegisterStore } from '../../Layout/PageRegister/RegisterStore'



interface AppState {
    selectedCategory: Category | undefined,
    catalogue: CatalogueInterface | undefined,
    catalogues: CatalogueInterface[]
    fetchCatalogues(): Promise<void>,
    initCatalogueListener(): void
    setCatalogue(catalogue: CatalogueInterface): Promise<void>
}

const CATALOGUE_CATEGORY_LOADER_CACHE: { [name: string]: AbstractLocalLoader[] } = {}

let CATALOGUES_CACHE: CatalogueInterface[] | null = null;

export const useCatalogueStore = create<AppState>((set) => ({
    catalogue: undefined,
    catalogues: [],
    selectedCategory: undefined,
    async setCatalogue(catalogue) {
        await setCatalogueCategory(catalogue);
        set(() => ({ catalogue: catalogue }))
    },
    async fetchCatalogues() {
        if (CATALOGUES_CACHE) return;
        const store = useRegisterStore.getState().store;
        if(!store) return;
        const response = await fetch(`${Host}/get_catalogs/?page=1&limit=25&is_category_required=true&store_id=${store.id}`, {
            method: 'GET',
        });
        
        const catalogues = (await response.json() ).list as CatalogueInterface[]
        CATALOGUES_CACHE = catalogues;
        const catalogue = catalogues[0];
        console.log({catalogues});
        
        if(catalogue)setCatalogueCategory(catalogue);
        set(() => ({ catalogues, catalogue }));
        useCatalogueStore.getState().initCatalogueListener()
    },
    initCatalogueListener() {
        /**
         * il ya un seul CatalogueWorld affiche la list de  produits d'un catalogue
         */
        WorldManager.worldManager && CatalogueWorld.catalogueWorld?.init(WorldManager.worldManager._renderer)
        CatalogueWorld.catalogueWorld?.addListener('chance', (event) => {
            set(() => ({
                selectedCategory: event.focusedModel?.userData.category,
            }));
        })
    }
}));


async function setCatalogueCategory(catalogue: CatalogueInterface) {
    if (CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id]) {
        CatalogueWorld.catalogueWorld?.removeAll();
        const promises = CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id].map((loader) => new Promise(async (rev) => {
            rev(await loader.getModel());
        }));
        (await Promise.allSettled(promises)).map(m => (m as any).value).forEach((model) => {
            CatalogueWorld.catalogueWorld?.addModel(model);
        });
        return
    }

    CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id] = [];
    const promises = catalogue.categories.map((category) => new Promise(async (rev) => {
        const { LocalLoader } = await import(/* @vite-ignore */`${Host}${category.scene_dir}/LocalLoader.js`)
        const loader = new LocalLoader() as AbstractLocalLoader;

        console.log('cate');
        
        await WorldManager.worldManager?.initialize( (d)=>{
            console.log('-----', d);
            //@ts-ignore
            loader.init(d);
        
        })

        CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id].push(loader)
        const model = await loader.getModel();
        model.userData.category = category;
        rev(model)
    }));
    const models = (await Promise.allSettled(promises)).filter((f) => f.status == 'fulfilled').map(m => (m as any).value);
    CatalogueWorld.catalogueWorld?.removeAll();
    models.forEach((model => {
        CatalogueWorld.catalogueWorld?.addModel(model);
    }));
}