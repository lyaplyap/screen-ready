import React from 'react';

import { type AttributeScheme } from '@ui/entities/attribute';
import { type AriaRole } from '@ui/entities/role';
import { useTranslation } from '@ui/shared/i18n';

import { getPreviewRenderer } from './lib/registry';

import './index.css';

type PreviewProps = {
    role: AriaRole;
    scheme: AttributeScheme;
    pickedValue?: string;
};

export const Preview: React.FC<PreviewProps> = ({ role, scheme, pickedValue }) => {
    const { t } = useTranslation();
    const renderer = getPreviewRenderer(role, scheme.id);

    return (
        <div className="preview">
            <div className="preview__stage">
                {renderer({ role, scheme, pickedValue, t })}
            </div>
        </div>
    );
};
