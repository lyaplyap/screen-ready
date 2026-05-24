import React from 'react';

import { useTranslation } from '@ui/shared/i18n';

import { Button, Text } from '../common';

import './index.css';

type TriggerBarProps = {
    values: string[];
    onTrigger: () => void;
};

export const TriggerBar: React.FC<TriggerBarProps> = ({ values, onTrigger }) => {
    const { t } = useTranslation();

    if (!values.length) {
        return null;
    }

    const title = values.reduce<string>((title, value, index) => index === 0 ? value : `${title}, ${value}`, '');

    return (
        <div className="trigger-bar">
            <div className="trigger-bar__values">
                <Text typography="text-m-medium">{t('trigger-bar__added-values')}</Text>&nbsp;
                <Text typography="text-m" color="secondary" title={title} limited={true}>
                    {title}
                </Text>
            </div>
            <Button type="action" onClick={onTrigger}>
                {t('trigger-bar__action-done')}
            </Button>
        </div>
    );
};
