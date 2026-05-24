import { type Context } from '../core';

import { uiReadyHandler } from './index';

describe('uiReadyHandler', () => {
    it('seeds the sandbox language and flips ui-ready', () => {
        const ctx: Context = {
            getLanguage: jest.fn(),
            setLanguage: jest.fn(),
            markUIReady: jest.fn(),
            closeUI: jest.fn(),
            notify: jest.fn()
        };

        uiReadyHandler(ctx, { language: 'en' });

        expect(ctx.setLanguage).toHaveBeenCalledWith('en');
        expect(ctx.markUIReady).toHaveBeenCalledTimes(1);
    });
});
