
export type Features = { [key: string]: Feature }

export type ListType<T = any> = {
    page:number,
    limit:number,
    total:number,
    list: T[],
}

export interface Category {
    id: string,
    label: string,
    description: string,
    catalog_id: string;
    scene_dir?: string,
    index: number,
    status: string,

    created_at?: string;
    updated_at?: string
}
export interface CatalogueInterface {
    id: string,
    label: string,
    description?: string,
    scene_dir?: string;
    index: number;
    status: string,
    categories: Category[],

    created_at?: string;
    updated_at?: string

}

export type F_Value = {
    id: string,
    label: string,
    feature_id: string
    price?: number
    url?: string,
    file?: string,
    icon?: string,
    key_word?: string,
    value?: string,

    created_at?: string;
    updated_at?: string
}

type CollectType =
    'number' |
    'string' |
    'boolean' |
    'f_value';

type Views =
    'icon' | //<- list : d'icon
    'label' | //<-lst : select
    'card' |  //<-list : carte value = HTML
    'interval' | //->list : interval de values[0] -> values[1]
    'input' | //->un input values[0]
    'date' | //<-list
    'date_interval' |
    'input_date' | //->values[0]
    'inpute_date_interval' | //interval de values[0] -> values[1]
    'file' | //interval de values[0] -> values[1]
    'input_file'; // ->values[0]

export type VALUES = F_Value | string | boolean | number;

export interface Feature {
    id: string,
    collect_type: CollectType;
    name: string,
    icon: string,
    view: Views,
    required?: string,
    placeholder?: string;
    default_value?: VALUES,
    lowercase?: boolean,
    uppercase?: boolean,
    capitalize?: boolean,
    trim?: boolean,
    match?: string;
    min_length?: number;
    max_length?: number;
    min?: number;
    max?: number;
    max_size?: number;
    ext?: string
    values?: (VALUES)[];
    created_at?: string;
    updated_at?: string;
}

export interface ProductInterface {
    id: string,
    title: string,
    description: string,
    images: string[],
    model_images: string[],
    status: number,// 0 pres // 1 ingenieer a finiattend conirmation de colaborateur // 2colaborator a poster // 3 en pause// 4 deleted // 5   
    stock: number,
    category_id: string,
    price: number,
    is_dynamic_price?: boolean,
    store_id: string;
    collaborator_id: string,
    engineer_id: string,
    scene_dir: string,
    features: Feature[],

    created_at: string;
    updated_at: string
}

