
export type Features = { [key: string]: Feature }

type Value = {
    id: string,
    label: string,
    url?: string,
    value?: string,
}

export interface Feature {
    id: string,
    name: string,
    image: string,
    view:
    'icon' | //<- list : d'icon
    'label' | //<-lst : select
    'card' |  //<-list : carte value = HTML
    'interval' | //->list : interval de values[0] -> values[1]
    'input' | //->un input values[0]
    'date' |//<-list
    'date_interval'|
    'input_date' |//->values[0]
    'inpute_date_interval'| //interval de values[0] -> values[1]
    'file'| //interval de values[0] -> values[1]
    'input_file', // ->values[0]
    default: Value,
    values: Value[]
}

export interface ProductInterface {
    id: string,
    name: string,
    description: string,
    features: Features,
    images: string[],
    model_images: string[],
    scene_url: string,
    colaborator_id: string,
    engineer_id: string,
    status: 0,// 0 pres // 1 ingenieer a finiattend conirmation de colaborateur // 2colaborator a poster // 3 en pause// 4 deleted // 5   
}


const gemFeature: Feature = {
    id: (Math.random() * 10000000).toString(32),
    name: 'gem',
    image: '/src/World/images/gem/gem.png',
    view: 'icon',
    default: {
        label: 'Grenat bleu',
        id: 'blue_garnet',
        url: '/src/World/images/gem/blue_garnet.png',
        value: '2d3563'
    },
    values: [{
        label: 'Grenat bleu',
        id: 'blue_garnet',
        url: '/src/World/images/gem/blue_garnet.png',
        value: '2d3563'
    }, {
        label: 'Taaffeite',
        id: 'taaffeite',
        url: '/src/World/images/gem/taaffeite.png',
        value: '9575ab'
    }, {
        label: 'Grandidierite',
        id: 'grandidierite',
        url: '/src/World/images/gem/grandidierite.png',
        value: '3f7269'
    }, {
        label: 'Serendibite',
        id: 'serendibite',
        url: '/src/World/images/gem/serendibite.png',
        value: '024a3d'
    }, {
        label: 'Diamant',
        id: 'diamond',
        url: '/src/World/images/gem/diamond.png',
        value: 'abdcf9'
    }, {
        label: 'Rubis',
        id: 'ruby',
        url: '/src/World/images/gem/ruby.png',
        value: 'c24a4a'
    }, {
        label: 'Alexandrite',
        id: 'alexandrite',
        url: '/src/World/images/gem/alexandrite.png',
        value: '0d5a4c'
    }, {
        label: 'Béryl rouge',
        id: 'red_beryl',
        url: '/src/World/images/gem/red_beryl.png',
        value: '6f4060'
    }, {
        label: 'Padparadscha Saphire',
        id: 'padparadscha_saphire',
        url: '/src/World/images/gem/padparadscha_saphire.png',
        value: '98485d'
    }, {
        label: 'Musgravite',
        id: 'musgravite',
        url: '/src/World/images/gem/musgravite.png',
        value: 'b2acad'
    }, {
        label: 'Saphir',
        id: 'sapphire',
        url: '/src/World/images/gem/sapphire.png',
        value: '288fc3'
    }, {
        label: 'Benitoite',
        id: 'benitoite',
        url: '/src/World/images/gem/benitoite.png',
        value: '286bc3'
    }, {
        label: 'Opale noire',
        id: 'black_opal',
        url: '/src/World/images/gem/black_opal.png',
        value: '4c415e'
    }, {
        label: 'Grenat démantoïde',
        id: 'demantoid_garnet',
        url: '/src/World/images/gem/demantoid_garnet.png',
        value: '5cb065'
    }, {
        label: 'Poudretteite',
        id: 'poudretteite',
        url: '/src/World/images/gem/poudretteite.png',
        value: 'a770b5'
    }, {
        label: 'Opale de feu',
        id: 'fire_opal',
        url: '/src/World/images/gem/fire_opal.png',
        value: 'b38a3c'
    }, {
        label: 'Jeremejevite',
        id: 'jeremejevite',
        url: '/src/World/images/gem/jeremejevite.png',
        value: '99a1ca'
    }, {
        label: 'Tanzanite',
        id: 'tanzanite',
        url: '/src/World/images/gem/tanzanite.png',
        value: '46518a'
    }]
}

const metalFeature: Feature = {
    id: (Math.random() * 10000000).toString(32),
    name: 'metal',
    image: '/src/World/images/metal/metal.png',
    view: 'icon',
    default: {
        label: 'Gold',
        id: 'gold',
        value: 'bead2e'
    },
    values: [{
        label: 'Gold',
        id: 'gold',
        value: 'bead2e'
    }, {
        label: 'Silver',
        id: 'silver',
        value: 'eeeeee'
    }, {
        label: 'Bronze',
        id: 'bronz',
        value: 'ffaa55'
    },]

}


const features: Features = {
    [metalFeature.id]: metalFeature,
    [gemFeature.id]: gemFeature
}




export const DataBase = {
    async fetchRings() {
        const list: { [id: string]: ProductInterface } = {};
        this.rings_Products.forEach((p) => {
            list[p.id] = p
        })
        return list
    },
    async fetchFeatures(product_id: string) {
        const products = await this.fetchRings()
        return products[product_id]?.features
    },
    rings_Products: [{
        id: '1_000_001',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona1',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_002',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona2',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_003',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona3',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_004',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona4',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_005',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona5',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_006',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona6',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_007',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona7',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    }, {
        id: '1_000_008',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona8',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_009',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona9',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_010',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona10',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_011',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona11',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_0012',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona12',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_013',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona13',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_014',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona14',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    }, {
        id: '1_000_015',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona15',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_0016',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona16',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_017',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1591209627710-d2427565a41f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona17',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_018',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1567523977592-7959bc5df51e?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona18',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_019',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona19',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_020',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1584126321309-46d2a53adda0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona20',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },
    {
        id: '1_000_021',
        description: 'Logo Google Cloud Fournie par Google Cloud Translation. Envoyer des commentaires. Traduction de sites Web. Détecter la langue. Détecter la langue. Français.',
        features,
        images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        model_images: ['https://images.unsplash.com/photo-1607869549913-c73078fde439?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        name: 'Ladona21',
        status: 0,
        colaborator_id: 'noag',
        engineer_id: 'noga',
        scene_url: '/src/World/Rings/Ring_petal_1'
    },] as ProductInterface[]
}