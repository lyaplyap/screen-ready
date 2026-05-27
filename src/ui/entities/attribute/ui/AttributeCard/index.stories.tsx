import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { AttributeCard } from './index';

const meta: Meta<typeof AttributeCard> = {
    title: 'Entities/Attribute/AttributeCard',
    component: AttributeCard,
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        isAdded: { control: 'boolean' },
        onSelect: { action: 'select' },
        onFocus: { action: 'focus' }
    },
    args: {
        title: 'disabled',
        description: 'the element is unavailable for interaction',
        isAdded: false
    }
};

export default meta;

type Story = StoryObj<typeof AttributeCard>;

export const Default: Story = {};

export const Added: Story = {
    args: { isAdded: true }
};

export const LongDescription: Story = {
    args: {
        title: 'haspopup',
        description: 'Indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set'
    }
};
