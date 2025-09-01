import React from 'react';

import { IconGithub } from '../../../shared/icons';
import { Trans } from '../../../shared/i18n';
import { Link } from '../../../shared/ui';

import { PROJECT_LINK, DESIGN_LINK, DEV_LINK } from './constants';

import './index.css';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <Link href={PROJECT_LINK} target="_blank">
                <IconGithub />
            </Link>
            <span className="footer__links">
                <Trans
                    i18nKey="footer__made-by"
                    components={[
                        <Link size="xs" type="secondary" href={DEV_LINK} target="_blank" />,
                        <Link size="xs" type="secondary" href={DESIGN_LINK} target="_blank" />
                    ]}
                />
            </span>
        </footer>
    )
};
