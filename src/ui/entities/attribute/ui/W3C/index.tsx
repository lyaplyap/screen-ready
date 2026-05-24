import React from 'react';

import { IconShare } from '@ui/shared/icons';
import { Link, Text } from '@ui/shared/ui';

import './index.css';

type W3CProps = {
    description: string;
    link: string;
};

export const W3C: React.FC<W3CProps> = ({ description, link }) => {
    return (
        <div className="w3c">
            <Text typography="text-m">{description}</Text>
            <Link
                href={link}
                target="_blank"
                underline={false}
                type="secondary"
                iconRight={<IconShare />}
            >
                W3C
            </Link>
        </div>
    );
};
