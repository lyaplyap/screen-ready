import { type Position, getAbsoluteBounds, getTopLevelFrameBounds } from '@code/shared/lib';

const COMMENT_MARGIN = 32;

export const positionComment = (comment: FrameNode, frame: SceneNode, position: Position) => {
    const frameAbsoluteBounds = getAbsoluteBounds(frame);
    const topLevelFrameBounds = getTopLevelFrameBounds(frame);

    switch (position) {
        case 'left':
            comment.x = topLevelFrameBounds.x - comment.width - COMMENT_MARGIN;
            comment.y = frameAbsoluteBounds.y + (frameAbsoluteBounds.height - comment.height) / 2;
            break;
        case 'right':
            comment.x = topLevelFrameBounds.x + topLevelFrameBounds.width + COMMENT_MARGIN;
            comment.y = frameAbsoluteBounds.y + (frameAbsoluteBounds.height - comment.height) / 2;
            break;
        case 'top':
            comment.x = frameAbsoluteBounds.x + (frameAbsoluteBounds.width - comment.width) / 2;
            comment.y = topLevelFrameBounds.y - comment.height - COMMENT_MARGIN;
            break;
        case 'bottom':
            comment.x = frameAbsoluteBounds.x + (frameAbsoluteBounds.width - comment.width) / 2;
            comment.y = topLevelFrameBounds.y + topLevelFrameBounds.height + COMMENT_MARGIN;
            break;
    }
};
