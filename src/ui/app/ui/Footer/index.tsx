import React from 'react';

import { Trans } from '@ui/shared/i18n';
import { IconGithub } from '@ui/shared/icons';
import { Link } from '@ui/shared/ui';

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
                        <Link size="xs" type="secondary" key="dev" href={DEV_LINK} target="_blank" />,
                        <Link size="xs" type="secondary" key="design" href={DESIGN_LINK} target="_blank" />
                    ]}
                />
            </span>
        </footer>
    );
};
