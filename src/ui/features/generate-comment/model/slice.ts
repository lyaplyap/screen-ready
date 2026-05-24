import { type StateCreator } from 'zustand';

import { selectAddedAttributes } from '@ui/entities/role/model/selectors';
import { type RootStore } from '@ui/shared/store';

import { sendComment } from './sendComment';

export type GenerateCommentSlice = {
    generateComment: () => void;
};

declare module '@ui/shared/store' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootStore extends GenerateCommentSlice {}
}

export const createGenerateCommentSlice: StateCreator<RootStore, [], [], GenerateCommentSlice> = (_set, get) => ({
    generateComment: () => {
        const state = get();
        sendComment(state.activeRoleId, selectAddedAttributes(state));
    }
});
