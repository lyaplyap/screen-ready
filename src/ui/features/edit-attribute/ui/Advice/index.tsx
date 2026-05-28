import React from 'react';

import { type AttributeScheme } from '@ui/entities/attribute';
import { useTranslation } from '@ui/shared/i18n';
import { IconLightbulb } from '@ui/shared/icons';
import { Paragraph } from '@ui/shared/ui';

import { buildAdvice } from './lib/build-advice';

type AdviceProps = {
    scheme: AttributeScheme;
};

export const Advice: React.FC<AdviceProps> = ({ scheme }) => {
    const { t } = useTranslation();
    const blocks = buildAdvice({ scheme, t });

    if (blocks.length === 0) {
        return null;
    }

    return <Paragraph icon={<IconLightbulb />} title={t('advice__title')} text={blocks} />;
};
