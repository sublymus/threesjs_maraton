
export type Features = { [key: string]: Feature }

export interface AppInterface {

}

export interface CartInterface {
    "id": string,
    product_id: string,
    store_id: string,
    quantity: number,
    collectedFeatures: Record<string, any>,
    "created_at": string,
    "updated_at": string,
}

export interface Session {
    "id": string,
    "title": string;
    "creator_id": string,
    "receiver_id": string,
    "deleted": string,
    "closed": string,
    "other_att": 'creator' | 'receiver',// calculer
    "unchecked_count": number,// calculer
    "last_message"?: Message | undefined,
    "creator_opened_at": string,
    "receiver_opened_at": string,
    "created_at": string,
    "updated_at": string,
    "other": UserInterface,
};
export interface Discussion {
    "id": string,
    "creator_id": string,
    "receiver_id": string,
    "deleted": string,
    "blocked": string,
    "other_att": 'creator' | 'receiver',// calculer
    "unchecked_count": number,// calculer
    "last_message": Message | undefined,
    "creator_opened_at": string,
    "receiver_opened_at": string,
    "created_at": string,
    "updated_at": string,
    "other": UserInterface,
};
export interface Message {
    "id": string,
    "table_name": string,
    "table_id": string,
    "text": string,
    "files": string[],
    "rating_id": string | undefined,
    "survey_id": string | undefined,
    "user_id": string,
    "created_at": string,
    "updated_at": string
};

type Status = 'PAUSE' | 'VISIBLE' | 'TRASH'
export interface Role {
    id: string,
    name: string,
    store_id: string | null,
    filter_flient: boolean,
    ban_client: boolean,
    filter_collaborator: boolean,
    ban_collaborator: boolean,
    create_delete_collaborator: boolean,
    manage_interface: boolean,
    filter_product: boolean,
    edit_product: boolean,
    create_delete_product: boolean,
    manage_scene_product: boolean,
    chat_client: boolean,
    filter_command: boolean,
    manage_command: boolean,

    created_at: string,
    updated_at: string,
}
export interface StoreInterface {
    id: string,
    name: string,
    owner_id: string,
    description: string | undefined,
    sotre_interface: AppInterface | undefined,
    phone: string,
    store_email: string;
    banners: string[],
    logo: string[]
    website: string
}
export interface UserInterface {
    id: string,
    name: string,
    email: string,
    password: string,
    photos: string[],
    type: string;
    roles?: Role[],
    token: string;
    created_at: string,
    status: Status | 'NEW'
    s_type?: string;
    user_store_id?: string;
}

export interface UserStore {
    id: string,
    type: string,
    role_id: string,
    user_id: string,
    store_id: string,
    join_at: string
}

export type ListType<T = any> = {
    page: number,
    limit: number,
    total: number,
    list: T[],
}

export interface Category {
    id: string,
    label: string,
    description: string,
    catalog_id: string;
    scene_dir?: string,
    index: number,
    status: Status,

    created_at?: string;
    updated_at?: string
}
export interface CatalogueInterface {
    id: string,
    label: string,
    description?: string,
    scene_dir?: string;
    index: number;
    status: Status,
    categories: Category[],

    created_at?: string;
    updated_at?: string

}

