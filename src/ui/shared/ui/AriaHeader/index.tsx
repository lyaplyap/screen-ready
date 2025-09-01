import React from 'react';

import { useTranslation } from '../../i18n';
import { IconPlus, IconTrashBin } from '../../icons';
import { Button, Text } from '../common';

import './index.css';

type AriaHeaderProps = {
    id: string;
    disabled?: boolean;
    mode: 'add' | 'remove';
    onAdd: () => void;
    onRemove: () => void;
};

export const AriaHeader: React.FC<AriaHeaderProps> = ({ id, disabled, mode, onAdd, onRemove }) => {
    const { t } = useTranslation();

    return (
        <div className="aria-header">
            <div className="aria-header__headline">
                <Text as="h1" typography="title-s">{id}</Text>
                <Text color="secondary">{t('aria-header__caption')}</Text>
            </div>
            {mode === 'add' && (
                <Button
                    type="default"
                    iconLeft={<IconPlus />}
                    onClick={onAdd}
                    disabled={disabled}
                >
                    {t('aria-header__action-add')}
                </Button>
            )}
            {mode === 'remove' && (
                <Button
                    type="default"
                    iconLeft={<IconTrashBin />}
                    aria-label={t('aria-header__action-delete')}
                    onClick={onRemove}
                />
            )}
        </div>
    );
};
