import React from 'react';

import { I18nProvider } from '../shared/i18n';

import { Header, Main, Footer } from './ui';

import './styles/reset.css';
import './styles/main.css';

export const App: React.FC = () => {
    return (
        <I18nProvider>
            <Header />
            <Main />
            <Footer />
        </I18nProvider>
    );
};