export type BinderComponent = {
    id: string,
    product_id: string,
    component_id: string,
    feature_id: string,
    store_id: string,
    price: number,
    unity: string,
    devise: string,
    created_at: string,
    updated_at: string,
    name: string,
    description: string,
    images: string,
    icon:string[],
    scene: null,
    code: string,
    key: string
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

export type Component = BinderComponent // | string | boolean | number;

export interface Feature {
    id: string,
    collect_type: CollectType;
    name: string,
    icon: string,
    view: Views,
    required?: string,
    placeholder?: string;
    default_value?: string,
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
    created_at?: string;
    updated_at?: string;
    components?: (Component)[];
}

export interface ProductInterface {
    id: string,
    title: string,
    description: string,
    images: string[],
    model_images: string[],
    status: 'PAUSE' | 'VISIBLE' | 'TRASH',// 0 pres // 1 ingenieer a finiattend conirmation de colaborateur // 2colaborator a poster // 3 en pause// 4 deleted // 5   
    stock: number,
    category_id: string,
    price: number,
    is_dynamic_price?: boolean,
    store_id: string;
    collaborator_id: string,
    engineer_id: string,
    scene_dir: string,
    features: ListType<Feature>

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
    components: [{
        id: 'blue_garnet',
        name: 'Grenat bleu',
        feature_id: 'gem_id',
        icon: ['/src/World/images/gem/blue_garnet.png'],
        code: '2d3563'

    }, {
        name: 'Taaffeite',
        id: 'taaffeite',
        icon: ['/src/World/images/gem/taaffeite.png'],
        code: '9575ab',
        feature_id: 'gem_id',
    }, {
        name: 'Grandidierite',
        id: 'grandidierite',
        icon: ['/src/World/images/gem/grandidierite.png'],
        code: '3f7269',
        feature_id: 'gem_id',
    }, {
        name: 'Serendibite',
        id: 'serendibite',
        icon: ['/src/World/images/gem/serendibite.png'],
        code: '024a3d',
        feature_id: 'gem_id',
    }, {
        name: 'Diamant',
        id: 'diamond',
        icon: ['/src/World/images/gem/diamond.png'],
        code: 'abdcf9',
        feature_id: 'gem_id',
    }, {
        name: 'Rubis',
        id: 'ruby',
        icon: ['/src/World/images/gem/ruby.png'],
        code: 'c24a4a',
        feature_id: 'gem_id',
    }, {
        name: 'Alexandrite',
        id: 'alexandrite',
        icon: ['/src/World/images/gem/alexandrite.png'],
        code: '0d5a4c',
        feature_id: 'gem_id',
    }, {
        name: 'Béryl rouge',
        id: 'red_beryl',
        icon: ['/src/World/images/gem/red_beryl.png'],
        code: '6f4060',
        feature_id: 'gem_id',
    }, {
        name: 'Padparadscha Saphire',
        id: 'padparadscha_saphire',
        icon: ['/src/World/images/gem/padparadscha_saphire.png'],
        code: '98485d',
        feature_id: 'gem_id',
    }, {
        name: 'Musgravite',
        id: 'musgravite',
        icon: ['/src/World/images/gem/musgravite.png'],
        code: 'b2acad',
        feature_id: 'gem_id',
    }, {
        name: 'Saphir',
        id: 'sapphire',
        icon: ['/src/World/images/gem/sapphire.png'],
        code: '288fc3',
        feature_id: 'gem_id',
    }, {
        name: 'Benitoite',
        id: 'benitoite',
        icon: ['/src/World/images/gem/benitoite.png'],
        code: '286bc3',
        feature_id: 'gem_id',
    }, {
        name: 'Opale noire',
        id: 'black_opal',
        icon: ['/src/World/images/gem/black_opal.png'],
        code: '4c415e',
        feature_id: 'gem_id',
    }, {
        name: 'Grenat démantoïde',
        id: 'demantoid_garnet',
        icon: ['/src/World/images/gem/demantoid_garnet.png'],
        code: '5cb065',
        feature_id: 'gem_id',
    }, {
        name: 'Poudretteite',
        id: 'poudretteite',
        icon: ['/src/World/images/gem/poudretteite.png'],
        code: 'a770b5',
        feature_id: 'gem_id',
    }, {
        name: 'Opale de feu',
        id: 'fire_opal',
        icon: ['/src/World/images/gem/fire_opal.png'],
        code: 'b38a3c',
        feature_id: 'gem_id',
    }, {
        name: 'Jeremejevite',
        id: 'jeremejevite',
        icon: ['/src/World/images/gem/jeremejevite.png'],
        code: '99a1ca',
        feature_id: 'gem_id',
    }, {
        name: 'Tanzanite',
        id: 'tanzanite',
        icon: ['/src/World/images/gem/tanzanite.png'],
        code: '46518a',
        feature_id: 'gem_id',
    }] as any
}

const metalFeature: Feature = {
    id: 'metal_id',
    collect_type: 'string',
    name: 'metal',
    icon: '/src/World/images/metal/metal.png',
    view: 'icon',
    default_value: "gold",
    components: [
        {
            "id": "6bd884a0-82be-414a-ac45-9ef47a866bf8",
            "product_id": "05e7dc8e-f409-46ae-91cc-6a125add8c5b",
            "component_id": "6bd884a0-82be-414a-ac45-9ef47a866bf8",
            "feature_id": "2c711848-789a-4ff2-bb14-9b2e3e024485",
            "store_id": "b5b40cb3-29b1-4ada-9aa4-7e26614d6a36",
            "price": 12345,
            "unity": "Kg",
            "devise": "$",
            "created_at": "2024-05-20 07:58:13",
            "updated_at": "2024-05-20 07:58:13",
            "name": "Gold",
            "description": "gold",
            "images": "[]",
            "icon": [
                "/fs/1huag4619_4bddo0_components_icon_6bd884a0-82be-414a-ac45-9ef47a866bf8.png"
            ],
            "scene": null,
            "code": "bead2e",
            "key": "gold"
        },
        {
            "id": "5707c6a6-d197-4a7b-8a8c-34150325e514",
            "product_id": "05e7dc8e-f409-46ae-91cc-6a125add8c5b",
            "component_id": "5707c6a6-d197-4a7b-8a8c-34150325e514",
            "feature_id": "2c711848-789a-4ff2-bb14-9b2e3e024485",
            "store_id": "b5b40cb3-29b1-4ada-9aa4-7e26614d6a36",
            "price": 12345,
            "unity": "Kg",
            "devise": "$",
            "created_at": "2024-05-20 07:59:07",
            "updated_at": "2024-05-20 07:59:07",
            "name": "Silver",
            "description": "silver",
            "images": "[]",
            "icon": [
                "/fs/1huag5qd9_3nhrv0_components_icon_5707c6a6-d197-4a7b-8a8c-34150325e514.png"
            ],
            "scene": null,
            "code": "eeeeee",
            "key": "silver"
        },
        {
            "id": "0af71216-5c1f-40f7-823f-8b25afb20984",
            "product_id": "05e7dc8e-f409-46ae-91cc-6a125add8c5b",
            "component_id": "0af71216-5c1f-40f7-823f-8b25afb20984",
            "feature_id": "2c711848-789a-4ff2-bb14-9b2e3e024485",
            "store_id": "b5b40cb3-29b1-4ada-9aa4-7e26614d6a36",
            "price": 12345,
            "unity": "Kg",
            "devise": "$",
            "created_at": "2024-05-20 07:59:57",
            "updated_at": "2024-05-20 08:01:09",
            "name": "Bronze",
            "description": "bronz",
            "images": "[]",
            "icon": [
                "/fs/1huag9i95_58sb80_components_icon_0af71216-5c1f-40f7-823f-8b25afb20984.png"
            ],
            "scene": null,
            "code": "ffaa55",
            "key": "bronz"
        }
    ]
}

export const features: ListType<Feature> = { limit: 25, total: 2, page: 1, list: [metalFeature, gemFeature] }




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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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
        status: 'PAUSE',
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