import { type RootStore } from '@ui/shared/store';

export const selectActiveRoleState = (state: RootStore) => {
    const activeRoleState = state.roles.find(({ id }) => id === state.activeRoleId);

    if (!activeRoleState) {
        throw new Error('ROLE_STATE_NOT_FOUND');
    }

    return activeRoleState;
};

export const selectAttributes = (state: RootStore) => selectActiveRoleState(state).attributes;

export const selectAddedAttributes = (state: RootStore) => selectActiveRoleState(state).addedAttributes;
