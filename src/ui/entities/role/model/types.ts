import { type AddedAttribute, type AttributeState } from '@ui/entities/attribute';

import { type AriaRole, type RoleScheme } from './scheme';

export type RoleState = {
    id: AriaRole;
    scheme: RoleScheme;
    attributes: AttributeState[];
    addedAttributes: AddedAttribute[];
};
