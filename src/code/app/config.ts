import type { Language } from '@code/shared/i18n';

export type Config = {
    language: Language;
    plugin: {
        width: number;
        height: number;
        themeColors: boolean;
    };
};

export const initConfig = (): Config => {
    return {
        language: 'en',
        plugin: {
            width: 782,
            height: 800,
            themeColors: true
        }
    };
};
