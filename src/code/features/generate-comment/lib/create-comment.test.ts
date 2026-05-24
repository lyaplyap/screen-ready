import { createTranslate } from '@code/shared/i18n';

import { createComment } from './create-comment';

const t = createTranslate('en');

const makeFrame = () => ({
    type: 'FRAME',
    characters: 'Save',
    children: []
}) as unknown as SceneNode;

describe('createComment', () => {
    beforeEach(() => {
        (figma.createFrame as jest.Mock).mockClear();
        (figma.createText as jest.Mock).mockClear();
    });

    it('builds a 540px-wide comment with three top-level sections', () => {
        const comment = createComment(
            {
                role: 'button',
                attributes: [{ id: 'aria-disabled', value: 'true' }]
            },
            makeFrame(),
            t
        );

        // Outer container + a11y tag + html + icon-wrapper + attributes-inner = several frames.
        expect(figma.createFrame).toHaveBeenCalled();

        expect(comment.name).toBe('Screen Ready Comment');
        expect(comment.width).toBe(540);
        expect(comment.clipsContent).toBe(false);
        expect(comment.counterAxisSizingMode).toBe('FIXED');
        // Three children: a11y tag, voiceover text, html block
        expect((comment as any).children).toHaveLength(3);
    });
});
