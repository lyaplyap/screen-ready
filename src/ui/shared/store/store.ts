import { create, type StateCreator, type StoreApi, type UseBoundStore } from 'zustand';

import { type RootStore } from './types';

let storeInstance: UseBoundStore<StoreApi<RootStore>> | null = null;

export const configureStore = (creator: StateCreator<RootStore, [], [], RootStore>): void => {
    storeInstance = create<RootStore>()(creator);
};

export const useStore = <T>(selector: (state: RootStore) => T): T => {
    if (!storeInstance) {
        throw new Error('Store is not configured. Call configureStore() at the app entry point.');
    }

    return storeInstance(selector);
};
