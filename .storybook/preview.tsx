import type { Preview, Decorator } from '@storybook/react-webpack5';
import React, { useEffect, type ReactNode } from 'react';

import { I18nProvider } from '../src/ui/shared/i18n';

import './figma-tokens.css';

import '../src/ui/app/styles/reset.css';
import '../src/ui/app/styles/main.css';

type Theme = 'light' | 'dark';

const withI18n: Decorator = (Story, context) => {
    const language = context.globals.language ?? 'ru';

    return (
        <I18nProvider key={language} defaultLanguage={language}>
            <Story />
        </I18nProvider>
    );
};

const ThemeRoot = ({ theme, children }: { theme: Theme; children: ReactNode }) => {
    useEffect(() => {
        document.documentElement.setAttribute('theme', theme);
    }, [theme]);

    return <>{children}</>;
};

const withTheme: Decorator = (Story, context) => {
    const theme = (context.globals.theme ?? 'light') as Theme;

    return (
        <ThemeRoot theme={theme}>
            <Story />
        </ThemeRoot>
    );
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        a11y: {
            element: '#storybook-root',
            config: {},
            options: {}
        }
    },
    globalTypes: {
        language: {
            description: 'Active i18n language',
            defaultValue: 'ru',
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [
                    { value: 'ru', title: 'Русский' },
                    { value: 'en', title: 'English' }
                ],
                dynamicTitle: true
            }
        },
        theme: {
            description: 'Figma color theme',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'paintbrush',
                items: [
                    { value: 'light', title: 'Light', icon: 'sun' },
                    { value: 'dark', title: 'Dark', icon: 'moon' }
                ],
                dynamicTitle: true
            }
        }
    },
    decorators: [withI18n, withTheme]
};

export default preview;
