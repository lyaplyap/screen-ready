export const ARIA_ATTRIBUTES = {
    DISABLED: 'aria-disabled',
    HAS_POPUP: 'aria-haspopup',
    EXPANDED: 'aria-expanded',
    PRESSED: 'aria-pressed',
    LABEL: 'aria-label',
    LEVEL: 'aria-level',
    CHECKED: 'aria-checked'
} as const;

export type AriaAttribute = typeof ARIA_ATTRIBUTES[keyof typeof ARIA_ATTRIBUTES];

type BaseAttributeScheme = {
    id: AriaAttribute;
    htmlAlternative?: string;
    w3c: string;
};

export type BooleanAttributeScheme = BaseAttributeScheme & {
    type: 'boolean';
    values: ['false', 'true'];
    defaultValue?: 'false';
};

export type EnumeratedAttributeScheme = BaseAttributeScheme & {
    type: 'enum';
    values: string[];
    defaultValue?: string;
};

export type StringAttributeScheme = BaseAttributeScheme & {
    type: 'string';
};

export type AttributeScheme =
    | BooleanAttributeScheme
    | EnumeratedAttributeScheme
    | StringAttributeScheme;

export const ARIA_ATTRIBUTES_SCHEMES: Record<AriaAttribute, AttributeScheme> = {
    [ARIA_ATTRIBUTES.DISABLED]: {
        id: 'aria-disabled',
        htmlAlternative: 'disabled',
        type: 'boolean',
        values: ['false', 'true'],
        defaultValue: 'false',
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#aria-disabled'
    },
    [ARIA_ATTRIBUTES.HAS_POPUP]: {
        id: 'aria-haspopup',
        type: 'enum',
        values: ['false', 'menu', 'listbox', 'tree', 'grid', 'dialog'],
        defaultValue: 'false',
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup'
    },
    [ARIA_ATTRIBUTES.EXPANDED]: {
        id: 'aria-expanded',
        type: 'boolean',
        values: ['false', 'true'],
        defaultValue: undefined,
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#aria-expanded'
    },
    [ARIA_ATTRIBUTES.PRESSED]: {
        id: 'aria-pressed',
        type: 'enum',
        values: ['true', 'false', 'mixed'],
        defaultValue: undefined,
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#aria-pressed'
    },
    [ARIA_ATTRIBUTES.LABEL]: {
        id: 'aria-label',
        type: 'string',
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
    },
    [ARIA_ATTRIBUTES.LEVEL]: {
        id: 'aria-level',
        type: 'enum',
        values: ['1', '2', '3', '4', '5', '6'],
        defaultValue: undefined,
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#aria-level'
    },
    [ARIA_ATTRIBUTES.CHECKED]: {
        id: 'aria-checked',
        htmlAlternative: 'checked',
        type: 'boolean',
        values: ['false', 'true'],
        defaultValue: undefined,
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#aria-checked'
    }
};
