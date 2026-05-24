import { TRANSLATIONS } from './translations';
import { type Language, type TFunc } from './types';

export const createTranslate = (language: Language): TFunc => (key: string) => TRANSLATIONS[language][key];
