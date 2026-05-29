import React from 'react';

import { type AriaAttribute, type AttributeScheme } from '@ui/entities/attribute';
import { type AriaRole } from '@ui/entities/role';
import { buildVoiceover } from '@ui/features/edit-attribute/ui/VoiceOver/lib/build-voiceover';
import { IconPlus, IconShare, IconVolume } from '@ui/shared/icons';

type Translate = (key: string) => string;

type PreviewRendererParams = {
    role: AriaRole;
    scheme: AttributeScheme;
    pickedValue?: string;
    t: Translate;
};

export type PreviewRenderer = (params: PreviewRendererParams) => React.ReactNode;

type PreviewKey = `${AriaRole}__${AriaAttribute}` | `${AriaRole}__default`;

const isTrue = (value?: string) => value === 'true';

type HaspopupValue = NonNullable<React.HTMLAttributes<HTMLElement>['aria-haspopup']>;
const asHaspopup = (value: string): HaspopupValue => value as HaspopupValue;

const HASPOPUP_ITEM_KEYS: Record<string, string> = {
    menu: 'preview-haspopup-item--menu',
    listbox: 'preview-haspopup-item--listbox',
    tree: 'preview-haspopup-item--tree',
    grid: 'preview-haspopup-item--grid',
    dialog: 'preview-haspopup-item--dialog'
};

const renderHaspopupWidget = (popupRole: string, t: Translate) => {
    if (popupRole === 'false' || !popupRole) {
        return null;
    }

    if (popupRole === 'dialog') {
        return (
            <div className="preview-popup preview-popup--dialog" role="dialog">
                {t('preview-haspopup-item--dialog')}
            </div>
        );
    }

    const itemKey = HASPOPUP_ITEM_KEYS[popupRole];
    const itemLabel = itemKey ? t(itemKey) : popupRole;
    const items = [0, 1, 2, 3];

    return (
        <ul className="preview-popup preview-popup--list" role={popupRole}>
            {items.map((index) => (
                <li key={index} role={popupRole === 'menu' ? 'menuitem' : popupRole === 'tree' ? 'treeitem' : 'option'}>
                    {itemLabel}
                </li>
            ))}
        </ul>
    );
};

const renderButton = (extraProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {}, label = 'Button') => (
    <button type="button" className="button button--type_default" {...extraProps}>
        {label}
    </button>
);

const renderLink = (extraProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {}, label = 'Link') => (
    <a href="#" className="link link--type_primary link--underline" {...extraProps}>
        {label}
    </a>
);

const renderVoiceoverCaption = (params: PreviewRendererParams) => {
    const text = buildVoiceover(params);

    return (
        <span className="preview-caption">
            <span className="preview-caption__icon" aria-hidden={true}>
                <IconVolume />
            </span>
            <span className="preview-caption__text">{text}</span>
        </span>
    );
};

const withVoiceoverCaption = (element: React.ReactNode, params: PreviewRendererParams) => (
    <>
        {element}
        {renderVoiceoverCaption(params)}
    </>
);

const renderControlWithLabel = (control: React.ReactNode, label: string) => (
    <span className="preview-control-row">
        {control}
        <span className="preview-control-row__label">{label}</span>
    </span>
);