const gemFeature: Feature = {
    id: 'gem_id',
    name: 'gem',
    collect_type: 'string',
    icon: '/src/World/images/gem/gem.png',
    view: 'icon',
    default_value: 'blue_garnet',
    values: [{
        id: 'blue_garnet',
        label: 'Grenat bleu',
        feature_id: 'gem_id',
        url: '/src/World/images/gem/blue_garnet.png',
        value: '2d3563'
    }, {
        label: 'Taaffeite',
        id: 'taaffeite',
        url: '/src/World/images/gem/taaffeite.png',
        value: '9575ab',
        feature_id: 'gem_id',
    }, {
        label: 'Grandidierite',
        id: 'grandidierite',
        url: '/src/World/images/gem/grandidierite.png',
        value: '3f7269',
        feature_id: 'gem_id',
    }, {
        label: 'Serendibite',
        id: 'serendibite',
        url: '/src/World/images/gem/serendibite.png',
        value: '024a3d',
        feature_id: 'gem_id',
    }, {
        label: 'Diamant',
        id: 'diamond',
        url: '/src/World/images/gem/diamond.png',
        value: 'abdcf9',
        feature_id: 'gem_id',
    }, {
        label: 'Rubis',
        id: 'ruby',
        url: '/src/World/images/gem/ruby.png',
        value: 'c24a4a',
        feature_id: 'gem_id',
    }, {
        label: 'Alexandrite',
        id: 'alexandrite',
        url: '/src/World/images/gem/alexandrite.png',
        value: '0d5a4c',
        feature_id: 'gem_id',
    }, {
        label: 'Béryl rouge',
        id: 'red_beryl',
        url: '/src/World/images/gem/red_beryl.png',
        value: '6f4060',
        feature_id: 'gem_id',
    }, {
        label: 'Padparadscha Saphire',
        id: 'padparadscha_saphire',
        url: '/src/World/images/gem/padparadscha_saphire.png',
        value: '98485d',
        feature_id: 'gem_id',
    }, {
        label: 'Musgravite',
        id: 'musgravite',
        url: '/src/World/images/gem/musgravite.png',
        value: 'b2acad',
        feature_id: 'gem_id',
    }, {
        label: 'Saphir',
        id: 'sapphire',
        url: '/src/World/images/gem/sapphire.png',
        value: '288fc3',
        feature_id: 'gem_id',
    }, {
        label: 'Benitoite',
        id: 'benitoite',
        url: '/src/World/images/gem/benitoite.png',
        value: '286bc3',
        feature_id: 'gem_id',
    }, {
        label: 'Opale noire',
        id: 'black_opal',
        url: '/src/World/images/gem/black_opal.png',
        value: '4c415e',
        feature_id: 'gem_id',
    }, {
        label: 'Grenat démantoïde',
        id: 'demantoid_garnet',
        url: '/src/World/images/gem/demantoid_garnet.png',
        value: '5cb065',
        feature_id: 'gem_id',
    }, {
        label: 'Poudretteite',
        id: 'poudretteite',
        url: '/src/World/images/gem/poudretteite.png',
        value: 'a770b5',
        feature_id: 'gem_id',
    }, {
        label: 'Opale de feu',
        id: 'fire_opal',
        url: '/src/World/images/gem/fire_opal.png',
        value: 'b38a3c',
        feature_id: 'gem_id',
    }, {
        label: 'Jeremejevite',
        id: 'jeremejevite',
        url: '/src/World/images/gem/jeremejevite.png',
        value: '99a1ca',
        feature_id: 'gem_id',
    }, {
        label: 'Tanzanite',
        id: 'tanzanite',
        url: '/src/World/images/gem/tanzanite.png',
        value: '46518a',
        feature_id: 'gem_id',
    }]
}

const metalFeature: Feature = {
    id: 'metal_id',
    collect_type: 'string',
    name: 'metal',
    icon: '/src/World/images/metal/metal.png',
    view: 'icon',
    default_value: "gold",
    values: [{
        label: 'Gold',
        id: 'gold',
        url: '/src/World/images/metal/gold.png',
        value: 'bead2e',
        price: 200,
        feature_id: 'metal_id',
    }, {
        label: 'Silver',
        id: 'silver',
        url: '/src/World/images/metal/silver.png',
        value: 'eeeeee',
        price: 200,
        feature_id: 'metal_id',
    }, {
        label: 'Bronze',
        id: 'bronz',
        url: '/src/World/images/metal/bronz.png',
        value: 'ffaa55',
        price: 200,
        feature_id: 'metal_id',
    },]
}

export const features: Feature[] = [metalFeature, gemFeature]




const scene_dir = `/fs/products_scene_dir_016f8a7e-9a8e-4717-b68b-53dce0c9fa63/RingJS`

