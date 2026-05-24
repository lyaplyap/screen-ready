import {
    type Context as AppContext,
    type ChangeLanguageEvent,
    changeLanguageHandler,
    type UIReadyEvent,
    uiReadyHandler,
    type GenerateCommentEvent,
    generateCommentHandler
} from '@code/features';

import { initConfig } from './config';

type ScreenReadyEvent =
    | ChangeLanguageEvent
    | UIReadyEvent
    | GenerateCommentEvent;

const loadFonts = () =>
    Promise.all([
        figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
        figma.loadFontAsync({ family: 'Inter', style: 'Bold' })
    ]);

export const createApp = () => {
    const config = initConfig();

    let language = config.language;
    let hostReady = false;
    let uiReady = false;

    const showIfReady = () => {
        if (hostReady && uiReady) {
            figma.ui.show();
        }
    };

    const ctx: AppContext = {
        getLanguage: () => language,
        setLanguage: (next) => { language = next; },
        markUIReady: () => { uiReady = true; showIfReady(); },
        closeUI: figma.closePlugin,
        notify: figma.notify
    };

    return {
        async start() {
            figma.showUI(__html__, {
                width: config.plugin.width,
                height: config.plugin.height,
                themeColors: config.plugin.themeColors,
                visible: false
            });

            figma.ui.onmessage = (event: ScreenReadyEvent) => {
                if (!event.type.startsWith('screen-ready')) {
                    return;
                }

                switch(event.type) {
                    case 'screen-ready:change-language':
                        changeLanguageHandler(ctx, event.payload);
                        break;
                    case 'screen-ready:ui-ready':
                        uiReadyHandler(ctx, event.payload);
                        break;
                    case 'screen-ready:generate-comment':
                        generateCommentHandler(ctx, event.payload);
                        break;
                    default:
                        throw new Error('EVENT_NOT_FOUND');
                }
            };

            await loadFonts();
            hostReady = true;
            showIfReady();
        }
    };
};
