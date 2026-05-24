import React from 'react';

import { I18nProvider } from '@ui/shared/i18n';
import { Footer, Header, Main } from '@ui/widgets';

import { initStore } from './store';

import './styles/reset.css';
import './styles/main.css';

initStore();

export const App: React.FC = () => {
    return (
        <I18nProvider>
            <Header />
            <Main />
            <Footer />
        </I18nProvider>
    );
};
