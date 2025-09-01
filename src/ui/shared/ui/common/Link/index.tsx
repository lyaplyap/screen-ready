import React, { ReactNode } from 'react';
import cn from 'classnames';

import { Text } from '../Text';

import { getTypography } from './utils';

import './index.css';

type LinkProps = {
    children?: ReactNode;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: 's' | 'xs';
    type?: 'primary' | 'secondary';
    underline?: boolean;
    href?: string;
    target?: string;
};

export const Link: React.FC<LinkProps> = ({
    children,
    iconLeft,
    iconRight,
    size = 's',
    type = 'primary',
    underline = true,
    href,
    target
}) => {
    return (
        <a
            href={href}
            target={target}
            className={
                cn(
                    'link',
                    `link--type_${type}`,
                    {
                        'link--underline': underline
                    }
            )
            }
        >
            {iconLeft && <span className="link__icon">{iconLeft}</span>}
            <Text typography={getTypography(size)}>{children}</Text>
            {iconRight && <span className="link__icon">{iconRight}</span>}
        </a>
    );
};
