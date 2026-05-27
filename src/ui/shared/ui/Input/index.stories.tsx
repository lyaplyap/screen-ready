import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { Input } from './index';

const meta: Meta<typeof Input> = {
    title: 'Shared/UI/Input',
    component: Input,
    argTypes: {
        value: { control: 'text' },
        placeholder: { control: 'text' },
        onChange: { action: 'change' }
    },
    args: {
        placeholder: 'Enter the label of the item'
    }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Empty: Story = {};

export const Prefilled: Story = {
    args: { value: 'Submit form' }
};

export const Controlled: Story = {
    render: (args) => {
        const ControlledInput = () => {
            const [value, setValue] = useState(args.value ?? '');

            return (
                <Input
                    {...args}
                    value={value}
                    onChange={({ target }) => setValue(target.value)}
                />
            );
        };

        return <ControlledInput />;
    }
};
