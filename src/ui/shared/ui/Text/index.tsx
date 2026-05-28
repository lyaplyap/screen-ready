import cn from 'classnames';
import React, { type ReactNode } from 'react';

import './index.css';

type TextProps = {
    children?: ReactNode;
    as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    color?: 'primary' | 'secondary' | 'brand';
    typography?:
        | 'title-xl'
        | 'title-l'
        | 'title-m'
        | 'title-s'
        | 'title-xs'
        | 'text-m'
        | 'text-m-medium'
        | 'text-s'
        | 'text-s-medium'
        | 'caption'
        | 'caption-medium';
    limited?: boolean;
    title?: string;
};

export const Text: React.FC<TextProps> = ({
    children,
    as: Tag = 'span',
    typography = 'text-s',
    color = 'primary',
    limited,
    title
}) => {
    return (
        <Tag
            title={title}
            className={
                cn(
                    'typography',
                    `typography--type_${typography}`,
                    `typography--color_${color}`,
                    {
                        'typography_limited': limited
                    }
                )
            }
        >
            {children}
        </Tag>
    );
};
