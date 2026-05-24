import { createContainer } from './container';

describe('createContainer', () => {
    beforeEach(() => {
        (figma.createFrame as jest.Mock).mockClear();
    });

    it('creates an empty container with defaults', () => {
        const frame = createContainer([]);

        expect(figma.createFrame).toHaveBeenCalledTimes(1);
        expect(frame.cornerRadius).toBe(0);
        expect(frame.fills).toEqual([
            { type: 'SOLID', color: { r: 1, g: 1, b: 1 } }
        ]);
        // No padding by default
        expect(frame.paddingTop).toBe(0);
        expect(frame.paddingRight).toBe(0);
        expect(frame.paddingBottom).toBe(0);
        expect(frame.paddingLeft).toBe(0);
        // No grid layout by default
        expect(frame.layoutMode).toBe('NONE');
    });

    it('applies padding string', () => {
        const frame = createContainer([], { padding: '4px 8px' });
        expect(frame.paddingTop).toBe(4);
        expect(frame.paddingRight).toBe(8);
        expect(frame.paddingBottom).toBe(4);
        expect(frame.paddingLeft).toBe(8);
    });

    it('applies borderRadius and backgroundColor', () => {
        const frame = createContainer([], { borderRadius: 6, backgroundColor: '#0d99ff' });
        expect(frame.cornerRadius).toBe(6);
        expect(frame.fills).toEqual([
            { type: 'SOLID', color: { r: 13 / 255, g: 153 / 255, b: 255 / 255 } }
        ]);
    });

    it('applies horizontal grid layout', () => {
        const frame = createContainer([], { display: 'grid', gap: 10 });
        expect(frame.layoutMode).toBe('HORIZONTAL');
        expect(frame.itemSpacing).toBe(10);
        expect(frame.primaryAxisSizingMode).toBe('AUTO');
        expect(frame.counterAxisSizingMode).toBe('AUTO');
    });

    it('applies vertical grid layout when direction is vertical', () => {
        const frame = createContainer([], { display: 'grid', direction: 'vertical', gap: 4 });
        expect(frame.layoutMode).toBe('VERTICAL');
        expect(frame.itemSpacing).toBe(4);
    });

    it('appends children in order', () => {
        const child1 = { type: 'TEXT' } as unknown as TextNode;
        const child2 = { type: 'TEXT' } as unknown as TextNode;

        const frame = createContainer([child1, child2]);

        expect((frame as any).children).toEqual([child1, child2]);
    });
});
