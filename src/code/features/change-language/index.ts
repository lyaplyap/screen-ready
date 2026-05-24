import { type Language } from '@code/shared/i18n';

import { type ScreenReadyEventHandler as Handler, type ScreenReadyEvent as Event } from '../core';

export type ChangeLanguagePayload = {
    language: Language;
};

export type ChangeLanguageEvent = Event<'change-language', ChangeLanguagePayload>;

export const changeLanguageHandler: Handler<ChangeLanguagePayload> = (ctx, payload) => {
    ctx.setLanguage(payload.language);
};
