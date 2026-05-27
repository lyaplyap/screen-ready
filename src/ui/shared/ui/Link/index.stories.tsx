import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';

import { IconGithub, IconShare } from '@ui/shared/icons';

import { Link } from './index';

const meta: Meta<typeof Link> = {
    title: 'Shared/UI/Link',
    component: Link,
    argTypes: {
        type: {
            control: { type: 'inline-radio' },
            options: ['primary', 'secondary']
        },
        size: {
            control: { type: 'inline-radio' },
            options: ['s', 'xs']
        },
        underline: { control: 'boolean' },
        children: { control: 'text' },
        href: { control: 'text' },
        target: { control: 'text' }
    },
    args: {
        children: 'Learn more',
        href: 'https://www.w3.org/TR/wai-aria-1.2/',
        target: '_blank',
        size: 's',
        type: 'primary',
        underline: true
    }
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Primary: Story = {};

export const Secondary: Story = {
    args: { type: 'secondary' }
};

export const NoUnderline: Story = {
    args: { underline: false }
};

export const SizeXS: Story = {
    args: { size: 'xs', children: 'Small link' }
};

export const WithIconLeft: Story = {
    args: {
        children: 'GitHub',
        iconLeft: <IconGithub />
    }
};

export const WithIconRight: Story = {
    args: {
        children: 'W3C',
        underline: false,
        type: 'secondary',
        iconRight: <IconShare />
    }
};

export const IconOnly: Story = {
    args: {
        children: undefined,
        iconLeft: <IconGithub />,
        underline: false
    }
};
