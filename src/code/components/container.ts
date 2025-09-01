import { parsePadding, hexToRgb } from '../lib';

type CommonStyles = {
    padding?: string;
    borderRadius?: number;
    backgroundColor?: string;
};

type FlexStyles = {
    display?: 'grid';
    direction?: 'vertical' | 'horizontal';
    gap?: number;
};

type ContainerStyles = CommonStyles & FlexStyles;

export const createContainer = (children: (FrameNode | TextNode)[], styles: ContainerStyles = {}) => {
    const frame = figma.createFrame();

    const {
        padding,
        borderRadius = 0,
        backgroundColor = '#ffffff',
        display,
        direction = 'horizontal',
        gap = 0
    } = styles;

    if (padding) {
        const { paddingTop, paddingRight, paddingBottom, paddingLeft } = parsePadding(padding);

        frame.paddingTop = paddingTop;
        frame.paddingRight = paddingRight;
        frame.paddingBottom = paddingBottom;
        frame.paddingLeft = paddingLeft;
    }

    frame.cornerRadius = borderRadius;
    frame.fills = [{
        type: 'SOLID',
        color: hexToRgb(backgroundColor)
    }];

    if (display === 'grid') {
        const mode = direction === 'vertical' ? 'VERTICAL' : 'HORIZONTAL';

        frame.layoutMode = mode;
        frame.itemSpacing = gap;
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'AUTO';
    }

    for (const child of children) {
        frame.appendChild(child);
    }

    return frame;
};
