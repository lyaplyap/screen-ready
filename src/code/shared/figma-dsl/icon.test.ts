import { createIcon } from './icon';

describe('createIcon', () => {
    beforeEach(() => {
        (figma.createFrame as jest.Mock).mockClear();
        (figma.createNodeFromSvg as jest.Mock).mockClear();
    });

    it('parses SVG and wraps it in a frame of default size', () => {
        const icon = createIcon('<svg></svg>');

        expect(figma.createNodeFromSvg).toHaveBeenCalledWith('<svg></svg>');
        expect(figma.createFrame).toHaveBeenCalled();
        expect(icon.width).toBe(16);
        expect(icon.height).toBe(16);
        expect(icon.fills).toEqual([]);
        expect(icon.clipsContent).toBe(false);
    });

    it('respects custom size', () => {
        const icon = createIcon('<svg></svg>', { size: 24 });
        expect(icon.width).toBe(24);
        expect(icon.height).toBe(24);
    });

    it('applies color to vector children fills and strokes', () => {
        const icon = createIcon('<svg></svg>', { color: '#ff0000', strokeWidth: 2, opacity: 0.5 });

        const svgRoot = (icon as any).children[0];
        const vectorChild = svgRoot.children[0];

        expect(vectorChild.fills).toEqual([
            { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 0.5 }
        ]);
        expect(vectorChild.strokes).toEqual([
            { type: 'SOLID', color: { r: 1, g: 0, b: 0 }, opacity: 0.5 }
        ]);
        expect(vectorChild.strokeWeight).toBe(2);
    });

    it('does not throw when the svg has only frame children (FRAME fills branch is skipped)', () => {
        expect(() => createIcon('<svg></svg>')).not.toThrow();
    });
});
