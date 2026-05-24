import { createTranslate } from './utils';

describe('createTranslate', () => {
    it('returns the english translation for a known key', () => {
        const t = createTranslate('en');
        expect(t('role--button')).toBe('button');
        expect(t('voiceover')).toBe('It will sound like');
    });

    it('returns the russian translation for a known key', () => {
        const t = createTranslate('ru');
        expect(t('role--button')).toBe('кнопка');
        expect(t('voiceover')).toBe('Озвучится как');
    });

    it('returns undefined for unknown keys', () => {
        const t = createTranslate('en');
        expect(t('does-not-exist')).toBeUndefined();
    });

    it('is curried by language', () => {
        const ten = createTranslate('en');
        const tru = createTranslate('ru');
        expect(ten('role--heading')).not.toBe(tru('role--heading'));
    });
});
