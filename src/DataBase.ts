import { AbstractWorld } from "./World/WorldManager";

export type Features = { [key: string]: Feature }

export interface AppInterface {

}

export interface FavoritesInterface {
    id: string,
    label: string
    product_id: string
    user_id: string
    store_id: string
    created_at: string
    updated_at: string
    user?: UserInterface,
    product?: ProductInterface
}

export interface CategoryInterface {
    id: string,
    label: string
    description: string
    catalog_id: string
    scene_dir?: string
    index: number
    store_id: string
    created_at: string
    updated_at: string
}

export interface CommandInterface {
    id: string,
    status: string,
    collected_features?: Record<string, any>
    created_at: string,
    updated_at: string,
    quantity: number,
    price: number,
    user_id: string,
    payment_id: string | null,
    images: string[],
    title: string,
    description: string,
    stock: number,
    product_id: string
    favorite?: string
}

export interface ClientVisites extends ProductInterface {
    user_name: string;
    user_email: string;
    visited_at: string;
    client_id: string;
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
    from_id?: string,
    to_id?: string,
    store?: StoreInterface,
    "creator_id": string,
    "receiver_id": string,
    "deleted"?: string,
    "blocked"?: string,
    "other_att": 'creator' | 'receiver',// calculer
    "unchecked_count": number,// calculer
    "last_message"?: Message | undefined,
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
    "updated_at": string,
    user?: UserInterface
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

export type CollectedFeatures = { [key: string]: Component | undefined }

export type FeaturesCollector = {
    collectFeature(feature: Feature, value: Component | undefined): void
    getCollectedFeatures(key: string): Component | undefined
    allCollectedFeatures(): CollectedFeatures,
    setAll(all:CollectedFeatures):void
};

export interface ProductScenus extends ProductInterface {
    featuresCollector?: FeaturesCollector,
    scene?: AbstractWorld
}

type Views =
    'selector' |
    'buttons' |
    'components' |
    'number' |
    'text' |
    'email' |
    'website' |
    'date' |
    'time' |
    'phone';

export type Component = {
    id:string
    feature_id:string
    name: string,
    price?: number,
    description?: string,
    is_default?:boolean
    images?: string[],
    scene?: string|null,
    scene_code?: string,
}

export interface Feature {
    id: string,
    name: string,
    product_id:string;
    icon: string[],
    view: Views,
    required?: string,
    placeholder?: string;
    // default_value?: Component,
    case?: 'uppercase' | 'capitalize' | 'lowercase',
    match?: string;
    // min_length?: number;
    // max_length?: number;
    min?: number;
    max?: number;
    // enum?:string[]
    // max_size?: number;
    // ext?: string
    created_at?: string;
    updated_at?: string;
    components?: (Component)[];
}

export interface ProductDetailInterface{ 
    id:string,
    title:string,
    detail:string,
    index:number,
    images?:string[],
    product_id:string,
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
    quantity?: number;
    details?:ProductDetailInterface[]
    star: number
    note?: {
        note: number,
        votes: number,
        star: number
    },
    favorite?: string,
}

export interface ProductCommentInterface {
    id: number,
    user_id: string,
    product_id: string,
    user?: {
        id: string,
        name: string,
        email: string,
        photos: string[],
        country?: string,
        country_icon?: string
    },
    photos: string[],
    photos_count: number,
    videos: string[],
    videos_count: number
    note: number,
    text: string,
    response?: string,
    created_at: string
}

export interface CommentIndex {
    befor: number,
    comment: ProductCommentInterface,
    total: number
}

const gemFeature: Feature = {
    id: 'gem_id',
    product_id:'',
    name: 'gem',
    icon: ['/src/World/images/gem/gem.png'],
    view: 'components',
    // default_value: {
    //     name: 'Grenat bleu',
    //     id: 'Grenat bleu',
    //     images: ['/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg'],
    //     scene_code: '2d3563'
    // } as Component,
    components: [{
        name: 'Grenat bleu',
        feature_id:'gem_id',
        id: 'Grenat bleu',
        images: ['/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg'],
        scene_code: '2d3563'
    }, {
        name: 'Taaffeite',
        feature_id:'gem_id',
        id: 'Taaffeite',
        images: ['/src/World/images/gem/taaffeite.png'],
        scene_code: '9575ab',
    }, {
        name: 'Grandidierite',
        feature_id:'gem_id',
        id: 'Grandidierite',
        images: ['/src/World/images/gem/grandidierite.png'],
        scene_code: '3f7269',
    }, {
        name: 'Serendibite',
        feature_id:'gem_id',
        id: 'Serendibite',
        images: ['/src/World/images/gem/serendibite.png'],
        scene_code: '024a3d',
    }, {
        name: 'Diamant',
        feature_id:'gem_id',
        id: 'Diamant',
        images: ['/src/World/images/gem/diamond.png'],
        scene_code: 'abdcf9',
    }, {
        name: 'Rubis',
        feature_id:'gem_id',
        id: 'Rubis',
        images: ['/src/World/images/gem/ruby.png'],
        scene_code: 'c24a4a',
    }, {
        name: 'Alexandrite',
        feature_id:'gem_id',
        id: 'Alexandrite',
        images: ['/src/World/images/gem/alexandrite.png'],
        scene_code: '0d5a4c',
    }, {
        name: 'Béryl rouge',
        feature_id:'gem_id',
        id: 'Béryl rouge',
        images: ['/src/World/images/gem/red_beryl.png'],
        scene_code: '6f4060',
    }, {
        name: 'Padparadscha Saphire',
        feature_id:'gem_id',
        id: 'Padparadscha Saphire',
        images: ['/src/World/images/gem/padparadscha_saphire.png'],
        scene_code: '98485d',
    }, {
        name: 'Musgravite',
        feature_id:'gem_id',
        id: 'Musgravite',
        images: ['/src/World/images/gem/musgravite.png'],
        scene_code: 'b2acad',
    }, {
        name: 'Saphir',
        feature_id:'gem_id',
        id: 'Saphir',
        images: ['/src/World/images/gem/sapphire.png'],
        scene_code: '288fc3',
    }, {
        name: 'Benitoite',
        feature_id:'gem_id',
        id: 'Benitoite',
        images: ['/src/World/images/gem/benitoite.png'],
        scene_code: '286bc3',
    }, {
        name: 'Opale noire',
        feature_id:'gem_id',
        id: 'Opale noire',
        images: ['/src/World/images/gem/black_opal.png'],
        scene_code: '4c415e',
    }, {
        name: 'Grenat démantoïde',
        feature_id:'gem_id',
        id: 'Grenat démantoïde',
        images: ['/src/World/images/gem/demantoid_garnet.png'],
        scene_code: '5cb065',
    }, {
        name: 'Poudretteite',
        feature_id:'gem_id',
        id: 'Poudretteite',
        images: ['/src/World/images/gem/poudretteite.png'],
        scene_code: 'a770b5',
    }, {
        name: 'Opale de feu',
        feature_id:'gem_id',
        id: 'Opale de feu',
        images: ['/src/World/images/gem/fire_opal.png'],
        scene_code: 'b38a3c',
    }, {
        name: 'Jeremejevite',
        feature_id:'gem_id',
        id: 'Jeremejevite',
        images: ['/src/World/images/gem/jeremejevite.png'],
        scene_code: '99a1ca',
    }, {
        name: 'Tanzanite',
        feature_id:'gem_id',
        id: 'Tanzanite',
        images: ['/src/World/images/gem/tanzanite.png'],
        scene_code: '46518a',
    }] as any
}

const metalFeature: Feature = {
    id: 'metal_id',
    name: 'metal',
    product_id:'',
    icon: ['/src/World/images/metal/metal.png'],
    view: 'components',
    // default_value: {
    //     "price": 12345,
    //     "unity": "Kg",
    //     "name": "Silver",
    //     "id": "Silver",
    //     "description": "silver",
    //     "images": [
    //         '/src/World/images/metal/silver.png'
    //     ],
    //     "scene": null,
    //     "scene_code": "eeeeee",
    // },
    components: [
        {
            "price": 12345,
            "name": "Gold",
            "feature_id":"metal_id",
            "id": "Gold",
            "description": "gold",
            "images": [
                '/src/World/images/metal/gold.png'
            ],
            "scene": null,
            "scene_code": "eeeeee",
        },
        {
            "price": 12345,
            "name": "Silver",
            "feature_id":"metal_id",
            "id": "Silver",
            "description": "silver",
            "images": [
                '/src/World/images/metal/silver.png'
            ],
            "scene": null,
            "scene_code": "eeeeee",
        },
        {
            "price": 12345,
            "name": "Bronze",
            "feature_id":"metal_id",
            "id": "Bronze",
            "description": "bronz",
            "images": [
                '/src/World/images/metal/bronz.png'
            ],
            "scene": null,
            "scene_code": "ffaa55"
        }
    ]
}

export const features: ListType<Feature> = { limit: 25, total: 2, page: 1, list: [metalFeature, gemFeature] }