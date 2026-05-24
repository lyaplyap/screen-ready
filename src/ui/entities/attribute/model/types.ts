import { type AriaAttribute, type AttributeScheme } from './scheme';

export type AttributeState = {
    id: AriaAttribute;
    scheme: AttributeScheme;
    pickedValue?: string;
    isAdded: boolean;
};
