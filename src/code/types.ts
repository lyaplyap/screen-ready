import { MESSAGE_TYPES } from './constants';
import { Language } from './i18n';

export type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];

export type Attribute = {
    id: string;
    value: string;
};

export type GenerateCommentMessageData = {
    role: string;
    attributes: Attribute[];
};

export type GenerateCommentMessage = {
    type: 'generate-comment';
    data: GenerateCommentMessageData;
};

export type ChangeLanguageMessageData = {
    language: Language;
};

export type ChangeLanguageMessage = {
    type: 'change-language';
    data: ChangeLanguageMessageData;
};

export type Message = GenerateCommentMessage | ChangeLanguageMessage;
