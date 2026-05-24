import { getHTMLAttributes } from './get-html';

describe('getHTMLAttributes', () => {
    it('serializes role and attributes as HTML-attribute strings', () => {
        expect(
            getHTMLAttributes({
                role: 'button',
                attributes: [
                    { id: 'aria-label', value: 'Submit' },
                    { id: 'aria-disabled', value: 'true' }
                ]
            })
        ).toEqual([
            'role="button"',
            'aria-label="Submit"',
            'aria-disabled="true"'
        ]);
    });

    it('emits only role when attributes are empty', () => {
        expect(getHTMLAttributes({ role: 'heading', attributes: [] })).toEqual([
            'role="heading"'
        ]);
    });

    it('preserves attribute order', () => {
        const result = getHTMLAttributes({
            role: 'checkbox',
            attributes: [
                { id: 'a', value: '1' },
                { id: 'b', value: '2' },
                { id: 'c', value: '3' }
            ]
        });

        expect(result).toEqual([
            'role="checkbox"',
            'a="1"',
            'b="2"',
            'c="3"'
        ]);
    });
});
