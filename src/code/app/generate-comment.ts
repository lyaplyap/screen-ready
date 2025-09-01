import { GenerateCommentMessageData as MessageData } from '../types';
import { createTranslate, Language, TFunc } from '../i18n';
import { createText, createCaption, createContainer, createIcon } from '../components';
import { CODE_SVG } from '../constants';
import {
    getHTMLAttributes,
    getVoiceover,
    getTopLevelFrameBounds,
    getAbsoluteBounds,
    determineNearestPosition,
    Position,
    hexToRgb
} from '../lib';

const createA11YTag = () =>
    createContainer(
        [createCaption('Accessibility', { fontWeight: 'bold', color: '#ffffff' })],
        {
            padding: '4px 8px',
            backgroundColor: '#0d99ff',
            borderRadius: 6,
            display: 'grid'
        }
    );

const createVoiceover = (data: MessageData, frame: SceneNode, t: TFunc) =>
    createText(`${t('voiceover')}: ${getVoiceover(data, frame, t)}`);

const createHTML = (data: MessageData) =>
    createContainer(
        [
            createIcon(CODE_SVG, { opacity: 0.5 }),
            createContainer(
                getHTMLAttributes(data).map(
                    (attribute) => createText(attribute, { opacity: 0.5 })
                ),
                {
                    display: 'grid',
                    direction: 'vertical',
                    gap: 2,
                    backgroundColor: '#f5f5f5' 
                }
            )
        ],
        {
            display: 'grid',
            gap: 10,
            padding: '12px',
            borderRadius: 12,
            backgroundColor: '#f5f5f5' 
        }
    );

const createComment = (data: MessageData, frame: SceneNode, t: TFunc) => {
    const comment = createContainer(
        [
            createA11YTag(),
            createVoiceover(data, frame, t),
            createHTML(data)
        ],
        {
            display: 'grid',
            direction: 'vertical',
            gap: 12,
            borderRadius: 12,
            padding: '16px'
        }
    );

    comment.name = 'Screen Ready Comment';

    return comment;
}

const createConnectorLine = (startX: number, startY: number, endX: number, endY: number, rotation: number): LineNode => {
    const line = figma.createLine();
    
    line.x = startX;
    line.y = startY;

    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    line.resize(length, 0);
    line.strokes = [{
        type: 'SOLID',
        color: hexToRgb('#0d99ff')
    }];

    line.rotation = rotation;
    line.strokeWeight = 1;
    line.dashPattern = [4, 4];
    
    return line;
};

const createConnectorDot = (x: number, y: number): EllipseNode => {
    const dot = figma.createEllipse();

    dot.x = x - 2;
    dot.y = y - 2;

    dot.resize(4, 4);
    
    dot.fills = [{
        type: 'SOLID',
        color: hexToRgb('#0d99ff')
    }];
    
    return dot;
};

const positionComment = (comment: FrameNode, frame: SceneNode, position: Position) => {
    const COMMENT_MARGIN = 32;

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

const createConnector = (comment: FrameNode, frame: SceneNode, position: Position) => {
    const frameAbsoluteBounds = getAbsoluteBounds(frame);

    let startX: number, startY: number, endX: number, endY: number, rotation: number;
    
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
            startX = comment.x + comment.width;
            startY = commentCenter.y;
            endX = frameAbsoluteBounds.x;
            endY = frameCenter.y;
            rotation = 0;
            break;
        case 'right':
            startX = comment.x;
            startY = commentCenter.y;
            endX = frameAbsoluteBounds.x + frameAbsoluteBounds.width;
            endY = frameCenter.y;
            rotation = 180;
            break;
        case 'top':
            startX = commentCenter.x;
            startY = comment.y + comment.height;
            endX = frameCenter.x;
            endY = frameAbsoluteBounds.y;
            rotation = 270;
            break;
        case 'bottom':
            startX = commentCenter.x;
            startY = comment.y;
            endX = frameCenter.x;
            endY = frameAbsoluteBounds.y + frameAbsoluteBounds.height;
            rotation = 90;
            break;
    }
    
    const line = createConnectorLine(startX, startY, endX, endY, rotation);
    const dot = createConnectorDot(endX, endY);
    
    figma.currentPage.appendChild(line);
    figma.currentPage.appendChild(dot);
};


const createComments = (data: MessageData, frames: SceneNode[], t: TFunc) => {
    for (const frame of frames) {
        const comment = createComment(data, frame, t);

        comment.name = 'Screen Ready Comment'
        figma.currentPage.appendChild(comment);

        const position = determineNearestPosition(frame);
        
        positionComment(comment, frame, position);
        createConnector(comment, frame, position);
    }
};


export const generateCommentHandler = (data: MessageData, language: Language) => {
    const t = createTranslate(language);

    const selectedNodes = figma.currentPage.selection;

    if (selectedNodes.length === 0) {
        figma.notify(t('notification--EMPTY'), { error: true, timeout: 3000 });

        return;
    }

    const validNodes = selectedNodes.filter((node) => 
        node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE'
    );
    
    if (validNodes.length === 0) {
        figma.notify(t('notification--INVALID'), { error: true, timeout: 3000 });

        return;
    }
    
    if (!data || !data.role || !data.attributes) {
        figma.notify(t('notification--INITIAL_DATA_ERROR'), { error: true });

        return;
    }
    
    try {
        createComments(data, validNodes, t);

        figma.notify(t('notification--GENERATE_SUCCESS'), { timeout: 2000 });
        figma.closePlugin();
    } catch (error) {
        figma.notify(t('notification--GENERATE_ERROR'), { error: true });
    }
};
