import { type Context } from '../core';

import { generateCommentHandler, type GenerateCommentPayload } from './index';

type AnyNode = Record<string, any>;

const makeCtx = (): Context => ({
    getLanguage: jest.fn(() => 'en'),
    setLanguage: jest.fn(),
    markUIReady: jest.fn(),
    closeUI: jest.fn(),
    notify: jest.fn()
});

const validPayload: GenerateCommentPayload = {
    role: 'button',
    attributes: [{ id: 'aria-label', value: 'Save' }]
};

const makeFrameNode = (overrides: Partial<AnyNode> = {}): AnyNode => {
    const page = { type: 'PAGE' };
    return {
        type: 'FRAME',
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        parent: page,
        children: [],
        ...overrides
    };
};

describe('generateCommentHandler', () => {
    beforeEach(() => {
        (figma.notify as jest.Mock).mockClear();
        (figma.currentPage.appendChild as jest.Mock).mockClear();
        figma.currentPage.selection = [];
    });

    it('notifies with EMPTY when nothing is selected', () => {
        const ctx = makeCtx();
        generateCommentHandler(ctx, validPayload);

        expect(figma.notify).toHaveBeenCalledWith(
            'Please select a frame to add a comment',
            { error: true, timeout: 3000 }
        );
        expect(ctx.closeUI).not.toHaveBeenCalled();
    });

    it('notifies with INVALID when no selected node is FRAME/COMPONENT/INSTANCE', () => {
        figma.currentPage.selection = [
            { type: 'GROUP' } as any,
            { type: 'RECTANGLE' } as any
        ];
        const ctx = makeCtx();

        generateCommentHandler(ctx, validPayload);

        expect(ctx.notify).toHaveBeenCalledWith(
            'Please select a frame, component, or instance to add a comment',
            { error: true, timeout: 3000 }
        );
        expect(ctx.closeUI).not.toHaveBeenCalled();
    });

    it('notifies with INITIAL_DATA_ERROR when payload is malformed', () => {
        figma.currentPage.selection = [makeFrameNode() as any];
        const ctx = makeCtx();

        generateCommentHandler(ctx, { role: '', attributes: undefined as any });

        expect(ctx.notify).toHaveBeenCalledWith(
            'Error: couldn\'t get data about the role and attributes',
            { error: true }
        );
        expect(ctx.closeUI).not.toHaveBeenCalled();
    });

    it('creates a comment, notifies SUCCESS, and closes the UI on the happy path', () => {
        const frame = makeFrameNode();
        figma.currentPage.selection = [frame as any];
        const ctx = makeCtx();

        generateCommentHandler(ctx, validPayload);

        expect(figma.currentPage.appendChild).toHaveBeenCalled();
        expect(ctx.notify).toHaveBeenCalledWith('Comment added successfully', { timeout: 2000 });
        expect(ctx.closeUI).toHaveBeenCalledTimes(1);
    });

    it('notifies GENERATE_ERROR if comment creation throws', () => {
        const frame = makeFrameNode();
        figma.currentPage.selection = [frame as any];
        const ctx = makeCtx();

        const appendSpy = figma.currentPage.appendChild as jest.Mock;
        appendSpy.mockImplementationOnce(() => { throw new Error('boom'); });
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        generateCommentHandler(ctx, validPayload);

        expect(errorSpy).toHaveBeenCalled();
        expect(ctx.notify).toHaveBeenCalledWith('Error when creating a comment', { error: true });
        expect(ctx.closeUI).not.toHaveBeenCalled();

        errorSpy.mockRestore();
    });

    it('filters out non-FRAME/COMPONENT/INSTANCE nodes when generating', () => {
        const frame = makeFrameNode();
        figma.currentPage.selection = [
            { type: 'GROUP' } as any,
            frame as any
        ];
        const ctx = makeCtx();

        generateCommentHandler(ctx, validPayload);

        // Only one comment created for the FRAME, not for the GROUP.
        expect(figma.currentPage.appendChild).toHaveBeenCalledTimes(1);
        expect(ctx.closeUI).toHaveBeenCalledTimes(1);
    });
});
