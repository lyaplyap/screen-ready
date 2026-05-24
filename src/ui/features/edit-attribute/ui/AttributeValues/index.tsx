import React from 'react';

import { type AttributeScheme } from '@ui/entities/attribute';
import { useTranslation } from '@ui/shared/i18n';
import { Input, RadioGroup } from '@ui/shared/ui';

type AttributeValuesProps = AttributeScheme & {
    value?: string;
    onPick: (value: string) => void;
    onAdd?: () => void;
};

export const AttributeValues: React.FC<AttributeValuesProps> = ({ value, onPick, onAdd, ...attribute }) => {
    const { t } = useTranslation();
    const { type } = attribute;

    if (type === 'boolean' || type === 'enum') {
        const { values } = attribute;

        return (
            <RadioGroup
                value={value}
                onChange={onPick}
                onDoubleClick={(pickedValue) => {
                    onPick(pickedValue);
                    onAdd?.();
                }}
                options={values.map((value: string) => ({ value, label: value }))}
            />
        );
    }

    if (type === 'string') {
        return (
            <Input
                value={value}
                onChange={({ target }) => onPick(target.value)}
                placeholder={t('string-field__placeholder')}
            />
        );
    }

    return null;
};
