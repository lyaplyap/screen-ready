import { type Language } from '@code/shared/i18n';

export type Context = {
    getLanguage(): Language;
    setLanguage(language: Language): void;
    markUIReady(): void;
    closeUI: typeof figma.closePlugin;
    notify: typeof figma.notify;
};

export type ScreenReadyEvent<Type extends string, Payload extends object> = {
    type: `screen-ready:${Type}`;
    payload: Payload;
};

export type ScreenReadyEventHandler<Payload extends object> = (ctx: Context, payload: Payload) => void;