export const DataBase = {
    async fetchCatalogues() {
        return [
            {
                id: '12345',
                label: 'Catalogue',
                index: 0,
                status: 'VISIBLE',
                categories: this.catalogueProducts.map((p, i) => ({
                    id: '13451' + i,
                    label: 'Category_' + i,
                    scene_dir,
                    index: 0,
                    status: 'PAUSE',
                    catalog_id: 'id',
                    description: 'Category_' + i + '  ==>  ' + p.description
                }) satisfies Category),
            }, {
                id: '12346',
                label: 'Nouvaute',
                index: 0,
                status: 'VISIBLE',
                categories: this.catalogueProducts.map((p, i) => ({
                    id: '1342' + i,
                    label: 'Category_' + i,
                    scene_dir,
                    index: 0,
                    status: 'PAUSE',
                    catalog_id: 'id',
                    description: 'Category_' + i + '  ==>  ' + p.description
                }) satisfies Category),
            }, {
                id: '12347',
                label: 'Populaire',
                index: 0,
                status: 'VISIBLE',
                categories: this.catalogueProducts.map((p, i) => ({
                    id: '13453' + i,
                    label: 'Category_' + i,
                    scene_dir,
                    index: 0,
                    status: 'PAUSE',
                    catalog_id: 'id',
                    description: 'Category_' + i + '  ==>  ' + p.description
                }) satisfies Category),
            }, {
                id: '12348',
                label: 'Meuilleur ventes',
                index: 0,
                status: 'VISIBLE',
                categories: this.catalogueProducts.map((p, i) => ({
                    id: '13454' + i,
                    label: 'Category_' + i,
                    scene_dir,
                    index: 0,
                    status: 'PAUSE',
                    catalog_id: 'id',
                    description: 'Category_' + i + '  ==>  ' + p.description
                }) satisfies Category),
            }
        ] satisfies CatalogueInterface[]
    },

    async fetchRings() {

        return this.rings_Products;
    },
    catalogueProducts: [{
        id: '1_000_001',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona1',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_002',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona2',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_003',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona3',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_004',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona4',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_005',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona5',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_006',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona6',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_007',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona7',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    }],
    rings_Products: [{
        id: '1_000_001',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona1',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_002',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona2',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_003',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona3',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_004',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona4',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_005',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona5',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_006',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona6',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_007',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona7',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    }, {
        id: '1_000_008',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona8',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_009',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona9',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_010',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona10',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_011',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona11',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_0012',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona12',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_013',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona13',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_014',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona14',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    }, {
        id: '1_000_015',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona15',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_0016',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona16',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_017',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona17',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_018',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona18',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_019',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona19',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_020',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona20',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },
    {
        id: '1_000_021',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        title: 'Ladona21',
        status: 0,
        category_id: 'lol',
        stock: 23,
        price: 2000,
        created_at: '###',
        collaborator_id: 'noag',
        engineer_id: 'noga',
        scene_dir
    },] as ProductInterface[],
    commands: [
        {
            id: 1234565,
            client: {
                id: 'client-12345',
                name: 'Kouassi Noga',
            },
            product: {
                id: 'product-12345',
                title: 'Ladona'
            },
            status: 3,
            ref_payement: {
                price: 2000,
                symbol: '₽',
                devise: 'RUB'
            },
            completedAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)).toDateString()),
            createdAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 20)).toDateString())
        },
        {
            id: 1234566,
            client: {
                id: 'client-12345',
                name: 'Kouassi Noga',
            },
            product: {
                id: 'product-12345',
                title: 'Ladona'
            },
            status: 1,
            ref_payement: {
                price: 2000,
                symbol: '₽',
                devise: 'RUB'
            },
            completedAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)).toDateString()),
            createdAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 20)).toDateString())
        },
        {
            id: 1234567,
            client: {
                id: 'client-12345',
                name: 'Kouassi Noga',
            },
            product: {
                id: 'product-12345',
                title: 'Ladona'
            },
            status: 2,
            ref_payement: {
                price: 2000,
                symbol: '₽',
                devise: 'RUB'
            },
            completedAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)).toDateString()),
            createdAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 20)).toDateString())
        },
        {
            id: 1234568,
            client: {
                id: 'client-12345',
                name: 'Kouassi Noga',
            },
            product: {
                id: 'product-12345',
                title: 'Ladona'
            },
            status: 3,
            ref_payement: {
                price: 2000,
                symbol: '₽',
                devise: 'RUB'
            },
            completedAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)).toDateString()),
            createdAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 20)).toDateString())
        },
        {
            id: 1234569,
            client: {
                id: 'client-12345',
                name: 'Kouassi Noga',
            },
            product: {
                id: 'product-12345',
                title: 'Ladona'
            },
            status: 4,
            ref_payement: {
                price: 2000,
                symbol: '₽',
                devise: 'RUB'
            },
            completedAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)).toDateString()),
            createdAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 20)).toDateString())
        },
        {
            id: 1234570,
            client: {
                id: 'client-12345',
                name: 'Kouassi Noga',
            },
            product: {
                id: 'product-12345',
                title: 'Ladona'
            },
            status: 5,
            ref_payement: {
                price: 2000,
                symbol: '₽',
                devise: 'RUB'
            },
            completedAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 10)).toDateString()),
            createdAt: (new Date(Date.now() - (1000 * 60 * 60 * 24 * 20)).toDateString())
        },
    ],
    

}