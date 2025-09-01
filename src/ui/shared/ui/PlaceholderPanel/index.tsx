import React from 'react';

import { IllustrationCursor } from '../../illustrations';
import { useTranslation, Trans } from '../../i18n';
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
