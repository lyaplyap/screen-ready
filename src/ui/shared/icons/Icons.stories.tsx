import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';

import { IconCheck, IconGithub, IconPlus, IconShare, IconTrashBin } from './index';

const ICONS = {
    IconCheck,
    IconGithub,
    IconPlus,
    IconShare,
    IconTrashBin
} as const;

type IconName = keyof typeof ICONS;

type IconStoryProps = {
    name: IconName;
};

const IconShowcase: React.FC<IconStoryProps> = ({ name }) => {
    const Icon = ICONS[name];

    return (
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ color: 'currentColor' }}>
                <Icon />
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{name}</span>
        </div>
    );
};

const meta: Meta<typeof IconShowcase> = {
    title: 'Shared/Icons',
    component: IconShowcase,
    argTypes: {
        name: {
            control: { type: 'select' },
            options: Object.keys(ICONS) as IconName[]
        }
    },
    args: {
        name: 'IconPlus'
    }
};

export default meta;

type Story = StoryObj<typeof IconShowcase>;

export const Single: Story = {};

export const Gallery: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {(Object.keys(ICONS) as IconName[]).map((name) => (
                <IconShowcase key={name} name={name} />
            ))}
        </div>
    )
};
