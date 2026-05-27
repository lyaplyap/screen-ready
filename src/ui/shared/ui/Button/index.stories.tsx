import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { IconPlus, IconShare, IconTrashBin } from '@ui/shared/icons';

import { Button } from './index';

const meta: Meta<typeof Button> = {
    title: 'Shared/UI/Button',
    component: Button,
    argTypes: {
        type: {
            control: { type: 'inline-radio' },
            options: ['action', 'default', 'clear']
        },
        progress: { control: 'boolean' },
        disabled: { control: 'boolean' },
        children: { control: 'text' },
        onClick: { action: 'click' }
    },
    args: {
        children: 'Press me',
        type: 'action',
        progress: false,
        disabled: false
    }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Action: Story = {
    args: { type: 'action' }
};

export const Default: Story = {
    args: { type: 'default' }
};

export const Clear: Story = {
    args: { type: 'clear' }
};

export const Disabled: Story = {
    args: { disabled: true }
};

export const Progress: Story = {
    args: { progress: true }
};

export const WithIconLeft: Story = {
    args: {
        children: 'Add attribute',
        iconLeft: <IconPlus />
    }
};

export const WithIconRight: Story = {
    args: {
        children: 'Share',
        iconRight: <IconShare />
    }
};

export const IconOnly: Story = {
    args: {
        children: undefined,
        type: 'default',
        iconLeft: <IconTrashBin />,
        'aria-label': 'Delete'
    }
};

export const Interactive: Story = {
    render: (args) => {
        const InteractiveButton = () => {
            const [count, setCount] = useState(0);

            return (
                <Button {...args} onClick={() => setCount((value) => value + 1)}>
                    Clicked {count} times
                </Button>
            );
        };

        return <InteractiveButton />;
    }
};
