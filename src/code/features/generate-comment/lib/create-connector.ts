import { Position, getAbsoluteBounds, hexToRgb } from '@code/shared/lib';

const CONNECTOR_COLOR = '#0d99ff';

const createConnectorLine = (length: number, rotation: number): LineNode => {
    const line = figma.createLine();

    line.resize(length, 0);
    line.strokes = [{
        type: 'SOLID',
        color: hexToRgb(CONNECTOR_COLOR)
    }];

    line.rotation = rotation;
    line.strokeWeight = 1;
    line.dashPattern = [4, 4];

    return line;
};

const createConnectorDot = (): EllipseNode => {
    const dot = figma.createEllipse();

    dot.resize(4, 4);
    dot.fills = [{
        type: 'SOLID',
        color: hexToRgb(CONNECTOR_COLOR)
    }];

    return dot;
};

export const createConnector = (comment: FrameNode, frame: SceneNode, position: Position) => {
    const frameAbsoluteBounds = getAbsoluteBounds(frame);

    let startAbsX: number, startAbsY: number, endAbsX: number, endAbsY: number, rotation: number;

    const frameCenter = {
        x: frameAbsoluteBounds.x + frameAbsoluteBounds.width / 2,
        y: frameAbsoluteBounds.y + frameAbsoluteBounds.height / 2
    };

    const commentCenter = {
        x: comment.x + comment.width / 2,
        y: comment.y + comment.height / 2
    };

    switch (position) {
        case 'left':
            startAbsX = comment.x + comment.width;
            startAbsY = commentCenter.y;
            endAbsX = frameAbsoluteBounds.x;
            endAbsY = frameCenter.y;
            rotation = 0;
            break;
        case 'right':
            startAbsX = comment.x;
            startAbsY = commentCenter.y;
            endAbsX = frameAbsoluteBounds.x + frameAbsoluteBounds.width;
            endAbsY = frameCenter.y;
            rotation = 180;
            break;
        case 'top':
            startAbsX = commentCenter.x;
            startAbsY = comment.y + comment.height;
            endAbsX = frameCenter.x;
            endAbsY = frameAbsoluteBounds.y;
            rotation = 270;
            break;
        case 'bottom':
            startAbsX = commentCenter.x;
            startAbsY = comment.y;
            endAbsX = frameCenter.x;
            endAbsY = frameAbsoluteBounds.y + frameAbsoluteBounds.height;
            rotation = 90;
            break;
    }

    const startX = startAbsX - comment.x;
    const startY = startAbsY - comment.y;
    const endX = endAbsX - comment.x;
    const endY = endAbsY - comment.y;

    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    const line = createConnectorLine(length, rotation);
    const dot = createConnectorDot();

    comment.appendChild(line);
    line.layoutPositioning = 'ABSOLUTE';
    line.x = startX;
    line.y = startY;

    comment.appendChild(dot);
    dot.layoutPositioning = 'ABSOLUTE';
    dot.x = endX - 2;
    dot.y = endY - 2;
};
