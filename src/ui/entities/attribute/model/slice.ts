import { type StateCreator } from 'zustand';

import { type RootStore } from '@ui/shared/store';

import { type AriaAttribute } from './scheme';

export type AttributeSlice = {
    activeAttributeId: AriaAttribute | null;
    selectAttribute: (attributeId: AriaAttribute) => void;
};

declare module '@ui/shared/store' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootStore extends AttributeSlice {}
}

export const createAttributeSlice: StateCreator<RootStore, [], [], AttributeSlice> = (set) => ({
    activeAttributeId: null,
    selectAttribute: (attributeId) => set({ activeAttributeId: attributeId })
});
