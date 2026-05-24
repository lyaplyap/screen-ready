import { positionComment } from './position-comment';

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
    const top = makeNode({ type: 'FRAME', parent: page, x: 100, y: 200, width: 400, height: 600 });
    const target = makeNode({ type: 'FRAME', parent: top, ...frame });
    return target;
};

describe('positionComment', () => {
    it('positions the comment to the left of the top-level frame', () => {
        const target = buildScene({ x: 10, y: 20, width: 50, height: 40 });
        const comment: AnyNode = { x: 0, y: 0, width: 200, height: 100 };

        positionComment(comment as FrameNode, target as SceneNode, 'left');

        // top.x - comment.width - 32
        expect(comment.x).toBe(100 - 200 - 32);
        // frame absolute y + (frame height - comment height) / 2
        const expectedY = (20 + 200) + (40 - 100) / 2;
        expect(comment.y).toBe(expectedY);
    });

    it('positions the comment to the right of the top-level frame', () => {
        const target = buildScene({ x: 10, y: 20, width: 50, height: 40 });
        const comment: AnyNode = { x: 0, y: 0, width: 200, height: 100 };

        positionComment(comment as FrameNode, target as SceneNode, 'right');

        // top.x + top.width + 32
        expect(comment.x).toBe(100 + 400 + 32);
        const expectedY = (20 + 200) + (40 - 100) / 2;
        expect(comment.y).toBe(expectedY);
    });

    it('positions the comment above the top-level frame', () => {
        const target = buildScene({ x: 10, y: 20, width: 80, height: 40 });
        const comment: AnyNode = { x: 0, y: 0, width: 200, height: 100 };

        positionComment(comment as FrameNode, target as SceneNode, 'top');

        const expectedX = (10 + 100) + (80 - 200) / 2;
        expect(comment.x).toBe(expectedX);
        // top.y - comment.height - 32
        expect(comment.y).toBe(200 - 100 - 32);
    });

    it('positions the comment below the top-level frame', () => {
        const target = buildScene({ x: 10, y: 20, width: 80, height: 40 });
        const comment: AnyNode = { x: 0, y: 0, width: 200, height: 100 };

        positionComment(comment as FrameNode, target as SceneNode, 'bottom');

        const expectedX = (10 + 100) + (80 - 200) / 2;
        expect(comment.x).toBe(expectedX);
        // top.y + top.height + 32
        expect(comment.y).toBe(200 + 600 + 32);
    });
});
