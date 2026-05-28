import cn from 'classnames';
import React from 'react';

import { IconError } from '@ui/shared/icons';

import { Text } from '../Text';

import './index.css';

type Severity = 'warning';

const SEVERITY_ICONS: Record<Severity, React.ReactNode> = {
    warning: <IconError />
};

type InformerProps = {
    severity: Severity;
    text: string;
};

export const Informer: React.FC<InformerProps> = ({ severity, text }) => {
    return (
        <div className={cn('informer', `informer--severity_${severity}`)}>
            <span className="informer__icon" aria-hidden="true">
                {SEVERITY_ICONS[severity]}
            </span>
            <div className="informer__text">
                <Text typography="text-s" color="primary">
                    {text}
                </Text>
            </div>
        </div>
    );
};
