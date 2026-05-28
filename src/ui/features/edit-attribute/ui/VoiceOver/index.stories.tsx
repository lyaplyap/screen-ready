import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ARIA_ATTRIBUTES_SCHEMES } from '@ui/entities/attribute';

import { VoiceOver } from './index';

const meta: Meta<typeof VoiceOver> = {
    title: 'Features/EditAttribute/VoiceOver',
    component: VoiceOver,
    argTypes: {
        role: {
            control: 'select',
            options: ['button', 'link', 'heading', 'radio', 'checkbox', 'switch']
        },
        pickedValue: { control: 'text' },
        scheme: { control: false }
    }
};

export default meta;

type Story = StoryObj<typeof VoiceOver>;

export const AriaLabelEmpty: Story = {
    args: {
        role: 'button',
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-label'],
        pickedValue: undefined
    }
};

export const AriaLabelFilled: Story = {
    args: {
        role: 'button',
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-label'],
        pickedValue: 'Сохранить'
    }
};

export const AriaDisabledEmpty: Story = {
    args: {
        role: 'button',
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-disabled'],
        pickedValue: undefined
    }
};

export const AriaDisabledTrue: Story = {
    args: {
        role: 'button',
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-disabled'],
        pickedValue: 'true'
    }
};

export const AriaDisabledFalse: Story = {
    args: {
        role: 'button',
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-disabled'],
        pickedValue: 'false'
    }
};

export const AriaLevel: Story = {
    args: {
        role: 'heading',
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-level'],
        pickedValue: '2'
    }
};

export const AriaHasPopupListbox: Story = {
    args: {
        role: 'button',
        scheme: ARIA_ATTRIBUTES_SCHEMES['aria-haspopup'],
        pickedValue: 'listbox'
    }
};
