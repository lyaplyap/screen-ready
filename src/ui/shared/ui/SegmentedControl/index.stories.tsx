import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';

import { SegmentedControl } from './index';

const meta: Meta<typeof SegmentedControl> = {
    title: 'Shared/UI/SegmentedControl',
    component: SegmentedControl,
    argTypes: {
        onChange: { action: 'change' }
    },
    args: {
        options: [
            { id: 'ru', label: 'RU' },
            { id: 'en', label: 'EN' }
        ],
        activeOptionId: 'ru'
    }
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {};

export const EnglishActive: Story = {
    args: { activeOptionId: 'en' }
};

export const ThreeOptions: Story = {
    args: {
        options: [
            { id: 'one', label: 'One' },
            { id: 'two', label: 'Two' },
            { id: 'three', label: 'Three' }
        ],
        activeOptionId: 'two'
    }
};

export const Interactive: Story = {
    render: (args) => {
        const InteractiveSegmentedControl = () => {
            const [activeOptionId, setActiveOptionId] = useState(args.activeOptionId);

            return (
                <SegmentedControl
                    {...args}
                    activeOptionId={activeOptionId}
                    onChange={setActiveOptionId}
                />
            );
        };

        return <InteractiveSegmentedControl />;
    }
};
