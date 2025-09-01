import { hexToRgb } from '../lib';

const getFontStyle = (weight: 'regular' | 'bold') => {
    switch(weight) {
        case 'bold':
            return 'Bold';
        case 'regular':
        default:
            return 'Regular';
    }
};

type TextStyles = {
    fontSize?: number;
    fontWeight?: 'regular' | 'bold';
    lineHeight?: number;
    color?: string;
    opacity?: number;
};

export const createText = (characters: string, styles: TextStyles = {}) => {
    const { fontSize = 14, fontWeight = 'regular', lineHeight = 20, color = '#000000', opacity } = styles;

    const text = figma.createText();

    text.characters = characters;
    text.fontName = { family: 'Inter', style: getFontStyle(fontWeight) };
    text.fontSize = fontSize;
    text.lineHeight = { value: lineHeight, unit: 'PIXELS' };
    text.fills = [{
        type: 'SOLID',
        color: hexToRgb(color),
        opacity
    }];

    return text;
};

type CaptionStyles = Omit<TextStyles, 'fontSize' | 'lineHeight'>;

export const createCaption = (characters: string, styles: CaptionStyles = {}) =>
    createText(characters,
        Object.assign(styles, {
            fontSize: 12,
            lineHeight: 14
        })
    );