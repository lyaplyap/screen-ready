import React from 'react';

import { type AttributeScheme } from '@ui/entities/attribute';
import { type AriaRole } from '@ui/entities/role';
import { useTranslation } from '@ui/shared/i18n';
import { IconVolume } from '@ui/shared/icons';
import { Paragraph } from '@ui/shared/ui';

import { buildVoiceover } from './lib/build-voiceover';

type VoiceOverProps = {
    role: AriaRole;
    scheme: AttributeScheme;
    pickedValue?: string;
};

export const VoiceOver: React.FC<VoiceOverProps> = ({ role, scheme, pickedValue }) => {
    const { t } = useTranslation();
    const text = buildVoiceover({ role, scheme, pickedValue, t });

    return <Paragraph icon={<IconVolume />} title={t('voiceover__title')} text={[text]} />;
};
