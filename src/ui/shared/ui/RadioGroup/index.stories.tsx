import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { RadioGroup } from './index';

const meta: Meta<typeof RadioGroup> = {
    title: 'Shared/UI/RadioGroup',
    component: RadioGroup,
    argTypes: {
        onChange: { action: 'change' },
        onDoubleClick: { action: 'double-click' }
    },
    args: {
        options: [
            { value: 'false', label: 'false' },
            { value: 'true', label: 'true' }
        ],
        value: 'false'
    }
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const BooleanValues: Story = {};

export const NoSelection: Story = {
    args: { value: undefined }
};

export const EnumeratedValues: Story = {
    args: {
        options: [
            { value: 'false', label: 'false' },
            { value: 'menu', label: 'menu' },
            { value: 'listbox', label: 'listbox' },
            { value: 'tree', label: 'tree' },
            { value: 'grid', label: 'grid' },
            { value: 'dialog', label: 'dialog' }
        ],
        value: 'menu'
    }
};

export const Levels: Story = {
    args: {
        options: ['1', '2', '3', '4', '5', '6'].map((value) => ({ value, label: value })),
        value: '3'
    }
};

export const Interactive: Story = {
    render: (args) => {
        const InteractiveRadioGroup = () => {
            const [value, setValue] = useState<string | undefined>(args.value);

            return (
                <RadioGroup
                    {...args}
                    value={value}
                    onChange={setValue}
                />
            );
        };

        return <InteractiveRadioGroup />;
    }
};
