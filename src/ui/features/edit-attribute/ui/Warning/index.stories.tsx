import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ARIA_ATTRIBUTES_SCHEMES } from '@ui/entities/attribute';

import { Warning } from './index';

const meta: Meta<typeof Warning> = {
    title: 'Features/EditAttribute/Warning',
    component: Warning,
    argTypes: {
        scheme: { control: false }
    }
};

export default meta;

type Story = StoryObj<typeof Warning>;

export const AriaHasPopup: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-haspopup']
    }
};

export const AriaExpanded: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-expanded']
    }
};

export const AriaDisabledNoWarning: Story = {
    args: {
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-disabled']
    }
};
