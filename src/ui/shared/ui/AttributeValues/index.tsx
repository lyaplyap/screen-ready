import React from 'react';

import { AttributeScheme } from '../../a11y';
import { useTranslation } from '../../i18n';
import { RadioGroup, Input } from '../common';

type AttributeValuesProps = AttributeScheme & {
    value?: string;
    onPick: (value: string) => void;
};

export const AttributeValues: React.FC<AttributeValuesProps> = ({ value, onPick, ...attribute }) => {
    const { t } = useTranslation();
    const { type } = attribute;

    if (type === 'boolean' || type === 'enum') {
        const { values } = attribute;

        return (
            <RadioGroup
                value={value}
                onChange={onPick}
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
