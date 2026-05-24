import { hexToRgb, parsePadding } from './css';

describe('hexToRgb', () => {
    it('parses #rrggbb hex', () => {
        expect(hexToRgb('#ffffff')).toEqual({ r: 1, g: 1, b: 1 });
        expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('parses hex without leading #', () => {
        expect(hexToRgb('ff8040')).toEqual({
            r: 1,
            g: 128 / 255,
            b: 64 / 255
        });
    });

    it('is case-insensitive', () => {
        expect(hexToRgb('#AABBCC')).toEqual(hexToRgb('#aabbcc'));
    });

    it('throws on invalid input', () => {
        expect(() => hexToRgb('not-a-color')).toThrow('CANNOT_CONVERT_HEX_TO_RGB');
        expect(() => hexToRgb('#fff')).toThrow('CANNOT_CONVERT_HEX_TO_RGB');
        expect(() => hexToRgb('')).toThrow('CANNOT_CONVERT_HEX_TO_RGB');
    });
});

describe('parsePadding', () => {
    it('expands a single value to all sides', () => {
        expect(parsePadding('10')).toEqual({
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 10
        });
    });

    it('treats two values as vertical/horizontal', () => {
        expect(parsePadding('10 20')).toEqual({
            paddingTop: 10,
            paddingRight: 20,
            paddingBottom: 10,
            paddingLeft: 20
        });
    });

    it('treats three values as top / horizontal / bottom', () => {
        expect(parsePadding('1 2 3')).toEqual({
            paddingTop: 1,
            paddingRight: 2,
            paddingBottom: 3,
            paddingLeft: 2
        });
    });

    it('treats four values as top, right, bottom, left', () => {
        expect(parsePadding('1 2 3 4')).toEqual({
            paddingTop: 1,
            paddingRight: 2,
            paddingBottom: 3,
            paddingLeft: 4
        });
    });

    it('ignores px suffix via parseFloat', () => {
        expect(parsePadding('4px 8px')).toEqual({
            paddingTop: 4,
            paddingRight: 8,
            paddingBottom: 4,
            paddingLeft: 8
        });
    });

    it('falls back to 0 when extra values are missing in 5+ case', () => {
        expect(parsePadding('1 2 3 4 5')).toEqual({
            paddingTop: 1,
            paddingRight: 2,
            paddingBottom: 3,
            paddingLeft: 4
        });
    });

    it('handles trailing/leading whitespace', () => {
        expect(parsePadding('   12px  16px  ')).toEqual({
            paddingTop: 12,
            paddingRight: 16,
            paddingBottom: 12,
            paddingLeft: 16
        });
    });
});
