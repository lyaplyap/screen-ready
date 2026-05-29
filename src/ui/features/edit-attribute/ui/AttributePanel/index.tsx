import React from 'react';

import { type AttributeScheme, W3C } from '@ui/entities/attribute';
import { type AriaRole } from '@ui/entities/role';
import { useTranslation } from '@ui/shared/i18n';

import { Advice } from '../Advice';
import { AriaHeader } from '../AriaHeader';
import { AttributeValues } from '../AttributeValues';
import { Preview } from '../Preview';
import { VoiceOver } from '../VoiceOver';
import { Warning } from '../Warning';

import './index.css';

type AttributePanelProps = {
    role: AriaRole;
    scheme: AttributeScheme;
    pickedValue?: string;
    isAdded: boolean;
    pickAttributeValue: (value: string) => void;
    addAttribute: () => void;
    removeAttribute: () => void;
};

export const AttributePanel: React.FC<AttributePanelProps> = ({
    role,
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
            <Preview role={role} scheme={attribute} pickedValue={pickedValue} />
            <VoiceOver role={role} scheme={attribute} pickedValue={pickedValue} />
            <Advice scheme={attribute} />
            <Warning scheme={attribute} />
        </div>
    );
};
