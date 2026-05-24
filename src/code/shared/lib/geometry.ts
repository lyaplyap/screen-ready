export const extractTextFromFrame = (frame: SceneNode) => {
    const textContents: string[] = [];

    const traverseNode = (node: SceneNode) => {
        if (node.type === 'TEXT') {
            if (node.characters && node.characters.trim()) {
                textContents.push(node.characters.trim());
            }
        }

        if ('children' in node) {
            for (const child of node.children) {
                traverseNode(child);
            }
        }
    };

    traverseNode(frame);

    if (!textContents.length) {
        return undefined;
    }

    return textContents.join(', ');
};

export const findTopLevelFrame = (node: SceneNode): SceneNode | null => {
    let current = node;

    while (current.parent && current.parent.type !== 'PAGE') {
        current = current.parent as SceneNode;
    }

    if (current.parent && current.parent.type === 'PAGE' &&
        (current.type === 'FRAME' || current.type === 'COMPONENT' || current.type === 'INSTANCE')) {
        return current;
    }

    return null;
};

type FrameBounds = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const getTopLevelFrameBounds = (targetFrame: SceneNode): FrameBounds => {
    const topLevelFrame = findTopLevelFrame(targetFrame);

    if (!topLevelFrame) {
        return {
            x: targetFrame.x,
            y: targetFrame.y,
            width: targetFrame.width,
            height: targetFrame.height
        };
    }

    return {
        x: topLevelFrame.x,
        y: topLevelFrame.y,
        width: topLevelFrame.width,
        height: topLevelFrame.height
    };
};

export const getAbsoluteBounds = (targetFrame: SceneNode): FrameBounds => {
    let current = targetFrame;

    let x = targetFrame.x;
    let y = targetFrame.y;

    while (current.parent && current.parent.type !== 'PAGE') {
        const parent = current.parent as SceneNode;

        x += parent.x;
        y += parent.y;

        current = parent;
    }

    return {
        x,
        y,
        width: targetFrame.width,
        height: targetFrame.height
    };
};

export type Position = 'top' | 'bottom' | 'left' | 'right';

export const determineNearestPosition = (frame: SceneNode): Position => {
    const topLevelFrameBounds = getTopLevelFrameBounds(frame);
    const frameBounds = getAbsoluteBounds(frame);

    const frameCenter = {
        x: frameBounds.x + frameBounds.width / 2,
        y: frameBounds.y + frameBounds.height / 2
    };

    const distanceToLeft = frameCenter.x - topLevelFrameBounds.x;
    const distanceToRight = (topLevelFrameBounds.x + topLevelFrameBounds.width) - frameCenter.x;
    const distanceToTop = frameCenter.y - topLevelFrameBounds.y;
    const distanceToBottom = (topLevelFrameBounds.y + topLevelFrameBounds.height) - frameCenter.y;

    const minDistance = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);

    if (minDistance === distanceToLeft) {
        return 'left';
    } else if (minDistance === distanceToRight) {
        return 'right';
    } else if (minDistance === distanceToTop) {
        return 'top';
    } else {
        return 'bottom';
    }
};
