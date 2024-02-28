import { Feature } from '../../World/World';

import { create } from 'zustand'

export interface AppState {
    feature: Feature | undefined
    setFeature: (feature: Feature) => void
}
export const useEditerStore = create<AppState>((set) => ({
    feature: undefined,
    setFeature(feature: Feature) {
        set(() => ({ feature }))
    },
}))