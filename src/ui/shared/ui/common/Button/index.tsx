import React, { ReactNode, MouseEventHandler } from 'react';
import cn from 'classnames';

import { Text } from '../Text';

import './index.css';

type ButtonProps = {
    type?: 'action' | 'default' | 'clear';
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    progress?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    onClick?: MouseEventHandler;
    className?: string;
    'aria-label'?: string;
};

export const Button: React.FC<ButtonProps> = ({
    type = 'action',
    iconLeft,
    iconRight,
    progress = false,
    disabled = false,
    children,
    onClick,
    className,
    ...props
}) => {
    const isIconButton = !children;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={
                cn(
                    'button',
                    `button--type_${type}`,
                    {
                        'button--progress': progress,
                        'button--iconic': isIconButton
                    },
                    className
                )
            }
            {...props}
        >
            {Boolean(iconLeft) && <span className="button__icon">{iconLeft}</span>}
            {Boolean(children) && <Text typography="text-s">{children}</Text>}
            {Boolean(iconRight) && <span className="button__icon">{iconRight}</span>}
        </button>
    );
};
