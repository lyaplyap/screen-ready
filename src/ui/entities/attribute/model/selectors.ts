import { selectActiveRoleState } from '@ui/entities/role/model/selectors';
import { type RootStore } from '@ui/shared/store';

export const selectActiveAttributeState = (state: RootStore) => {
    if (!state.activeAttributeId) {
        return null;
    }

    const activeRoleState = selectActiveRoleState(state);

    return activeRoleState.attributes.find(({ id }) => id === state.activeAttributeId) ?? null;
};

export const selectActiveAttributeScheme = (state: RootStore) => {
    return selectActiveAttributeState(state)?.scheme ?? null;
};
