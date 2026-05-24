import { Language } from '@code/shared/i18n';

import { ScreenReadyEventHandler as Handler, ScreenReadyEvent as Event } from '../core';

export type ChangeLanguagePayload = {
    language: Language;
};

export type ChangeLanguageEvent = Event<'change-language', ChangeLanguagePayload>;

export const changeLanguageHandler: Handler<ChangeLanguagePayload> = (ctx, payload) => {
    ctx.setLanguage(payload.language);
};