const REGISTRY: Partial<Record<PreviewKey, PreviewRenderer>> = {
    // -------- button --------
    button__default: ({ t }) => renderButton({}, t('preview-button__label')),
    'button__aria-disabled': ({ pickedValue, t }) =>
        renderButton(
            { 'aria-disabled': isTrue(pickedValue) ? 'true' : 'false' },
            t('preview-button__label')
        ),
    'button__aria-haspopup': ({ pickedValue, t }) => {
        const value = pickedValue ?? 'false';

        return (
            <div className="preview-row">
                {renderButton({ 'aria-haspopup': asHaspopup(value) }, t('preview-button__label'))}
                {renderHaspopupWidget(value, t)}
            </div>
        );
    },
    'button__aria-expanded': ({ pickedValue, t }) => {
        const expanded = isTrue(pickedValue);

        return (
            <div className="preview-accordion">
                {renderButton(
                    { 'aria-expanded': expanded ? 'true' : 'false', 'aria-controls': 'preview-accordion-panel' },
                    t('preview-button__label')
                )}
                {expanded && (
                    <div id="preview-accordion-panel" className="preview-accordion__panel">
                        {t('preview-accordion__content')}
                    </div>
                )}
            </div>
        );
    },
    'button__aria-pressed': ({ pickedValue, t }) => {
        const value = pickedValue ?? 'false';
        const className =
            value === 'true'
                ? 'button button--type_default preview-button--pressed'
                : value === 'mixed'
                    ? 'button button--type_default preview-button--mixed'
                    : 'button button--type_default';

        return (
            <button type="button" className={className} aria-pressed={value as 'true' | 'false' | 'mixed'}>
                {t('preview-button__label')}
            </button>
        );
    },
    'button__aria-label': (params) => {
        const { pickedValue, t } = params;
        const ariaLabel = pickedValue || t('preview-icon-button__fallback-label');

        return withVoiceoverCaption(
            (
                <button
                    type="button"
                    className="button button--type_default button--iconic"
                    aria-label={ariaLabel}
                >
                    <span className="button__icon">
                        <IconPlus />
                    </span>
                </button>
            ),
            params
        );
    },

    // -------- link --------
    link__default: ({ t }) => renderLink({}, t('preview-link__label')),
    'link__aria-disabled': ({ pickedValue, t }) => {
        const disabled = isTrue(pickedValue);

        return (
            <a
                href={disabled ? undefined : '#'}
                className="link link--type_primary link--underline"
                aria-disabled={disabled ? 'true' : 'false'}
            >
                {t('preview-link__label')}
            </a>
        );
    },
    'link__aria-haspopup': ({ pickedValue, t }) => {
        const value = pickedValue ?? 'false';

        return (
            <div className="preview-row">
                {renderLink({ 'aria-haspopup': asHaspopup(value) }, t('preview-link__label'))}
                {renderHaspopupWidget(value, t)}
            </div>
        );
    },
    'link__aria-expanded': ({ pickedValue, t }) => {
        const expanded = isTrue(pickedValue);

        return (
            <div className="preview-accordion">
                <a
                    href="#"
                    className="link link--type_primary"
                    aria-expanded={expanded ? 'true' : 'false'}
                    aria-controls="preview-link-panel"
                >
                    {t('preview-link__expand-label')}
                </a>
                {expanded && (
                    <div id="preview-link-panel" className="preview-accordion__panel">
                        {t('preview-accordion__content')}
                    </div>
                )}
            </div>
        );
    },
    'link__aria-label': (params) => {
        const { pickedValue, t } = params;
        const ariaLabel = pickedValue || t('preview-icon-link__fallback-label');

        return withVoiceoverCaption(
            (
                <a
                    href="#"
                    className="link link--type_primary preview-icon-link"
                    aria-label={ariaLabel}
                >
                    <span className="link__icon">
                        <IconShare />
                    </span>
                </a>
            ),
            params
        );
    },

    // -------- heading --------
    heading__default: ({ t }) => (
        <h2 className="preview-heading preview-heading--level-2">{t('preview-heading__label')}</h2>
    ),
    'heading__aria-level': ({ pickedValue, t }) => {
        const level = Number(pickedValue);
        const safeLevel = Number.isInteger(level) && level >= 1 && level <= 6 ? level : undefined;
        const effectiveLevel = safeLevel ?? 2;
        const label = safeLevel ? t(`preview-heading__label--${safeLevel}`) : t('preview-heading__label');

        return (
            <div
                className={`preview-heading preview-heading--level-${effectiveLevel}`}
                role="heading"
                aria-level={effectiveLevel}
            >
                {label}
            </div>
        );
    },
    'heading__aria-label': (params) => {
        const { pickedValue, t } = params;

        return withVoiceoverCaption(
            (
                <h2
                    className="preview-heading preview-heading--level-2"
                    aria-label={pickedValue || t('preview-heading__label')}
                >
                    {t('preview-heading__label')}
                </h2>
            ),
            params
        );
    },

    // -------- radio --------
    radio__default: ({ t }) => renderControlWithLabel(
        <span className="preview-radio" role="radio" aria-checked="false" tabIndex={0} />,
        t('preview-option__label')
    ),
    'radio__aria-checked': ({ pickedValue, t }) => {
        const checked = isTrue(pickedValue);

        return renderControlWithLabel(
            (
                <span
                    className={`preview-radio ${checked ? 'preview-radio--checked' : ''}`}
                    role="radio"
                    aria-checked={checked ? 'true' : 'false'}
                    tabIndex={0}
                />
            ),
            t('preview-option__label')
        );
    },
    'radio__aria-disabled': ({ pickedValue, t }) => {
        const disabled = isTrue(pickedValue);

        return renderControlWithLabel(
            (
                <span
                    className={`preview-radio ${disabled ? 'preview-radio--disabled' : ''}`}
                    role="radio"
                    aria-checked="false"
                    aria-disabled={disabled ? 'true' : 'false'}
                    tabIndex={0}
                />
            ),
            t('preview-option__label')
        );
    },
    'radio__aria-label': (params) => {
        const { pickedValue, t } = params;

        return withVoiceoverCaption(
            (
                <span
                    className="preview-radio"
                    role="radio"
                    aria-checked="false"
                    aria-label={pickedValue || t('preview-option__label')}
                    tabIndex={0}
                />
            ),
            params
        );
    },

    // -------- checkbox --------
    checkbox__default: ({ t }) => renderControlWithLabel(
        <span className="preview-checkbox" role="checkbox" aria-checked="false" tabIndex={0} />,
        t('preview-option__label')
    ),
    'checkbox__aria-checked': ({ pickedValue, t }) => {
        const value = pickedValue ?? 'false';
        const modifier =
            value === 'true' ? 'preview-checkbox--checked' :
                value === 'mixed' ? 'preview-checkbox--mixed' : '';

        return renderControlWithLabel(
            (
                <span
                    className={`preview-checkbox ${modifier}`}
                    role="checkbox"
                    aria-checked={value as 'true' | 'false' | 'mixed'}
                    tabIndex={0}
                />
            ),
            t('preview-option__label')
        );
    },
    'checkbox__aria-disabled': ({ pickedValue, t }) => {
        const disabled = isTrue(pickedValue);

        return renderControlWithLabel(
            (
                <span
                    className={`preview-checkbox ${disabled ? 'preview-checkbox--disabled' : ''}`}
                    role="checkbox"
                    aria-checked="false"
                    aria-disabled={disabled ? 'true' : 'false'}
                    tabIndex={0}
                />
            ),
            t('preview-option__label')
        );
    },
    'checkbox__aria-label': (params) => {
        const { pickedValue, t } = params;

        return withVoiceoverCaption(
            (
                <span
                    className="preview-checkbox"
                    role="checkbox"
                    aria-checked="false"
                    aria-label={pickedValue || t('preview-option__label')}
                    tabIndex={0}
                />
            ),
            params
        );
    },

    // -------- switch --------
    switch__default: ({ t }) => renderControlWithLabel(
        (
            <span className="preview-switch" role="switch" aria-checked="false" tabIndex={0}>
                <span className="preview-switch__thumb" />
            </span>
        ),
        t('preview-option__label')
    ),
    'switch__aria-checked': ({ pickedValue, t }) => {
        const checked = isTrue(pickedValue);

        return renderControlWithLabel(
            (
                <span
                    className={`preview-switch ${checked ? 'preview-switch--checked' : ''}`}
                    role="switch"
                    aria-checked={checked ? 'true' : 'false'}
                    tabIndex={0}
                >
                    <span className="preview-switch__thumb" />
                </span>
            ),
            t('preview-option__label')
        );
    },
    'switch__aria-disabled': ({ pickedValue, t }) => {
        const disabled = isTrue(pickedValue);

        return renderControlWithLabel(
            (
                <span
                    className={`preview-switch ${disabled ? 'preview-switch--disabled' : ''}`}
                    role="switch"
                    aria-checked="false"
                    aria-disabled={disabled ? 'true' : 'false'}
                    tabIndex={0}
                >
                    <span className="preview-switch__thumb" />
                </span>
            ),
            t('preview-option__label')
        );
    },
    'switch__aria-label': (params) => {
        const { pickedValue, t } = params;

        return withVoiceoverCaption(
            (
                <span
                    className="preview-switch"
                    role="switch"
                    aria-checked="false"
                    aria-label={pickedValue || t('preview-option__label')}
                    tabIndex={0}
                >
                    <span className="preview-switch__thumb" />
                </span>
            ),
            params
        );
    }
};

export const getPreviewRenderer = (role: AriaRole, attribute: AriaAttribute): PreviewRenderer => {
    const specific = REGISTRY[`${role}__${attribute}` as PreviewKey];

    if (specific) {
        return specific;
    }

    const fallback = REGISTRY[`${role}__default` as PreviewKey];

    if (!fallback) {
        return () => null;
    }

    return (params) => {
        const element = fallback(params);

        if (params.pickedValue && React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement<Record<string, unknown>>, {
                [attribute]: params.pickedValue
            });
        }

        return element;
    };
};
