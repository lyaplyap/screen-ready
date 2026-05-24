import { createApp } from './index';

const sendMessage = (event: object) => {
    (figma.ui.onmessage as any)(event, { origin: '' });
};

describe('createApp', () => {
    beforeEach(() => {
        (figma.showUI as jest.Mock).mockClear();
        (figma.loadFontAsync as jest.Mock)
            .mockReset()
            .mockImplementation(() => Promise.resolve());
        (figma.ui.show as jest.Mock).mockClear();
        (figma.notify as jest.Mock).mockClear();
        figma.ui.onmessage = undefined;
    });

    it('shows UI hidden, waits for fonts, and reveals UI only after UI handshake', async () => {
        const app = createApp();
        const startPromise = app.start();

        expect(figma.showUI).toHaveBeenCalledWith(
            '<html></html>',
            expect.objectContaining({ visible: false, width: 782, height: 800, themeColors: true })
        );

        await startPromise;

        expect(figma.loadFontAsync).toHaveBeenCalledTimes(2);
        // hostReady=true but uiReady=false, so still hidden
        expect(figma.ui.show).not.toHaveBeenCalled();

        sendMessage({ type: 'screen-ready:ui-ready', payload: { language: 'en' } });

        expect(figma.ui.show).toHaveBeenCalledTimes(1);
    });

    it('reveals UI only after host fonts have loaded when ui-ready arrives first', async () => {
        const resolvers: Array<() => void> = [];
        (figma.loadFontAsync as jest.Mock).mockImplementation(
            () => new Promise<void>((resolve) => { resolvers.push(resolve); })
        );

        const app = createApp();
        const startPromise = app.start();

        // ui-ready arrives early
        sendMessage({ type: 'screen-ready:ui-ready', payload: { language: 'ru' } });
        expect(figma.ui.show).not.toHaveBeenCalled();

        resolvers.forEach((resolve) => resolve());
        await startPromise;

        expect(figma.ui.show).toHaveBeenCalledTimes(1);
    });

    it('ignores messages whose type does not start with "screen-ready"', async () => {
        const app = createApp();
        await app.start();

        expect(() =>
            sendMessage({ type: 'something-else', payload: {} })
        ).not.toThrow();
    });

    it('throws if an unknown screen-ready event arrives', async () => {
        const app = createApp();
        await app.start();

        expect(() =>
            sendMessage({ type: 'screen-ready:unknown', payload: {} })
        ).toThrow('EVENT_NOT_FOUND');
    });

    it('routes change-language events so subsequent notifications render in the new language', async () => {
        const app = createApp();
        await app.start();

        sendMessage({ type: 'screen-ready:ui-ready', payload: { language: 'en' } });
        sendMessage({ type: 'screen-ready:change-language', payload: { language: 'ru' } });

        figma.currentPage.selection = [];
        sendMessage({
            type: 'screen-ready:generate-comment',
            payload: { role: 'button', attributes: [] }
        });

        expect(figma.notify).toHaveBeenCalledWith(
            'Пожалуйста, выберите фрейм для добавления комментария',
            expect.objectContaining({ error: true })
        );
    });
});
