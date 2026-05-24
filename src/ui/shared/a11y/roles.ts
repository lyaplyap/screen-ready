import { type AriaAttribute, ARIA_ATTRIBUTES } from './attributes';

export const ARIA_ROLES = {
    BUTTON: 'button',
    LINK: 'link',
    HEADING: 'heading',
    RADIO: 'radio',
    CHECKBOX: 'checkbox',
    SWITCH: 'switch'
} as const;

export type AriaRole = typeof ARIA_ROLES[keyof typeof ARIA_ROLES];

export type RoleScheme = {
    id: AriaRole;
    htmlAlternatives?: string[];
    attributes: AriaAttribute[];
    w3c: string;
};

export const ARIA_ROLES_SCHEMES: Record<AriaRole, RoleScheme> = {
    [ARIA_ROLES.BUTTON]: {
        id: 'button',
        attributes: [
            ARIA_ATTRIBUTES.DISABLED,
            ARIA_ATTRIBUTES.HAS_POPUP,
            ARIA_ATTRIBUTES.EXPANDED,
            ARIA_ATTRIBUTES.PRESSED,
            ARIA_ATTRIBUTES.LABEL
        ],
        htmlAlternatives: [
            '<button>',
            '<summary>',
            '<input type="button">',
            '<input type="image">',
            '<input type="reset">',
            '<input type="submit">'
        ],
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#button'
    },
    [ARIA_ROLES.LINK]: {
        id: 'link',
        attributes: [
            ARIA_ATTRIBUTES.DISABLED,
            ARIA_ATTRIBUTES.HAS_POPUP,
            ARIA_ATTRIBUTES.EXPANDED,
            ARIA_ATTRIBUTES.LABEL
        ],
        htmlAlternatives: ['<a>'],
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#link'
    },
    [ARIA_ROLES.HEADING]: {
        id: 'heading',
        attributes: [
            ARIA_ATTRIBUTES.LEVEL,
            ARIA_ATTRIBUTES.LABEL
        ],
        htmlAlternatives: [
            '<h1>',
            '<h2>',
            '<h3>',
            '<h4>',
            '<h5>',
            '<h6>'
        ],
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#heading'
    },
    [ARIA_ROLES.RADIO]: {
        id: 'radio',
        attributes: [
            ARIA_ATTRIBUTES.CHECKED,
            ARIA_ATTRIBUTES.DISABLED,
            ARIA_ATTRIBUTES.LABEL
        ],
        htmlAlternatives: ['<input type="radio">'],
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#radio'
    },
    [ARIA_ROLES.CHECKBOX]: {
        id: 'checkbox',
        attributes: [
            ARIA_ATTRIBUTES.CHECKED,
            ARIA_ATTRIBUTES.DISABLED,
            ARIA_ATTRIBUTES.LABEL
        ],
        htmlAlternatives: ['<input type="checkbox">'],
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#checkbox'
    },
    [ARIA_ROLES.SWITCH]: {
        id: 'switch',
        attributes: [
            ARIA_ATTRIBUTES.CHECKED,
            ARIA_ATTRIBUTES.DISABLED,
            ARIA_ATTRIBUTES.LABEL
        ],
        w3c: 'https://www.w3.org/TR/wai-aria-1.2/#switch'
    }
};
