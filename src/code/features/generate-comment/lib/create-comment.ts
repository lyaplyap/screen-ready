import { TFunc } from '@code/shared/i18n';
import { createText, createCaption, createContainer, createIcon } from '@code/shared/figma-dsl';
import { CODE_SVG } from '@code/shared/icons/code';

import { Role } from '../types';

import { getHTMLAttributes } from './get-html';
import { getVoiceover } from './get-voiceover';

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

const createVoiceover = (data: Role, frame: SceneNode, t: TFunc) => {
    const text = createText(`${t('voiceover')}: ${getVoiceover(data, frame, t)}`);

    text.layoutAlign = 'STRETCH';
    text.textAutoResize = 'HEIGHT';

    return text;
};

const createHTML = (data: Role) => {
    const attributes = createContainer(
        getHTMLAttributes(data).map((attribute) => {
            const text = createText(attribute, { opacity: 0.5 });

            text.layoutAlign = 'STRETCH';
            text.textAutoResize = 'HEIGHT';

            return text;
        }),
        {
            display: 'grid',
            direction: 'vertical',
            gap: 2,
            backgroundColor: '#f5f5f5'
        }
    );

    attributes.layoutGrow = 1;

    const html = createContainer(
        [
            createIcon(CODE_SVG, { opacity: 0.5 }),
            attributes
        ],
        {
            display: 'grid',
            gap: 10,
            padding: '12px',
            borderRadius: 12,
            backgroundColor: '#f5f5f5'
        }
    );

    html.layoutAlign = 'STRETCH';
    html.primaryAxisSizingMode = 'FIXED';

    return html;
};

const COMMENT_WIDTH = 540;

export const createComment = (data: Role, frame: SceneNode, t: TFunc) => {
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

    comment.counterAxisSizingMode = 'FIXED';
    comment.resize(COMMENT_WIDTH, comment.height);
    comment.clipsContent = false;
    comment.name = 'Screen Ready Comment';

    return comment;
};
