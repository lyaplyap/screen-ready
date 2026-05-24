import { createCaption, createText } from './text';

describe('createText', () => {
    beforeEach(() => {
        (figma.createText as jest.Mock).mockClear();
    });

    it('applies default styles', () => {
        const text = createText('hello');
        expect(figma.createText).toHaveBeenCalledTimes(1);
        expect(text.characters).toBe('hello');
        expect(text.fontName).toEqual({ family: 'Inter', style: 'Regular' });
        expect(text.fontSize).toBe(14);
        expect(text.lineHeight).toEqual({ value: 20, unit: 'PIXELS' });
        expect(text.fills).toEqual([
            { type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: undefined }
        ]);
    });

    it('uses Bold font style when fontWeight is "bold"', () => {
        const text = createText('hi', { fontWeight: 'bold' });
        expect(text.fontName).toEqual({ family: 'Inter', style: 'Bold' });
    });

    it('falls back to Regular for unknown weight', () => {
        const text = createText('hi', { fontWeight: 'regular' });
        expect(text.fontName).toEqual({ family: 'Inter', style: 'Regular' });
    });

    it('passes through fontSize, lineHeight, color, opacity', () => {
        const text = createText('x', {
            fontSize: 18,
            lineHeight: 22,
            color: '#ff0000',
            opacity: 0.5
        });

        expect(text.fontSize).toBe(18);
        expect(text.lineHeight).toEqual({ value: 22, unit: 'PIXELS' });
        expect(text.fills).toEqual([
            { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 0.5 }
        ]);
    });
});

describe('createCaption', () => {
    it('uses 12/14 font/line-height regardless of input', () => {
        const caption = createCaption('caption', { fontWeight: 'bold', color: '#ffffff' });

        expect(caption.fontSize).toBe(12);
        expect(caption.lineHeight).toEqual({ value: 14, unit: 'PIXELS' });
        expect(caption.fontName).toEqual({ family: 'Inter', style: 'Bold' });
        expect(caption.fills).toEqual([
            { type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: undefined }
        ]);
    });
});
