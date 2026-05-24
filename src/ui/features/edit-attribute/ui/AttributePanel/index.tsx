import React from 'react';

import { type AttributeScheme, W3C } from '@ui/entities/attribute';
import { useTranslation } from '@ui/shared/i18n';

import { AriaHeader } from '../AriaHeader';
import { AttributeValues } from '../AttributeValues';

import './index.css';

type AttributePanelProps = {
    scheme: AttributeScheme;
    pickedValue?: string;
    isAdded: boolean;
    pickAttributeValue: (value: string) => void;
    addAttribute: () => void;
    removeAttribute: () => void;
};

export const AttributePanel: React.FC<AttributePanelProps> = ({
    scheme: attribute,
    pickedValue,
    isAdded,
    pickAttributeValue,
    addAttribute,
    removeAttribute
}) => {
    const { t } = useTranslation();
    const { id, w3c } = attribute;

    return (
        <div className="attribute-panel">
            <div className="attribute-panel__header">
                <AriaHeader
                    id={id}
                    disabled={!pickedValue}
                    mode={isAdded ? 'remove' : 'add'}
                    onAdd={addAttribute}
                    onRemove={removeAttribute}
                />
                <AttributeValues
                    {...attribute}
                    value={pickedValue}
                    onPick={pickAttributeValue}
                    onAdd={isAdded ? undefined : addAttribute}
                />
                <W3C description={t(`w3c__description--${id}`)} link={w3c} />
            </div>
            <div className="attribute-panel__preview"></div>
            <div className="attribute-panel__voiceover"></div>
            <div className="attribute-panel__advise"></div>
            <div className="attribute-panel__informer"></div>
        </div>
    );
};
