import {
    determineNearestPosition,
    extractTextFromFrame,
    findTopLevelFrame,
    getAbsoluteBounds,
    getTopLevelFrameBounds
} from './geometry';

type AnyNode = Record<string, any>;

const makeNode = (props: Partial<AnyNode>): AnyNode => ({
    type: 'FRAME',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    parent: null,
    ...props
});

describe('extractTextFromFrame', () => {
    it('returns undefined for a node with no text', () => {
        const node = makeNode({ type: 'FRAME', children: [] });
        expect(extractTextFromFrame(node as any)).toBeUndefined();
    });

    it('collects characters from a single TEXT node', () => {
        const node = makeNode({ type: 'TEXT', characters: 'Hello' });
        expect(extractTextFromFrame(node as any)).toBe('Hello');
    });

    it('trims whitespace from collected text', () => {
        const node = makeNode({ type: 'TEXT', characters: '  Hi  ' });
        expect(extractTextFromFrame(node as any)).toBe('Hi');
    });

    it('skips empty/whitespace-only TEXT nodes', () => {
        const text1 = makeNode({ type: 'TEXT', characters: '   ' });
        const text2 = makeNode({ type: 'TEXT', characters: 'World' });
        const frame = makeNode({ type: 'FRAME', children: [text1, text2] });
        expect(extractTextFromFrame(frame as any)).toBe('World');
    });

    it('joins multiple text contents with ", "', () => {
        const text1 = makeNode({ type: 'TEXT', characters: 'A' });
        const text2 = makeNode({ type: 'TEXT', characters: 'B' });
        const frame = makeNode({ type: 'FRAME', children: [text1, text2] });
        expect(extractTextFromFrame(frame as any)).toBe('A, B');
    });

    it('traverses nested children recursively', () => {
        const text = makeNode({ type: 'TEXT', characters: 'Deep' });
        const inner = makeNode({ type: 'FRAME', children: [text] });
        const outer = makeNode({ type: 'FRAME', children: [inner] });
        expect(extractTextFromFrame(outer as any)).toBe('Deep');
    });
});

describe('findTopLevelFrame', () => {
    it('returns the node itself if its parent is the page and it is a FRAME', () => {
        const page = makeNode({ type: 'PAGE' });
        const frame = makeNode({ type: 'FRAME', parent: page });
        expect(findTopLevelFrame(frame as any)).toBe(frame);
    });

    it('returns null when no FRAME/COMPONENT/INSTANCE ancestor sits under PAGE', () => {
        const node = makeNode({ type: 'GROUP', parent: null });
        expect(findTopLevelFrame(node as any)).toBeNull();
    });

    it('walks up until reaching a child of PAGE', () => {
        const page = makeNode({ type: 'PAGE' });
        const top = makeNode({ type: 'FRAME', parent: page });
        const mid = makeNode({ type: 'GROUP', parent: top });
        const leaf = makeNode({ type: 'RECTANGLE', parent: mid });
        expect(findTopLevelFrame(leaf as any)).toBe(top);
    });

    it('returns null if the top-level node is not FRAME/COMPONENT/INSTANCE', () => {
        const page = makeNode({ type: 'PAGE' });
        const top = makeNode({ type: 'GROUP', parent: page });
        const leaf = makeNode({ type: 'RECTANGLE', parent: top });
        expect(findTopLevelFrame(leaf as any)).toBeNull();
    });

    it('accepts COMPONENT and INSTANCE as top-level', () => {
        const page = makeNode({ type: 'PAGE' });
        const comp = makeNode({ type: 'COMPONENT', parent: page });
        const inst = makeNode({ type: 'INSTANCE', parent: page });
        expect(findTopLevelFrame(comp as any)).toBe(comp);
        expect(findTopLevelFrame(inst as any)).toBe(inst);
    });
});

describe('getTopLevelFrameBounds', () => {
    it('returns the target node bounds when no top-level frame is found', () => {
        const orphan = makeNode({ type: 'GROUP', x: 5, y: 6, width: 7, height: 8 });
        expect(getTopLevelFrameBounds(orphan as any)).toEqual({
            x: 5,
            y: 6,
            width: 7,
            height: 8
        });
    });

    it('returns the top-level frame bounds otherwise', () => {
        const page = makeNode({ type: 'PAGE' });
        const top = makeNode({ type: 'FRAME', parent: page, x: 100, y: 200, width: 300, height: 400 });
        const leaf = makeNode({ type: 'RECTANGLE', parent: top, x: 1, y: 2, width: 3, height: 4 });
        expect(getTopLevelFrameBounds(leaf as any)).toEqual({
            x: 100,
            y: 200,
            width: 300,
            height: 400
        });
    });
});

describe('getAbsoluteBounds', () => {
    it('returns own coordinates if no parent', () => {
        const node = makeNode({ x: 10, y: 20, width: 30, height: 40 });
        expect(getAbsoluteBounds(node as any)).toEqual({ x: 10, y: 20, width: 30, height: 40 });
    });

    it('accumulates parent offsets up to (but not including) the PAGE', () => {
        const page = makeNode({ type: 'PAGE' });
        const top = makeNode({ type: 'FRAME', parent: page, x: 100, y: 200 });
        const mid = makeNode({ type: 'FRAME', parent: top, x: 10, y: 20 });
        const leaf = makeNode({ parent: mid, x: 1, y: 2, width: 5, height: 5 });
        expect(getAbsoluteBounds(leaf as any)).toEqual({
            x: 1 + 10 + 100,
            y: 2 + 20 + 200,
            width: 5,
            height: 5
        });
    });

    it('does not include PAGE offset', () => {
        const page = makeNode({ type: 'PAGE', x: 9999, y: 9999 });
        const top = makeNode({ type: 'FRAME', parent: page, x: 10, y: 20, width: 1, height: 1 });
        expect(getAbsoluteBounds(top as any)).toEqual({ x: 10, y: 20, width: 1, height: 1 });
    });
});

describe('determineNearestPosition', () => {
    const buildScene = (frame: Partial<AnyNode>) => {
        const page = makeNode({ type: 'PAGE' });
        const top = makeNode({ type: 'FRAME', parent: page, x: 0, y: 0, width: 100, height: 100 });
        const target = makeNode({ type: 'FRAME', parent: top, ...frame });
        return target;
    };

    it('returns "left" when frame center is closest to left edge', () => {
        const target = buildScene({ x: 0, y: 40, width: 10, height: 20 });
        expect(determineNearestPosition(target as any)).toBe('left');
    });

    it('returns "right" when frame center is closest to right edge', () => {
        const target = buildScene({ x: 90, y: 40, width: 10, height: 20 });
        expect(determineNearestPosition(target as any)).toBe('right');
    });

    it('returns "top" when frame center is closest to top edge', () => {
        const target = buildScene({ x: 40, y: 0, width: 20, height: 10 });
        expect(determineNearestPosition(target as any)).toBe('top');
    });

    it('returns "bottom" when frame center is closest to bottom edge', () => {
        const target = buildScene({ x: 40, y: 90, width: 20, height: 10 });
        expect(determineNearestPosition(target as any)).toBe('bottom');
    });

    it('prefers "left" on ties (first branch wins)', () => {
        const target = buildScene({ x: 0, y: 0, width: 100, height: 100 });
        expect(determineNearestPosition(target as any)).toBe('left');
    });
});
