import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container!);

    root.render(<App />);
});
