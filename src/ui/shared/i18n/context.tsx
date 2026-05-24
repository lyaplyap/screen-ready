import React, { createContext, useContext, type ReactNode, useState, useEffect, useCallback, useRef } from 'react';

import { TRANSLATIONS } from './translations';
import { onChangeLanguage, onUiReady } from './utils';

type I18nContextType = {
    t: (key: string) => string;
    changeLanguage: (lang: string) => void;
    currentLanguage: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

type I18nProviderProps = {
    children: ReactNode;
    defaultLanguage?: string;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, defaultLanguage = 'ru' }) => {
    const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
    const hasMounted = useRef(false);

    const changeLanguage = useCallback(
        (lang: string) => {
            if (TRANSLATIONS[lang]) {
                setCurrentLanguage(lang);
            }
        },
        []
    );

    const t = useCallback(
        (key: string): string => {
            const dictionary = TRANSLATIONS[currentLanguage];

            if (!dictionary) {
                return key;
            }

            return dictionary[key] || key;
        },
        [currentLanguage]
    );

    useEffect(() => {
        document.documentElement.lang = currentLanguage;

        if (hasMounted.current) {
            onChangeLanguage(currentLanguage);
        } else {
            hasMounted.current = true;
            onUiReady(currentLanguage);
        }
    }, [currentLanguage]);

    return (
        <I18nContext.Provider value={{ t, changeLanguage, currentLanguage }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = (): I18nContextType => {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }

    return context;
};
