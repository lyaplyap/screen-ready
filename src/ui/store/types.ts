import { AriaRole, RoleScheme, AriaAttribute, AttributeScheme } from '../shared/a11y';

export type AttributeStore = {
    id: AriaAttribute;
    scheme: AttributeScheme;
    pickedValue?: string;
    isAdded: boolean;
};

export type AddedAttribute = {
    id: AriaAttribute;
    value: string;
};

export type RoleStore = {
    id: AriaRole;
    scheme: RoleScheme;
    attributes: AttributeStore[];
    addedAttributes: AddedAttribute[];
};

export type Store = {
    roles: RoleStore[];
    activeRoleId: AriaRole;
    activeAttributeId: AriaAttribute | null;
};
