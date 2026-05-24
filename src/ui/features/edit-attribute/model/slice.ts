import { type StateCreator } from 'zustand';

import { selectActiveAttributeState } from '@ui/entities/attribute/model/selectors';
import { selectActiveRoleState } from '@ui/entities/role/model/selectors';
import { type RootStore } from '@ui/shared/store';

export type EditAttributeSlice = {
    pickAttributeValue: (value: string) => void;
    addAttribute: () => void;
    removeAttribute: () => void;
};

declare module '@ui/shared/store' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootStore extends EditAttributeSlice {}
}

export const createEditAttributeSlice: StateCreator<RootStore, [], [], EditAttributeSlice> = (set, get) => ({
    pickAttributeValue: (value) => {
        const activeAttribute = selectActiveAttributeState(get());

        if (!activeAttribute) {
            throw new Error('ATTRIBUTE_STATE_NOT_FOUND');
        }

        set((state) => ({
            roles: state.roles.map((role) => role.id === state.activeRoleId
                ? {
                    ...role,
                    attributes: role.attributes.map((attribute) => attribute.id === state.activeAttributeId
                        ? { ...attribute, pickedValue: value }
                        : attribute
                    )
                }
                : role
            )
        }));
    },
    addAttribute: () => {
        const state = get();
        const activeAttribute = selectActiveAttributeState(state);

        if (!activeAttribute) {
            throw new Error('ATTRIBUTE_NOT_FOUND');
        }

        const { pickedValue } = activeAttribute;

        if (!pickedValue) {
            throw new Error('ATTRIBUTE_VALUE_NOT_SPECIFIED');
        }

        set((current) => ({
            roles: current.roles.map((role) => role.id === current.activeRoleId
                ? {
                    ...role,
                    attributes: role.attributes.map((attribute) => attribute.id === current.activeAttributeId
                        ? { ...attribute, isAdded: true }
                        : attribute
                    ),
                    addedAttributes: [
                        ...role.addedAttributes,
                        { id: activeAttribute.id, value: pickedValue }
                    ]
                }
                : role
            )
        }));
    },
    removeAttribute: () => {
        const state = get();
        const activeRole = selectActiveRoleState(state);
        const activeAttribute = selectActiveAttributeState(state);

        if (!activeAttribute) {
            throw new Error('ATTRIBUTE_NOT_FOUND');
        }

        if (!activeRole.addedAttributes.some(({ id }) => id === activeAttribute.id)) {
            throw new Error('ADDED_ATTRIBUTE_NOT_FOUND');
        }

        set((current) => ({
            roles: current.roles.map((role) => role.id === current.activeRoleId
                ? {
                    ...role,
                    attributes: role.attributes.map((attribute) => attribute.id === current.activeAttributeId
                        ? { ...attribute, isAdded: false }
                        : attribute
                    ),
                    addedAttributes: role.addedAttributes.filter(({ id }) => id !== current.activeAttributeId)
                }
                : role
            )
        }));
    }
});
