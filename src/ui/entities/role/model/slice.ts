import { type StateCreator } from 'zustand';

import {
    ARIA_ATTRIBUTES_SCHEMES,
    type AttributeScheme,
    type AttributeState
} from '@ui/entities/attribute';
import { type RootStore } from '@ui/shared/store';

import { ARIA_ROLES_SCHEMES, type AriaRole, type RoleScheme } from './scheme';
import { type RoleState } from './types';

const createAttributeState = (scheme: AttributeScheme): AttributeState => {
    const { id, type } = scheme;

    if (type === 'boolean' || type === 'enum') {
        return { id, scheme, pickedValue: scheme.defaultValue, isAdded: false };
    }

    return { id, scheme, pickedValue: undefined, isAdded: false };
};

const createRoleState = (scheme: RoleScheme): RoleState => ({
    id: scheme.id,
    scheme,
    attributes: scheme.attributes.map((attributeId) => createAttributeState(ARIA_ATTRIBUTES_SCHEMES[attributeId])),
    addedAttributes: []
});

const getInitialRoles = (): RoleState[] => Object.values(ARIA_ROLES_SCHEMES).map(createRoleState);

const getInitialActiveRoleId = (): AriaRole => Object.values(ARIA_ROLES_SCHEMES)[0].id;

export type RoleSlice = {
    roles: RoleState[];
    activeRoleId: AriaRole;
    selectRole: (roleId: AriaRole) => void;
};

declare module '@ui/shared/store' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootStore extends RoleSlice {}
}

export const createRoleSlice: StateCreator<RootStore, [], [], RoleSlice> = (set) => ({
    roles: getInitialRoles(),
    activeRoleId: getInitialActiveRoleId(),
    selectRole: (roleId) => set({ activeRoleId: roleId, activeAttributeId: null })
});
