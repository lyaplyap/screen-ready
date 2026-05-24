import { Language } from '@code/shared/i18n';

import { ScreenReadyEventHandler as Handler, ScreenReadyEvent as Event } from '../core';

export type UIReadyPayload = {
    language: Language;
};

export type UIReadyEvent = Event<'ui-ready', UIReadyPayload>;

export const uiReadyHandler: Handler<UIReadyPayload> = (ctx, payload) => {
    ctx.setLanguage(payload.language);
    ctx.markUIReady();
};
