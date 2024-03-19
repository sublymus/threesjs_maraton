
import { create } from 'zustand'
import { Catalogue, Category, DataBase } from '../../DataBase'
import { AbstractLocalLoader, WorldManager } from '../../World/WorldManager'
import { CatalogueWorld } from '../../World/Catalogue/Catalogue'
import { Host } from '../../AppStore'



interface AppState {
    selectedCategory:Category|undefined,
    catalogue: Catalogue |undefined,
    catalogues:Catalogue[]
    fetchCatalogues():Promise<void>,
    initCatalogueListener():void
    setCatalogue(catalogue:Catalogue):Promise<void>
}

const CATALOGUE_CATEGORY_LOADER_CACHE : {[name:string]:AbstractLocalLoader[]}= {}

let CATALOGUES_CACHE:Catalogue[]|null = null;

export const useCatalogueStore = create<AppState>((set) => ({
    catalogue:undefined,
    catalogues:[],
    selectedCategory:undefined,
    async setCatalogue(catalogue) {
        await setCatalogueCategory(catalogue);
        set(()=>({catalogue:catalogue}))
    },
    async fetchCatalogues() {
        if(CATALOGUES_CACHE) return;
        
        const catalogues = await DataBase.fetchCatalogues();
        CATALOGUES_CACHE = catalogues;
        const catalogue = catalogues[0];
        setCatalogueCategory(catalogue);
       set(()=>({catalogues,catalogue}));
    },
    initCatalogueListener(){
        /**
         * il ya un seul CatalogueWorld affiche la list de  produits d'un catalogue
         */
        CatalogueWorld.catalogueWorld?.addListener('chance',(event)=>{
           set(()=>({
            selectedCategory:event.focusedModel?.userData.category,
           }))
            
        })
    }
}));


async function setCatalogueCategory(catalogue:Catalogue) {
    if(CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id]) {
        CatalogueWorld.catalogueWorld?.removeAll();
        const promises = CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id].map((loader)=>new Promise(async (rev)=>{
            rev(await loader.getModel());
        }));
        (await Promise.allSettled(promises)).map(m=>(m as any).value).forEach((model)=>{
            CatalogueWorld.catalogueWorld?.addModel(model);
        });
        return 
    }
    
    CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id] = [];
    const promises = catalogue.categories.map((category)=>new Promise(async (rev)=>{
        const {LocalLoader} = await import(/* @vite-ignore */`${Host}${category.scene_dir}/LocalLoader.js`)
        const loader = new LocalLoader() as AbstractLocalLoader;
        
        await WorldManager.worldManager?.initialize(loader.getDependencies(),loader.init)
       
        CATALOGUE_CATEGORY_LOADER_CACHE[catalogue.id].push(loader)
        const model = await loader.getModel();
        model.userData.category = category;
        rev(model)
    }));
    const models = (await Promise.allSettled(promises)).filter((f)=>f.status=='fulfilled').map(m=>(m as any).value);
    CatalogueWorld.catalogueWorld?.removeAll();
    models.forEach((model=>{
        CatalogueWorld.catalogueWorld?.addModel(model);
    }));
}