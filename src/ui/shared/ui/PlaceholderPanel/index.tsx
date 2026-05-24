import React from 'react';

import { useTranslation, Trans } from '@ui/shared/i18n';
import { IllustrationCursor } from '@ui/shared/illustrations';

import { Link } from '../common';

import { SUPPORT_LINK } from './constants';

import './index.css';

export const PlaceholderPanel: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="placeholder-panel">
            <div className="placeholder-panel__body">
                <div className="placeholder-panel__decorative" aria-hidden={true}>
                    <IllustrationCursor />
                </div>
                <span className="placeholder-panel__hint">
                    {t('placeholder-panel__hint')}
                </span>
            </div>
            <div className="placeholder-panel__footer">
                <Trans
                    i18nKey="placeholder-panel__support"
                    components={
                        [
                            <Link
                                key="support"
                                size="xs"
                                underline={false}
                                href={SUPPORT_LINK}
                                target="_blank"
                            />
                        ]
                    }
                />
            </div>
        </div>
    );
};
