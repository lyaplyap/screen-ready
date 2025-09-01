import { ARIA_ROLES_SCHEMES, ARIA_ATTRIBUTES_SCHEMES, AriaAttribute, AttributeScheme, RoleScheme } from '../shared/a11y';
import { Store, RoleStore, AttributeStore } from './types';

const getDefaultAttributeStore = (scheme: AttributeScheme): AttributeStore => {
    const { id, type } = scheme;

    if (type === 'boolean' || type === 'enum') {
        return {
            id: id,
            scheme,
            pickedValue: scheme.defaultValue,
            isAdded: false
        };
    }

    return {
        id,
        scheme,
        pickedValue: undefined,
        isAdded: false
    };
};

const getDefaultRoleStore = (scheme: RoleScheme): RoleStore => {
    const { id, attributes } = scheme;
    
    return {
        id,
        scheme,
        attributes: attributes.map((attributeId) => getDefaultAttributeStore(ARIA_ATTRIBUTES_SCHEMES[attributeId])),
        addedAttributes: []
    };
};

export const getInitialStore = (): Store => {
    const roleSchemes = Object.values(ARIA_ROLES_SCHEMES);

    const activeRoleId = roleSchemes[0].id;
    const activeAttributeId: AriaAttribute | null = null;
    const roles: RoleStore[] = roleSchemes.map((scheme) => getDefaultRoleStore(scheme));

    return {
        activeRoleId,
        activeAttributeId,
        roles
    };
};
