import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ARIA_ATTRIBUTES_SCHEMES } from '@ui/entities/attribute';

import { Advice } from './index';

const meta: Meta<typeof Advice> = {
    title: 'Features/EditAttribute/Advice',
    component: Advice,
    argTypes: {
        scheme: { control: false }
    }
};

export default meta;

type Story = StoryObj<typeof Advice>;

export const AriaHasPopup: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-haspopup']
    }
};

export const AriaDisabled: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-disabled']
    }
};

export const AriaExpanded: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-expanded']
    }
};

export const AriaPressed: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-pressed']
    }
};

export const AriaLabel: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-label']
    }
};

export const AriaLevel: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-level']
    }
};

export const AriaChecked: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-checked']
    }
};
