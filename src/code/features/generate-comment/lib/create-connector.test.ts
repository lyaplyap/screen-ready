import { createConnector } from './create-connector';

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

const buildScene = (frame: Partial<AnyNode>) => {
    const page = makeNode({ type: 'PAGE' });
    const top = makeNode({ type: 'FRAME', parent: page, x: 0, y: 0, width: 100, height: 100 });
    const target = makeNode({ type: 'FRAME', parent: top, ...frame });
    return target;
};

describe('createConnector', () => {
    beforeEach(() => {
        (figma.createLine as jest.Mock).mockClear();
        (figma.createEllipse as jest.Mock).mockClear();
    });

    it('appends a line and a dot to the comment with absolute positioning', () => {
        const target = buildScene({ x: 0, y: 40, width: 10, height: 20 });
        const children: AnyNode[] = [];
        const comment: AnyNode = {
            x: -200,
            y: 0,
            width: 200,
            height: 100,
            appendChild: jest.fn((child: AnyNode) => {
                children.push(child);
            })
        };

        createConnector(comment as FrameNode, target as SceneNode, 'left');

        expect(figma.createLine).toHaveBeenCalledTimes(1);
        expect(figma.createEllipse).toHaveBeenCalledTimes(1);
        expect(comment.appendChild).toHaveBeenCalledTimes(2);

        const [line, dot] = children;

        expect(line.layoutPositioning).toBe('ABSOLUTE');
        expect(line.dashPattern).toEqual([4, 4]);
        expect(line.strokeWeight).toBe(1);
        // For position 'left' rotation must be 0
        expect(line.rotation).toBe(0);

        // Line starts at the right edge of the comment, centered vertically
        // startAbsX = -200 + 200 = 0, startX = startAbsX - comment.x = 0 - (-200) = 200
        expect(line.x).toBe(200);
        // startAbsY = comment.y + comment.height/2 = 50, startY = 50 - 0 = 50
        expect(line.y).toBe(50);

        // Dot positioned at endX-2, endY-2
        // endAbsX = frameAbs.x = 0 → endX = 0 - (-200) = 200, dot.x = 198
        expect(dot.x).toBe(198);
        // endAbsY = frame center.y = 40 + 20/2 = 50 → endY = 50 → dot.y = 48
        expect(dot.y).toBe(48);

        expect(dot.layoutPositioning).toBe('ABSOLUTE');
    });

    it('uses rotation 180 for "right" position', () => {
        const target = buildScene({ x: 80, y: 0, width: 10, height: 20 });
        const lines: AnyNode[] = [];
        const comment: AnyNode = {
            x: 200,
            y: 0,
            width: 200,
            height: 100,
            appendChild: jest.fn((child: AnyNode) => { lines.push(child); })
        };

        createConnector(comment as FrameNode, target as SceneNode, 'right');
        expect(lines[0].rotation).toBe(180);
    });

    it('uses rotation 270 for "top" position', () => {
        const target = buildScene({ x: 40, y: 0, width: 20, height: 10 });
        const lines: AnyNode[] = [];
        const comment: AnyNode = {
            x: 0,
            y: -100,
            width: 200,
            height: 50,
            appendChild: jest.fn((child: AnyNode) => { lines.push(child); })
        };

        createConnector(comment as FrameNode, target as SceneNode, 'top');
        expect(lines[0].rotation).toBe(270);
    });

    it('uses rotation 90 for "bottom" position', () => {
        const target = buildScene({ x: 40, y: 80, width: 20, height: 10 });
        const lines: AnyNode[] = [];
        const comment: AnyNode = {
            x: 0,
            y: 200,
            width: 200,
            height: 50,
            appendChild: jest.fn((child: AnyNode) => { lines.push(child); })
        };

        createConnector(comment as FrameNode, target as SceneNode, 'bottom');
        expect(lines[0].rotation).toBe(90);
    });
});
