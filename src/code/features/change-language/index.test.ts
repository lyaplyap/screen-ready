import { type Context } from '../core';

import { changeLanguageHandler } from './index';

describe('changeLanguageHandler', () => {
    it('delegates to ctx.setLanguage with the payload language', () => {
        const ctx: Context = {
            getLanguage: jest.fn(),
            setLanguage: jest.fn(),
            markUIReady: jest.fn(),
            closeUI: jest.fn(),
            notify: jest.fn()
        };

        changeLanguageHandler(ctx, { language: 'ru' });

        expect(ctx.setLanguage).toHaveBeenCalledWith('ru');
        expect(ctx.markUIReady).not.toHaveBeenCalled();
    });
});
