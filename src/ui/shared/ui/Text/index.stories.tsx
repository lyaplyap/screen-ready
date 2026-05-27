import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';

import { Text } from './index';

const meta: Meta<typeof Text> = {
    title: 'Shared/UI/Text',
    component: Text,
    argTypes: {
        as: {
            control: { type: 'select' },
            options: ['span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        },
        color: {
            control: { type: 'inline-radio' },
            options: ['primary', 'secondary']
        },
        typography: {
            control: { type: 'select' },
            options: [
                'title-xl',
                'title-l',
                'title-m',
                'title-s',
                'title-xs',
                'text-m',
                'text-m-medium',
                'text-s',
                'text-s-medium',
                'caption',
                'caption-medium'
            ]
        },
        limited: { control: 'boolean' },
        children: { control: 'text' }
    },
    args: {
        children: 'The quick brown fox jumps over the lazy dog',
        typography: 'text-s',
        color: 'primary'
    }
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Secondary: Story = {
    args: { color: 'secondary' }
};

export const TitleXL: Story = {
    args: { typography: 'title-xl', as: 'h1', children: 'Title XL' }
};

export const TitleL: Story = {
    args: { typography: 'title-l', as: 'h2', children: 'Title L' }
};

export const TitleM: Story = {
    args: { typography: 'title-m', as: 'h3', children: 'Title M' }
};

export const TitleS: Story = {
    args: { typography: 'title-s', as: 'h4', children: 'Title S' }
};

export const Caption: Story = {
    args: { typography: 'caption' }
};

export const Limited: Story = {
    args: {
        limited: true,
        children: 'A very long sentence that should be truncated so users can see the limited prop in action',
        title: 'A very long sentence that should be truncated so users can see the limited prop in action'
    },
    decorators: [
        (Story) => (
            <div style={{ width: 200 }}>
                <Story />
            </div>
        )
    ]
};

export const AllTypography: Story = {
    render: () => {
        const typographies = [
            'title-xl',
            'title-l',
            'title-m',
            'title-s',
            'title-xs',
            'text-m',
            'text-m-medium',
            'text-s',
            'text-s-medium',
            'caption',
            'caption-medium'
        ] as const;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {typographies.map((typography) => (
                    <Text key={typography} as="div" typography={typography}>
                        {typography} — The quick brown fox jumps over the lazy dog
                    </Text>
                ))}
            </div>
        );
    }
};
