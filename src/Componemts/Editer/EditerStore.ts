import { Feature } from '../../World/World';

import { create } from 'zustand'

export interface AppState {
    feature: Feature | null
    setFeature: (feature: Feature|null) => void
}
export const useEditerStore = create<AppState>((set) => ({
    feature: null,
    setFeature(feature: Feature|null) {
        set(() => ({ feature }))
    },
}))