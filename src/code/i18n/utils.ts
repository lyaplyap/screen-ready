import { TRANSLATIONS } from './translations';
import { Language, TFunc } from './types';

export const createTranslate = (language: Language): TFunc => (key: string) => TRANSLATIONS[language][key];
