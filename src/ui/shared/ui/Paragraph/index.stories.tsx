import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';

import { IconLightbulb, IconVolume } from '@ui/shared/icons';

import { Paragraph } from './index';

const meta: Meta<typeof Paragraph> = {
    title: 'Shared/UI/Paragraph',
    component: Paragraph,
    argTypes: {
        title: { control: 'text' },
        icon: { control: false },
        text: { control: 'object' }
    }
};

export default meta;

type Story = StoryObj<typeof Paragraph>;

export const ScreenReader: Story = {
    args: {
        icon: <IconVolume />,
        title: 'Озвучится как:',
        text: ['[тут текст со скринридера]']
    }
};

export const Advise: Story = {
    args: {
        icon: <IconLightbulb />,
        title: 'Совет',
        text: [
            [
                { text: 'Не используйте этот атрибут для ' },
                { text: 'тултипов (role="tooltip")', highlighted: true },
                { text: ' и простой ' },
                { text: 'навигации', highlighted: true },
                { text: ' по сайту со ссылками на другие страницы' }
            ],
            'Если подразумевается раскрытие и скрытие каких либо элементов, то используйте кроме aria-haspopup aria-expanded'
        ]
    }
};

export const PlainText: Story = {
    args: {
        title: 'Без иконки',
        text: [
            'Параграф может рендериться без иконки в заголовке.',
            'И поддерживает несколько блоков текста подряд.'
        ]
    }
};
