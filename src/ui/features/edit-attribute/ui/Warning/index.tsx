import React from 'react';

import { type AttributeScheme } from '@ui/entities/attribute';
import { useTranslation } from '@ui/shared/i18n';
import { Informer } from '@ui/shared/ui';

type WarningProps = {
    scheme: AttributeScheme;
};

export const Warning: React.FC<WarningProps> = ({ scheme }) => {
    const { t } = useTranslation();
    const warning = scheme.warning?.[0];

    if (!warning) {
        return null;
    }

    return <Informer severity="warning" text={t(`warning--${warning}`)} />;
};
