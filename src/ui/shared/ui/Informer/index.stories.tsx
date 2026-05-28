import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Informer } from './index';

const meta: Meta<typeof Informer> = {
    title: 'Shared/UI/Informer',
    component: Informer,
    argTypes: {
        severity: { control: { type: 'select' }, options: ['warning'] },
        text: { control: 'object' }
    }
};

export default meta;

type Story = StoryObj<typeof Informer>;

export const Warning: Story = {
    args: {
        severity: 'warning',
        text: 'Важно, чтобы значение aria-haspopup совпадало с ролью попапа, и чтобы элемент, который открывает попап, обязательно был интерактивным'
    }
};

export const PlainText: Story = {
    args: {
        severity: 'warning',
        text: 'Простое одностраничное предупреждение без подсветки фрагментов.'
    }
};
