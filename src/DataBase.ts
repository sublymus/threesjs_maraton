
export type Features = { [key: string]: Feature }

export interface AppInterface {

}

export interface CommandInterface {
    id: string,
    status: string,
    created_at: string,
    updated_at: string,
    quantity: number,
    price: number,
    user_id:string,
    payment_id: string|null,
    images: string[],
    title: string,
    stock:number,
    product_id: string
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
    from_id?:string,
    to_id?:string,
    store?:StoreInterface,
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
    is_default?:boolean,
    devise: string,
    created_at: string,
    updated_at: string,
    name: string,
    description: string,
    images: string,
    icon: string[],
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
    default_value?: Component,
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

// const gemFeature: Feature = {
//     id: 'gem_id',
//     name: 'gem',
//     collect_type: 'string',
//     icon: '/src/World/images/gem/gem.png',
//     view: 'icon',
//     // default_value: 'blue_garnet',
//     components: [{
//         id: 'blue_garnet',
//         name: 'Grenat bleu',
//         feature_id: 'gem_id',
//         icon: ['/src/World/images/gem/blue_garnet.png'],
//         code: '2d3563'

//     }, {
//         name: 'Taaffeite',
//         id: 'taaffeite',
//         icon: ['/src/World/images/gem/taaffeite.png'],
//         code: '9575ab',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Grandidierite',
//         id: 'grandidierite',
//         icon: ['/src/World/images/gem/grandidierite.png'],
//         code: '3f7269',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Serendibite',
//         id: 'serendibite',
//         icon: ['/src/World/images/gem/serendibite.png'],
//         code: '024a3d',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Diamant',
//         id: 'diamond',
//         icon: ['/src/World/images/gem/diamond.png'],
//         code: 'abdcf9',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Rubis',
//         id: 'ruby',
//         icon: ['/src/World/images/gem/ruby.png'],
//         code: 'c24a4a',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Alexandrite',
//         id: 'alexandrite',
//         icon: ['/src/World/images/gem/alexandrite.png'],
//         code: '0d5a4c',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Béryl rouge',
//         id: 'red_beryl',
//         icon: ['/src/World/images/gem/red_beryl.png'],
//         code: '6f4060',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Padparadscha Saphire',
//         id: 'padparadscha_saphire',
//         icon: ['/src/World/images/gem/padparadscha_saphire.png'],
//         code: '98485d',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Musgravite',
//         id: 'musgravite',
//         icon: ['/src/World/images/gem/musgravite.png'],
//         code: 'b2acad',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Saphir',
//         id: 'sapphire',
//         icon: ['/src/World/images/gem/sapphire.png'],
//         code: '288fc3',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Benitoite',
//         id: 'benitoite',
//         icon: ['/src/World/images/gem/benitoite.png'],
//         code: '286bc3',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Opale noire',
//         id: 'black_opal',
//         icon: ['/src/World/images/gem/black_opal.png'],
//         code: '4c415e',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Grenat démantoïde',
//         id: 'demantoid_garnet',
//         icon: ['/src/World/images/gem/demantoid_garnet.png'],
//         code: '5cb065',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Poudretteite',
//         id: 'poudretteite',
//         icon: ['/src/World/images/gem/poudretteite.png'],
//         code: 'a770b5',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Opale de feu',
//         id: 'fire_opal',
//         icon: ['/src/World/images/gem/fire_opal.png'],
//         code: 'b38a3c',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Jeremejevite',
//         id: 'jeremejevite',
//         icon: ['/src/World/images/gem/jeremejevite.png'],
//         code: '99a1ca',
//         feature_id: 'gem_id',
//     }, {
//         name: 'Tanzanite',
//         id: 'tanzanite',
//         icon: ['/src/World/images/gem/tanzanite.png'],
//         code: '46518a',
//         feature_id: 'gem_id',
//     }] as any
// }
