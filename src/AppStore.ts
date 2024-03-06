
import { create } from 'zustand'

const Pages = {
    loading:[
        'loading'
    ],
    catalogue: [
        'catalogue_description',
        'catalogue_onglet',
        'profile_image',
        'nav_link',
        'research_bar',
        'card',
        'nav_option',
        'logo'
    ],
    product:[
        'editer',
        'list',
        'summary',
        'filter'
    ],
    profile:[
        'profile'
    ],
    customer_service:[
        'customer service'
    ],
    about:[
        'about'
    ],

}
interface AppState {
    page: keyof typeof Pages,
    Pages:typeof Pages
}
export const useProductStore = create<AppState>((set) => ({
    page:'catalogue',
    Pages
}))
