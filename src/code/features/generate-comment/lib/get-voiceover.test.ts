import { createTranslate } from '@code/shared/i18n';

import { getVoiceover } from './get-voiceover';

const t = createTranslate('en');

const makeFrame = (characters?: string) => ({
    type: characters ? 'TEXT' : 'FRAME',
    characters: characters ?? '',
    children: []
}) as unknown as SceneNode;

describe('getVoiceover', () => {
    it('combines name, role, and states with ", "', () => {
        const result = getVoiceover(
            {
                role: 'button',
                attributes: [
                    { id: 'aria-label', value: 'Save' },
                    { id: 'aria-disabled', value: 'true' }
                ]
            },
            makeFrame(),
            t
        );

        expect(result).toBe('Save, button, dimmed');
    });

    it('uses native text from frame when aria-label is missing', () => {
        const result = getVoiceover(
            {
                role: 'heading',
                attributes: [{ id: 'aria-level', value: '2' }]
            },
            makeFrame('Title'),
            t
        );

        expect(result).toBe('Title, heading, level 2');
    });

    it('omits states when no recognised attributes provided', () => {
        const result = getVoiceover(
            { role: 'link', attributes: [] },
            makeFrame('Read more'),
            t
        );

        expect(result).toBe('Read more, link');
    });

    it('filters out attributes with no translation', () => {
        const result = getVoiceover(
            {
                role: 'button',
                attributes: [
                    { id: 'aria-disabled', value: 'true' },
                    { id: 'aria-bogus', value: 'whatever' }
                ]
            },
            makeFrame('Hello'),
            t
        );

        expect(result).toBe('Hello, button, dimmed');
    });

    it('omits the name segment when no aria-label and no frame text', () => {
        const result = getVoiceover(
            { role: 'button', attributes: [] },
            makeFrame(),
            t
        );

        expect(result).toBe('button');
    });

    it('special-cases aria-level by appending its numeric value', () => {
        const result = getVoiceover(
            {
                role: 'heading',
                attributes: [{ id: 'aria-level', value: '3' }]
            },
            makeFrame(),
            t
        );

        expect(result).toBe('heading, level 3');
    });
});
